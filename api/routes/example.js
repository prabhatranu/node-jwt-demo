

var express = require('express');
var mysql = require('mysql');
var app = express();

app.get('/getMessage', function (req, res) {


    var con = mysql.createConnection({
        
            multipleStatements: true,
            connectionLimit: 10,
            host: 'localhost',
            port: '3306',
            database: 'test',
            user: 'root',
            password: ''
        
        
    });


    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        con.query("SELECT * FROM product", function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });


});

var server = app.listen(5000, function () {
    console.log('Express server listening on port ');
});