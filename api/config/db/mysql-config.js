var mysql = require('mysql');
var appConfig =
    // {
    //     multipleStatements: true,
    //     connectionLimit: 10,
    //     host: '18.221.50.150',
    //     port: '3306',
    //     database: 'test',
    //     user: 'dev',
    //     password: '40Dev123'
    // };


    {
        multipleStatements: true,
        connectionLimit: 10,
        host: 'localhost',
        port: '3306',
        database: 'test',
        user: 'root',
        password: ''
    };

module.exports.getConnection = (callback) => {
    try {
        let connection = mysql.createConnection(appConfig);
        callback(connection);
        } catch (err) {
        callback(err, null);
        console.log("DB Connection Exception:" + JSON.stringify(err));
    }
}