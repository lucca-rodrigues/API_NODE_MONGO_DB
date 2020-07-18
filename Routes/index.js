const express = require('express');
const app = express();

app.get('/', (request, response) => {
    return response.send({message: 'Tudo ok com o GET da Raiz'});
});

app.post('/', (request, response) => {
    return response.send({message: 'Tudo ok com o POST da Raiz'});
});

app.put('/', (request, response) => {
    return response.send({message: 'Tudo ok com o PUT da Raiz'});
});

app.delete('/', (request, response) => {
    return response.send({message: 'Tudo ok com o DELETE da Raiz'});
});

module.exports = app;