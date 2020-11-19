class ConversationRepository {
  constructor() {
    this.conversations = [];
    this.nextConversationId = 1;
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
};

const conversationRepository = new ConversationRepository();

module.exports = {
  conversationRepository,
};