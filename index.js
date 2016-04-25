const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

const port = parseInt(process.env.PORT, 10) || 3000;

app.use(express.static('client'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

const sequences = {};

io.on('connection', function (socket) {
  const id = socket.id;

  console.log('Someone connected', id);

  io.sockets.emit('sequences', sequences);

  socket.on('message', function (channel, sequence) {
    if (channel === 'sequence') {
      sequences[id] = sequence;
      io.sockets.emit('sequences', sequences);
    }
  });

  socket.on('disconnect', function() {
    socket.emit('user disconnected', id);
    delete sequences[id];

    console.log('Someone has disconnected', id);

    io.sockets.emit('sequences', sequences);
  });
});

http.listen(port, function () {
  console.log(`Your server is up and running on Port ${port}. Good job!`);
});
