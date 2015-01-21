// Require mongoose and mongoose schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Require bcrypt for hashing passwords
var bcrypt = require('bcryptjs');

// Define user schema
var UserSchema = new Schema({

    // Name
    name : { 
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    contactNum: {type: Number, required: false},
    email: { type: String, required: true, unique: true },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    visits: {
        lastVisit:  {type: Date, required:false},
        allVisits: {type: Date, required:false}
    },
    // Address
    address : {       
        address1: {type:String, required:false},
        town: {type:String, required:false},
        province: {type:String, required:false},
        country: {type:String, required:false},
        pcd: {type:String, required:false}
    },
    shoppingHistory: {
        product : {type:String, required:false},
        date : {type: Date, required:false}
    },
    bonusPoints : {type: Number, required:false},
    referalLink : {type: String, required:false}
  });

// Create virtuals for passowrd
UserSchema
.virtual('password')
// Get function
.get(function () {
  return this._password;
})
// Hash password when saving
.set(function (password) {
  this._password = password;
  var salt = this.salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, salt);
});

// Password verification method
UserSchema.method('verifyPassword', function(password, callback) {
    
  // Compare given password with saved
  bcrypt.compare(password, this.hash, callback);
});


// User authentication method
UserSchema.static('authenticate', function(email, password, callback) {
    
  // Find a user in the database
  this.findOne({ email: email }, function(err, user) {
      if (err) { return callback(err); }
      
      // Return false if no user found
      if (!user) { return callback(null, false); }
      
      // Verify password if user found
      user.verifyPassword(password, function(err, passwordCorrect) {
        if (err) { return callback(err); }
        
        // Return false if incorrect password
        if (!passwordCorrect) { return callback(null, false); }
        
        // Return user if successful
        return callback(null, user);
      });
    });
});

// Export user model
module.exports = mongoose.model('User', UserSchema);