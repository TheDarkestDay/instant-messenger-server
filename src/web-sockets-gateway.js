const io = require('socket.io')

class WebSocketsGateway {
  init(httpServer) {
    this.server = io(httpServer);

    this.server.on('connection', (socket) => {
      socket.on('JOIN_CHAT', ({chatId}) => {
        socket.join(`chat/${chatId}`);
      });

      socket.on('LEAVE_CHAT', ({chatId}) => {
        socket.leave(`chat/${chatId}`);
      });
    });
  }

  sendMessageToRoom(roomId, messageType, data) {
    this.server.to(roomId).emit(messageType, data);
  }
}

const webSocketsGateway = new WebSocketsGateway();

module.exports = {
  webSocketsGateway,
};