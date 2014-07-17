
/**
 * Module dependencies.
 */

var express = require('express');
var images = require('./routes/images');
var logs = require('./routes/logs');
var files = require('./routes/files');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development';

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == env) {
    // configure stuff here
}

app.get('/upload/images', images.index);
app.get('/upload/logs', logs.index);
app.post('/api/file', files.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
