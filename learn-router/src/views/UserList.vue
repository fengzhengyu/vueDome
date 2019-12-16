<template>

  <div>
 
  <el-table
    :data="tableData"
    style="width: 100%"
   >
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="用户名"
     >
    </el-table-column>
      <el-table-column
   
      label="操作"
      width="100">
      <template slot-scope="scope">
      
        <router-link :to="`detail/${scope.row.id}`" size="small">详情</router-link>
      
      </template>
    </el-table-column>
    
  </el-table>
  </div>
</template>
<script>
export default {
  data(){
    let tableData = JSON.parse(localStorage.getItem('lists'));
    return {
      tableData
    }
  }
}
</script>

