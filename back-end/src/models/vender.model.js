const mongoose = require('mongoose');

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

module.exports = mongoose.model('Vender', venderSchema);