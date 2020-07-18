const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb://four_solutions:solutions_four@cluster0-shard-00-00.jll1n.mongodb.net:27017,cluster0-shard-00-01.jll1n.mongodb.net:27017,cluster0-shard-00-02.jll1n.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-q8gyp1-shard-0&authSource=admin&retryWrites=true&w=majority';
const options  = {reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

// SET ERROR
mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ' + err);
})
//SET DISCONNECTED
mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados!');
})
// SET CONNECTED
mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados!');
})

//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;