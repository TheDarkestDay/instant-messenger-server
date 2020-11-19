const { userRepository } = require('../repository/user-repository');
const { conversationRepository } = require('../repository/conversation-repository');

class Application {
  constructor(userRepository, conversationRepository) {
    this.userRepository = userRepository;
    this.conversationRepository = conversationRepository;
  }

  createUser(userName) {
    const newUser = this.userRepository.createUser(userName);

    this.userRepository.getUsers().forEach((user) => {
      console.log('Adding conversation for ', user.name, newUser.name);
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
}

const application = new Application(userRepository, conversationRepository);

module.exports = {
  application,
};