
const Koa = require('koa');

const app = new Koa();
const mongoose =require('mongoose');
const {connect,initSchemas} = require('./database/init.js');

(async ()=>{
  await connect();
  initSchemas();
  const User = mongoose.model('User');
  // console.log(User)
  let oneUser = new User({username: 'fengheng4',password: '123456'})
  oneUser.save().then(()=>{
    console.log('插入成功')
  })

  // let user = await User.find({}).exec();

  // console.log(user)

})()
app.use(async (ctx)=> {
  ctx.body='<h1>hello koa2</h1>'
})
app.listen(3000,()=>{
  console.log('Server starting at port 3000 ')
})
