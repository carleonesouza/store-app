const mongoose = require('mongoose');

const { Schema } = mongoose;

const billMethodSchema = new Schema({
  paymentMethod: { type: String, required: true },
  billValue: { type: Number, required: true },
  vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },

},
{
  locale: { String },
},
{
  timestamps: true,
  collation: 'billMethods',

});

module.exports = mongoose.model('BillMethod', billMethodSchema);