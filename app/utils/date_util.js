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

/**
 * format([[date,] pattern])
 * @param date Date对象
 * @param pattern 格式化string
 * @returns {string}
 */
date_util.format = function (date, pattern) {
    let _date;
    let _pattern;
    if (arguments.length >= 2) {
        _date = date;
        _pattern = pattern;
    } else if (arguments.length === 1) {
        if (typeof date === "object" && date instanceof Date) {
            _date = date;
        } else if (typeof date === "string") {
            _pattern = date;
        }
    }
    if (!_date) _date = new Date();
    if (!_pattern) _pattern = this.pattern().ymdhmsSSS;

    stack_util.log(`pattern: ${_pattern}`);
    return (moment(_date).format(_pattern));
};

/**
 * 获取毫秒数
 * @param date 时间，非必填
 * @returns {number}
 */
date_util.getTime = function (date) {
    if (!date) date = new Date();
    return date.getTime();
};

module.exports = date_util;