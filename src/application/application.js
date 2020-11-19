const { userRepository } = require('../repository/user-repository');
const { conversationRepository } = require('../repository/conversation-repository');
const { webSocketsGateway } = require('../web-sockets-gateway');

class Application {
  constructor(userRepository, conversationRepository) {
    this.userRepository = userRepository;
    this.conversationRepository = conversationRepository;
  }

  createUser(userName) {
    const newUser = this.userRepository.createUser(userName);

    this.userRepository.getUsers().forEach((user) => {
      this.conversationRepository.createConversation(newUser.id, user.id);
    });

    return newUser;
  }

  getUserConversations(userId) {
    const rawConversations = this.conversationRepository.getUserConversations(userId);

    return rawConversations.map((conversation) => {
      const otherUserId = conversation.members.find((memberId) => memberId !== userId) || userId; 

      return {
        id: conversation.id,
        user: this.userRepository.getUserById(otherUserId),
      }
    });
  }

  getConversationMessages(conversationId) {
    return this.conversationRepository.getConversationMessages(conversationId)
      .map(({id, text, authorId}) => {
        const messageAuthor = this.userRepository.getUserById(authorId);

        return {
          id,
          author: messageAuthor,
          text,
        };
      });
  }

  sendMessageToConversation(message, conversationId) {
    const newMessage = this.conversationRepository.addMessageToConversation(message, conversationId);

    const messageAuthor = this.userRepository.getUserById(message.authorId);

    webSocketsGateway.sendMessageToRoom(`chat/${conversationId}`, 'NEW_MESSAGE', {
      id: newMessage.id,
      author: messageAuthor,
      text: message.text,
    });
  }
}

const application = new Application(userRepository, conversationRepository);

module.exports = {
  application,
};