let stack_util = require('./stack_util');

let regexp_util = {};

/**
 * 解析路径，将多个"\"和"/"转化为"/"
 * @param path
 * @returns {void | string | never}
 */
regexp_util.formatPath = function (path) {
    stack_util.log(`path: ${path}`)
    return path.replace(/[\\|/]+/ig, '/')
};
module.exports = regexp_util;

