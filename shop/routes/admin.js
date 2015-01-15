/**
 * Created by shtefan on 16.01.15.
 */

var db = require('../dbMagic/data.js'),
config = require('../../config/config.js')();

module.exports = {

    // Get shop home page
    getControlPanelUsers: function(req, res) {
        // Get categories for top nav
                // Render home page
                res.render('admin/users', {
                });
    }
};