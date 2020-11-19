const express = require('express');
const bodyParser = require('body-parser');
const { usersRouter } = require('./routes/users');
const { conversationsRouter } = require('./routes/conversations');
const { webSocketsGateway } = require('./web-sockets-gateway');
const app = express();
const server = require('http').createServer(app);

webSocketsGateway.init(server);

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/conversations', conversationsRouter);

server.listen(4000, () => {
  console.log('Instant messenger server has started');
});