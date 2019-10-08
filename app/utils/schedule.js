let schedule = require('node-schedule');

schedule.scheduleJob("test_redis", '*/1 * * * * *', function () {
    for (let i = 0; i < 10; i++) {
        let {redis, redisClient} = require("../db_utils/redis_util")
        redisClient.get("host", redis.print);
    }
});
