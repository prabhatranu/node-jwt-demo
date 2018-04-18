let Driver = require('../config/db/mysql-config');

//function getContactById(values, callback) {
    //Save product
exports.createProduct = function (values, callback) {

    let sqlParam = {
        name: values.name,
        price: values.price
    }
    try {
        Driver.getConnection(function (connection) {
            console.log('Conneted')
            connection.query("insert into product SET ?", sqlParam, function (error, results, fields) {
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

// get product by id
exports.getProductBYId = function (productId, callback) {
    const id = productId;
    try {
        Driver.getConnection(function (connection) {
            console.log('connection successfull');
            connection.query('select * from product where id=?', [id], function (error, results, fields) {
                connection.end();
                if (error) {
                    console.log('Error', JSON.stringify(error, null, 2));
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

//Get All Product
exports.getProduct = function (callback) {
    try {
        Driver.getConnection(function (connection) {
            console.log('Database Connected');
            connection.query('select * from product', function (error, results, fields) {
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

exports.deleteProductById = function (productId, callback) {
    const id = productId;

    try {
        Driver.getConnection(function (connection) {
            console.log('Database connected successfully');
            connection.query('delete FROM product where idproduct=?', [id], function (error, results, fields) {
                connection.end();
                if (error) {
                    console.log('Error', JSON.stringify(error, null, 2));
                } else {
                    console.log('result is', results)
                    callback(results, fields);
                }
            });
        });
    } catch (error) {
        console.log('Exception: ' + JSON.stringify(error, null, 2));
        callback(null, error);
    }
}

exports.updateProduct = function (obj, callback) {

    const updateObj = [
        obj.name,
        obj.price,
        obj.idproduct
    ];

    try {
        Driver.getConnection(function (connection) {
            console.log('Database connected successfully');
            connection.query("update product set name=?, price=? where idproduct=?", updateObj, function (error, results, fields) {
                connection.end();
                if (error) {
                    console.log('Error:', JSON.stringify(error, null, 2));
                }
                else {
                    console.log('result is', results)
                    callback(results, fields);
                }

            });
        })
    } catch (error) {
        console.log('Exception: ', JSON.stringify(error, null, 2))
        callback(null, error);
    }

}

// var values = {
//         name: "Prabhat Singh",
//         price: 1234
//     }
// console.log(getContactById(values, (data, fields)=>{
//     console.log('executed');
// }))
