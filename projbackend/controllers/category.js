const Category = require('../models/Category');

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({ error: 'No category found!' });
    }
    req.category = category;
  });
  next();
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({ error: 'Category not saved' });
    }
    return res.json({ category });
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
    }
    return res.json({ categories });
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
    }
    return res.json({ updatedCategory });
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  Category.deleteOne({ _id: category._id }).exec((err, category) => {
    if (err) {
      return res.status(400).json({ error: 'Deletion failed!' });
    }
    return res.json({ msg: 'Deleted Successfully!' });
  });
};
