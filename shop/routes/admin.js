/**
 * Created by shtefan on 16.01.15.
 */

var dbUsersMagic = require('../dbMagic/usersMagic.js');

module.exports = {

    // Get shop home page
    getControlPanelUsers: function(req, res) {
        // Get categories for top nav
                // Render home page
        dbUsersMagic.getAllUsersList(function(Users){
            res.render('admin/users', {
                users: Users
            });
        })

    }
};