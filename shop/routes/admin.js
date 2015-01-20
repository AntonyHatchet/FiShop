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
                users: Users
            });
        })

    },
    getControlPanelLogin: function(req, res) {
        res.render('admin/login');
    },

    getControlPanelDashboard: function(req, res) {
        // Get categories for top nav
        // Render home page
        res.render('admin/dashboard', {});

        //dbUsersMagic.findUsersGroupByID(req.user.group, function(data){
        //    if (!data){
        //        dbUsersMagic.getAllUsersList(function(Users){
        //            res.render('admin/users', {
        //                users: Users
        //            });
        //        })
        //    }
        //    if (data.name == "administrators"){
        //        res.render('admin/dashboard', {});
        //    } else {
        //        dbUsersMagic.getAllUsersList(function(Users){
        //            res.render('admin/users', {
        //                users: Users
        //            });
        //        })
        //    }
        //});


    }
};