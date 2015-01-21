/**
 * Created by shtefan on 22.01.15.
 */

/**
 * Created by enikshk on 19.01.2015.
 */
var Showcase = require('../../schemas/showcaseSchema');
var Category = require('../../schemas/categorySchema');
var log = require('../../lib/log')(module);

module.exports = {

// Get categories for top nav
    getShowcase: function (name, callback) {
        var query = Showcase.find({name: name});
        query.exec(function (err, showcase) {
            // Execute callback
            callback(null, showcase);
        });
    },

    saveShowcase: function (name, callback){
        var newShowcase = new Showcase({
            name: name
        });
        newShowcase.save(function(err) {
            if (err) {throw err;}
            callback(null, newShowcase);
        });
    },

    updateShowcase: function (name, itemId) {
        Showcase.update ({name: name}, {$push:{category :{item : itemId}}}, function(err){
            if (err) {throw err;}
        });
    },

    getShowcaseItem: function (showcaseName, callback) {
        // Find category for url
        var query = Showcase.find({name: showcaseName});
        query.exec(function (err, showcaseItems) {
            // Callback with error if error
            if (err) return callback(err);
            // Check if category exists
            if (!showcaseItems) {
                // Pass an error if not
                callback(new Error('Showcase Items not found!'));
                // Continue if it does
            } else {
                // Find products in given category
                var productQuery = Product.find({category: category.name});
                productQuery.exec(function (err, categoryProducts) {
                    // Execute callback passed from route
                    callback(err, categoryProducts, category.name);
                });
            }
        });
    },


    removeShowcase: function (categoryId) {
        Showcase.remove ({_id: categoryId}, function(err){
            if (err) {throw err;}
        });
    }
};