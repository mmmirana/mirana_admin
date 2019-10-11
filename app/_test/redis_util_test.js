let date_util = require("../utils/date_util");
let redis_util = require("../db_utils/redis_util");
let {redis_client, async_redis_client, redis_cluster_client, redlock, redlock_cluster} = redis_util;
let schedule = require('node-schedule');
let random_util = require("../utils/random_util");

/**
 * 测试redis_util.js的各个模块
 * @returns {Promise<void>}
 */
async function testRedisUtilsModule() {
    /**
     * redis_client
     */
    let keypair1 = getRandomKeyPair();
    console.log(JSON.stringify(keypair1));
    redis_client.set(keypair1.key, keypair1.value, function (err, reply) {
        if (err) console.error(err);
        else console.log(`redis_client_set: ${reply}`);
    });
    redis_client.get(keypair1.key, function (err, reply) {
        if (err) console.error(err);
        else console.log(`redis_client_get: ${reply}`);
    });

    /**
     * redis_cluster_client
     */
    let keypair2 = getRandomKeyPair();
    console.log(JSON.stringify(keypair2));
    let async_redis_client_set = await async_redis_client.set(keypair2.key, keypair2.value);
    console.log(`async_redis_client_set: ${async_redis_client_set}`);
    console.log(`async_redis_client_get: ${await async_redis_client.get(keypair2.key)}`);


    /**
     * async_redis_client
     */
    let keypair3 = getRandomKeyPair();
    console.log(JSON.stringify(keypair3));
    redis_cluster_client.set(keypair3.key, keypair3.value, function (err, reply) {
        if (err) console.error(err);
        else console.log(`redis_cluster_client_set: ${reply}`);
    });
    redis_cluster_client.get(keypair3.key, function (err, reply) {
        if (err) console.error(err);
        else console.log(`redis_cluster_client_get: ${reply}`);
    });


    // /**
    //  * async_redis_cluster_client
    //  */
    // let keypair4 = getRandomKeyPair();
    // console.log(JSON.stringify(keypair4));
    // let async_redis_cluster_client_set = await async_redis_cluster_client.set(keypair4.key, keypair4.value);
    // console.log(`async_redis_cluster_client_set: ${async_redis_cluster_client_set}`);
    // console.log(`async_redis_cluster_client_get: ${await async_redis_cluster_client.get(keypair4.key)}`);


    let redlock_resource = 'redis_lock_for_redlock';
    let redlock_cluster_resource = 'redis_lock_for_redlock_cluster';
    let ttl_ms = 5000;

    /**
     * redlock
     */
    let lock = await redlock.lock(redlock_resource, ttl_ms);// 上锁
    console.log("redlock_resource", date_util.format(), "do something");   // 上锁后的操作
    // lock = await redlock.lock(redlock_resource, ttl_ms);  // 测试不解锁，直接上锁，报异常：LockError: Exceeded 10 attempts to lock the resource ${resource}
    // console.log("redlock_resource", date_util.format(), "do something");   // 测试不解锁，直接上锁后的操作
    await lock.unlock();    // 解锁

    /**
     * redlock_cluster
     */
    let lock_cluster = await redlock_cluster.lock(redlock_cluster_resource, ttl_ms);// 上锁
    console.log("redlock_cluster_resource", date_util.format(), "do something", lock_cluster.value);   // 上锁后的操作
    // lock_cluster = await redlock_cluster.lock(redlock_cluster_resource, ttl_ms);  // 测试不解锁，直接上锁，报异常：LockError: Exceeded 10 attempts to lock the resource ${resource}
    // console.log("redlock_cluster_resource", date_util.format(), "do something", lock_cluster.value);   // 测试不解锁，直接上锁后的操作
    await lock_cluster.unlock();    // 解锁

}

testRedisUtilsModule().then(result => {
    if (result) console.log(result);
}).catch(err => {
    console.log(date_util.format(), err.toString());
});


/**
 * 测试异步redis string
 */
