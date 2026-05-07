/**
 * Mints a short-lived, user-scoped access token that the React uiBundle uses to
 * open its SSE connection to the Heroku edge.
 *
 * Why this exists: the browser must authenticate to a non-Salesforce origin,
 * but the Connected App's signing key cannot live in client code. This class
 * runs server-side, signs a JWT assertion with a self-signed certificate
 * stored in Setup, exchanges it at the org's `/services/oauth2/token`
 * endpoint via the **JWT Bearer flow**, and hands the resulting access token
 * back to the browser along with the SSE edge URL.
 *
 * Exposed as a REST resource at `/services/apexrest/chat/mintToken`. The
 * React client calls it via `@salesforce/sdk-data`'s Apex transport on each
 * page mount (and again on 401 mid-stream); the response is short enough to
 * cache in `sessionStorage` until ~60s before `exp`.
 *
 * Token shape: Salesforce's JWT Bearer flow returns an **opaque session-style
 * access token**, not a JWT. The SSE edge verifies it by calling the org's
 * `/services/oauth2/userinfo` endpoint — a non-200 there means revoke and
 * disconnect. See `apps/sse-edge/src/auth.ts`.
 *
 * Configuration: the SSE edge URL and (optionally) the JWT audience override
 * live in the `Chat_Settings__mdt` Custom Metadata Type so deployments to
 * sandbox / scratch / prod can target different edges without code changes.
 */
