let date_util = require("../utils/date_util");
let ctx_util = require("../utils/ctx_util");

date_util.cfg('/', '_')
console.log(`date_util.format(): ${date_util.format()}`)

console.log(ctx_util.getRootDir())