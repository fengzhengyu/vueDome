
const mongoose = require('mongoose');
const db = 'mongodb://localhost/jspan';
const glob = require('glob')
const { resolve  } = require('path');

exports.initSchemas = ()=>{
  // 加载所有schema
  glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}


exports.connect = ()=>{
  // 连接数据库
    mongoose.connect(db);
    let maxConnectNum = 0;

    return new Promise((resolve,reject)=>{
       // 监听事件
      mongoose.connection.on('disconnected',()=>{
        console.log('数据库断开');

        if(maxConnectNum<=3){
          mongoose.connect(db);
          maxConnectNum++;
        }else{
          reject();
           throw new Error('数据库错误，程序无法搞定，请人为修理。。。')
        }
       

      })
      mongoose.connection.on('error',(err)=>{
        console.log('数据错误');
        if(maxConnectNum<=3){
          mongoose.connect(db);
          maxConnectNum++;
        }else{
          reject(err);
           throw new Error('数据库错误，程序无法搞定，请人为修理。。。')
        }
      })
      mongoose.connection.once('open',()=> {
        //一次打开记录
        console.log('数据连接成功');
        resolve()
      });
    })

   
}