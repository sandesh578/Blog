const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    img: { type: String }
  },
  { timestamps: true }
);
module.exports = Mongoose.model('User', UserSchema);
