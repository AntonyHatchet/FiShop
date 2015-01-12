/**
 * Created by Nick Shkolenko on 29.12.2014.
 */

var config = {
    local: {
        mode: 'local',
        port: 3000,
        mongo: {
            host: 'mongodb://178.62.237.81:',
            port: 27017,
            dbName: '/Shop',
            cookie_secret : "session secret"
        },
        store : {
            name : "FiShop",
            tagline : "A Node.JS and Express powered E-Commerce System",
            owner : "Billy Topley"
        }
    },



    staging: {
        mode: 'staging',
        port: 4000,
        mongo: {
            host: 'mongodb://178.62.237.81:',
            port: 27017,
            dbName: '/Shop',
            cookie_secret: "session secret"
        },
        store: {
            name: "FiShop",
            tagline: "A Node.JS and Express powered E-Commerce System",
            owner: "Billy Topley"
        }
    },

    production: {
        mode: 'production',
        port: 5000,
        mongo: {
            host: 'mongodb://178.62.237.81:',
            port: 27017,
            dbName: '/Shop',
            cookie_secret : "session secret"
        },
        store : {
            name : "FiShop",
            tagline : "A Node.JS and Express powered E-Commerce System",
            owner : "Billy Topley"
        }
    }
};


module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
};