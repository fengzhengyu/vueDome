
const Koa = require('koa');

const app = new Koa();
const mongoose =require('mongoose');
const bodyParser = require('koa-bodyparser');
var cors = require('koa2-cors');
const {connect,initSchemas} = require('./database/init.js');
const Router = require('koa-router');

// 
app.use(bodyParser());
app.use(cors());

let user = require('./appApi/user.js')  
let home = require('./appApi/home.js')  
let goods = require('./appApi/goods.js')  
// 装载子路由
let  router = new Router();
router.use('/user',user.routes());
router.use('/home',home.routes());
router.use('/goods',goods.routes());
// 加载路由中间键
app.use(router.routes());
app.use(router.allowedMethods());

(async ()=>{
  await connect();
  initSchemas(); //

})()
app.use(async (ctx)=> {
  ctx.body='<h1>hello koa2</h1>'
})
app.listen(3000,()=>{
  console.log('Server starting at port 3000 ')
})
