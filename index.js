
// https://github.com/auth0/node-jsonwebtoken
// https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9
// https://www.youtube.com/watch?v=7nafaH9SddU

const fs = require('fs');
const express = require('express');
const jwt = require('jsonwebtoken');

var privateKey = fs.readFileSync('./jwtRS256.key');
var publicKey = fs.readFileSync('./jwtRS256.key.pub');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome'
    })
});

app.post('/api/login', (req, res) => {

    const user = {
        id: 1,
        username: 'alilishan',
        email: 'alilishan@gmail.com'
    };

    jwt.sign({ user }, privateKey, { algorithm: 'RS256', expiresIn: '7d' }, (err, token) => {
        res.json({
            token,
            user
        })
    })
});


app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, publicKey, { algorithms: ['RS256'] }, function (err, auth) {
        if(err){
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

app.listen(5000, () => console.log('Server started on 5000'));



// Middleware to verify the token
function verifyToken(req, res, next){
    // Get Auth Header Value 
    const bearerHeader = req.headers['authorization'];
    
    // Check if Undefined
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;

        // Next => Continue 
        next();
    } else {
        res
            .status(403)
            .json({
                message: 'Authorization token not found!'
            });
    }
} 