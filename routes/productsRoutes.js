const express = require("express");
const router = express.Router();
const product = require("../models/products.js");


// add product
router.post("/", async(req, res) => {
  try {
    const { name, description, imageUrl, unitPrice } = req.body;
    console.log("Product details: " + req.body);
    const result = await product.create({
      name,
      description,
      imageUrl,
      unitPrice,
    });
    res.status(200).json({
      result,
      message: "Product insert successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Product insert error" });
  }
});

// get all products
router.get("/", async(req, res) => {
  try {
    const result = await product.find({});

    res.status(200).json({
      result,
      message: "All products fetched",
    });
  } catch (error) {
    res.status(500).json({ message: "Error while fetching products" });
  }
});

// get a single product
router.get("/:id", async(req, res) => {
  try {
    const { id } = req.params;
    
    const result = await product.findById(id);

      res.status(200).json({
        product: result,
        message: "Product fetched",
      });
    
  } catch (error) {
    res.status(500).json({ message: "Error while fetching product" });
  }
});

// update a product
router.put("/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const result = await product.findByIdAndUpdate(id, req.body);
    console.log(result);
    res.status(200).json({
      oldValue: result,
      newValue: req.body,
      message: "Updated"
    });
  } catch (error) {
    res.status(500).json({ message: "Error while updating product" });
  }
});

// delete a product
router.delete("/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const result = await product.findByIdAndDelete(id);

    res.status(200).json({
      result,
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting product" });
  }
});
module.exports = router;
