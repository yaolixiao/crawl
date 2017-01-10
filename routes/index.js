/**
 * 把数据渲染到视图上 ejs模板：views/index.html
 */
let express = require('express');
let router = express.Router();
let News = require('../models').News;

router.get('/', function (req, res, next) {
    //从数据库中查找所有数据
    News.find({}, function (err, results) {
        console.log(results)
        res.locals.pageTitle = '爬虫';
        res.render('index', {results});
    });
});

module.exports = router;