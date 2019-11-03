const mongoose = require('mongoose');
const vender = require('./vender.model');
const billMethod = require('./billMethod.model');

const { Schema } = mongoose;
const venderSchema = new Schema({
  productId: { type: String, required: true },
  amount: { type: Number, required: true },
  total: { type: Number, required: true },

},
{
  locale: { String },
},
{
  timestamps: true,
  collation: 'venders',

});

const billMethodSchema = new Schema({
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

const bagVendersSchema = new Schema({
 venders: [venderSchema],
 billsMethod: [billMethodSchema ]


},
{
  locale: { String },
},
{
  timestamps: true,
  collation: 'bagVenders',

});

module.exports = mongoose.model('BagVenders', bagVendersSchema);