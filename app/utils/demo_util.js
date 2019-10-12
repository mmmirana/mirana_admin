// Auto Created at 2019/10/12 12:36:45
!function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.demo_util = factory();
    }
}(this, factory);

function factory() {
    let demo_util = {};
    demo_util.version = '1.0';
    return demo_util;
}