const express = require('express');
const { usersRouter } = require('./routes/users');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Got connection');
});

app.use('/users', usersRouter);

server.listen(4000, () => {
  console.log('Instant messenger server has started');
});