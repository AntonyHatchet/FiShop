/**
 * Created by anton_gorshenin on 03.12.2014.
 */
var Crawler = require("crawler");
var url = require('url');
var cheerio = require('cheerio');

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {

        var page = result.body;
        var pResult = page.find('.end_user_price > span');


        //$ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        $('a').each(function(index, a) {
           // var toQueueUrl = $(a).attr('href');
           // c.queue(toQueueUrl);
             //console.log(a.href);
            c.queue(a.href);
        });
    }
});

c.queue('http://gifts.ru/id/31911');

//module.exports.crawler = new c.queue;