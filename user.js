var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Blog';


module.exports = {
    signup: function(name, email, password){
        MongoClient.connect(url, function(err, database) {
            const dbase = database.db('Blog')
            dbase.collection('user').insertOne( {
                "name": name,
                "email": email,
                "password": password
            },function(err, result){
                assert.equal(err, null);
                console.log("Saved the user sign up details.");
            });
        });
    },

    validateSignIn: function(username, password,callback){
        MongoClient.connect(url, function(err, database) {
            const dbase = database.db('Blog')
            dbase.collection('user').findOne( { email : username ,password: password },function(err, result){
                if(result==null){
                    callback(false)
                }
                else{
                    callback(true)
                }
            });
        })

    },

    getUserInfo: function (username, callback) {
        MongoClient.connect(url, function (err, database) {
            const dbase = database.db('Blog')
            dbase.collection('user').findOne({email: username},
                function (err, result) {
                    if (result == null) {
                        callback(false)
                    } else {
                        callback(result);
                    }
                });
        })
    },

    updateProfile: function (name, password, username, callback) {
        MongoClient.connect(url, function (err, database) {
            const dbase = database.db('Blog')
            dbase.collection('user').updateOne(
                { "email": username },
                { $set:
                {   "name" : name,
                    "password" : password
                }
                },function(err, result){

                    if(err == null){
                        callback(true)
                    }
                    else{
                        callback(false)
                    }
                });

        })
    }
}