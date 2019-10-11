let fs = require("fs-extra");
let file_util = require("../utils/file_util");
let regexp_util = require("../utils/regexp_util");

let format_redis_conf = async function () {
    let redis_replicas_dir = 'D:\\Dev\\Redis_replicas';
    let files = await file_util.listFiles(redis_replicas_dir, {
        keyword_filename: '^redis.windows.conf',
        keyword_filepath: '\\\\Redis_6381',
        keyword_regexp: true,
        fileonly: false,
        directiononly: false,
        recursion: true,
    });

    // return files;

    console.log(files.length, files.map(item => {
        return item.filepath;
    }));
    files.forEach(async (item) => {
        let filepath = item.filepath;
        let filecontent = await fs.readFile(filepath);

        filecontent = filecontent.toString().replace(/#.*/ig, '');// 替换#开头的整行

        filecontent = regexp_util.formatEOL(filecontent);// 替换多个回车为1个
        console.log(filecontent);
        // await fs.outputFile(filepath, filecontent);
    })
};

format_redis_conf().then(files => {
    if (files) console.log(files);
}).catch(err => {
    console.error(err)
});