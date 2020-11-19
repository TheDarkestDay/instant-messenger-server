const express = require('express');
const bodyParser = require('body-parser');
const { usersRouter } = require('./routes/users');
const { conversationsRouter } = require('./routes/conversations');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Got connection');
});

app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/conversations', conversationsRouter);

server.listen(4000, () => {
  console.log('Instant messenger server has started');
});