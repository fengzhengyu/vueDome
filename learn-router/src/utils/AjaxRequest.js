import axios from 'axios';


let instance = axios.create({
  baseURL:'http://localhost:3000/api',
  timeout: 1000
})

const Http = {

}