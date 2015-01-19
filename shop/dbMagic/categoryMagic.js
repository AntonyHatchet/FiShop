/**
 * Created by enikshk on 19.01.2015.
 */
var Category = require('../../schemas/categorySchema');

module.exports = {
// Get categories for top nav
    getTopCategories: function (callback) {
        var query = Category.find({topnav: true});
        query.exec(function (err, categories) {
            // Execute callback
            callback(null, categories);
        });
    },

    saveCategory: function (categoryInfo, callback){
        var newCategory = new Category({
            name: categoryInfo.name,
            seo: categoryInfo.seo,
            topnav: categoryInfo.topnav,
            image: categoryInfo.image,
            showcase: categoryInfo.showcase,
            showcasePosition: categoryInfo.showcasePosition
        })
    }
};