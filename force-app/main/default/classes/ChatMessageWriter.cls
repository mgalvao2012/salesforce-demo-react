public with sharing class ChatMessageWriter {
  public static void handle(List<Chat_Message_Finalized__e> events) {
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
      for (Chat_Conversation__c c : toUpsertConvos.values()) {
        existingConvos.put(c.External_Id__c, c);
      }
    }

    List<Chat_Message__c> messages = new List<Chat_Message__c>();
    for (Chat_Message_Finalized__e e : events) {
      Chat_Conversation__c parent = existingConvos.get(
        e.Conversation_External_Id__c
      );
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
