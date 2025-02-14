const express = require('express');
const router = express.Router();
const cart = require('../models/carts.js');

router.post('/', async (req, res) => {
  try {
    const { name, quantity, unitPrice } = req.body;
    const result = await cart.create({ name, quantity, unitPrice });
    res.status(200).json({
      result,
      message: 'Product added to the cart',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error while adding item to cart' });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await cart.find();
    res.status(200).json({
      result,
      message: 'All products fetched',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching cart' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, unitPrice } = req.body;
    const result = await cart.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      oldValue: result,
      newValue: req.body,
      message: 'Updated',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error while updating cart item' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cart.findByIdAndDelete(id);
    res.status(200).json({
      result,
      message: 'Deleted',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error while deleting cart item' });
  }
});

module.exports = router;
