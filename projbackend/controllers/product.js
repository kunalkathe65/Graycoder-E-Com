const Product = require('../models/Product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = async (req, res, next, id) => {
  await Product.findById(id)
    .populate('category')
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({ error: 'Product not found!' });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true; //save files (photo) with extension

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: 'Problem with Image!' });
    }

    //checks if photo's size is greater than 3MB
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: 'File too big!!' });
      }
    }

    const { name, description, price, category, stock } = fields;
    //checking for empty fields
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ error: 'Please fill all the fields!!' });
    }

    const product = new Product(fields); //populating rest of the fields for product
    product.photo.data = fs.readFileSync(file.photo.path); //passing path of photo
    product.photo.contentType = file.photo.type; //passing content type of photo

    //saving product to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: 'Product not saved!' });
      } else {
        return res.json({ product });
      }
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json({ product: req.product });
};

//Middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  const product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(403).json({ error: 'Deletion failed!' });
    } else {
      return res.json({ deletedProduct });
    }
  });
};

exports.updateProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true; //save files (photo) with extension

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({ error: 'Problem with Image!' });
    }

    //lodash extend merges old & updated objects
    const product = _.extend(req.product, fields);

    //checks if photo's size is greater than 3MB
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({ error: 'File too big!!' });
      }
    }

    product.photo.data = fs.readFileSync(file.photo.path); //passing path of photo
    product.photo.contentType = file.photo.type; //passing content type of photo

    //saving product to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({ error: 'Product not saved!' });
      } else {
        return res.json({ product });
      }
    });
  });
};

exports.getAllProducts = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 9;
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, 'asc']])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ error: 'No products found!' });
      } else {
        return res.json(products);
      }
    });
};

//Middleware
exports.updateStock = (req, res, next) => {
  let bulkOperations = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.count, sold: +product.count } },
      },
    };
  });

  Product.bulkWrite(bulkOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({ error: 'Bulk operation failed!' });
    }
  });
  next();
};

exports.getUniqueCategories = (req, res) => {
  Product.distinct('category', {}, (err, category) => {
    if (err) {
      return res.status(400).json({ error: 'No category found!' });
    } else {
      return res.json(category);
    }
  });
};
