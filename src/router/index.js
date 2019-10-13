let file_util = require('../../app/utils/file_util');
let app_config = require('../../app_config');
let ctx_util = require('../../app/utils/ctx_util');
let path = require('path');

import VueRouter from "vue-router";

// 解析扫描的目录
let scandirArr = [];

let scandir = app_config.router.scandir;
if (typeof scandir === "string") {
    scandirArr.push(...scandir.split(','));
}

// 扫描文件的关键字
let scanfile_keyword = app_config.router.scanfile_keyword || ".js";
let scanfile_regexp = app_config.router.scanfile_regexp || false;
let scanfile_opts = {
    fileonly: true,
    recursion: true,
    keyword_filename: scanfile_keyword,
    keyword_regexp: scanfile_regexp,
};

// 开始检索
for (let scandiritem of scandirArr) {
    let dirpath = path.resolve(ctx_util.getRootDir(), scandiritem);
    file_util.listFiles(dirpath, scanfile_opts).then(routeFiles => {
        console.log(routeFiles);
    });
}

const User = {template: '<div>user</div>'};

const router = new VueRouter({
    routes: [
        {path: '/user', component: User}
    ]
})

export default router;


