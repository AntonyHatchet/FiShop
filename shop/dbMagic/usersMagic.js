/**
 * Created by enikshk on 19.01.2015.
 */
var User = require('../../schemas/userSchema');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userGroup = require('../../schemas/userGroupSchema');

// Passport methods
passport.use(new LocalStrategy({usernameField: 'email'},function(email, password, done) {User.authenticate(email, password, function(err, user) {return done(err, user)})}));
passport.serializeUser(function(user, done) {done(null, user.id)});
passport.deserializeUser(function(id, done) {User.findById(id, function (err, user) {done(err, user)})});



module.exports = {


// Save new user
saveUser: function(userInfo, callback) {

    // Build user object
    var newUser = new User ({
        name : {
            first: userInfo.fname,
            last: userInfo.lname
        },
        address : {
            address1: userInfo.address1,
            address2: userInfo.address2,
            town: userInfo.town,
            province: userInfo.province,
            pcd: userInfo.pcd,
            country : userInfo.country
        },
        contactNum : userInfo.contactNum,
        email: userInfo.email,
        password: userInfo.password
    });

    // Save into database
    newUser.save(function(err) {
        if (err) {throw err;}

        // Execute callback passed from route
        callback(null, newUser);


    });
},

updateUser: function (userId, data, param) {
    var key_value = {};
    key_value[data] = param;
    User.update ({_id: userId}, key_value, function(err){
        if (err) {throw err;}
    });
},

removeUser: function (userId) {
    User.remove ({_id: userId}, function(err){
        if (err) {throw err;}
    });
},

getAllUsersList: function (callback) {
    User.find({}, function (err, allUsersList) {
            if (err) {throw err;}
            callback(allUsersList);
        }
    )
},

getUsersListByRange: function (startFrom, limit, callback) {
    //TODO: Написать валидацию вводимых данных.
    User.find({}).skip(startFrom).limit(limit).exec(function (err, usersListRange) {
            if (err) {throw err;}
            callback(usersListRange);
        }
    )
},

saveUsersGroup: function (name, permitURL, callback) {
    var newUsersGroup = new userGroup ({
        name : name,
        permit: permitURL
    });
    // Save into database
    newUsersGroup.save(function(err) {
        if (err) {throw err;}
        // Execute callback passed from route
        callback(null, newUsersGroup);
    });
},

    updateUsersGroup: function (name, permit) {
        User.update ({name: name}, {permit : permit}, function(err){
            if (err) {throw err;}
        });
    },

    findUsersGroupByID: function (id, callback) {

        // Find product where _id matches given ID
        var query = userGroup.findOne({_id: id});
        query.exec(function (err, userGroup) {
            // Execute callback passed from route
            callback(userGroup);
        });
    }
};