var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + '/build'));
app.use('/build', express.static(__dirname + '/build'));

app.use(express.static(__dirname + '/node_modules'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

app.get('/', function(request, response) {
  response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

