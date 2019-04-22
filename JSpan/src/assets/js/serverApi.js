
const BASEURL= 'http://www.ey99.com/ddyk/Api/';
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getIndex: BASEURL + 'Goods/selectGoodsIndex',
  registerUser: LOCALURL+'user/register',
  login:  LOCALURL+'user/login',
  hotGoodsList: LOCALURL+ 'goods/getHotGoodsList',  //热卖商品
  goodsDetail:  LOCALURL+'goods/getDetailGoodsInfo', // 商品详情
  categoryList: LOCALURL+'goods/getCategoryList', //大分类数据
  categorySubList: LOCALURL+'goods/getCategorySubList', //小分类数据

  getCategorySubData: LOCALURL + 'goods/getCategorySubData', //根据类别获取商品列表


}

module.exports = URL;