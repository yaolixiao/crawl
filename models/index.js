/**
 * 2 定义数据库模型
 */
let mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://127.0.0.1/node');

let newsSchema = new mongoose.Schema({
    imgUrl: String,
    title: String,
    titleUrl: String,
    content: String
});

exports.News = mongoose.model('News', newsSchema);