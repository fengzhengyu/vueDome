
export default {
  namespaced:true, //指定命名空间
  state: {
    userName:'我是user'
  },
  mutations: {
    change_name(state,payload){
      state.userName = payload;
    }
  },
  actions: {

  },
  getters: {
    getUserName(state){
      return  'my '+state.userName;
    }
  }
}