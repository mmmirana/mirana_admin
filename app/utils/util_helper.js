let util = require("./util");

let createUtil = async function () {
    await util.createBackendUtilfile("_demo_backend_util", "", true);
    await util.createFrontendUtilfile("_demo_frontend_util", "", true);
};

createUtil().then(result => {
    if (result) console.log(result);
}).catch(err => {
    console.error(err);
});
