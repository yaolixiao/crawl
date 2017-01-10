/**
 * 3 把内容写入到数据库
 */
let News = require('../models').News;
let debug = require('debug')('crawl:save');
let async = require('async');

module.exports = function (data, callback) {
    //先把数据库清空，在写入数据，防止数据重复
    News.remove({}, function () {
        //引入async，使用forEach方法遍历data每一项
        async.forEach(data, function (item, callback) {
            //把每一项写入数据库
            News.create(item, function (err, result) {
                debug('保存：' + item.title);
                callback();
            })
        }, function () {
            debug('所有数据保存完毕');
            callback();
        })
    })
}