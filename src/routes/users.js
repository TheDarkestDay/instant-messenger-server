const express = require('express');
const {application} = require('../application/application');

const usersRouter = express.Router();

usersRouter
  .post('/', (request, response) => {
    const { userName } = request.body;

    const newUser = application.createUser(userName);

    response.json(newUser);
  });

module.exports = {
  usersRouter
};