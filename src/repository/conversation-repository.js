class ConversationRepository {
  constructor() {
    this.conversations = [];
    this.nextConversationId = 1;
    this.nextMessageId = 1;
  }

  createConversation(firstMemberId, secondMemberId) {
    this.conversations.push({
      members: [
        firstMemberId,
        secondMemberId,
      ],
      messages: [],
      id: this.nextConversationId,
    });

    this.nextConversationId++;
  }

  getConversationById(conversationId) {
    return this.conversations.find((conversation) => conversation.id === conversationId);
  }

  getUserConversations(userId) {
    return this.conversations.filter((conversation) => {
      return conversation.members.includes(userId);
    });
  }

  addMessageToConversation(message, conversationId) {
    const conversation = this.getConversationById(conversationId);
    const newMessage = {
      ...message,
      id: this.nextMessageId++
    };
    conversation.messages.push(newMessage);

    return newMessage;
  }

  getConversationMessages(conversationId) {
    return this.getConversationById(conversationId).messages;
  }
};

const conversationRepository = new ConversationRepository();

module.exports = {
  conversationRepository,
};