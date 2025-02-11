const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { name, description, imageUrl, unitPrice } = req.body;
    console.log("Product details: " + req.body);
    res.status(200).json({
      details: {
        name,
        description,
        imageUrl,
        unitPrice,
      },
      message: "Product insert successfully",
    });
  } catch (error) {
    res.status(200).json({ message: "Product insert error" });
  }
});

module.exports = router;
