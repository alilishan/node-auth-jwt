const fs = require('fs');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

var privateKey = fs.readFileSync('./jwtRS256.key');

const app = express().use(bodyParser.json());


app.post('/api/login', (req, res) => {
    const user = {
        ...req.body
    };

    jwt.sign({ user }, privateKey, { algorithm: 'RS256', expiresIn: '1h' }, (err, token) => {
        res.json({
            token,
            user
        })
    })
});
app.listen(5000, () => console.log('Server started on 5000'));