let uuid = require("uuid");
let stack_util = require('./stack_util');

let random_util = {};

/**
 * 生成uuid
 * @param uppercase 是否大写
 * @returns {string}
 */
random_util.uuid = function (uppercase = false) {
    stack_util.log(`uppercase: ${uppercase}`);
    let randomstr = uuid.v4().replace(/-/ig, '');
    if (uppercase) randomstr = randomstr.toString().toUpperCase();
    return randomstr;
};

/**
 * 生成固定长度的随机字符串
 *
 * @param length 长度
 * @param uppercase 是否大写
 * @returns {string}
 */
random_util.uuidByLength = function (length = 32, uppercase = false) {
    stack_util.log(`length: ${length}, uppercase: ${uppercase}`);
    if (length <= 0) throw 'length must greater then 0';

    let resultStr = '';

    do {
        resultStr += this.uuid(uppercase);
    } while (resultStr.length < length);

    return resultStr.substr(0, length);
};

/**
 * 生成指定范围内的随机数字，含头不含尾
 * @param min 最小值
 * @param max 最大值
 * @param decimal 小数位长度，默认0
 * @returns {number}
 */
random_util.rangeNum = function (min = 0, max = 100, decimal = 0) {
    stack_util.log(`min: ${min}, max: ${max}, decimal: ${decimal}`);
    let power = Math.pow(10, decimal);
    let randomNumber = Math.random() * (max - min) + min;
    return Math.floor(randomNumber * power) / power;
};


module.exports = random_util;