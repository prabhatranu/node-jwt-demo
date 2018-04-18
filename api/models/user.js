let Driver = require('../config/db/mysql-config');

//function getContactById(values, callback) {
//Save product
exports.createUser = function (user, callback) {

    let sqlParam = {
        emailId: user.emailId,
        password: user.password

    }

    try {
        Driver.getConnetcion(function (connection) {
            console.log('Conneted to the database')
            connection.query("insert into user SET ?", sqlParam, function (error, results, fields) {
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

// is email exist
exports.isEmailExist = function (emailId, callback) {
    const id = emailId;
    console.log('id is:::',id)
    try {
        Driver.getConnection(function (connection) {
            console.log('Database Connected');
            connection.query('select emailId  from users where emailId= ?', [id], function (error, results, fields) {
                connection.end();
               
                if (error) {
                    console.log('Error', JSON.stringify(error, null, 2));
                } else {
                    console.log('result is:', results);
                    callback(results, fields)
                }
            });
        });
    } catch (error) {
        console.log('Exception :', JSON.stringify(error, null, 2));
        callback(null, error)
    }
}

//Delete the record by userId
exports.deletById = function (userId, callback) {
    const id = userId;
    try {
        Driver.getConnection(function (connection) {
            console.log('Database Connected');
            connection.query('delete from user where user_id= ?', [id], function (error, results, fields) {
                connection.end();
                if (error) {
                    console.log('Error', JSON.stringify(error, null, 2));
                } else {
                    callback(results, fields)
                }
            });
        });
    } catch (error) {
        console.log('Exception :', JSON.stringify(error, null, 2));
        callback(null, error)
    }
}
