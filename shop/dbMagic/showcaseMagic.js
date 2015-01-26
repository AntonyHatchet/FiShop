/**
 * Created by shtefan on 22.01.15.
 */

var ShowcaseBlock = require('../../schemas/showcaseSchema');
var Category = require('../../schemas/categorySchema');
var log = require('../../lib/log')(module);

module.exports = {

    saveShowcaseBlock: function (name, type, visibility, callback){
        var newShowcase = new ShowcaseBlock({
            name: name,
            type : type,
            visibility : visibility
        });
        newShowcase.save(function(err) {
            if (err) {throw err;}
            callback(null, newShowcase);
        });
    },

    addItemToShowcaseBlock: function (name, itemId) {
        ShowcaseBlock.update ({name: name}, {$push: {items : itemId}}, function(err){
            if (err) {throw err;}
        });
    },

    removeItemFromShowcaseBlock: function (name, itemId) {
        ShowcaseBlock.update ({name: name}, {items : {$pull: {itemId : itemId}}}, function(err){
            if (err) {throw err;}
        });
    },

    getShowcase: function (callback) {
        var query = ShowcaseBlock.find({visibility: true});
        query.exec(function (err, showcaseBlocks) {
            if (err) return callback(err);
            if (!showcaseBlocks) {
                callback(new Error('Showcase Items not found!'));
            } else {

                var showcaseItems = [];
                for (var i = 0; i < showcaseBlocks.length; i++){
                    for (s = 0; s < showcaseBlocks[i].items.length; s++){
                        showcaseItems.push(showcaseBlocks[i].items[s]);
                    }
                }
                Category.find({'_id': { $in: showcaseItems}}, function(err, showcaseItems){
                    callback(showcaseItems);
                });
            }
        });
    },


    updateShowcaseBlockView : function(data){
        ShowcaseBlock.Update({name: "test"}, {$push: {items : {item : itemId}}}, function(err){
            if (err) {throw err;}
        });
    }

};