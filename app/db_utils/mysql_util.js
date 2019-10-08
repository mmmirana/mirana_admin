const rds = require('ali-rds');

const db = rds({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    // database: '',
});

let testDB = function () {
    this.db.queryOne(`SELECT 1`).then(result => {
        console.log(result);
    }).catch(err => {
        console.error(err);
    })
};

let mysql_util = {};
mysql_util.db = db;
mysql_util.testDB = testDB;

module.exports = mysql_util;


mysql_util.testDB();