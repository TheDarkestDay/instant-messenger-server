const express = require('express');
const {application} = require('../application/application');

const conversationsRouter = express.Router();

conversationsRouter
  .get('/', (request, response) => {
    const { userId } = request.query;

    const userConversations = application.getUserConversations(Number(userId));

    response.json(userConversations);
  })
  .get('/:conversationId/messages', (request, response) => {
    const { conversationId } = request.params;
    
    const messages = application.getConversationMessages(Number(conversationId));

    response.json(messages);
  })
  .post('/:conversationId/messages', (request, response) => {
    const { conversationId } = request.params;
    const message = request.body;
    
    application.sendMessageToConversation(message, Number(conversationId));

    response.json({status: 'OK'});
  });

module.exports = {
  conversationsRouter
};