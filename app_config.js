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
    database: {
        mysql_option: {},
        // redis 单节点配置
        redis_option: {
            //redis服务器的ip地址
            host: '127.0.0.1',
            //redis服务器的端口
            port: '6379',
            // 授权密码，修改redis.windows.conf requirepass 1234，密码错误报错: NOAUTH Authentication required
            password: '1234',
            // redis select $index，默认0
            db: '0',
            // reply number => string 默认null
            string_numbers: null,
            // replay strings => buffer，默认false
            return_buffers: false,
            // 是否检测缓冲区，默认false
            detect_buffers: false,
            // 长链接，默认true
            socket_keepalive: true,
            // 长链接延迟时间，默认0
            socket_initialdelay: 0,
            // 禁用ready检查，默认false
            no_ready_check: false,
            // 启用离线命令队列，默认true
            enable_offline_queue: true,
            // // @Deprecated 重连最大延迟，默认null
            // retry_max_delay: null,
            // // @Deprecated 连接超时时间，默认60*60*1000，默认1h
            // connect_timeout: 60 * 60 * 1000,
            // // @Deprecated 最大连接次数，默认0，设置为1将阻止任何重新连接尝试
            // max_attempts: 0,
            // 默认false, 如果设置为true，则在重新建立连接后，将重试连接丢失时未执行的所有命令。如果使用状态更改命令（例如incr），请小心使用此命令。这在使用阻塞命令时特别有用。
            retry_unfulfilled_commands: false,
            retry_strategy: function (options) {
                if (options.error && options.error.code === 'ECONNREFUSED') {
                    // 拒绝连接
                    let errMsg = 'The server refused the connection';
                    return new Error(`[Redis retry_strategy] ErrorMsg: ${errMsg}`);
                }
                // 默认 60*60*1000
                if (options.total_retry_time > 60 * 60 * 1000) {
                    // 超过最大重试时间
                    let errMsg = 'Retry time exhausted';
                    return new Error(`[Redis retry_strategy] ErrorMsg: ${errMsg}`);
                }
                // 默认10
                if (options.attempt > 10) {
                    // 超过最大重试次数
                    let errMsg = 'maximum connection attempts exceeded';
                    return new Error(`[Redis retry_strategy] ErrorMsg: ${errMsg}`);
                }
                // reconnect after
                return Math.min(options.attempt * 1000, 3000);
            }
        },
        // redis 集群配置
        redis_cluster_option: [{
            port: 6381,
            host: '127.0.0.1'
        }, {
            port: 6382,
            host: '127.0.0.1'
        }, {
            port: 6383,
            host: '127.0.0.1'
        }],
    }
};
module.exports = app_config;