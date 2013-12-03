/*global require, process*/
/**
 * Module dependencies.
 */
'use strict';

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var data = require('./core/InsiktenData');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);

//data.getPage(210);

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/page:id', function (req, res) {
    var id = parseInt(req.params.id.replace(':', ''), 10);
    data.getPage(id, function (doc) {
        res.send(doc);
    });
});

app.get('/all', function (req, res) {
    data.getBaseInfo(function (docs) {
        res.send(docs);
    });
});


//    var mainBody = "";
//    var properties = doc.Properties;
//    if (properties) {
//        for (var i=0; i < properties.length; i++) {
//            if (properties[i].Name === 'MainBody') {
//                mainBody = properties[i].Value;
//            }
//        }
//        res.send(mainBody);
//    } else
//        res.send("MainBody not found!");
//});


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});