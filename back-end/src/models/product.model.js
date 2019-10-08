const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	// _id: mongoose.Types.ObjectId,
	name: {type: String, required: true},
	price: {type: Number, required: true},
	description: {type: String, required: true},
	amount: {type: Number},
	
},
{
	timestamps: true,
	collation:'products', locale: 'en_US' 
});

module.exports = mongoose.model('Product', productSchema);
