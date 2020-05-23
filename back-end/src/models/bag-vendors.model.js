const mongoose = require('mongoose');
const vendor = require('./vendor.model');
const billMethod = require('./billMethod.model');

const { Schema } = mongoose;

const bagVendersSchema = new Schema({
 vendor: [{ type: Schema.Types.ObjectId, ref: 'Vendor' }],
 billsMethod: [{type: Schema.Types.ObjectId, ref: 'BillMethod'}],
 createdAt: { type: Date, default: Date.now},
 updatedAt: { type: Date, default: Date.now }


},
{
  locale: { String },
},
{
  timestamps: true,
  collation: 'bagVendors',

});

module.exports = mongoose.model('BagVendors', bagVendersSchema);