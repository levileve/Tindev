const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const route = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectUsers = {};

io.on('connect', socket => {
  const {user} = socket.handshake.query;
  connectUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://root:root@cluster0-imsni.mongodb.net/tindev?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  req.io = io;
  req.connectUsers = connectUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(route);

server.listen(3333);