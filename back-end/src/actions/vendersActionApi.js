const BagVenders = require('../models/bag-venders.model');

// To create a new Bag
exports.createBag = async (req, res) => {
  const newBag = new BagVenders(req.body);
  const bag = await newBag
    .save()
    .then(() => { console.log('Venders Save Successfully!'); })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
  res.status(201).send({ message: 'The venders has been created successfully !', bag });
};

// To list all Venders
exports.findAllBags = async (req, res) => {
  const venders = await BagVenders.find({});
  res.status(200).send(venders);
};
