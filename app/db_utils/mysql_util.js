const rds = require('ali-rds');

const db = rds({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'db_mirana',
});

let mysql_util = {};

mysql_util.db = db;

module.exports = mysql_util;