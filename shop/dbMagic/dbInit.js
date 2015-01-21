// Require needed modules
var mongoose = require('mongoose');
// Require logging models
var log = require('../../lib/log')(module);
// Export functions
module.exports = {

    // Connect to database
    startup: function(dbToUse) {
        
        // Connect mongoose and select db
        mongoose.connect(dbToUse);
        
        // Add listener for opened connection
        mongoose.connection.on('open', function() {
            log.info('Connected to database!',dbToUse);
        });
    },

    // Close DB connection
    closeDB: function() {
        mongoose.disconnect(log.info('connect closed'));
    }
};