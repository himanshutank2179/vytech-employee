var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var app = express();

mongoose.connect(config.database, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('db connected.');
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var api = require('./app/routes/api')(app, express);

app.use('/api', api);


app.get('/hello-world', function (req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});


app.listen(config.port, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on post 3000");
    }
});