@RestResource(urlMapping='/chat/mintToken')
global with sharing class ChatTokenBroker {
  /** Response payload returned to the browser. */
  global class ChatToken {
    /** Opaque Salesforce access token; sent as `Authorization: Bearer …`. */
    public String token;
    /** Heroku SSE edge base URL the React `useSSE` hook should connect to. */
    public String sseUrl;
    /** Client-side cache hint, epoch seconds (30 min from issue). */
    public Long exp;
  }

  public class ChatTokenException extends Exception {
  }

  // The Connected App's Consumer Key. Same value as the SSE edge's
  // JWT_AUDIENCE config var.
  private static final String CONSUMER_KEY = '3MVG9LY8n98IRTt1_cmlOv3XnYeLkYArt_3_v3ztyrq89L5oY5X6AkFWLix.uCN3OkPg4rFRRAOeeZv3rPBWQ';

  // Self-signed cert in Setup → Certificate and Key Management. Its public
  // key is uploaded to the Connected App's "Use digital signatures" slot.
  private static final String SIGNING_CERT = 'chat_jwt_signer';

  // The org's login host — Salesforce verifies the assertion's `aud` matches
  // this exact value. For sandboxes, override via Chat_Settings__mdt below.
  private static final String DEFAULT_AUDIENCE = 'https://login.salesforce.com';

  private static final String SSE_URL_SETTING = 'Chat_SSE_Url';
  private static final String AUDIENCE_SETTING = 'Chat_JWT_Audience';

  /**
   * Entry point. Called by the React client (and by Apex tests).
   *
   * Flow:
   *   1. Build a 3-min RS256 JWT assertion subject = current user.
   *   2. POST it to `<audience>/services/oauth2/token` as a `jwt-bearer` grant.
   *   3. Return the resulting access token + SSE URL to the caller.
   *
   * Runs `with sharing` so the issued token is scoped to *this* user's
   * permissions; subject (`sub`) is `UserInfo.getUserName()`.
   *
   * @return a populated `ChatToken` with token, sseUrl, and a 30-min `exp` hint.
   * @throws ChatTokenException when the token endpoint is non-2xx, the
   *         response lacks `access_token`, or `Chat_Settings__mdt:Chat_SSE_Url`
   *         is not configured for the target environment.
   */
  @HttpPost
  global static ChatToken mintToken() {
    String assertion = buildSignedAssertion();
    String tokenEndpoint = audience() + '/services/oauth2/token';

    HttpRequest req = new HttpRequest();
    req.setEndpoint(tokenEndpoint);
    req.setMethod('POST');
    req.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.setHeader('Accept', 'application/json');
    // Salesforce's JWT Bearer flow does NOT accept a `scope` parameter on
    // this POST; scopes come from the Connected App's OAuth policies.
    // `openid` must be selected there for the response to include id_token.
    req.setBody(
      'grant_type=' +
        EncodingUtil.urlEncode(
          'urn:ietf:params:oauth:grant-type:jwt-bearer',
          'UTF-8'
        ) +
        '&assertion=' +
        EncodingUtil.urlEncode(assertion, 'UTF-8')
    );
    req.setTimeout(10000);

    HttpResponse res = new Http().send(req);
    if (res.getStatusCode() < 200 || res.getStatusCode() >= 300) {
      throw new ChatTokenException(
        'Token endpoint returned ' + res.getStatusCode() + ': ' + res.getBody()
      );
    }

    Map<String, Object> body = (Map<String, Object>) JSON.deserializeUntyped(
      res.getBody()
    );
    String accessToken = (String) body.get('access_token');
    if (String.isBlank(accessToken)) {
      throw new ChatTokenException(
        'Token response missing access_token: ' + res.getBody()
      );
    }

    // Salesforce's JWT Bearer flow returns an opaque session-style access
    // token (not a JWT). The SSE edge verifies it by calling
    // /services/oauth2/userinfo, which returns 401 if the token is bad.
    // We give the React side a 30-min cache hint; the real expiry comes
    // from the org's session-timeout setting.
    ChatToken out = new ChatToken();
    out.token = accessToken;
    out.sseUrl = readSseUrl();
    out.exp = (DateTime.now().getTime() / 1000) + (30 * 60);
    return out;
  }

  /**
   * Builds and RS256-signs the JWT assertion required by the bearer flow.
   *
   * Wire format: `base64url(header) + "." + base64url(payload) + "." +
   * base64url(signature)`. Salesforce verifies the signature against the
   * public key uploaded to the Connected App's "Use digital signatures" slot,
   * checks `iss == ConsumerKey`, `sub == username`, `aud == login host`, and
   * rejects assertions with `exp` more than 5 minutes in the future.
   *
   * `@TestVisible` so `ChatTokenBrokerTest` can call it without an HTTP mock.
   */
  @TestVisible
  private static String buildSignedAssertion() {
    Long nowSec = DateTime.now().getTime() / 1000;
    // Salesforce accepts `exp` up to 5min in the future; we use 3min.
    Long expSec = nowSec + 180;

    // header is constant; precomputed base64url of {"alg":"RS256"}
    String header = base64url(Blob.valueOf('{"alg":"RS256"}'));

    Map<String, Object> claims = new Map<String, Object>{
      'iss' => CONSUMER_KEY,
      'sub' => UserInfo.getUserName(),
      'aud' => audience(),
      'exp' => expSec
    };
    String payload = base64url(Blob.valueOf(JSON.serialize(claims)));

    String signingInput = header + '.' + payload;

    Blob signature = Crypto.signWithCertificate(
      'RSA-SHA256',
      Blob.valueOf(signingInput),
      SIGNING_CERT
    );

    return signingInput + '.' + base64url(signature);
  }

  /**
   * Converts standard base64 to base64url (RFC 4648 §5): `+` → `-`,
   * `/` → `_`, drop trailing `=` padding. Required by the JWT spec; Apex's
   * `EncodingUtil.base64Encode` only emits standard base64.
   */
  private static String base64url(Blob input) {
    return EncodingUtil.base64Encode(input)
      .replace('+', '-')
      .replace('/', '_')
      .replace('=', '');
  }

  /**
   * Resolves the JWT `aud` claim and token-endpoint host. Defaults to the
   * production login host; override via `Chat_Settings__mdt:Chat_JWT_Audience`
   * for sandboxes (e.g. `https://test.salesforce.com`).
   */
  private static String audience() {
    Chat_Settings__mdt cfg = Chat_Settings__mdt.getInstance(AUDIENCE_SETTING);
    if (cfg != null && !String.isBlank(cfg.Value__c))
      return cfg.Value__c;
    return DEFAULT_AUDIENCE;
  }

  /**
   * Resolves the Heroku SSE edge URL handed to the browser. Has no default —
   * deployments must populate `Chat_Settings__mdt:Chat_SSE_Url` per
   * environment, otherwise `mintToken` fails fast with a clear error.
   */
  private static String readSseUrl() {
    Chat_Settings__mdt cfg = Chat_Settings__mdt.getInstance(SSE_URL_SETTING);
    if (cfg == null || String.isBlank(cfg.Value__c)) {
      throw new ChatTokenException(
        'Chat_Settings__mdt:Chat_SSE_Url is not configured'
      );
    }
    return cfg.Value__c;
  }
}
