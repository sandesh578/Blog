const jwt = require('jsonwebtoken');
const { decrypt } = require('../crypto/fileCrypto');

const SECRET_ACCESS_TOKEN = decrypt(process.env.SECRET_ACCESS_TOKEN);

function validateToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_ACCESS_TOKEN);
  })
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
}

function auth(req, res, next) {
  console.log(SECRET_ACCESS_TOKEN);
  console.log(jwt.sign({ _id: '12345', SECRET_ACCESS_TOKEN }));
  res.locals.token = req.headers['authorization'];
  validateToken(req.headers['authorization'])
    .then((result) => {
      console.log(result);
      // if (result.success) {
      //   res.locals.username = result.payload.userId;
      //   res.locals.authenticated = true;
      //   next();
      // } else {
      //   res.status(401).send('Unauthorized request');
      // }
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { auth };
