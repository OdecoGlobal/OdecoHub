const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  userName: {
    type: String,
    unique: [true, 'User name already exists; Please enter another username'],
    required: [true, 'Please enter a username'],
  },
  email: {
    type: String,
    required: [true, 'Enter your email address'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Provide a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'seller', 'admin'],
    default: 'user',
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'Provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm your password'],
    validate: {
      // Works only a save or create()
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Hashing Password using Bcrypt
userSchema.pre('save', async function (next) {
  // returns if password is not modified
  if (!this.isModified('password')) return next();
  // hash Password
  this.password = await bcrypt.hash(this.password, 12);
  // Removes Confirm password in the database
  this.passwordConfirm = undefined;
  next();
});

// ADD DATE OF PASSWORD CHANGE
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// RETURNING ONLY ACTIVE USERS
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// Creating an instance method for checking password
// userSchema.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

userSchema.methods.verifyPassword = async function (
  loginPassword,
  storedHashedPassword
) {
  return await bcrypt.compare(loginPassword, storedHashedPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  // console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
