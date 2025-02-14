const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const cart = mongoose.model('cart', cartSchema);

module.exports = cart;
