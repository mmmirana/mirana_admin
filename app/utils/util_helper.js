let util = require("./util");

let createUtil = async function () {
    await util.createBackendUtilfile("demo_util", "", true);
    await util.createFrontendUtilfile("demo_util", "", true);
};

createUtil().then(result => {
    if (result) console.log(result);
}).catch(err => {
    console.error(err);
});
