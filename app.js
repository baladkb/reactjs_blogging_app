var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var user = require('./user')

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname,"/html")));

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
})


app.post('/signup', function (req, res) {
    user.signup('','','')
})

app.post('/signin', function (req, res) {
    var user_name=req.body.email;
    var password=req.body.password;
    if(user_name=='admin' && password=='admin'){
        res.send('success');
    }
    else{
        res.send('Failure');
    }
})

