/**
 * Created by shtefan on 22.01.15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

// Define category schema
var ShowcaseBlockSchema = new Schema({
        name : {type: String, required: false},
        type: {type: String, required: true},
        visibility: {type: Boolean, required: false},
        items: [ {type: String, required: false}],
        sort : { type: String, required: false}
});

// Export category model
module.exports = mongoose.model('ShowcaseBlock', ShowcaseBlockSchema);