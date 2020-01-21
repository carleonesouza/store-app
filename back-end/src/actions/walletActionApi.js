const Wallet = require('../models/wallet-day.model');


exports.createWallet = async (req, res) => {
      const localWallet = new Wallet(req.body);
      await localWallet
      .save()
      .then((wallet)=> { return res.status().send(wallet)})
      .catch((err) => {
        res.status(500).json({error: err });
      });
}

exports.findAllWallets = async (req, res) => {
    const localWallet = await Wallet.find({})
    return res.status().send(localWallet);
}

exports.findAWallet = async (req, res) => {
    const localWallet = await Wallet.findOne({createdAt: req.body.createdAt})
    return res.status().send(localWallet);
}
