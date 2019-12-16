<template>
  <div>
    <el-tree :data="allData"></el-tree>
  </div>
</template>
<script>
import _ from "lodash";

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      allData: []
    }
  },
  watch: {
    data(){ //监视父组件的数据
       this.transformData();
    }
  },
  methods: {
    // transformData() {
    //   // 子组件不能操作父组件数据
    //   // 重新组合一个对象数据 reduce

    //   let treeMapList = this.data.reduce((obj, current) => {
    //     //累积到obj

    //     obj[current.id] = current;
    //     return obj;
    //   }, {}); //参数二 {} 是 obj 的默认值

    //   // 看每个对象中的pid 与 treeMapList 中的id 相等，若相等 就说明是 child 的数据
    //   let result = this.data.reduce((arr, current) => {
    //     let pid = current.pid;
    //     let parent = treeMapList[pid];
    //     if (parent) {
    //       parent.children
    //         ? parent.children.push(current)
    //         : (parent.children = [current]);
    //     } else if (pid == 0) {
    //       arr.push(current);
    //     }
    //     return arr;
    //   }, []);
    // }
     transformData() {
      // 子组件不能操作父组件数据  深度克隆数据
      
      let allData  = _.cloneDeep(this.data)
      let treeMapList =allData.reduce((obj, current) => {//累积到obj
        current.label = current.name;  //修改字段名 与 ui库字段匹配
        obj[current.id] = current;
        return obj;
      }, {}); //参数二 {} 是 obj 的默认值

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
    }
  },
  mounted(){
      this.transformData(); //暂无数据 是因为 axios 属于异步请求  需要监视数据请求回来，调用
  }
};
</script>
<style>
</style>

