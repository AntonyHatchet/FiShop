/**
 * Created by shtefan on 16.01.15.
 */

var dbUsersMagic = require('../dbMagic/usersMagic.js');
var dbProductMagic = require('../dbMagic/productMagic');
var dbCategoryMagic = require('../dbMagic/categoryMagic');

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
    },
    getControlPanelHomeConstructor: function(req, res) {
        dbCategoryMagic.getTopCategories(function(err, categories) {
            if (err) {console.log(err)}

            // Get featured products
            dbProductMagic.getFeaturedProducts(function(err, featured) {
                if (err) {console.log(err)}

                // Render home page
                res.render('admin/homeConstructor', {
                    store: config.store.name,
                    title: config.store.tagline,
                    logged: req.isAuthenticated(),
                    user: req.user,
                    cart: req.session.cart,
                    categories: categories,
                    featured: featured
                });
            });
        });
    },
    getControlPanelcategoryConstructor: function(req, res) {
        res.render('admin/categoryConstructor', {user: req.user});
    },
    getControlPanelproductConstructor: function(req, res) {
        res.render('admin/productConstructor', {user: req.user});
    }
};