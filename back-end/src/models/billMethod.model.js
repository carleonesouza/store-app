const mongoose = require('mongoose');

const { Schema } = mongoose;

const billSchema = new Schema({
  // vendorId: { type: Schema.Types.ObjectId, ref: 'Vendor' },
  payMethod: { type: String, required: true },
  billValue: { type: Number, required: true },

},
{
  locale: { String },
},
{
  timestamps: true,
  collation: 'bills',

});

module.exports = mongoose.model('Bills', billSchema);