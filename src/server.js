const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');
const server = express();

// mongoose.connect('mongodb+srv://api-pipedrive-bling:QuWdnNoE5nUlP39P@cluster0.anuyl.mongodb.net/Link?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('conectado');
// });
// ("/api-pipedrive-bling:QuWdnNoE5nUlP39P@cluster0.anuyl.mongodb.net/Link?retryWrites=true&w=majority")
mongoose.connect('mongodb+srv://api-pipedrive-bling:QuWdnNoE5nUlP39P@cluster0.anuyl.mongodb.net/Link?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('CONECTADO');
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);