const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const Product = require('./models/product');
const path = require('path')
const Port = 4444;
const router = require('./routes/route');
require('./config/connectMng');
const server = http.createServer(app);
const io = socketIo(server);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(router);

server.listen(Port, () => {
  console.log(`server on port : ${Port}`);
});

Product.watch().on('change', data => {
  io.sockets.emit('data', data);
});