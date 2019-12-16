<template>
  <div>
    <el-container>
      <el-aside>
        <el-row >
          <el-col :span="4"></el-col>
          <el-col :span="20">
            <el-menu mode="vertical" :router="true">
              <el-menu-item index="/user/add">用户添加</el-menu-item>
              <el-menu-item index="/user/list">用户列表</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
