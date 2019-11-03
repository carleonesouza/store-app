const mongoose = require('mongoose');

const { Schema } = mongoose;

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

module.exports = mongoose.model('BillMethods', billMethodSchema);