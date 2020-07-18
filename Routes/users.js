const express = require('express');
const app = express();

app.get('/', (request, response) => {
    return response.send({message: 'Tudo ok com o GET de Usuários'});
});

app.post('/', (request, response) => {
    return response.send({message: 'Tudo ok com o POST de Usuários'});
});

app.put('/', (request, response) => {
    return response.send({message: 'Tudo ok com o PUT de Usuários'});
});

app.delete('/', (request, response) => {
    return response.send({message: 'Tudo ok com o DELETE de Usuários'});
});

module.exports = app;