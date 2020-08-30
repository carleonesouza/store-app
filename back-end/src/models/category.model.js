const mongoose = require('mongoose');
const Product = require('./product.model');

const { Schema } = mongoose;

const categorySchema = new Schema({
 productId: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
 name: { type: String, required: true },
 createdAt: { type: Date, default: Date.now},
 updatedAt: { type: Date, default: Date.now }


},
{
  locale: { String },
},
{
  timestamps: true,
  collation: 'categories',

});

module.exports = mongoose.model('Category', categorySchema);