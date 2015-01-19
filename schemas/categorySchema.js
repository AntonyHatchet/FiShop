// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define category schema
var CategorySchema = new Schema({
    
    name: { type: String, required: true },
    seo: { type: String, required: true },
    topnav: { type: Boolean, required: false, default: true },
    image: { type: String},
    showcase:{type: String, default: ""},
    showcasePosition:{type: String, default: ""}
    });
  
// Export category model
module.exports = mongoose.model('Category', CategorySchema);