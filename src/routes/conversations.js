const express = require('express');
const {application} = require('../application/application');

const conversationsRouter = express.Router();

conversationsRouter
  .get('/', (request, response) => {
    const { userId } = request.query;

    const userConversations = application.getUserConversations(Number(userId));

    response.json(userConversations);
  });

module.exports = {
  conversationsRouter
};