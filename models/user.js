const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    mongoose.model('User', userSchema).findOne({ email: this.email }, (error, doc) => {
      if (error) {
        return next(error);
      }
      if (doc) {
        return next(new Error(`There is already a user with email ${this.email}`));
      }
      return next();
    });
  });

module.exports = mongoose.model('User', userSchema, 'User');