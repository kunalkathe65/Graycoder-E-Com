const { Order, ProductCart } = require('../models/Order');
const { json } = require('body-parser');

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: 'No Order Found!' });
      }
      req.order = order;
    });

  next();
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save().exec((err, order) => {
    if (err) {
      return res.status(400).json({ error: 'Order Creation Failed!' });
    }
    return res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate('user', '_id name')
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({ error: 'No orders found!' });
      }
      return res.json(order);
    });
};

exports.getOrderStatus = (req, res) => {
  return res.json(Order.schema.path('status').enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({ error: 'Status updation failed!' });
      }
      return res.json(order);
    }
  );
};