async function testAsyncRedisString() {
    // 清空数据
    let flushall = await async_redis_client.flushall();
    console.log(`flushall: ${flushall}`);

    let testKey = 'key_num';

    // 是否存在key
    let exists = await async_redis_client.exists(testKey);
    console.log(`exists ${testKey}: ${exists}`);
    // 删除一个不存在的key
    let del = await async_redis_client.del(testKey);
    console.log(`del ${testKey}: ${del}`);

    // string
    // 设置key的值
    let set = await async_redis_client.set(testKey, date_util.getTime());
    console.log(`set ${testKey}: ${set}`);
    // 查看key的值
    console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);

    // TTL key 以秒为单位，返回给定 key 的剩余生存时间(TTL, time to live)。
    // 当 key 不存在时，返回 -2 。当 key 存在但没有设置剩余生存时间时，返回 -1 。否则，以秒为单位，返回 key 的剩余生存时间。
    // 在 Redis 2.8 以前，当 key 不存在，或者 key 没有设置剩余生存时间时，命令都返回 -1 。
    let ttl = await async_redis_client.ttl(testKey);
    console.log(`getex : ${await async_redis_client.get("username")}, ttl : ${ttl}`);

    // 追加key的值
    let keylength = await async_redis_client.strlen(testKey);
    let getrange = await async_redis_client.getrange(testKey, keylength - 4, keylength);
    console.log(`getrange ${testKey}: ${getrange}`);
    // 查看key的值
    console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);
    // 设置key的值
    console.log(`set ${testKey}: ${await async_redis_client.set(testKey, getrange)}`);
    // 查看key的值
    console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);
    // 追加key的值
    let append = await async_redis_client.append(testKey, date_util.getTime());
    console.log(`append ${testKey}: ${append}`);
    // 查看key的值
    console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);

    // 设置key的值
    let keylength2 = await async_redis_client.strlen(testKey);
    console.log(`set ${testKey}: ${await async_redis_client.set(testKey, await async_redis_client.getrange(testKey, keylength2 - 4, keylength2))}`);
    // 查看key的值
    console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);

    // 将key中储存的数字值+1，如果key不存在，默认为0
    let incr = await async_redis_client.incr(testKey);
    console.log(`incr ${testKey}: ${incr}`);
    // 查看key的值
    console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);
    // incr，默认为0
    let incr2 = await async_redis_client.incr(testKey);
    console.log(`incr2 ${testKey}: ${incr2}`);
    // 查看key的值
    console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);
    // incrby，默认为0
    let incrby = await async_redis_client.incrby(testKey, 10);
    console.log(`incrby 10 ${testKey}: ${incrby}`);
    // 查看key的值
    console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);
    // decr，默认为0, value -1
    let decr = await async_redis_client.decr(testKey);
    console.log(`decr ${testKey}: ${decr}`);
    // 查看key的值
    console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);
    // incrby，默认为0
    let decrby = await async_redis_client.decrby(testKey, 10);
    console.log(`decrby 10 ${testKey}: ${decrby}`);
    // 查看key的值
    console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);

    //getset 设置指定 key 的值，并返回 key 的旧值
    let getset = await async_redis_client.getset(testKey, date_util.getTime());
    // 查看old vlue
    console.log(`getset ${testKey}: ${getset}`);
    // 查看new value
    console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);

    // MSET key value [key value ...]
    // MSET 是一个原子性(atomic)操作，所有给定 key 都会在同一时间内被设置，某些给定 key 被更新而另一些给定 key 没有改变的情况，不可能发生。
    let mset = await async_redis_client.mset("redis", "redis.com", "mongo", "mongo.org");
    console.log(`mset : ${mset}`);
    // MGET key [key ...] 返回所有(一个或多个)给定 key 的值。 如果给定的 key 里面，有某个 key 不存在，那么这个 key 返回特殊值 nil 。因此，该命令永不失败。
    // 查看mget
    let mget = await async_redis_client.mget("redis", "mongo");
    console.log(`mget : ${mget}`);
    let mget2 = await async_redis_client.mget("redis", "mongo", "mysql");
    // 查看mget
    console.log(`mget2 : ${mget2}`);

    // SETEX key seconds value
    // 将值 value 关联到 key ，并将 key 的生存时间设为 seconds (以秒为单位)。如果 key 已经存在， SETEX 命令将覆写旧值。
    let setex = await async_redis_client.setex("username", 5, 'mirana');
    console.log(`setex : ${setex}`);
    console.log(`getex : ${await async_redis_client.get("username")}`);
    // 每秒刷新一次剩余时间
    let job = schedule.scheduleJob('*/1 * * * * *', async function () {
        // 当 key 不存在时，返回 -2 。
        // 当 key 存在但没有设置剩余生存时间时，返回 -1 。
        let ttl = await async_redis_client.ttl("username");
        if (ttl === -2) {
            job.cancel();
            console.log(`getex : ${await async_redis_client.get("username")}`);
        } else {
            console.log(`getex : ${await async_redis_client.get("username")}, ttl : ${ttl}`);
        }
    });

    // SETNX key value
    // 将 key 的值设为 value ，当且仅当 key 不存在。
    // 若给定的 key 已经存在，则 SETNX 不做任何动作。
    // 设置成功，返回 1 ，设置失败，返回 0 。
    let setnx = await async_redis_client.setnx("key_if_not_exist", "key_if_not_exist_val_" + Math.round(Math.random() * 100));
    console.log(`setnx : ${setnx}`);
    console.log(`getnx : ${await async_redis_client.get("key_if_not_exist")}`);
    let setnxExpire = await async_redis_client.expire("key_if_not_exist", 5);
    console.log(`setnxExpire : ${setnxExpire}`);

    // 每秒刷新一次剩余时间
    let setnxJob = schedule.scheduleJob('*/1 * * * * *', async function () {
        let setnxAgain = await async_redis_client.setnx("key_if_not_exist", "key_if_not_exist_val_" + Math.round(Math.random() * 100));
        console.log(`setnxAgain : ${setnxAgain}`);
        if (setnxAgain === 1) {
            setnxJob.cancel();
            console.log(`getnxAgain : ${await async_redis_client.get("key_if_not_exist")}`);
        } else {
            console.log(`getnxAgain : ${await async_redis_client.get("key_if_not_exist")}, ttl : ${await async_redis_client.ttl("key_if_not_exist")}`);
        }
    });

    // dump序列化
    let dump = await async_redis_client.dump(testKey);
    console.log(`dump ${testKey}: ${dump}`);
    // 查看key的值
    console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);
    // // 设置key的值
    // console.log(`set ${testKey}: ${await async_redis_client.set(testKey, dump)}`);
    // // 查看key的值
    // console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);
    // // TODO restore 有问题
    // let restore = await async_redis_client.restore(testKey);
    // console.log(`restore ${testKey}: ${restore}`);
    // // 查看key的值
    // console.log(`get ${testKey}: ${await async_redis_client.get(testKey)}`);

    // 是否存在key
    let exists2 = await async_redis_client.exists(testKey);
    console.log(`exists2 ${testKey}: ${exists2}`);
    // 删除一个存在的key
    let del2 = await async_redis_client.del(testKey);
    console.log(`del2 ${testKey}: ${del2}`);

    // 是否存在key
    let exists3 = await async_redis_client.exists(testKey);
    console.log(`exists3 ${testKey}: ${exists3}`);
    // 删除一个不存在的key
    let del3 = await async_redis_client.del(testKey);
    console.log(`del3 ${testKey}: ${del3}`);

}


/**
 * 测试异步redis string
 */
testAsyncRedisString().then(result => {
    if (result) console.log(result);
}).catch(err => {
    console.error(err);
});


function getRandomKeyPair() {
    return {
        key: random_util.uuidByLength(5),
        value: random_util.rangeNum(0, 100, 3),
    }
}