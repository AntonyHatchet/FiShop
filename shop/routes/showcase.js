var dbCategoryMagic = require('../dbMagic/categoryMagic');
var dbUsersMagic = require('../dbMagic/showcaseMagic.js');
var config = require('../../config/config.js')();
var passport = require('passport');
var log = require('../../lib/log')(module);

module.exports = {

    // Handle posted register form
    sortOrder: function(req, res) {
        // Save sortOrder in database
        dbUsersMagic.saveUser({
                sort : req.param('name.first')
            }, 
             
            function(err, newUser) {
                if (err) {log.error(err);}
                
                // Set user to user just saved
                req.user = newUser;
                
                // Log in new user with passport
                passport.authenticate('local')(req, res, function () {
                    
                    // Redirect new user to order page
                    res.redirect('/account/registered');
                
                });  
        });
    }
};