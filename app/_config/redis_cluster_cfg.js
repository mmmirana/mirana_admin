// redis 集群配置
let redis_cluster_cfg = [{
    port: 6381,
    host: '127.0.0.1'
}, {
    port: 6382,
    host: '127.0.0.1'
}, {
    port: 6383,
    host: '127.0.0.1'
}];

module.exports = redis_cluster_cfg;