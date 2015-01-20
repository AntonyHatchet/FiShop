/**
 * Created by enikshk on 20.01.2015.
 */
// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define category schema
var OrderSchema = new Schema({

});

// Export category model
module.exports = mongoose.model('Order', OrderSchema);