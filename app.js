var express = require('express');
var app = express();

app.get('/', function (req, res){
    res.send('some text')
});

app.listen(3000, function (){
    //app.emit("appStarted");
    console.log("Listening on port 3000.")
});