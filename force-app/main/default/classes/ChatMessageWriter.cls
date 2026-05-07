/**
 * Persists finalized chat messages from the Heroku LLM worker into Salesforce.
 *
 * Invoked by `ChatMessageFinalizedTrigger` (after insert on
 * `Chat_Message_Finalized__e`). The Heroku worker fires one Platform Event per
 * finalized turn (one for the user's message, one for the assistant's reply);
 * a single Trigger.new batch can therefore contain many events spanning many
 * conversations.
 *
 * Idempotency: both upserts key on the `External_Id__c` columns owned by the
 * worker (Postgres UUIDs), so Platform Event re-deliveries and worker retries
 * cannot create duplicates.
 *
 * Ordering: parent `Chat_Conversation__c` rows are upserted first so that the
 * subsequent `Chat_Message__c` upsert always has a valid master-detail FK,
 * even when this batch contains the *first* turn of a brand-new conversation.
 *
 * Bulk-safety: only two DML statements regardless of batch size — one per
 * object — staying well under governor limits at the platform's max event
 * batch size (2000).
 */
public with sharing class ChatMessageWriter {
  /**
   * @param events the `Trigger.new` list of finalized chat events to persist.
   */
  public static void handle(List<Chat_Message_Finalized__e> events) {
    // Collect every conversation referenced in this batch so we can resolve
    // existing rows in a single SOQL call rather than per-event.
    Set<String> conversationExtIds = new Set<String>();
    for (Chat_Message_Finalized__e e : events) {
      conversationExtIds.add(e.Conversation_External_Id__c);
    }

    Map<String, Chat_Conversation__c> existingConvos = new Map<String, Chat_Conversation__c>();
    for (Chat_Conversation__c c : [
      SELECT Id, External_Id__c
      FROM Chat_Conversation__c
      WHERE External_Id__c IN :conversationExtIds
    ]) {
      existingConvos.put(c.External_Id__c, c);
    }

    // Build the set of brand-new conversations to create. Skip ones already in
    // the org *and* ones already queued in this batch — the two finalized
    // events for a single first turn (user + assistant) share a conversation.
    Map<String, Chat_Conversation__c> toUpsertConvos = new Map<String, Chat_Conversation__c>();
    for (Chat_Message_Finalized__e e : events) {
      if (
        existingConvos.containsKey(e.Conversation_External_Id__c) ||
        toUpsertConvos.containsKey(e.Conversation_External_Id__c)
      ) {
        continue;
      }
      toUpsertConvos.put(
        e.Conversation_External_Id__c,
        new Chat_Conversation__c(
          External_Id__c = e.Conversation_External_Id__c,
          User__c = (Id) e.User_Id__c,
          Started_At__c = e.Created_At__c,
          Status__c = 'Active'
        )
      );
    }
    if (!toUpsertConvos.isEmpty()) {
      upsert toUpsertConvos.values() External_Id__c;
      // Promote the just-upserted rows so the message loop below can resolve
      // their parent Id without a second SOQL.
      for (Chat_Conversation__c c : toUpsertConvos.values()) {
        existingConvos.put(c.External_Id__c, c);
      }
    }

    List<Chat_Message__c> messages = new List<Chat_Message__c>();
    for (Chat_Message_Finalized__e e : events) {
      Chat_Conversation__c parent = existingConvos.get(
        e.Conversation_External_Id__c
      );
      // Defensive: parent should always exist after the upsert above. Skipping
      // here means the next Platform Event delivery will retry this message.
      if (parent == null)
        continue;
      messages.add(
        new Chat_Message__c(
          External_Id__c = e.Message_External_Id__c,
          Conversation__c = parent.Id,
          Role__c = e.Role__c,
          Content__c = e.Content__c,
          Token_Count__c = e.Token_Count__c,
          Created_At__c = e.Created_At__c
        )
      );
    }
    if (!messages.isEmpty()) {
      upsert messages External_Id__c;
    }
  }
}
