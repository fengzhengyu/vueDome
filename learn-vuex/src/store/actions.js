export default {
  // action 里面调用 commit  
  change_room({commit},payload){
   
    setTimeout(()=>{
      commit('change_room',payload)
    },2000)
  }
}