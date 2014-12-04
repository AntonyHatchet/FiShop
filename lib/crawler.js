/**
 * Created by anton_gorshenin on 03.12.2014.
 */
var Crawler = require("crawler");
var url = require('url');

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        //$ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        $('a').each(function(index, a) {
            var toQueueUrl = $(a).attr('href');
            c.queue(toQueueUrl);
        });
    }
});

c.queue([{
    uri: 'http://gifts.ru/id/51723',
    jQuery: false,

    // The global callback won't be called
    callback: function (error, result) {
        console.log(result.body);
    }
}]);

module.exports.crawler = new c.queue;