const express = require('express');

const usersRouter = express.Router();

usersRouter
  .get('/', (request, response) => {
    response.json({status: 'OK'});
  });

module.exports = {
  usersRouter
};