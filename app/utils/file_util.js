let path = require("path");
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
    filename = regexp_util.formatFilePath(filename);
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
    filename = regexp_util.formatFilePath(filename);
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
            renamedFile = `${date_util.format('YYYYMMDDHHmmssSSS')}_${random_util.uuidByLength(5)}_${suffix}`;
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
 * @param keyword_filename 文件名称关键字匹配
 * @param keyword_filepath 文件路径关键字匹配
 * @param keyword_regexp 是否正则匹配，默认false
 * @param fileonly 是否只查询文件，默认false
 * @param directiononly 是否只查询文件夹，默认false
 * @param recursion 是否递归查询，默认false
 * @returns {Promise<*>}
 */
file_util.listFiles = async function (dirpath = __dirname, {keyword_filename, keyword_filepath, keyword_regexp = false, fileonly = false, directiononly = false, recursion = false}) {
    stack_util.log(`dirpath: ${dirpath}`);

    let fileArr = [];
    let files = await fs.readdir(dirpath);
    files = files.map(item => {
        let result = {};
        result.filename = item;
        result.filepath = path.resolve(dirpath, item);
        let stat = fs.lstatSync(result.filepath);
        if (stat.isFile()) {
            result.type = 'file';
        } else if (stat.isDirectory()) {
            result.type = 'directory';
        } else {
            result.type = 'other';
        }
        return result;
    });

    fileArr.push(...files);
    if (recursion) {
        for (let i = 0; i < files.length; i++) {
            if (files[i].type === 'directory') {
                let childdir = files[i].filepath;
                fileArr.push(...await this.listFiles(childdir, {
                    keyword_filename,
                    keyword_regexp,
                    fileonly,
                    directiononly,
                    recursion
                }));
            }
        }
    }

    // 文件名是否匹配关键字
    if (keyword_filename) {
        fileArr = fileArr.filter(({filename}) => {
            // 是否启用正则表达式匹配
            if (keyword_regexp) return new RegExp(keyword_filename).test(filename);
            else return filename.indexOf(keyword_filename) >= 0;
        })
    }

    // 文件路径是否匹配关键字
    if (keyword_filepath) {
        fileArr = fileArr.filter(({filepath}) => {
            // 是否启用正则表达式匹配
            if (keyword_regexp) return new RegExp(keyword_filepath).test(filepath);
            else return filepath.indexOf(keyword_filepath) >= 0;
        })
    }

    // 是否只检索文件
    if (fileonly) {
        fileArr = fileArr.filter(({filepath}) => {
            return fs.lstatSync(filepath).isFile();
        })
    }

    // 是否只检索文件夹
    if (directiononly) {
        fileArr = fileArr.filter(({filepath}) => {
            return fs.lstatSync(filepath).isDirectory();
        })
    }

    return fileArr;
};

module.exports = file_util;