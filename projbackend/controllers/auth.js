const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { findOne } = require('../models/User');

//SIGNUP CONTROLLER(POST)
exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, password } = req.body;
    const isFound = await User.findOne({ email });
    if (isFound) {
      return res.status(400).json({
        error: "You're already registered ! Kindly sign in",
      });
    } else {
      const user = new User({
        name: firstName,
        lastname: lastName,
        email,
        password,
      });
      await user.save();
      return res.status(200).json({
        success: 'Registered successfully! Please sign in',
        user: {
          firstName: user.name,
          lastName: user.lastname,
          email: user.email,
          purchases: user.purchases,
          userinfo: user.userinfo,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: 'OOPS!! Something went wrong',
    });
  }
};

//SIGNIN CONTROLLER(POST)
exports.signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: 'No such account exits! Please Sign up',
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Invalid Credentials!',
      });
    } else {
      //create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      //set cookie
      res.cookie('token', token, { expire: new Date() + 9999 });
      //send response
      const { _id, name, email, role } = user;
      return res.status(200).json({ token, user: { _id, name, email, role } });
    }
  } catch (err) {
    return res.status(500).json({
      error: 'OOPS!! Something went wrong',
    });
  }
};

//RESET PASSWORD CONTROLLER(POST)
exports.resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const { newPassword, token } = req.body;

    if (token) {
      //Decode Token
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const email = decodedToken.email;

      const foundUser = await User.findOne({ email });
      const user = await User.updateOne(
        { email },
        { encry_password: foundUser.securePassword(newPassword) }
      );

      if (user) {
        return res.status(200).json({
          success: 'Password reset is successfull! Kindly Sign In.',
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: 'OOPS!! Something went wrong',
    });
  }
};

//CHANGE PASSWORD CONTROLLER(POST)
exports.changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const { oldPassword, newPassword } = req.body;
    const { email } = req.profile;

    const foundUser = await User.findOne({ email });
    if (!foundUser.authenticate(oldPassword)) {
      return res.status(400).json({
        error: 'Old password is incorrect!',
      });
    } else {
      const user = await User.updateOne(
        { email },
        { encry_password: foundUser.securePassword(newPassword) }
      );

      if (user) {
        return res.status(200).json({
          success: 'Password changed successfully!',
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: 'OOPS!! Something went wrong',
    });
  }
};

//SIGNOUT CONTROLLER(GET)
exports.signout = (req, res) => {
  res.clearCookie('token');
  return res.json({ success: 'Signed out successfully!' });
};

//ISSIGNEDIN MW
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth',
});

//Custom MW
exports.isAuthenticated = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Token is invalid!' });
  }
  let checker = req.profile && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({ error: 'ACCESS DENIED!' });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res
      .status(403)
      .json({ error: "You're not an ADMIN,ACCESS DENIED!" });
  }
  next();
};
