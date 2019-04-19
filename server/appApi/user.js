const Router = require('koa-router');
const mongoose =require('mongoose')
let router = new Router();
router.get('/',async(ctx)=>{
  ctx.body= '这是首页'
})

router.post('/register',async(ctx)=>{
  console.log(ctx.request.body)
  ctx.body= ctx.request.body

  const User  = mongoose.model('User');
  let newUser = new User(ctx.request.body)
  await newUser.save().then((err)=>{
    console.log(err)
    ctx.body={
      code: 200,
      msg: '注册成功'
    }
  })
  .catch(err=>{
    ctx.body={
      code: 500,
      msg: '服务器错误'
    }
  })
})
// 
router.post('/login',async(ctx)=>{
  console.log(ctx.request.body)
  let loginUser= ctx.request.body;
  let username = loginUser.username;
  let password = loginUser.password;

  // 引入user model
  const User  = mongoose.model('User');
  await User.findOne({username:username}).exec().then(async(result)=>{
    console.log(result);
    if(result){
      let newUser = new User()
      await newUser.comparePassword(password,result.password).then((isMatch)=>{
        ctx.body={
          code: 200,
          msg:isMatch
        }
      }).catch(err=>{
        console.log(err)
      })

    }else{
      ctx.body={
        code: 200,
        msg:'用户名不存在'
      }
    }

  }).catch(err=>{
    ctx.body={
      code: 500,
      msg:err
    }
  })

})
module.exports = router;
