let date_util = require("../utils/date_util")
let redis = require("redis");
let redisClient = redis.createClient({
    host: '127.0.0.1',
    port: '6379',
    return_buffers: false,// If set to true, then all replies will be sent to callbacks as Buffers instead of Strings.
    retry_strategy: function (options) {
        console.log(options);
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
});

redisClient.on("error", function (err) {
    console.log(date_util.format(), err.toString());
});

module.exports = {
    redis,
    redisClient
};