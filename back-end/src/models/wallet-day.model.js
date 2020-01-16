const mongoose = require('mongoose');

const { Schema } = mongoose;

const walletSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User'},
  billId: { type: Schema.Types.ObjectId, ref: 'BillMethod'},
  vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor'},
  createdAt: { type: Date, default: Date.now},
  closedAt: { type: Date}

},
{
  locale: { String },
},
{
  timestamps: true,
  collation: 'wallets',

});

module.exports = mongoose.model('Wallet', walletSchema);