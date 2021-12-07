const mongoose = require('mongoose');
const chalk = require('chalk')
const {err} = require('./logger');

// const DB_URL = 'mongodb://192.168.31.130:27017/article';
const DB_URL = 'mongodb://192.168.31.130:27017/article';
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log(chalk.greenBright(`connected to ${DB_URL}`));
});

mongoose.connection.on('error', ()=>{
  err.error('数据库连接异常')
})

module.exports = mongoose;
