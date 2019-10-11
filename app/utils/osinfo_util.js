let os = require("os");
let os_info = {
    // 处理器架构 x86 x64
    arch: os.arch(),
    // 操作系统平台
    platform: os.platform(),
    // 操作系统名称，基于linux的返回linux,基于苹果的返回Darwin,基于windows的返回Windows_NT
    type: os.type(),
    // 操作系统版本
    release: os.release(),
    // cpus info
    cpus: os.cpus(),
    // 当前操作系统的换行符
    EOL: os.EOL,
    // 字节顺序 高位优先返回BE,低位优先的返回LE
    endianness: os.endianness(),
    // 总内存字节
    totalmem: os.totalmem(),
    // 空闲内存字节
    freemem: os.freemem(),
    // 当前用户根目录
    homedir: os.homedir(),
    // 操作系统主机名
    hostname: os.hostname(),
    // 系统最近5、10、15分钟的平均负载,这是一个针对linux或unix的统计，windows下始终返回[0,0,0]
    loadavg: os.loadavg(),
    // 操作系统平台
    networkInterfaces: os.networkInterfaces(),
    // 临时文件夹
    tmpdir: os.tmpdir(),
    // 计算机正常运行时间
    uptime: os.uptime(),
    // 当前用户信息
    userInfo: os.userInfo(),
};
module.exports = os_info;

