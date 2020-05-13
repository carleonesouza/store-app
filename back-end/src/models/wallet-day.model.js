const mongoose = require('mongoose');

const { Schema } = mongoose;


const walletSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User'},
  bills: [{type: Schema.Types.ObjectId, ref:'Bills'}],
  vendors: [{type: Schema.Types.ObjectId, ref: 'Vendors'}],
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
