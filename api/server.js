const dotenv = require('dotenv');
const log4js = require('log4js');
const path = require('path');
const express = require('express');
const http = require('http');
const passport = require('passport');
const cors = require('cors');
const FacebookStrategy = require('passport-facebook');
const { decrypt } = require('./crypto/fileCrypto');

const logger = log4js.getLogger(`${path.basename(__filename).split('.')[0]}`);
dotenv.config({ path: './.config/.env.dev' });

const BACKEND_API_PORT = decrypt(process.env.BACKEND_API_PORT);

logger.info('Initiating server');

const app = express();
const Router = express.Router();

// Declaring Access Control
let corsOptions = {
  origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));
app.use(Router);

Router.use(express.urlencoded({ extended: false }));
Router.use(express.json());

passport.use(
  new FacebookStrategy(
    {
      clientID: '435178188324126-app',
      clientSecret: '08f61a3bdbe0edfa2850a594b8afa225',
      callbackURL: 'http://localhost:3000/auth/facebook/secrets'
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        console.log(user);
        return cb(err, user);
      });
    }
  )
);

app.get('/', (req, res) => {
  res.send('Hi');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/secrets',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.send('Success');
  }
);

const server = http.createServer(app);
server.listen(BACKEND_API_PORT);

logger.info(`server listening on port: ${BACKEND_API_PORT}`);

module.exports = { server, app, Router };
