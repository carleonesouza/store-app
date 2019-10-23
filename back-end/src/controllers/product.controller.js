const Product = require('../models/product.model');
mongoose = require('mongoose').set('debug', true);

// To create a new Product
exports.create = async (req, res) => {
	const newProduct = new Product(req.body);
	const product = await newProduct
		.save()
		.then(()=> { console.log('Product Save Successfully!')})
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err
			})
		})
	res.status(201).send({ message: 'The product has been created successfully !', product });
};

// To list all products
exports.findAll = async (req, res) => {
	const products = await Product.find({});
	res.status(200).send(products);
  };


// To find a product by id
exports.findById = async (req, res) => {
	const myProduct = await Product.findById({ _id: req.params.id })
		.then((data)=> { return data })
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err
			})
		});
	res.status(200).send(myProduct);
};

// To update a product by id
exports.update = async (req, res) => {
	// Validate empty fields
	if (!req.body.name || !req.body.price || !req.body.description) {
		return res.status(400).send({ message: 'The fields is empty, please, fill it!' });
	}
	const changeProduct = await Product.updateOne({ _id: req.body._id },
		{ $set: { name: req.body.name, description: req.body.description, price: req.body.price, amount: req.body.amount } })
		.then((data)=> { return data })
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err
			})
		})
	res.status(200).send(changeProduct);
};

// To delete a product by id
exports.delete = async (req, res) => {
	console.log(req);
	const deleteProduct = await Product.findByIdAndDelete({ _id: req.body._id })
		.then(()=> { 
			console.log('A Product was DELETE Successfully!')})
		.catch((err) => {
			console.log(err)
			res.status(500).json({
				error: err
			})
		});
	res.status(200).send(deleteProduct);
};