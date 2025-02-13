const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  try {
    const { name, description, imageUrl, unitPrice } = req.body;
    console.log('Product details: ' + req.body);
    res.status(200).json({
      details: {
        name,
        description,
        imageUrl,
        unitPrice,
      },
      message: 'Product insert successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Product insert error' });
  }
});

router.get('/', (req, res) => {
  try {
    const dummyProduct = {
      name: 'dummy products',
      description: 'dummy description',
      imageUrl: 'www.google.com',
      unitPrice: 25,
    };
    res.status(200).json({
      product: [dummyProduct],
      message: 'All products fetched',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error while fetching products' });
  }
});


router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const dummyProduct = {
      id: '1234',
      name: 'dummy products',
      description: 'dummy description',
      imageUrl: 'www.google.com',
      unitPrice: 25,
    };
  if (dummyProduct.id == id) {
    res.status(200).json({
      product: [dummyProduct],
      message: 'Product fetched',
    });
  } else {
    res.status(200).json({
      message: 'No product',
    });
  }
  } catch (error) {
    res.status(500).json({message: 'Error while fetching product'})
  }
})

router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({
      message: 'Updated',
    });
  } catch (error) {
    res.status(500).json({message: 'Error while updating product'})
  }
})

router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    res.status(200).json({
      message: 'Deleted',
    });
  } catch (error) {
    res.status(500).json({message: 'Error while deleting product'})
  }
})
module.exports = router;
