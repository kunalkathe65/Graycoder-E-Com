const express = require('express');
const router = express.Router();

const { isAuthenticated, isSignedIn, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const {
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,
  getCategory,
  getAllCategories,
} = require('../controllers/category');

//Params
router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

//Routes
router.post(
  '/category/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);
router.put(
  '/category/:categoryId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);
router.delete(
  '/category/:categoryId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategories);

module.exports = router;
