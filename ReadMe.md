# Node JWT Auth

### Generate Keys
https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9

```
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
// Don't add passphrase
openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
cat jwtRS256.key
cat jwtRS256.key.pub

```

### JWT Lib
https://github.com/auth0/node-jsonwebtoken

