let date_util = require("../utils/date_util");

// redis 订阅一个或多个符合给定模式的频道
let redis_client_sub_pattern = require("../db_utils/redis_util").redis_client;
let psubscribeMsgTimes = 0;// pattern消息接收消息次数
let maxPSubscribeMsgTimes = 3;//pattern消息接收消息最大次数

// pattern消息订阅
redis_client_sub_pattern.on("psubscribe", function (channel, count) {
    console.log(date_util.format(), `pattern订阅结果，channel：${channel}，count：${count}`);
});
redis_client_sub_pattern.on("pmessage", function (pattern, channel, message) {
    if (psubscribeMsgTimes >= maxPSubscribeMsgTimes) {
        redis_client_sub_pattern.punsubscribe();
        redis_client_sub_pattern.quit();
        console.log(`redis_client_sub_pattern.ready: ${redis_client_sub_pattern.ready}; redis_client_sub_pattern.closing: ${redis_client_sub_pattern.closing}; `)
        console.log(date_util.format(), `pattern取消订阅`);
    } else {
        console.log(date_util.format(), `pattern接收到消息，pattern：${pattern}，channel：${channel}，message：${message}`);
        psubscribeMsgTimes++;
    }
});

let pchannels = [];
// 接收以 "it.note" 开头的频道的消息
pchannels.push("it.note*");
// 接收以 ".dota1" 结尾的频道的消息
pchannels.push("*.dota1");
redis_client_sub_pattern.psubscribe(pchannels);