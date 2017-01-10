## 爬虫

### 用到的第三方模块
- request：发出http请求获取指定网页中的内容
- iconv-lite: 使用iconv-lite的decode()把gbk编码的buffer转换为utf-8的字符串
    * 参数&用法：
    ```
    request({
        url:指定网页地址
        encoding: 为null，则body会保留原始的buffer类型
    },function(err,response,body){
        body为抓取到的网页内容
        require('iconv-lite').decode(body,'gbk'); //输出 utf-8
    });
    ```
- cheerio: 在服务器端实现了jQuery中DOM操作的API 
    * 用法：
    ```
    var $ = require('cheerio').load('<div>这里是抓取的html字符串</div>')
    通过$('div')就可以实现像jQuery一样的DOM操作
    ```
- cron: 周期性执行某个任务
    * 用法：
    ```
    var cronJob = require('cron').CronJob;
    //第一个参数'* * * * * *' （*表示所有可能的值）
    //对应：   秒 分 时 几号 几月 星期几 
    //
    var job1 = new cronJob('* * * * * *',function(){
        //要执行的任务
    });
    job1.start();
    ```
- debug: 打印日志
    ```
    require('debug')('项目名字:模块名字');
    //windows set DEBUG=项目名字:*（通配符）
    //linux export DEBUG=项目名字:*（通配符）
    ```
- async:流程控制库，解决嵌套方案
    ```
    //1 串行：
    series([fn,fn,fn],callback); //fn按顺序执行
    //
    //2 并行：
    parallel([fn,fn,fn], callback); //fn同时执行
    //
    //3 瀑布：
    waterfall([fn,fn,fn],callback); //fn按顺序执行，前一次的结果传给下一次的fn的第一个参数
    //
    //4 forEach:
    let arr = [{name: 1}, {name: 2}, {name: 3}];
    async.forEach(arr, function (item, cb) {
        console.log(item.name); //遍历数组每一项 打印出 每一项的name
        cb();//遍历完成后，调用回调函数执行下面的函数,打印出 ‘遍历完成’
    }, function () {
        console.log('遍历完成');
    });
    ```
- 渲染页面使用的模块：
    ```
    npm install express bootstrap ejs 
    ```
## 步骤
- 1 创建read.js模块，读取内容
- 2 定义数据库模型，用来存储读取的内容
- 3 创建save.js模块，保存内容到数据库
- 4 创建main.js入口文件，把任务链接起来，计划任务
- 5 编写模板，用来展示抓取到的数据
- 6 创建服务，把数据库的数据渲染到html页面上
- 7 使用cron模块每隔1小时去爬一下网页，更新数据