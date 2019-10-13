let app_config = {
    project: {
        name: 'p_name',
        description: 'p_description',
        version: 'p_version',
    },
    /**
     * 路由配置
     */
    router: {
        // 扫描的目录，支持string和array，string支持','分割
        scandir: 'src/router',
        // 扫描的文件关键字
        scanfile_keyword: '.*_route.js$',
        // 扫描的文件是否正则匹配
        scanfile_regexp: true,
    },
    // 后端配置
    backend: {
        // 路径配置
        path: {
            // js 工具类目录
            js_utils_dir: 'app/utils'
        },
    },
    // 前端配置
    frontend: {
        path: {
            //js 插件目录
            js_utils_dir: 'public/js/utils',
        },
    },
    // 堆栈信息
    stackinfo: {
        debug: false,// debug模式下显示堆栈日志
    },
};
module.exports = app_config;