/*global console, require*/
var MongoClient = require('mongodb').MongoClient;

exports.getPage = function(pageId, callback) {
    MongoClient.connect('mongodb://127.0.0.1:27017/insikten', function(err, db) {

        if (err) {
            throw err;
        }

        var collection = db.collection('pages');

        collection.findOne({ Id: pageId }, function(dataError, doc) {
            if (dataError) {
                throw dataError;
            }
            callback(doc);
        });
    });
};