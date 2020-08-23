const express = require('express');
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  getUserPurchaseList,
} = require('../controllers/user');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');

//Params
router.param('userId', getUserById);

//Routes
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);
router.get(
  '/orders/user/:userId',
  isSignedIn,
  isAuthenticated,
  getUserPurchaseList
);

module.exports = router;
