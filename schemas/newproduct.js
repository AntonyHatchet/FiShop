/**
 * Created by anton_gorshenin on 11.12.2014.
 */

// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var parsedProduct = require('../lib/converter/converter');

console.log(parsedProduct.Product,'jsonparsed2');

//var json = parsedProduct.Product,
   // obj = JSON && JSON.parse(json) || $.parseJSON(json);

//console.log(obj.name,'jsonparsed3');

module.exports = {

 toBase: function(){
     for (i in parsedProduct.Product){

     }
 }
};

var NewProductSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number},
    category: { type: String},
    seo: { type: String},

    featured: { type: Boolean},
    date: { type: Date, default: Date.now },
    cost: { type: String},

    details: {
        description: { type: String},
        attributes: [{ type: String}]
    },

    image: { type: String}

});

module.exports = mongoose.model('NewProduct', NewProductSchema);