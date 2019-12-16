import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:9999';

export const getTreeList = ()=>{
  return axios.get('/getTreeList');
}