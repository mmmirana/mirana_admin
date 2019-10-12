// redis 与 rabbitmq 消息队列区别
//
// 1、可靠性
// redis:       没有相应的机制保证消息的可靠消费，如果发布者发布一条消息，而没有对应的订阅者的话，这条消息将丢失，不会存在内存中
// rabbitmq:    具有消息消费确认机制，如果发布一条消息，还没有消费者消费该队列，那么这条消息将一直存放在队列中，直到有消费者消费了该条消息，以此可以保证消息的可靠消费
//
// 2、实时性
// redis:       redis作为高效的缓存服务器，所有数据都存在在服务器中，所以它具有更高的实时性
// rabbitmq:
//
// 3、消费者负载均衡
// redis:       发布订阅模式，一个队列可以被多个消费者同时订阅，当有消息到达时，会将该消息依次发送给每个订阅者
// rabbitmq:    队列可以被多个消费者同时监控消费，但是每一条消息只能被消费一次，由于rabbitmq的消费确认机制，因此它能够根据消费者的消费能力而调整它的负载
//
// 4、持久性
// redis:       redis的持久化是针对于整个redis缓存的内容，它有RDB和AOF两种持久化方式（redis持久化方式，后续更新），可以将整个redis实例持久化到磁盘，以此来做数据备份，防止异常情况下导致数据丢失。
// rabbitmq:    队列消息都可以选择性持久化，持久化粒度更小，更灵活；
//
// 5、队列监控
// redis:       redis没有所谓的监控平台。
// rabbitmq:    rabbitmq实现了后台监控平台，可以在该平台上看到所有创建的队列的详细情况，良好的后台管理平台可以方面我们更好的使用；


let date_util = require("../utils/date_util");
let schedule = require('node-schedule');

// redis 发布客户端，不区分pattern
let redis_client_pub = require("../db_utils/redis_util").redis_client;

/**
 * 每5秒向 频道发送一条消息
 */
schedule.scheduleJob("*/5 * * * * *", function () {
    // 向 DOTA2 频道发布消息
    let chanel_dota2 = "DOTA2";
    redis_client_pub.publish(chanel_dota2, `msg_${date_util.format(date_util.pattern().hms)}`, function (err, reply) {
        if (err) console.error(`频道 ${chanel_dota2} 发布消息异常`, err);
        else console.log(date_util.format(), `频道 ${chanel_dota2} 发布消息成功，reply: ${reply}`);
    });
    // 向 LOL 频道发布消息
    let chanel_lol = "LOL";
    redis_client_pub.publish(chanel_lol, `msg_${date_util.format(date_util.pattern().hms)}`, function (err, reply) {
        if (err) console.error(`频道 ${chanel_lol} 发布消息异常`, err);
        else console.log(date_util.format(), `频道 ${chanel_lol} 发布消息成功，reply: ${reply}`);
    });

    // 向 WOW 频道发布消息
    let chanel_wow = "WOW";
    redis_client_pub.publish(chanel_wow, `msg_${date_util.format(date_util.pattern().hms)}`, function (err, reply) {
        if (err) console.error(`频道 ${chanel_wow} 发布消息异常`, err);
        else console.log(date_util.format(), `频道 ${chanel_wow} 发布消息成功，reply: ${reply}`);
    });

    console.log("===============================================================================");
});


/**
 * 每10秒向 频道  发送一条消息
 */
schedule.scheduleJob("*/10 * * * * *", function () {
    // 向 it.notebook 频道发布消息
    let chanel_it_notebook = "it.notebook";
    redis_client_pub.publish(chanel_it_notebook, `msg_${date_util.format(date_util.pattern().hms)}`, function (err, reply) {
        if (err) console.error(`频道 ${chanel_it_notebook} 发布消息异常`, err);
        else console.log(date_util.format(), `频道 ${chanel_it_notebook} 发布消息成功，reply: ${reply}`);
    });
    // 向 it.phone 频道发布消息
    let chanel_it_phone = "it.phone";
    redis_client_pub.publish(chanel_it_phone, `msg_${date_util.format(date_util.pattern().hms)}`, function (err, reply) {
        if (err) console.error(`频道 ${chanel_it_phone} 发布消息异常`, err);
        else console.log(date_util.format(), `频道 ${chanel_it_phone} 发布消息成功，reply: ${reply}`);
    });
    // 向 games.dota1 频道发布消息
    let chanel_games_dota1 = "games.dota1";
    redis_client_pub.publish(chanel_games_dota1, `msg_${date_util.format(date_util.pattern().hms)}`, function (err, reply) {
        if (err) console.error(`频道 ${chanel_games_dota1} 发布消息异常`, err);
        else console.log(date_util.format(), `频道 ${chanel_games_dota1} 发布消息成功，reply: ${reply}`);
    });
    // 向 games.dota2 频道发布消息
    let chanel_games_dota2 = "games.dota2";
    redis_client_pub.publish(chanel_games_dota2, `msg_${date_util.format(date_util.pattern().hms)}`, function (err, reply) {
        if (err) console.error(`频道 ${chanel_games_dota2} 发布消息异常`, err);
        else console.log(date_util.format(), `频道 ${chanel_games_dota2} 发布消息成功，reply: ${reply}`);
    });
    console.log("===============================================================================");
});

