let stack_util = require('./stack_util');
let osinfo = require("./osinfo_util");
let path = require("path");

let regexp_util = {};

/**
 * 解析路径，将多个"\"和"/"转化为"/"
 * @param filepath
 * @returns {void | string | never}
 */
regexp_util.formatFilePath = function (filepath) {
    stack_util.log(`filepath: ${filepath}`);
    return filepath.replace(/[\\|/]+/ig, path.sep)
};

/**
 * 解析路径，将多个"\"和"/"转化为"/"
 * @param path
 * @returns {void | string | never}
 */
regexp_util.formatURL = function (path) {
    stack_util.log(`path: ${path}`);
    return path.replace(/[\\|/]+/ig, '/')
};

/**
 * 格式化多个换行为1个换行
 * @param content
 * @returns {void | string | never}
 */
regexp_util.formatEOL = function (content) {
    return content.replace(/(\r\n?)+/ig, osinfo.EOL);
    // return content.replace(new RegExp("(\r\n?)+", "ig"), osinfo.EOL);
};

module.exports = regexp_util;

