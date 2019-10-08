let fs = require("fs-extra");
let date_util = require('./date_util');
let random_util = require('./random_util');
let regexp_util = require("./regexp_util");
let stack_util = require('./stack_util');

let file_util = {};

// 重命名的模式
file_util.rename_module = {
    "mills_suffix": "mills_suffix", // 毫秒数+文件后缀
    "ymdhmsSSS_suffix": "ymdhmsSSS_suffix", // 年月日时分秒毫秒+文件后缀
    "preffix_mills_suffix": "preffix_mills_suffix", // 文件前缀+毫秒数+文件后缀
};

/**
 * 获取文件前缀
 * jquery.js => 'jquery'
 * jquery.min.js => 'jquery.min'
 * jquery_min => 'jquery_min'
 * @param filename
 * @returns {*|string}
 */
file_util.getPreffix = function (filename) {
    stack_util.log(`filename: ${filename}`);
    filename = regexp_util.formatPath(filename);
    // 获取文件前缀
    let preffix = filename;
    let lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex >= 0) {
        preffix = filename.substring(0, lastDotIndex);
    }
    return preffix;
};

/**
 * 获取文件后缀
 * jquery.js => '.js'
 * jquery.min.js => '.js'
 * jquery_min => ''
 * @param filename
 * @returns {*|string}
 */
file_util.getSuffix = function (filename) {
    stack_util.log(`filename: ${filename}`);
    filename = regexp_util.formatPath(filename);
    // 获取文件后缀
    let suffix = '';
    let lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex >= 0) {
        suffix = filename.substring(lastDotIndex, filename.length);
    }
    return suffix;
};

/**
 * 重命名文件
 * @param filename
 * @param rename_module 重命名的模式
 * @returns {string}
 */
file_util.rename = function (filename = '', rename_module = this.rename_module.mills_suffix) {
    stack_util.log(`filename: ${filename}, rename_module: ${rename_module}`);
    // 获取文件前缀
    let preffix = this.getPreffix(filename);
    let suffix = this.getSuffix(filename);

    let mills = new Date().getTime();

    let renamedFile;
    switch (rename_module) {
        case this.rename_module.mills_suffix:
            renamedFile = `${mills}_${random_util.uuidByLength(8)}${suffix}`;
            break;
        case this.rename_module.ymdhmsSSS_suffix:
            renamedFile = `${date_util.format('YYYYMMDDHHmmssSSS')}_${suffix}`;
            break;
        case this.rename_module.preffix_mills_suffix:
            renamedFile = `${preffix}_${mills}${suffix}`;
            break;
        default:
            renamedFile = filename;
    }
    return renamedFile;
};

/**
 * 获取指定目录下的所有文件
 * @param dirpath 指定目录
 * @returns {Promise<*>}
 */
file_util.listFiles = async function (dirpath = __dirname) {
    stack_util.log(`dirpath: ${dirpath}`);
    return await fs.readdir(dirpath);
};

module.exports = file_util;