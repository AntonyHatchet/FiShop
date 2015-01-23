// Require needed modules
var dbProductMagic = require('../dbMagic/productMagic');
var dbCategoryMagic = require('../dbMagic/categoryMagic');
var dbShowcaseMagic = require('../dbMagic/showcaseMagic');
var log = require('../../lib/log')(module);
config = require('../../config/config.js')();

// Export functions
module.exports = {

    // Get shop home page
    getHome: function(req, res) {
// Get categories for top nav
        dbCategoryMagic.getTopCategories(function(err, categories) {
            if (err) {console.log(err)}
// Get featured products
            dbProductMagic.getFeaturedProducts(function(err, featured) {
                if (err) {console.log(err)}
// Render home page
                dbShowcaseMagic.getShowcase(function(showcase){
                    res.render('main/home', {
                        store: config.store.name,
                        title: config.store.tagline,
                        logged: req.isAuthenticated(),
                        user: req.user,
                        cart: req.session.cart,
                        categories: categories,
                        featured: featured,
                        showcase : showcase
                    });
                });
            });
        });
    },

    // Get about page
    getAbout: function(req, res) {
        
        // Get categories for top nav
        dbCategoryMagic.getTopCategories(function(err, categories) {
            if (err) {console.log(err)}
            
            // Render contact page
            res.render('main/about', {
                store: config.store.name,
                title: 'About',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
                categories: categories
            });
        });
    },
    
    // Get contact page
    getContact: function(req, res) {
        
        // Get categories for top nav
        dbCategoryMagic.getTopCategories(function(err, categories) {
            if (err) {console.log(err)}
            
            // Render contact page
            res.render('main/contact', {
                store: config.store.name,
                title: 'Contact',
                logged: req.isAuthenticated(),
                user: req.user,
                cart: req.session.cart,
                categories: categories
            });
        });
    }
};