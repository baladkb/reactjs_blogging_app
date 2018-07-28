var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var user = require('./user')
var post = require('./post')

var session = require('express-session');

app.use(bodyParser.json());

app.use(session({secret: 'my-secret'}));
var sessions

app.use(express.static(path.join(__dirname,"/html")));

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
})


app.post('/signup', function (req, res) {
    var name=req.body.name;
    var email=req.body.email;
    var password=req.body.password;

    if(name && email && password){
        user.signup(name, email, password)
    }
    else{
        res.send('Failure');
    }
})

app.post('/signin', function (req, res) {
    sessions=req.session;
    var user_name=req.body.email;
    var password=req.body.password;
    user.validateSignIn(user_name,password,function(result){
        if(result){
            sessions.username = user_name;
            res.send('success')
        }
        else{
            res.send('Wrong username password')
        }
    });

})

app.get('/home', function(req, res){
    if(sessions && sessions.username){
        res.sendFile(__dirname + '/html/home.html');
    }
    else{
        res.send('unauthorized');
    }
})

app.post('/addPost', function(req, res){
    var title = req.body.title;
    var subject = req.body.subject;
    var id = req.body.id;
    if(id == '' || id == undefined){
        post.addPost(title, subject ,function(result){
            res.send(result);
        });
    }else{
        post.updatePost(id, title, subject ,function(result){
            res.send(result);
        });
    }


})

app.post('/getpost',function(req,res){
    post.getPost(function(result){
        res.send(result);
    });
})

app.post('/getPostWithId', function(req,res){
    var id = req.body.id;
    post.getPostWithId(id, function(result){
        res.send(result);
    })
})

app.post('/deletePost', function(req,res){
    var id = req.body.id;
    post.deletePost(id, function(result){
        res.send(result)
    })
})

app.post('/getProfile',function(req, res){
    user.getUserInfo(sessions.username, function(result){
        res.send(result)
    })
})

app.post('/updateProfile',function(req, res){
    var name = req.body.name;
    var password = req.body.password;

    user.updateProfile(name, password, sessions.username, function(result){
        res.send(result);
    })
})