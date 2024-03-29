

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const SLAT_WORK_FACTOR = 10;

let ObjectId = Schema.Types.ObjectId;

// 创建userSchema
const UserSchema = new Schema({
  userId: ObjectId,
  username: {type:String, unique: true},
  password: String,
  createAt: {type: Date,default: Date.now()},
  lastLoginAt: { type: Date,default: Date.now()}


})

// 
UserSchema.pre('save',function(next){
  bcrypt.genSalt(SLAT_WORK_FACTOR,(err,salt)=>{
    if(err) return next(err);
    bcrypt.hash(this.password,salt,(err,hash)=>{
      if(err) return next(err);
      this.password = hash;
      next();

    })
  })
})


// 比对密码
UserSchema.methods = {
  comparePassword: (_password,password)=>{
    return new Promise((resolve,reject)=>{
      bcrypt.compare(_password,password,(err,isMatch)=>{
        if(!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

// 发布模型
mongoose.model('User',UserSchema);

