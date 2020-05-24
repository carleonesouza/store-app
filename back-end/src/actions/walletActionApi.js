const Wallet = require('../models/wallet-day.model');
const Vendor = require('../models/vendor.model');
const Bill = require('../models/billMethod.model');
const moment = require('moment');


exports.createWallet = async (req, res) => {
  await new Wallet(req.body)
    .save()
    .then((wallet) => { return res.status(201).send(wallet) })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

// To create a vendor
exports.createVendor = async (req, res) => {
  await new Vendor(req.body)
    .save()
    .then((vendor) => {
      Wallet.findOne({ _id: req.body.walletId },
        (err, wallet) => {
          if (err) return err;
          wallet.vendors.push(vendor)
          wallet.save();
        });
      return res.status(201).json({ message: 'Vendor Sucessfully Save' });
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
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

exports.getAWalletWithBills = async (req, res) => {
  await Wallet.find({ _id: '5e4e0a30927beb39773afa09' })
    .populate('bills')
    .exec((err, bills) => {
      console.log(bills)
      return res.status(200).send(bills);
    })

}

// To Save and add a vendorID on a current wallet
exports.addAVendorAWallet = async (req, res) => {
  await Wallet.findOne({ _id: req.body.walletId },
    (err, wallet) => {
      if (err) return err;
      new Vendor(req.body.vendor)
        .save()
        .then((vendor) => {
          wallet.vendors.push(vendor)
          wallet.save();
          return res.status(201).send(vendor)
        })
        .catch((err) => {
          return res.status(500).json({ message: err });
        });
    });
}
// To Save and Add a billMethod on a current wallet
exports.addABillAWallet = async (req, res) => {
  await Wallet.findOne({ _id: req.body.walletId },
    (err, wallet) => {
      if (err) return err;
      new Bill(req.body.bill)
        .save()
        .then((billSaved) => {
          wallet.bills.push(billSaved)
          wallet.save();
          return res.status(201).json({ message: 'The bill has been created successfully !' })
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    });
}

exports.findAWalletByUserId = async (req, res) => {
  const localWallet = await Wallet.findOne({ userId: req.params.userId })
  return res.status(200).send(localWallet);
}

exports.findAWalletByDate = async (req, res) => {
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

