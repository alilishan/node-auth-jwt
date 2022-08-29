const fs = require('fs');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const verifyToken = require('./verify-token.js');
const publicKey = fs.readFileSync('./jwtRS256.key.pub');

const app = express().use(bodyParser.json());

app.post('/api/resources', verifyToken, (req, res) => {
    jwt.verify(req.token, publicKey, { algorithms: ['RS256'] }, function (err, auth) {
        if (err) {
            res
                .status(403)
                .json({
                    message: 'Forbidden Access',
                    err
                });
        } else {
            res.json({
                message: 'Posts Created',
                auth
            })
        }
    });
});

app.listen(6000, () => console.log('Server started on 6000'));