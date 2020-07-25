const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.status(200).send({message: 'Essa informação é muito importante. Usuários não autorizados não deveriam recebê-la!'});
});

router.post('/', (req, res) => {
    return res.status(200).send({message: 'Tudo ok com o método POST da raiz!'});
});


router.post('/users', (req, res) => {
    return res.status(200).send(res.data);
});

module.exports = router;