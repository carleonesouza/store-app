const billMethod = require('../models/billMethod.model');

exports.createABill = async (req, res) => {
  const localBill = new billMethod(req.body);
  const bill = await localBill
    .save()
    .then(() => { console.log('billMenthod Save Successfully!'); })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  res.status(201).send({ message: 'The billMethod has been created successfully !', bill });
};

exports.findABill = async (req, res) => {
  const method = await billMethod.find({});
  res.status(200).send(method);
};
