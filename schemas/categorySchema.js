// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define category schema
var CategorySchema = new Schema({
    
    name: { type: String, required: true },
    seo: { type: String, required: true },
    topnav: { type: Boolean, required: false, default: true },
    image: { type: String},
    showcase: {
        isShown:  {type: Boolean, required:true, default: false},
        size: {type: String, required:false},
        position: {type: String, required:false}
    }
});
  
// Export category model
module.exports = mongoose.model('Category', CategorySchema);