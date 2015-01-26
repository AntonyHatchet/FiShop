// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define product schema
var ProductSchema = new Schema({

  isActive: { type: Boolean},
  name: { type: String, required: true },
  quantity: { type: Number},
  model: { type: String},
  category: [{ type: String}],
  seo: { type: String},
  sku: { type: String},
  upc: { type: String},
  date: { type: Date, default: Date.now },
  cost: { type: Number},
  preOrder: { type: Boolean},
  details: {
    description: { type: String},
    attributes: [{ type: String}]
  },
  image: {
    main: {type: String},
    gallery: [{type: String}]
    },
  showcase : {
        showcaseID : {type: String, required: true},
        size: {type: String, required: false},
        image: {type: String, required: false},
        position: {type: String, required: false},
        tabindex: {type: Number, required: true}
    }
  
});

// Export product model
module.exports = mongoose.model('Product', ProductSchema);