let date_util = require("../utils/date_util");
let ctx_util = require("../utils/ctx_util");
let mysql_util = require("../db_utils/mysql_util");

// test date_util
date_util.cfg('/', '_');
console.log(`date_util.format(): ${date_util.format()}`);

// test ctx_util
console.log(ctx_util.getRootDir());

// test mysql
mysql_util.db.query("select 1").then(result => {
    console.log(result);
}).catch(err => {
    console.log(result);
});
