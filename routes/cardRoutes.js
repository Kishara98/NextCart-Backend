const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    try {
        res.status(200).json({message: 'Product added to the cart'})
    } catch (error) {
        res.status(500).json({message: 'Error while adding product to cart'})
    }
})

module.exports = router;