var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  quantity: String,
  costPrice: String,
  sellingPrice: String
});

var Product = mongoose.model("product", productSchema);

/* GET home page. */
router.get("/product", function(req, res, next) {
  Product.findOne({ productName: req.query.name })
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      res.status(400).send("unable to find to database");
    });
});

router.get("/search", function(req, res, next) {
  var regEx = new RegExp(req.query.name, "i");
  Product.find({ productName: regEx }, "productName")
    .exec()
    .then(item => {
      res.send(item);
    })
    .catch(err => {
      res.status(400).send("unable to search to database");
    });
});

router.post("/product", (req, res) => {
  var newProduct = new Product({
    productId: req.body.productId,
    productName: req.body.productName,
    quantity: req.body.quantity,
    costPrice: req.body.costPrice,
    sellingPrice: req.body.sellingPrice
  });
  newProduct
    .save()
    .then(item => {
      res.status(200).send({
        data: item,
        message: "Product saved!",
        status: "Success"
      });
    })
    .catch(err => {
      res.status(400).send({
        err: err,
        message: "Adding Product failed!",
        status: "Fail"
      });
    });
});

router.put("/product", (req, res) => {
  const filter = {
    _id: req.body._id
  };
  const update = {
    productName: req.body.productName,
    sellingPrice: req.body.sellingPrice
  };

  Product.findOneAndUpdate(filter, update)
    .then(item => {
      res.status(200).send({
        data: item,
        message: "Product updated!",
        status: "Success"
      });
    })
    .catch(err => {
      res.status(400).send({
        err: err,
        message: "Product update failed!",
        status: "Fail"
      });
    });
});

module.exports = router;
