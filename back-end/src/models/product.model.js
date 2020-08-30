const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  // _id: mongoose.Types.ObjectId,
  categoryId: {type: String, required: true},
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  // quantity: { type: Number },
},
{
  locale: { String },
},
{
  timestamps: true,
  collation: 'products',

});

module.exports = mongoose.model('Product', productSchema);
