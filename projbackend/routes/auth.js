const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { signout, signup, signin } = require('../controllers/auth');

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

module.exports = router;
