<template>
  <div id="app">
    <el-container>
      <el-header>
        <!-- <router-link to="/">首页</router-link>
        <router-link to="/profile">个人中心</router-link>
        <router-link to="/user">用户界面</router-link>-->
        <el-menu
         
          class="el-menu-demo"
          mode="horizontal"
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
         
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/profile">个人中心</el-menu-item>
          <el-menu-item index="/user">用户界面</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <TreeVue :data.sync="data"
          :fileDrop="fileDrop"
          :directoryDrop="directoryDrop"
        ></TreeVue>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script>
import TreeVue from './components/ElementTree';
import { getTreeList } from './assets/api.js'
import { constants } from 'fs';
export default {
  components: {
    TreeVue
  },
  data(){
    return {
      data:[],
      fileDrop:[
        {text:'rm',value:'删除文件'}
      ],
      directoryDrop:[
        {text:'rn',value:'修改名字'},
        {text:'rm',value:'删除文件夹'}
      ]
    }
  },
  async mounted() {
    let{data} =  await getTreeList();

    // 给父数据-及文件夹 设置标记
    data.parent.forEach(p => p.type="parent");
    // 合并成一条数据
    this.data = [...data.parent,...data.child];
  },
}
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}



.el-main {
  background-color: #e9eef3;
  color: #333;

  min-height: calc(100vh - 120px);
}
</style>
