let util = require("./util");

let createUtil = async function () {
    await util.createBackendUtilfile("ctx_util");
    await util.createFrontendUtilfile("ctx_util");
};

createUtil().then(result => {
    console.log(result);
}).catch(err => {
    console.error(err);
});
