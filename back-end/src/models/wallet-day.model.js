const mongoose = require('mongoose');

const { Schema } = mongoose;

const billMethodSchema = new Schema({
  vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
  paymentMethod: { type: String, required: true },
  billValue: { type: Number, required: true },

},
{
  locale: { String },
},
{
  timestamps: true,
  collation: 'billMethods',

});

const vendorSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product'},
  amount: { type: Number, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now},

},
{
  locale: { String },
},
{
  timestamps: true,
  collation: 'vendors',

});


const walletSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User'},
  bills: [billMethodSchema],
  vendors: [vendorSchema],
  openValue: { type: Number },
  status: { type: Boolean, default: false },
  finishValue: { type: Number },
  createdAt: { type: Date, default: Date.now},
  closeAt: { type: Date},

},
{
  locale: { String },
},
{
  timestamps: true,
  collation: 'wallets',

});

module.exports = mongoose.model('Wallet', walletSchema);
