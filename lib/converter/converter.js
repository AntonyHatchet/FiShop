if(typeof require !== 'undefined') XLS = require('xlsjs');
var workbook = XLS.readFile('./lib/converter/toConvert/prod1.xls');
var Product = XLS.utils.sheet_to_row_object_array(workbook.Sheets[workbook.SheetNames]);
var mongoose = require('mongoose');
//console.log(Product[2],'parsed');




module.exports.Product = Product;


//console.log(parsed[0],'parsed');