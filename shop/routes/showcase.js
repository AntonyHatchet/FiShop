var dbShowcaseMagic = require('../dbMagic/showcaseMagic.js');
var log = require('../../lib/log')(module);

module.exports = {

    // Handle posted register form
    sortOrder: function(req, res) {
        dbShowcaseMagic.updateShowcaseBlockView(req.body);
    }
};