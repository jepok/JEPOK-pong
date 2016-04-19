// include modules
var    express = require('express'),
    app = express(),
    path = require('path');


// serve static content
app.use(express.static(path.join(__dirname, 'public')));

// setup server
var server = app.listen(3000);
