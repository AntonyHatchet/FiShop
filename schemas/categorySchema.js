// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define category schema
var CategorySchema = new Schema({

    isActive: { type: Boolean, required: false, default: true },
    name: { type: String, required: true },
    seo: { type: String, required: true },
    image: { type: String},
    showcase : {
        showcaseID : {type: String, required: true},
        size: {type: String, required: false},
        image: {type: String, required: false},
        position: {type: String, required: false},
        tabindex: {type: Number, required: true}
    }

});
  
// Export category model
module.exports = mongoose.model('Category', CategorySchema);