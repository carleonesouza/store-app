const BagVendors = require('../models/bag-vendors.model');
const Vendor = require('../models/vendor.model');

// To create a new Bag
exports.createBag = async (req, res) => {
  const newBag = new BagVendors(req.body);
  const bag = await newBag
    .save()
    .then(() => { console.log('Bag Save Successfully!'); })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  res.status(201).send({ message: 'The bags has been created successfully !', bag });
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