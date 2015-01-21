// Require routes
var account = require('./routes/account');
var main = require('./routes/main');
var modals = require('./routes/modals');
var product = require('./routes/product');
var cart = require('./routes/cart');
var category = require('./routes/category');
var checkout = require('./routes/checkout');
var controlPanel = require('./routes/admin');
var dbUsersMagic = require('./dbMagic/usersMagic.js');
var log = require('../lib/log')(module);

var dbShowcastMagic = require('./dbMagic/showcastMagic.js');

// Function to only allow acess if authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    // Redirect if not authenticated
    res.redirect('/modals/login');
}

  function isPermit(req, res, next){
      var ok = false;
      if (req.isAuthenticated()){
          dbUsersMagic.getUserGroup(req.user._id, function(group){
              group.permit.forEach(function(entry){
                  if (entry === req.url){
                      ok = true;
                  }
              });
              !ok ? res.redirect('/admin/login') : next();
          })
      } else res.redirect('/admin/login');
}

dbShowcastMagic.getShowcaseItem("test", function(){});



// Export routes
module.exports = function(a, p) {

    // Main routes
    a.get('/', main.getHome);
    a.get('/about', main.getAbout);
    a.get('/contact', main.getContact);

    // Control Panel routes
    a.get('/admin/users', isPermit, controlPanel.getControlPanelUsers);
    a.get('/admin/dashboard', isPermit, controlPanel.getControlPanelDashboard);
    a.get('/admin/login', controlPanel.getControlPanelLogin);
    
    // Modal routes
    a.get('/modals/register', modals.getRegister);
    a.get('/modals/login', modals.getLogin);
    a.get('/modals/terms', modals.getTerms);
    
    // Account routes
    a.get('/account/home', ensureAuthenticated, account.getAccount);
    a.post('/account/register', account.postRegister);
    a.get('/account/logout', account.getLogout);
    a.get('/account/registered', account.getRegistered);
    
    // Passport login function
    a.post('/account/login', function(req, res, next) {
        p.authenticate('local', function(err, user, info) {
            if (err){return next(err);} 
            
            // If failed return fail - needs improving
            if (!user) { return res.send({status:"fail"})} 
            
            // Log in user using passport's log in function
            req.logIn(user, function(err) { 
                if (err){return next(err);} 
                
                    // Redirect to homepage
                    return res.redirect('/');
                });
        })(req, res, next);
    });
    
    // Category
    a.get('/category/:seo', category.getBySEO);
    
    // Product
    a.get('/product/:seo', product.getBySEO);
    
    // Cart
    a.post('/cart/add/:id', cart.addProduct);
    a.post('/cart/rem/:id', cart.remProduct);
    
    // Checkout
    a.get('/checkout/cart', checkout.getCart);
    a.get('/checkout/guest', checkout.getGuest);
    a.post('/checkout/guest', checkout.postGuest);
    a.get('/checkout/order', checkout.getOrder);
    a.post('/checkout/order', checkout.postOrder);
    
};