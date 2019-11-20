const Product = require('../models/product.model');

// To create a new Product
exports.createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  const product = await newProduct
    .save()
    .then(() => { console.log('Product Save Successfully!'); })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  res.status(201).send({ message: 'The product has been created successfully !', product });
};

// To list all products
exports.findAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).send(products);
};


// To find a product by id
exports.findByIdProduct = async (req, res) => {
  const myProduct = await Product.findById({ _id: req.params.id })
    .then((data) => data)
    .catch((err) => {
      res.status(400).json({ status: 400, message: 'is a not id valid', _id: req.params._id }).end();
    });
  res.status(200).send(myProduct);
};

// To update a product by id
exports.updateProduct = async (req, res) => {
  // Validate empty fields
  if (!req.body.name || !req.body.price || !req.body.description) {
    res.status(400).send({ message: 'The fields is empty, please, fill it!' });
  }
  const changeProduct = await Product.updateOne({ _id: req.body._id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        amount: req.body.amount,
      },
    })
    .then((data) => data)
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  res.status(200).send(changeProduct);
};

// To delete a product by id
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete({ _id: req.body._id })
    .then(() => {
      console.log('A Product was DELETE Successfully!');
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  res.status(200).send({message: 'A Product was DELETE Successfully!'});
};
