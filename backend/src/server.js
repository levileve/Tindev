const express = require('express');
const route = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

const server = express();

mongoose.connect('mongodb+srv://root:root@cluster0-imsni.mongodb.net/tindev?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(route);

server.listen(3333);