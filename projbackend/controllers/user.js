const User = require('../models/User');
const Order = require('../models/Order');

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'No user Found!' });
    }
    req.profile = user;
  });
  next();
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({ error: 'Update Unsuccessfull!' });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json({ user });
    }
  );
};

exports.getUserPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate('user', '_id name')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ err: 'No orders!' });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchase) => {
      if (err) {
        return res.status(400).json({ error: 'Product list not updated!' });
      }
      next();
    }
  );
};
