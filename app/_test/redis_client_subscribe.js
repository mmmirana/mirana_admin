let date_util = require("../utils/date_util");

// redis 订阅给定的一个或多个频道的信息。
let redis_client_sub = require("../db_utils/redis_util").redis_client;

let subscribeMsgTimes = 0;// 普通消息接收消息次数
let maxSubscribeMsgTimes = 7;// 普通消息接收消息最大次数

// 普通消息订阅
redis_client_sub.on("subscribe", function (channel, count) {
    console.log(date_util.format(), `订阅结果，channel：${channel}，count：${count}`);
});
redis_client_sub.on("message", function (channel, message) {
    if (subscribeMsgTimes >= maxSubscribeMsgTimes) {
        redis_client_sub.unsubscribe();
        redis_client_sub.quit();
        console.log(`redis_client_sub.ready: ${redis_client_sub.ready}; redis_client_sub.closing: ${redis_client_sub.closing}; `)
        console.log(date_util.format(), `取消订阅`);
    } else {
        console.log(date_util.format(), `接收到消息，channel：${channel}，message：${message}`);
        subscribeMsgTimes++;
    }
});

let channels = [];
channels.push("LOL");
channels.push("DOTA2");
channels.push("CSGO");
// 这里接收 DOTA2、LOL、CSGO 的消息，不接收 WOW 的消息，其中 CSGO 频道不存在
redis_client_sub.subscribe(channels);