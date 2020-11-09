const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  isSignedIn,
  isAuthenticated,
  signout,
  signup,
  signin,
  resetPassword,
  changePassword,
} = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

//Params
router.param('userId', getUserById);

//Routes
//@route /signup
//@method POST
//@desc signup user
//@access PUBLIC
router.post(
  '/signup',
  [
    check('firstName', 'Name must be atleast three characters long!').isLength({
      min: 3,
    }),
    check('email', 'Email is invalid!').isEmail(),
    check(
      'password',
      'Password must be atleast six characters long!'
    ).isLength({ min: 6 }),
  ],
  signup
);

//@route /signin
//@method POST
//@desc signin user
//@access PUBLIC
router.post(
  '/signin',
  [
    check('email', 'Email is invalid!').isEmail(),
    check('password', 'Password is required!').isLength({ min: 1 }),
  ],
  signin
);

//@route /signout
//@method GET
//@desc signout user
//@access PUBLIC
router.get('/signout', signout);

//@route /resetPassword
//@method POST
//@desc reset user's password
//@access PUBLIC
router.post(
  '/resetPassword',
  [
    check(
      'newPassword',
      'Password must be atleast six characters long!'
    ).isLength({ min: 6 }),
  ],
  resetPassword
);

//@route /changePassword
//@method POST
//@desc change user's password
//@access PRIVATE
router.post(
  '/:userId/changePassword',
  [
    check(
      'newPassword',
      'Password must be atleast six characters long!'
    ).isLength({ min: 6 }),
  ],
  isSignedIn,
  isAuthenticated,
  changePassword
);

module.exports = router;
