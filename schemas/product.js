// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define product schema
var ProductSchema = new Schema({
    
  name: { type: String, required: true },
  quantity: { type: Number},
  model: { type: String},
  category: { type: String},
  seo: { type: String},
  sku: { type: String},
  upc: { type: String},
  featured: { type: Boolean},
  date: { type: Date, default: Date.now },
  cost: { type: Number},

  details: {
    description: { type: String},
    attributes: [{ type: String}]
  },
  
  image: { type: String}

  
});

// Export product model
module.exports = mongoose.model('Product', ProductSchema);