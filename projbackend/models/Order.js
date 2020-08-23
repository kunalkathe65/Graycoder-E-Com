const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new Schema({
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  name: String,
  price: Number,
  count: Number,
});

const ProductCart = mongoose.model('ProductCart', ProductCartSchema);

const OrderSchema = new Schema(
  {
    products: [ProductCartSchema], //because product will behave differently in cart
    transaction_id: {},
    amount: Number,
    status: {
      type: String,
      default: 'Received',
      enum: ['Received', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order, ProductCart };
