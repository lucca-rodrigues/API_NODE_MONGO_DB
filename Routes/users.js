const express = require('express');
const app = express();
const Users = require('../model/users');

app.get('/', (request, response) => {
    Users.find({}, (err, data) =>{
        if(err) return response.send({error: 'Erro na consulya de usuários'});
        return response.send(data);
    });
});

app.post('/create', (request, response) => {
    const { email, password } = request.body;
    //VALIDA CAMPOS EMAIL / PASSWORD
    if (!email || !password) return response.send({ error: 'Dados Insulficientes' });
    // VALIDA USUÁRIOS
    Users.findOne({email}, (err, data) =>{
        if(err) return response.send({error: 'Erro ao buscar usuário!'});
        if(data) return response.send({error: 'Uusário já registrado'});

        // Cria usuários
        Users.create(request.body, (err, data) => {
            if(err) return response.send({error: 'Erro ao criar usuário!'});

            // Oculta o password do retorno da requsicão
            data.password = undefined;
            return response.send(data);
        })
    });
});

module.exports = app;