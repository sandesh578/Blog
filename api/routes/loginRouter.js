const express = require('express');
const { catchErrors } = require('../utils/custom-helpers');
const User = require('../Modals/auth');
const jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require('../crypto/fileCrypto');
const SECRET_ACCESS_TOKEN = decrypt(process.env.SECRET_ACCESS_TOKEN);

const Router = express.Router({ caseSensitive: true });
const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  password: Joi.string()
    .ruleset.pattern(
      new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')
    )
    .rule({
      message:
        'Password must contain a symbol,an uppercase alphabet, a number and length should be between 6 and 16.'
    })
    .required()
});

Router.post(
  '/login',
  (req, res, next) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },
  catchErrors(async (req, res, next) => {
    const user = await User.findOne({
      email: req.body.email
    });

    if (user) {
      if (decrypt(user.password) === req.body.password) {
        const accessToken = jwt.sign(
          { id: user._id, isAdmin: user.isAdmin },
          SECRET_ACCESS_TOKEN,
          { expiresIn: '5d' }
        );
        return res.status(200).json({
          success: true,
          message: 'Logged in successfully',
          accessToken
        });
      } else {
        return res.status(400).json({
          success: false,
          message: 'Password is Incorrect'
        });
      }
    } else {
      return res.status(200).json({
        success: false,
        message: 'User is not registered, Please register and try again'
      });
    }
  })
);

module.exports = Router;
