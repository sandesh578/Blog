const express = require('express');
const { catchErrors } = require('../utils/custom-helpers');
const { encrypt } = require('../crypto/fileCrypto');
const Router = express.Router({ caseSensitive: true });
const User = require('../Modals/auth');

const Joi = require('joi');

const schema = Joi.object({
  firstName: Joi.string().min(3).max(30).required(),
  lastName: Joi.string().min(3).max(30).required(),
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
  '/register',
  (req, res, next) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json(validation.error.details[0].message);
    }
    next();
  },
  catchErrors(async (req, res, next) => {
    const userExists = await User.findOne({
      email: req.body.email
    });

    if (userExists) {
      return res.status(200).json({
        success: false,
        message: 'User already exits'
      });
    }

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: encrypt(req.body.password)
    });

    const savedUser = await user.save();
    const { password, ...info } = savedUser._doc;

    if (savedUser) {
      return res.status(200).json({
        success: true,
        message: 'User registered successfully',
        user: info
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'User registration unsuccessful'
      });
    }
  })
);

module.exports = Router;
