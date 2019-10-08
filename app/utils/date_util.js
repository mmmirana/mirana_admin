let moment = require('moment');
let stack_util = require('./stack_util');

let date_util = {};

date_util.ymd_split = "-";
date_util.hmsSSS_split = ":";

/**
 * 配置分隔符
 * @param ymd_split 年月日分隔符
 * @param hmsSSS_split 时分秒分隔符
 */
date_util.cfg = function (ymd_split = '-', hmsSSS_split = ':') {
    this.ymd_split = ymd_split;
    this.hmsSSS_split = hmsSSS_split;
};

date_util.pattern = function () {
    let data = {};
    data.ymd = `YYYY${this.ymd_split}MM${this.ymd_split}DD`;
    data.hms = `HH${this.hmsSSS_split}mm${this.hmsSSS_split}ss`;
    data.hmsSSS = `HH${this.hmsSSS_split}mm${this.hmsSSS_split}ss${this.hmsSSS_split}SSS`;
    data.ymdhms = `${data.ymd} ${data.hms}`;
    data.ymdhmsSSS = `${data.ymd} ${data.hmsSSS}`;
    return data;
};

date_util.format = function (pattern = this.pattern().ymdhms) {
    stack_util.log(`pattern: ${pattern}`);
    return (moment().format(pattern));
};

module.exports = date_util;