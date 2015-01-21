/**
 * Created by shtefan on 22.01.15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define category schema
var ShowcaseSchema = new Schema({
        name : {type: String, required: false},
        category : [{
            item : {type : String, required: false}
        }]
});

// Export category model
module.exports = mongoose.model('Showcase', ShowcaseSchema);