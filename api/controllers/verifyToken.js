const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.dev' });
const { decrypt } = require('../crypto/fileCrypto');

const SECRET_ACCESS_TOKEN = decrypt(process.env.SECRET_ACCESS_TOKEN);

function verify(req, res, next) {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.status(403).json({ success: false, message: 'Token is not valid' });
      }
      req.user = user;
      next();
    });
  } else {
    return res
      .status(401)
      .json({ success: false, message: 'You are not authenticated' });
  }
}
module.exports = { verify };
