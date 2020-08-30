const Category = require('../models/category.model');
const Vendor = require('../models/vendor.model');

// To create a new Category
exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  const createCategory = await category
    .save()
    .then(() => { console.log('Category Save Successfully!'); })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  res.status(201).send({ message: 'The category has been created successfully !', createCategory });
};


exports.findAllCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(200).send(categories);
};

// To list all Venders
exports.findAllBags = async (req, res) => {
  const venders = await BagVendors.find({});
  res.status(200).send(venders);
};

// To create a Vendor
exports.createVendor = async (req, res) => {
  const newVendor = new Vendor(req.body);
  const vendor = await newVendor
    .save()
    .then(() => { console.log('Vendors Save Successfully!'); })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  res.status(201).send({ message: 'The vendors has been created successfully !', vendor })
}

// To get a specific bunch of vendors of the bagVenders
exports.findAVendors = async (req, res) => {
  const venders = await Vendor.find({})
  res.status(200).send(venders);
}

exports.findVendorsByProduct = async (req, res) => {
  const vendors  = await Vendor.find({})
  .populate('productId')
  res.status(200).send(vendors);
}