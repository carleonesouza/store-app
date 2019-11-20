const mongoose = require('mongoose');

const { Schema } = mongoose;

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

module.exports = mongoose.model('Vendor', vendorSchema);