const Wallet = require('../models/wallet-day.model');
const Vendor = require('../models/vendor.model');
const moment = require('moment');


exports.createWallet = async (req, res) => {
  const localWallet = new Wallet(req.body);
  await localWallet
    .save()
    .then((wallet) => { return res.status(200).send(wallet) })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

exports.findAllWallets = async (req, res) => {
  const localWallet = await Wallet.find({})
  return res.status(200).send(localWallet);
}

exports.findAWallet = async (req, res) => {
  const localWallet = await Wallet.findOne({ _id: req.params.id })
  return res.status(200).send(localWallet);
}

exports.addAVendorAWallet = async (req, res) => {
  await Wallet.findOne({ _id: req.body.wallet._id }, (err, wallet) => {
    if (err) return err;
    wallet.vendors.push({
      amount: req.body.vendor.amount, total: req.body.vendor.total
      , productId: req.body.vendor.productId
    })
    wallet.save(err, data => {
      if (err) return err
      return res.status(200).send(data)
    });
  });
}

exports.addAVendorABill = async (req, res) => {
  await Wallet.findOne({ _id: req.body.wallet._id }, (err, wallet) => {
    if (err) return err;
    wallet.bills.push({
      vendorId: req.body.bill.vendorId, paymentMethod: req.body.bill.paymentMethod
      , billValue: req.body.bill.billValue
    })
    wallet.save(err, data => {
      if (err) return err
      return res.status(200).send(data)
    });
  });
}

exports.findAWalletByUserId = async (req, res) => {
  const localWallet = await Wallet.findOne({ userId: req.params.userId })
  return res.status(200).send(localWallet);
}

exports.findAWalletByDate = async (req, res) => {
  console.log(req);
  const localWallet = await Wallet.find({})
  return res.status(200).send(localWallet);
}


// To close/update a wallet by id
exports.closeAWallet = async (req, res) => {
  // Validate empty fields
  if (!req.body.createdAt || !req.body.userId || !req.body.closeAt) {
    res.status(400).send({ message: 'The fields is empty, please, fill it!' });
  }

  const closeWallet = await Wallet.updateOne({ _id: req.body._id },
    {
      $set: {
        status: false,
        finishValue: req.body.finishValue,
        closedAt: req.body.closeAt,
      },
    })
    .then((data) => data)
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  res.status(200).send(closeWallet);
};

