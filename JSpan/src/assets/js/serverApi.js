
const BASEURL= 'http://www.ey99.com/ddyk/Api/';
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getIndex: BASEURL + 'Goods/selectGoodsIndex',
  registerUser: LOCALURL+'user/register',
  login:  LOCALURL+'user/login'
}

module.exports = URL;