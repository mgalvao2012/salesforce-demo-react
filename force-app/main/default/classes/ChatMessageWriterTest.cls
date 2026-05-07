@isTest
private class ChatMessageWriterTest {
  @isTest
  static void creates_conversation_and_messages_on_first_event() {
    Id userId = UserInfo.getUserId();
    Chat_Message_Finalized__e e1 = new Chat_Message_Finalized__e(
      Conversation_External_Id__c = 'conv-1',
      Message_External_Id__c = 'msg-1',
      User_Id__c = String.valueOf(userId),
      Role__c = 'user',
      Content__c = 'hello',
      Token_Count__c = 1,
      Created_At__c = DateTime.now()
    );
    Chat_Message_Finalized__e e2 = new Chat_Message_Finalized__e(
      Conversation_External_Id__c = 'conv-1',
      Message_External_Id__c = 'msg-2',
      User_Id__c = String.valueOf(userId),
      Role__c = 'assistant',
      Content__c = 'hi there',
      Token_Count__c = 2,
      Created_At__c = DateTime.now()
    );

    Test.startTest();
    ChatMessageWriter.handle(new List<Chat_Message_Finalized__e>{ e1, e2 });
    Test.stopTest();

    List<Chat_Conversation__c> convos = [
      SELECT Id, External_Id__c, User__c
      FROM Chat_Conversation__c
      WHERE External_Id__c = 'conv-1'
    ];
    System.assertEquals(1, convos.size(), 'conversation upserted exactly once');
    System.assertEquals(userId, convos[0].User__c);

    List<Chat_Message__c> msgs = [
      SELECT External_Id__c, Role__c, Content__c
      FROM Chat_Message__c
      WHERE Conversation__c = :convos[0].Id
      ORDER BY External_Id__c
    ];
    System.assertEquals(2, msgs.size(), 'two messages persisted');
    System.assertEquals('user', msgs[0].Role__c);
    System.assertEquals('assistant', msgs[1].Role__c);
  }

  @isTest
  static void trigger_persists_messages_when_event_is_published() {
    Id userId = UserInfo.getUserId();

    Test.startTest();
    EventBus.publish(
      new Chat_Message_Finalized__e(
        Conversation_External_Id__c = 'trig-conv',
        Message_External_Id__c = 'trig-msg',
        User_Id__c = String.valueOf(userId),
        Role__c = 'user',
        Content__c = 'via trigger',
        Token_Count__c = 1,
        Created_At__c = DateTime.now()
      )
    );
    Test.stopTest();

    List<Chat_Message__c> msgs = [
      SELECT Content__c
      FROM Chat_Message__c
      WHERE External_Id__c = 'trig-msg'
    ];
    System.assertEquals(
      1,
      msgs.size(),
      'trigger fired and writer persisted the row'
    );
    System.assertEquals('via trigger', msgs[0].Content__c);
  }

  @isTest
  static void is_idempotent_on_duplicate_message_ids() {
    Id userId = UserInfo.getUserId();
    Chat_Message_Finalized__e e = new Chat_Message_Finalized__e(
      Conversation_External_Id__c = 'conv-2',
      Message_External_Id__c = 'msg-dup',
      User_Id__c = String.valueOf(userId),
      Role__c = 'user',
      Content__c = 'first',
      Token_Count__c = 1,
      Created_At__c = DateTime.now()
    );

    Test.startTest();
    ChatMessageWriter.handle(new List<Chat_Message_Finalized__e>{ e });
    // Same message_external_id, different content — second call should upsert (replace), not insert.
    e.Content__c = 'second';
    ChatMessageWriter.handle(new List<Chat_Message_Finalized__e>{ e });
    Test.stopTest();

    List<Chat_Message__c> msgs = [
      SELECT Content__c
      FROM Chat_Message__c
      WHERE External_Id__c = 'msg-dup'
    ];
    System.assertEquals(1, msgs.size(), 'no duplicate row created');
    System.assertEquals(
      'second',
      msgs[0].Content__c,
      'upsert replaced content'
    );
  }
}
