const express = require('express');
const router = express.Router();
const Users = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Criação do Token
const createUserToken = (userId) => {
    return jwt.sign({id: userId}, 'minhasenha2020', {expiresIn: '7d'}); 
} 


// Lista usuários
router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    }
    catch (err) {
        return res.send({ error: 'Erro na consulta de usuários!' });
    }
});

// Cria usuários
router.post('/create', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.send({ error: 'Dados insuficientes!' });

    try {
        if (await Users.findOne({ email })) return res.send({ error: 'Usuário já registrado!'});

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});
    }
    catch (err) {
        return res.send({ error: 'Erro ao buscar usuário!' });
    }
});

// Faz autenticação de usuários
router.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.send({ error: 'Dados insuficientes!' });
    try {
        const user = await Users.findOne({ email }).select('+password');
        if (!user) return res.send({ error: 'Usuário não registrado!' });

        const pass_ok = await bcrypt.compare(password, user.password);

        if(!pass_ok) return res.send({ error: 'Erro ao autenticar usuário!' });

        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});
    }
    catch (err) {
        return res.send({ error: 'Erro ao buscar usuário!' });
    }
});

module.exports = router;