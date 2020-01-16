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

module.exports = mongoose.model('BillMethod', billMethodSchema);