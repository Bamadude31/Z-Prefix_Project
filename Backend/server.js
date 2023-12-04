var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, function() {
  console.log("Listing on port: ", port);
})