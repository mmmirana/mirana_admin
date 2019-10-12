// redis
let redis = require("redis");
// async_redis
let async_redis = require("async-redis");
// IoRedis
let IoRedis = require('ioredis');
// RedLock
let RedLock = require("redlock");
// date_util
let date_util = require("../utils/date_util");

// redis 单节点配置
let redis_option = require("../_config/redis_cfg");
// redis 集群配置
let redis_cluster_option = require("../_config/redis_cluster_cfg");

// redis_client
let redis_client = redis.createClient(redis_option);
// async_redis_client
let async_redis_client = async_redis.createClient(redis_option);
// redlock NOTE: 这里只能使用redis_client，不能使用async_redis_client;
let redlock = new RedLock([redis_client]);

// redis_cluster_client
let redis_cluster_client = new IoRedis.Cluster(redis_cluster_option);
// redlock_cluster NOTE: 这里只能使用redis_cluster_client，不能使用async_redis_cluster_client;
let redlock_cluster = new RedLock([redis_cluster_client]);

redis_client.on("error", function (err) {
    console.error(date_util.format(date_util.pattern().ymdhmsSSS), '[ redis_client ] A redis error has occurred:', err);
});
async_redis_client.on("error", function (err) {
    console.error(date_util.format(date_util.pattern().ymdhmsSSS), '[ async_redis_client ] A redis error has occurred:', err);
});
redlock.on('clientError', function (err) {
    console.error(date_util.format(date_util.pattern().ymdhmsSSS), '[ redlock ] A redis error has occurred:', err);
});

redis_cluster_client.on('error', function (err) {
    console.error(date_util.format(date_util.pattern().ymdhmsSSS), '[ redis_cluster_client ] A redis error has occurred:', err);
});

redlock_cluster.on('clientError', function (err) {
    console.error(date_util.format(date_util.pattern().ymdhmsSSS), '[ redlock_cluster ] A redis error has occurred:', err);
});

// // async_redis_cluster_client
// let async_redis_cluster_client = async_redis.createClient(redis_cluster_option);
// async_redis_cluster_client.on('error', function (err) {
//     console.error(date_util.format(date_util.pattern().ymdhmsSSS), '[ async_redis_cluster_client ] A redis error has occurred:', err);
// });

let redis_util = {};
redis_util.redis = redis_util; // 原生redis
// Redis单节点
redis_util.redis_client = redis_client;// callback redis client
redis_util.async_redis_client = async_redis_client;// async redis client
// Redis集群
redis_util.redis_cluster_client = redis_cluster_client;// callback redis cluster client
// redis_util.async_redis_cluster_client = async_redis_cluster_client;// async redis cluster client
// Redlock
redis_util.redlock = redlock;// redlock
redis_util.redlock_cluster = redlock_cluster;// redlock_cluster

module.exports = redis_util;