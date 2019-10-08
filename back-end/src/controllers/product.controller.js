const Product = require('../models/product.model');
mongoose = require('mongoose').set('debug', true);

// To create a new Product
exports.create = async (req, res) => {
	const newProduct = new Product(req.body);
	const product = await newProduct
		.save()
		.then((data) => console.log(data))
		.catch((err) => {
			console.log(err)
		});
	res.status(201).send({ message: 'The product has been created successfully !', product });
};

// To list all products
exports.findAll = async (req, res) => {
	const products = await Product.find({});
	res.status(200).send(products);
};

// To find a product by id
exports.findById = async (req, res) => {
	const myProduct = await Product.findById({ _id: req.params.id });
	res.status(200).send(myProduct);
};

// To update a product by id
exports.update = async (req, res) => {
	// Validate empty fields
	if (!req.body.name || !req.body.price || !req.body.description) {
		return res.status(400).send({ message: 'The fields is empty, please, fill it!' });
	}
	const changeProduct = await Product.updateOne(req.body._id, req.body);
	return res.status(200).send({ message: 'The product has been updated successfully!', changeProduct });
};

// To delete a product by id
exports.delete = async (req, res) => {
	const deleteProduct = await Product.findByIdAndDelete(req.params._id);
	return res.status(200).send({ message: 'The product has deleted successfully!', deleteProduct });
};