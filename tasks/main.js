/**
 * 入口文件，计划任务
 */
let readNews = require('./read');
let saveNews = require('./save');
let async = require('async');
let debug = require('debug')('crawl:main');
let url = 'http://baijia.baidu.com/?tn=listarticle&labelid=103';

module.exports = function () {
    async.waterfall([
        function (cb) {
            readNews(url, cb);
        },
        function (items, cb) {
            saveNews(items, cb);
        }
    ], function (err, result) {
        debug('任务已完成');
        //process.exit(0);  //退出node进程
    });
}