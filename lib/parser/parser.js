/**
 * Created by anton_gorshenin on 04.12.2014.
 */
var crawler = require('crawler');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//console.log(crawler);
var productParsedSchema = new Schema({
    name: { type: String, required: true },
    make: { type: String},
    model: { type: String},
    category: { type: String},
    seo: { type: String},
    sku: { type: String},
    upc: { type: String},
    featured: { type: Boolean},
    date: { type: Date, default: Date.now },

    pricing: {
        retail: { type: Number, required: true },
        sale: { type: Number},
        cost: { type: Number}
    },

    details: {
        description: { type: String},
        attributes: [{ type: String}]
    },

    image: [{ type: String}]
});

module.exports = mongoose.model('ParsedProduct', productParsedSchema);