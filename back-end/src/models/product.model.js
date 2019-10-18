const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	// _id: mongoose.Types.ObjectId,
	name: {type: String, required: true},
	price: {type: Number, required: true},
	description: {type: String, required: true},
	quantity: {type: Number}
	
},
{
	locale: {String}
 }
,
{
	timestamps: true,
	collation:'products'
	
});

module.exports = mongoose.model('Product', productSchema);
