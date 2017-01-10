/**
 * 1 读取要抓取的网页内容
 * url：http://baijia.baidu.com/?tn=listarticle&labelid=107
 */
let request = require('request');
let iconv = require('iconv-lite');
let debug = require('debug')('crawl:read');
let cheerio = require('cheerio');

module.exports = function (url, callback) {
    request({
        url: url,
        enconing: null
    }, function (err, response, body) {
        if (err) {
            debug('抓取失败：' + err);
        }
        else {
            if (response.statusCode === 200) {
                //body = iconv.decode(body, 'gbk');

                //使用cheerio模块操作body
                let needs = [];//把需要的内容存储在这个数组里
                let $ = cheerio.load(body);
                $('#feeds .feeds-item').each(function () {
                    let $this = $(this);
                    let item = {
                        imgUrl: $this.find('img').attr('src'),
                        title: $this.find('h3 a').text(),
                        titleUrl: $this.find('h3 a').attr('href'),
                        content: $this.find('.feeds-item-text1').text()
                    };
                    debug('读取：' + item.title);
                    needs.push(item);
                });
                debug('读取数据完毕');
                callback(null,needs);
            }
        }
    });
};
/*
module.exports(url, function (data) {
    console.log(data);
    debug('数据读取完毕')
})*/
