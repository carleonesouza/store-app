const mongoose = require('mongoose');
const Category = require('../models/category.model');

const { Schema } = mongoose;

const productSchema = new Schema({
  // _id: mongoose.Types.ObjectId,
  category: {type: Schema.Types.ObjectId, ref: 'Category'},
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
