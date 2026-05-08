/**
 * Topic router. Decides whether a user turn should be answered by the
 * Agentforce HR agent (separate Salesforce org) or by the default Gemini
 * model.
 *
 * Two-tier strategy:
 *   1) keyword/regex prefilter (fast path, no LLM call)
 *   2) Gemini structured-output classifier (only on ambiguous turns)
 *
 * Setting ROUTE_HR_TO_AGENTFORCE=false (or omitting AGENTFORCE_AGENT_ID)
 * disables the HR route entirely — every turn goes to Gemini. This is the
 * production kill-switch.
 */

import { GoogleGenAI, Type } from '@google/genai';
import { isConfigured as agentforceConfigured } from './agentforce.js';

export type Topic = 'hr' | 'general';

const HR_KEYWORDS = [
  // English
  'vacation',
  'vacations',
  'pto',
  'paid time off',
  'sick day',
  'sick leave',
  'maternity',
  'paternity',
  'parental leave',
  'labor law',
  'labour law',
  'benefits',
  'benefit plan',
  'payroll',
  'payslip',
  'human resources',
  'hr department',
  'employment contract',
  'severance',
  '401k',
  'retirement plan',
  // Portuguese (Brazilian / EU)
  'férias',
  'ferias',
  'licença',
  'licenca',
  'benefícios',
  'beneficios',
  'salário',
  'salario',
  'folha de pagamento',
  'clt',
  'décimo terceiro',
  'decimo terceiro',
  'fgts',
  'rh',
];

const HR_REGEX = new RegExp(
  `\\b(${HR_KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'i',
);

interface PrefilterResult {
  decision: 'hr' | 'general' | 'ambiguous';
}

function prefilter(userText: string): PrefilterResult {
  if (HR_REGEX.test(userText)) return { decision: 'hr' };
  // Short, low-signal turns ("ok", "thanks") are not worth a classifier call.
  if (userText.trim().length < 12) return { decision: 'general' };
  return { decision: 'ambiguous' };
}

let geminiClient: GoogleGenAI | null = null;
function gemini(): GoogleGenAI {
  if (!geminiClient) {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error('GOOGLE_API_KEY is required for topic classification');
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

const CLASSIFIER_MODEL = process.env.ROUTER_MODEL ?? 'gemini-2.5-flash';

const CLASSIFIER_SYSTEM =
  'You classify a single user message from a workplace chat. ' +
  'Return "hr" if the message is about Human Resources topics: ' +
  'vacations / time off, labor law, benefits, payroll, payslips, ' +
  'employment obligations, leave policies, retirement, hiring, or workplace rights. ' +
  'Return "general" for everything else. Output JSON only.';

async function llmClassify(userText: string, signal: AbortSignal): Promise<Topic> {
  const res = await gemini().models.generateContent({
    model: CLASSIFIER_MODEL,
    contents: [{ role: 'user', parts: [{ text: userText }] }],
    config: {
      systemInstruction: CLASSIFIER_SYSTEM,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING, enum: ['hr', 'general'] },
        },
        required: ['topic'],
      },
      abortSignal: signal,
    },
  });
  try {
    const parsed = JSON.parse(res.text ?? '{}') as { topic?: string };
    return parsed.topic === 'hr' ? 'hr' : 'general';
  } catch {
    return 'general';
  }
}

/**
 * Returns 'hr' if the turn should be routed to the Agentforce HR agent.
 * Falls back to 'general' on classifier errors so the chat stays alive.
 */
export async function classifyTopic(userText: string, signal: AbortSignal): Promise<Topic> {
  if (process.env.ROUTE_HR_TO_AGENTFORCE === 'false') return 'general';
  if (!agentforceConfigured()) return 'general';

  const pre = prefilter(userText);
  if (pre.decision !== 'ambiguous') return pre.decision;

  try {
    return await llmClassify(userText, signal);
  } catch {
    return 'general';
  }
}
