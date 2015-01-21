/**
 * Created by enikshk on 21.01.2015.
 */
var winston = require('winston');
var config = require('../config/config')();


function getLogger(module) {
    var path = module.filename.split('/').slice(-2).join('/'); //отобразим метку с именем файла, который выводит сообщение

    return new winston.Logger({
        transports : [
            new winston.transports.Console({
                timestamp: true,
                colorize:   true,
                level:      config.logLevel,
                label:      path,
                prettyPrint: true
            })
        ]
    });
}

module.exports = getLogger;