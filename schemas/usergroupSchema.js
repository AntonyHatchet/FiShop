// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define category schema
var UserGroupSchema = new Schema({
    name: { type: String, required: true },
    users: [{ type: String, required: true }],
    permit: [{ type: String, required: true }]
});

// Export category model
module.exports = mongoose.model('UserGroup', UserGroupSchema);