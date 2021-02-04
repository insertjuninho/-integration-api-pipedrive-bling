const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes');
const server = express();

mongoose.connect('mongodb+srv://api-pipedrive-bling:123456@cluster0.anuyl.mongodb.net/link?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log("CONECTADO COM SUCESSO")
})

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);