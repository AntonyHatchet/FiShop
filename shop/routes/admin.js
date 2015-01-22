/**
 * Created by shtefan on 16.01.15.
 */

var dbUsersMagic = require('../dbMagic/usersMagic.js');

module.exports = {

    // Get shop home page
    getControlPanelUsers: function(req, res) {
    // Render admin/users page
        dbUsersMagic.getAllUsersList(function(Users){
            res.render('admin/users', {
                users: Users,
                user: req.user
            });
        })

    },

    getControlPanelLogin: function(req, res) {
        res.render('admin/login');
    },

    getControlPanelDashboard: function(req, res) {
        res.render('admin/dashboard', {user: req.user});
    }
};