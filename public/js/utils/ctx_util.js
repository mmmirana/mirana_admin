// Auto Created at 2019/10/08 16:37:31
!function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ctx_util = factory();
    }
}(this, factory);

function factory() {
    let ctx_util = {};
    ctx_util.version = '1.0';
    return ctx_util;
}

// please del this code later
console.log(factory().version);
