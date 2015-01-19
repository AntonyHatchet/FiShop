/**
 * Created by Nick Shkolenko on 19.01.2015.
 */
var Product = require('../../schemas/productSchema');
var Category = require('../../schemas/categorySchema');

module.exports = {

    saveProduct: function (productInfo, callback) {
        var newProduct = new Product({
            //Параметры продукта должны содержаться в productInfo
            name: productInfo.name,
            quantity: productInfo.quantity,
            model: productInfo.model,
            category: productInfo.category,
            seo: productInfo.seo,
            sku: productInfo.sku,
            upc: productInfo.upc,
            featured: productInfo.featured,
            date: productInfo.date,
            cost: productInfo.cost,
            details: {
                description: productInfo.description,
                attributes: [productInfo.attributes]
            },
            image: productInfo.image
        });
        newProduct.save(function (err) {
            if (err) {throw err;}
            // Execute callback passed from route
            callback(null, newProduct);
        });
    },

    removeProduct: function (productId) {
        Product.remove ({_id: productId}, function(err){
            if (err) {throw err;}
        });
    },

// Get featured products
    getFeaturedProducts: function (callback) {
        // Find products where featured is true
        var query = Product.find({featured: true});
        query.exec(function (err, featuredProducts) {
            // Execute callback
            callback(null, featuredProducts);
        });
    },

// Get products in a category
    getCategoryProducts: function (category, callback) {
        // Find category for url
        var categoryQuery = Category.findOne({seo: category});
        // Execute query
        categoryQuery.exec(function (err, category) {
            // Callback with error if error
            if (err) return callback(err);
            // Check if category exists
            if (!category) {
                // Pass an error if not
                callback(new Error('Category not found!'));
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

// Find product for url
    findProductBySEO: function (seo, callback) {
        var query = Product.findOne({seo: seo});
        query.exec(function (err, product) {

            // Check if product exists
            if (!product) {

                // Pass an error if not
                callback(new Error('Product not found!'));

                // Continue if it does
            } else {

                // Execute callback
                callback(null, product);
            }
        });
    },

// Find product for ID
    findProductByID: function (id, callback) {

        // Find product where _id matches given ID
        var query = Product.findOne({_id: id});
        query.exec(function (err, product) {
            // Execute callback passed from route
            callback(null, product);
        });
    }
};