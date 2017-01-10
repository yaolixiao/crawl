let express = require('express');
let app = express();

//设置模板引擎
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').__express);

//设置静态资源文件存放目录
app.use(express.static(__dirname));

//使用路由
let indexHTML = require('./routes');
app.use('/', indexHTML);

app.listen(8080, function () {
    console.log('server is running on 8080 ports');
})

// 使用cron模块每隔一段时间去爬一下网页，更新数据库
let cronJob=require('cron').CronJob;
let main=require('./tasks/main');
let job = new cronJob('*/30 * * * * *',function(){
    main();
});
job.start();