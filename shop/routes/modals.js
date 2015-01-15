var db = require('../dbMagic/data');
var config = require('../../config/config.js')();

module.exports = {

    // Get login modal
    getLogin: function(req, res) {
        res.render('modals/login');
    },

    // Get register modal
    getRegister: function(req, res) {
        res.render('modals/register');
    },
        
    // Get terms and conditions modal
    getTerms: function(req, res) {
        res.render('modals/terms');
    }
};