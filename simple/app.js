/**
 * Created by robertpodwikamac on 13.02.15.
 */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var urlencode = require('urlencode');
var json = require('json-middleware').midl;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var bodyParser     =        require("body-parser");

mongoose.connect('mongodb://localhost/simple');

app.use(bodyParser.urlencoded({ extended: false }));

var Cat = mongoose.model('Cat', {
    name : String
});

app.get('/', function(req, res){
    res.send('hello world');
});

app.post('/cat', function(req, res){
    var cat_name = req.body.name;

    var kitty = new Cat({ name: cat_name});
    kitty.save(function (err){
        if(err) {
            res.send('Cat could not be added %s', err);
        }
    })
    res.send('Cat %s added', cat_name);
});

app.get('/cat', function(req, res){

    Cat.find(function (err, data){
        var output = '';
        data.forEach(function (el){
            if(el.name != undefined) {
                output += el.name + '<br>';
                console.log(el.name);
            }
        });
        res.send(output);
    });

});



var server = app.listen(5000, function (){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server is listening at http://%s:%s', host, port);
});