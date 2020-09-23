const Category = require('../models/Category');

exports.getCategoryById = async (req, res, next, id) => {
  await Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({ error: 'No category found!' });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const { categoryName } = req.body;
  const category = new Category({ name: categoryName });
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({ error: `${categoryName} already exists!` });
    } else {
      return res.json({ category });
    }
  });
};

exports.getCategory = (req, res) => {
  const category = req.category;
  return res.json({ category });
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({ error: 'No categories!' });
    } else {
      return res.json({ categories });
    }
  });
};

exports.updateCategory = (req, res) => {
  Category.findOneAndUpdate(
    { _id: req.category._id },
    { $set: { name: req.body.name } },
    { new: true }
  ).exec((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({ error: 'Updation failed!' });
    } else {
      return res.json({ updatedCategory });
    }
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  Category.deleteOne({ _id: category._id }).exec((err, category) => {
    if (err) {
      return res.status(400).json({ error: 'Deletion failed!' });
    } else {
      return res.json({ msg: 'Deleted Successfully!' });
    }
  });
};
