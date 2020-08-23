const express = require('express');
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  updateProduct,
  getAllProducts,
  deleteProduct,
  getUniqueCategories,
} = require('../controllers/product');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

//Params
router.param('userId', getUserById);
router.param('productId', getProductById);

//Routes
//create route
router.post(
  '/product/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read routes
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);

//update route
router.put(
  '/product/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//delete route
router.delete(
  '/product/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//listing all products
router.get('/products', getAllProducts);

//get all unique categories
router.get('/products/categories', getUniqueCategories);

module.exports = router;
