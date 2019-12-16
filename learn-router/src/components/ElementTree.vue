<template>
  <div>
    <el-tree :data="allData"
      :render-content="render"
      default-expand-all
      :expand-on-click-node="false"
    ></el-tree>
  </div>
</template>
<script>
import _ from "lodash";
import { constants } from 'fs';

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    fileDrop: Array,
    directoryDrop:Array
  },
  data(){
    return {
      allData: [],
      currentId: '' ,//当前点击元素的id
      currentContent: '' , //当前输入的内容
    }
  },
  watch: {
    data(){ //监视父组件的数据
       this.transformData();
    }
  },
  
  methods: {
   
    handleCommand(data,value){
      // console.log(data,value)
      if(value == 'rn'){
        this.handleRename(data);
      }else if(value == 'rm'){
        this.handleRemove(data)
      }
    },
    isParent(data){
        return data.type == 'parent'
    },
    // 修改名字
     handleRename(data){
       this.currentId = data.id;
       this.currentContent = data.label;
    },
    // 删除文件
     handleRemove(data){
        let lists  = _.cloneDeep(this.data);
        lists = lists.filter(l=>l.id !==data.id);
        this.$emit('update:data',lists)
         this.$confirm(`此操作将永久删除该文件${data.label}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
    },
    // 绑定input
    handleInput(v){
      this.currentContent = v;
    },
    isOk(data){
      // 修改的值传给父组件
      let lists  = _.cloneDeep(this.data);
      let list = lists.find(item=>item.id == data.id);
      list.label = this.currentContent;
      this.$emit('update:data',lists)
      this.currentId = "";
      this.$message({
          message: '修改成功！',
          type: 'success'
        });

    },
    cancel(){
      this.currentId = "";
    },
     render(h,{node,data,store}){  //jsx  结合 render-content  template不会运行 
    //console.log(node)
      let list  =  this.isParent(data)?this.directoryDrop:this.fileDrop;
      return ( 
        <div style={{width:'100%'}}>
         {
           this.isParent(data)?node.expanded?<i class="el-icon-folder-opened"></i>:
          <i class="el-icon-folder"></i>:
          <i class="el-icon-document"></i>
         }
         {
           this.currentId === data.id? <el-input value={this.currentContent} on-input={this.handleInput}></el-input>: data.label
         }
         {
            this.currentId !== data.id?
          <el-dropdown on-command={this.handleCommand.bind(this,data)} trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              {
                list.map(item=>{
                    return  <el-dropdown-item command={item.text}>{item.value}</el-dropdown-item>
                })
              
              }
            </el-dropdown-menu>
          </el-dropdown>:<span>
          <el-button type="text" on-click={this.isOk.bind(this,data)}>确定</el-button>
          <el-button type="text" on-click={this.cancel}>取消</el-button>
          </span>

         }
       
      </div>)

    },
     transformData() {
      // 子组件不能操作父组件数据  深度克隆数据
      
      let allData  = _.cloneDeep(this.data)
    
      let treeMapList =allData.reduce((obj, current) => {//累积到obj
        current.label =  current.label || current.name;  //修改字段名 与 ui库字段匹配
        obj[current.id] = current;
        return obj;
      }, {}); //参数二 {} 是 obj 的默认值
      console.log( treeMapList)
      // 看每个对象中的pid 与 treeMapList 中的id 相等，若相等 就说明是 child 的数据
      let result = allData.reduce((arr, current) => {
        let pid = current.pid;
        let parent = treeMapList[pid];
        if (parent) {
          parent.children
            ? parent.children.push(current)
            : (parent.children = [current]);
        } else if (pid == 0) {
          arr.push(current);
        }
        return arr;
      }, []);

      this.allData = result;
    },
   
  },
  mounted(){
      this.transformData(); //暂无数据 是因为 axios 属于异步请求  需要监视数据请求回来，调用
  }
};
</script>
<style>
.el-dropdown{
  float: right;
}
.el-tree  .el-input{
  width: 200px;
  
}
.el-tree  .el-tree-node__content{
  height: 34px;
}
</style>

