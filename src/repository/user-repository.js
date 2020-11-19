class UserRepository {
  constructor() {
    this.users = [];
    this.nextUserId = 1;
  }

  createUser(userName) {
    const newUser = {
      id: this.nextUserId,
      name: userName,
    };

    this.users.push(newUser);

    this.nextUserId++;

    return newUser;
  }

  getUsers() {
    return this.users;
  }

  getUserById(userId) {
    return this.users.find((user) => user.id === userId);
  }
};

const userRepository = new UserRepository();

module.exports = {
  userRepository,
};