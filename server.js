const express = require('express');
const app = express();
const Product = require('./models/product');
const Port = 4444;
const router = require('./routes/route');
require('./config/connectMng');

app.use(express.json());
app.use(router);

app.listen(Port, () => {
  console.log(`server on port : ${Port}`);
});