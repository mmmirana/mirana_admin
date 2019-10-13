let path = require("path");
let fs = require("fs-extra");
let file_util = require("./file_util");
let date_util = require("./date_util");
let ctx_util = require("./ctx_util");
let app_config = require("../../app_config");

let util = {};

/**
 * 创建后端JS工具类
 * @param util_name 工具类名称 abc abc.js
 * @param util_dir
 * @param overwriteIfExist 文件存在依然重新写入
 * @returns {Promise<void>}
 */
util.createBackendUtilfile = async function (util_name, util_dir, overwriteIfExist = false) {
    if (!util_dir) util_dir = app_config.backend.path.js_utils_dir;

    console.log(`createBackendUtilfile, util_name:${util_name}, util_dir: ${util_dir}, overwriteIfExist: ${overwriteIfExist}`);

    let util_module_name = file_util.getPreffix(util_name);
    let filepath = path.resolve(ctx_util.getRootDir(), util_dir, `${util_module_name}.js`);

    let utilTempStr = `// Auto Created at ${date_util.format("YYYY/MM/DD HH:mm:ss")}
let ${util_module_name} = {};
module.exports = ${util_module_name};`;

    let fileExists = await fs.exists(filepath);
    if (fileExists) {
        if (overwriteIfExist) {
            await fs.outputFile(filepath, utilTempStr);
        } else {
            console.error(`file: ${filepath} is existed, can't overwrite`);
        }
    } else {
        await fs.outputFile(filepath, utilTempStr);
    }
};

/**
 * 创建前端JS工具类
 * @param util_name 工具类名称 abc abc.js
 * @param util_dir
 * @param overwriteIfExist 文件存在依然重新写入
 * @returns {Promise<void>}
 */
util.createFrontendUtilfile = async function (util_name, util_dir, overwriteIfExist = false) {
    if (!util_dir) util_dir = app_config.frontend.path.js_utils_dir;

    console.log(`createFrontendUtilfile, util_name:${util_name}, util_dir: ${util_dir}, overwriteIfExist: ${overwriteIfExist}`);

    let util_module_name = file_util.getPreffix(util_name);
    let filepath = path.resolve(ctx_util.getRootDir(), util_dir, `${util_module_name}.js`);

    let utilTempStr = `// Auto Created at ${date_util.format("YYYY/MM/DD HH:mm:ss")}
!function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.${util_module_name} = factory();
    }
}(this, factory);

function factory() {
    let ${util_module_name} = {};
    ${util_module_name}.version = '1.0';
    return ${util_module_name};
}`;

    let fileExists = await fs.exists(filepath);
    if (fileExists) {
        if (overwriteIfExist) {
            await fs.outputFile(filepath, utilTempStr);
        } else {
            console.error(`file: ${filepath} is existed, can't overwrite`);
        }
    } else {
        await fs.outputFile(filepath, utilTempStr);
    }
};

module.exports = util;