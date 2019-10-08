let log_util = require("./log_util");
let moment = require("moment");
let app_config = require("../../app_config");

let stack_util = {};

stack_util.log = function (msg) {
    if (!app_config.stackinfo.debug) return;
    let info = this.stackInfo();
    let method = info['method'];
    log_util.info(`[ ${moment().format("YYYY/MM/DD HH:mm:ss:SSS")} - ${method} ] ${msg}`);
};

// 这里是主要方法
stack_util.stackInfo = function () {
    if (!app_config.stackinfo.debug) return;
    let path = require('path');
    let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
    let stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
    let stacklist = (new Error()).stack.split('\n').slice(3);
    let s = stacklist[0];
    let sp = stackReg.exec(s) || stackReg2.exec(s);
    let data = {};
    if (sp && sp.length === 5) {
        data.method = sp[1];
        data.path = sp[2];
        data.line = sp[3];
        data.pos = sp[4];

        data.file = path.basename(data.path);
    }
    return data;
};

module.exports = stack_util;