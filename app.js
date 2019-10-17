require('dotenv').config();

var express = require('express');
var app = express();

app.get('/', function (req, res){
    res.send('some text')
});

app.listen(process.env.PORT, function (){
    //app.emit("appStarted");
    console.log("Listening on port " + process.env.PORT)
});