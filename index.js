const express = require('express');
const _ = require('lodash');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('dist'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/dist/index.html'));
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

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
