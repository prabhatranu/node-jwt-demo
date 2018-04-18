const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/order');
const userRoutes = require('./api/routes/userRoutes');

var con = mysql.createConnection({
        multipleStatements: true,
        connectionLimit: 10,
        host: 'localhost',
        port: '3306',
        database: 'test',
        user: 'root',
        password: ''
   
});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Use of cors

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DLETE, GET');
        return res.status(200).json({});
    }
    next();
})


app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/user', userRoutes);


app.use((req, res, next) => {
    const error = new Error('URL Not Found');
    error.status = 404;
    next(error)
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            status: error.status,
        }
    })
})

module.exports = app;