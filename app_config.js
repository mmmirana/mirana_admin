let app_config = {
    project: {
        name: 'p_name',
        description: 'p_description',
        version: 'p_version',
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