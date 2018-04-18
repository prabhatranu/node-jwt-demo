let Driver = require('../config/db/mysql-config');

//function getContactById(values, callback) {
    //Save product
exports.createOrder = function (order, callback) {

    let sqlParam = {
        idorder: order.idorder,
        nooforder: order.nooforder
    }

    try {
        Driver.getConnection(function (connection) {
            console.log('Conneted')
            connection.query("insert into orderdetails SET ?", sqlParam, function (error, results, fields) {
                connection.end();
                if (error) {
                    console.log('Error: ' + JSON.stringify(error, null, 2));
                    callback(null, error);
                } else {
                    callback(results, fields);
                }
            });
        });
    } catch (error) {
        console.log('Exception: ' + JSON.stringify(error, null, 2));
        callback(null, error);
    }
}

exports.getOrder = function (callback) {
    try {
        Driver.getConnection(function (connection) {
            console.log('Database Connected');
            connection.query('select * from orderdetails', function (error, results, fields) {
                connection.end();
                if (error) {
                    console.log('Error', JSON.stringify(error, null, 2));
                } else {
                    callback(results, fields);
                }
            });
        });
    } catch (error) {
        console.log('Exception :', JSON.stringify(error, null, 2));
        callback(null, error)
    }
}


exports.getOrderByID = function (orderId, callback) {
    const id = orderId;
    try {
        Driver.getConnection(function (connection) {
            console.log('Database Connected');
            connection.query('select * from orderdetails where ordercol = ?', [id], function (error, results, fields) {
                connection.end();
                if (error) {
                    console.log('Error', JSON.stringify(error, null, 2));
                } else {
                    callback(results, fields);
                }
            });
        });
    } catch (error) {
        console.log('Exception :', JSON.stringify(error, null, 2));
        callback(null, error)
    }
}

exports.deleteOrderByID = function (orderId, callback) {
    const id = orderId;
    try {
        Driver.getConnection(function (connection) {
            console.log('Database Connected');
            connection.query('delete from orderdetails where ordercol = ?', [id], function (error, results, fields) {
                connection.end();
                if (error) {
                    console.log('Error', JSON.stringify(error, null, 2));
                } else {
                    callback(results, fields);
                }
            });
        });
    } catch (error) {
        console.log('Exception :', JSON.stringify(error, null, 2));
        callback(null, error)
    }
}