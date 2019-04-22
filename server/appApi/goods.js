const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const mongoose = require('mongoose')
let router = new Router();

const fs = require('fs')

// 插入商品数据
router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {

    data = JSON.parse(data);

    const Goods = mongoose.model('Good');
    let count = 0;
    data.map((item, index) => {
      // console.log(item);
      let newGoods = new Goods(item);
      newGoods.save().then(() => {
        count++;
        console.log('成功' + count);

      }).catch(err => {
        console.log(MediaEncryptedEvent)
      })
    })

  })
  ctx.body = '开始导入数据'
})

// 插入大分类数据

router.get('/insertCategoryInfo', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let Category = mongoose.model('Category')

    mongoose.model('Category')
    data.RECORDS.map((item, i) => {
      let newCategory = new Category(item);

      newCategory.save().then(() => {
        console.log('成功');
      }).catch(err => {
        console.log(MediaEncryptedEvent)
      })
    })
  })
  ctx.body = '开始导入分类数据'
})

// 插入小分类数据
router.get('/insertCategorySubInfo', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let CategorySub = mongoose.model('CategorySub')

    mongoose.model('Category')
    data.RECORDS.map((item, i) => {
      let newCategorySub = new CategorySub(item);

      newCategorySub.save().then(() => {
        console.log('成功');
      }).catch(err => {
        console.log(MediaEncryptedEvent)
      })
    })
  })
  ctx.body = '开始导入小分类数据'
})

// 获取热卖商品的的数据
router.post('/getHotGoodsList', async (ctx) => {
  try {
    let page = ctx.request.body.page,
      num = ctx.request.body.num || 10,
      start = (page - 1) * num;

    const Goods = mongoose.model('Good');
    let result = await Goods.find({
        GOOD_TYPE: 1
      })
      .skip(start).limit(num).exec();

    let count = await Goods.count({
      GOOD_TYPE: 1
    });
    // console.log(count)
    ctx.body = {
      code: 200,
      message: result,
      count: count
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }

})


//**获取商品详情信息的接口

router.post('/getDetailGoodsInfo', async (ctx) => {

  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Good')
    // console.log(goodsId)
    let result = await Goods.findOne({
      ID: goodsId
    }).exec();

    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }

})
//**获取大分类数据的接口

router.get('/getCategoryList', async (ctx) => {
  try {

    const Category = mongoose.model('Category');
    let result = await Category.find().exec();
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

//**获取小分类数据的接口
router.post('/getCategorySubList', async (ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId;
    const CategorySub = mongoose.model('CategorySub');
    let result = await CategorySub.find({
      MALL_CATEGORY_ID: categoryId
    }).exec();
    console.log(categoryId)
    ctx.body = {
      code: 200,
      message: result
    }
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }
})

// /**根据类别获取商品列表 */
router.post('/getCategorySubData', async (ctx) => {
  try {
    let categorySubId  = ctx.request.body.categorySubId ;
    let page = ctx.request.body.page , //当前页数
    num = ctx.request.body.num || 10;
    let start = (page-1)*num  //开始位置

    const Goods = mongoose.model('Good')
    let result = await Goods.find({SUB_ID:categorySubId})
    .skip(start).limit(num).exec()
    ctx.body={code:200,message:result}
    
  } catch (error) {
    ctx.body = {
      code: 500,
      message: error
    }
  }

})


module.exports = router;