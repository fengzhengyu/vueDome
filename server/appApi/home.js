const Router = require('koa-router');
let router = new Router();
router.get('/',async(ctx)=>{
  ctx.body= '这是首页'
})

router.get('/register',async(ctx)=>{
  ctx.body= '这是注册页面'
})

module.exports = router;