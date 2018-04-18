let Driver = require('../../config/db/mysql-config');

//exports.getContactById = function (userId, fleetId, callback) {

function getContactById(callback) {
    //exports.getContactById = function (callback) {
    try {
        Driver.getConnection(function (connection) {
            connection.query("select * from product", function (error, results, fields) {
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


console.log(getContactById((data, fields) => {
    console.log(data);
    console.log(fields);
    console.log('Executing')
}))