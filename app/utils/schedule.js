let schedule = require('node-schedule');
let date_util = require("../utils/date_util");

schedule.scheduleJob("test", '*/1 * * * * *', function () {
    console.log(`测试定时任务，${date_util.format()}`)
});
