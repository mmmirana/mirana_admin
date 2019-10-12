const rds = require('ali-rds');
const mysql_cfg = require("../_config/mysql_cfg");

const db = rds(mysql_cfg);

let mysql_util = {};

mysql_util.db = db;

module.exports = mysql_util;