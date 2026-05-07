trigger ChatMessageFinalizedTrigger on Chat_Message_Finalized__e(after insert) {
  ChatMessageWriter.handle(Trigger.new);
}
