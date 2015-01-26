/**
 * Created by enikshk on 23.01.2015.
 */

var database = require('../shop/dbMagic/dbInit.js');
var log = require('../lib/log')(module);
config = require('../config/config.js')();


var dbProductMagic = require('../shop/dbMagic/productMagic');
var dbCategoryMagic = require('../shop/dbMagic/categoryMagic');
var dbShowcaseMagic = require('../shop/dbMagic/showcaseMagic');


database.startup(config.mongo.host+config.mongo.port+config.mongo.dbName);

//dbShowcaseMagic.removeItemFromShowcaseBlock("test", "5486fa595f03d2a240126a21", function (data){
//    console.log(data);
//});

//dbShowcaseMagic.removeItemFromShowcaseBlock("test", "54bd4bd2f2ca1d5a59cf9f49")
//dbShowcaseMagic.addItemToShowcaseBlock("test3", "54b80f2cf2ca1d5a59cf9f41");
database.closeDB();