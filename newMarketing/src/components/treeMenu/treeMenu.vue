<template>
  <div  ref="treemenu" class="tree-menu">
    <el-menu default-active="0-0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu :index="index+''" v-for="(item, index) in menuData" :key="index">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.text}}</span>
        </template>
        <el-menu-item :index="(index+'-'+idx)" v-for="(child, idx) in item.children" :key="idx">
          <router-link :to="child.url">{{child.text}}</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
/**
 * 接收权限菜单配置数据，并生成menu
 */
import store from 'store'

export default {
  name: 'navbar',
  data() {
    return {
      isCollapse: false,
      menuData: []
    }
  },
  mounted() {
    this.initHeight()
    this.menuData = store.state.menuList
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
    initHeight() {
      let treeMenu = this.$refs.treemenu
      let winHei = document.documentElement.offsetHeight || document.body.offsetHeight
      let breadcrumb = document.querySelector('.breadcrumb')
      treeMenu.style.height = (winHei - breadcrumb.offsetHeight) + 'px'
    }
  }
}
</script>
<style>
.tree-menu {
  width: 200px;
  height: 100%;
  float: left;
}
.el-submenu__title {
  font-weight:bold;
}
.el-submenu__title {
  padding: 0 10px !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}
.el-menu-item,
.el-submenu__title {
  height: 46px;
  line-height: 46px;
}
.el-submenu [class^='el-icon-'] {
  margin-right: 0;
}
.el-menu-vertical-demo {
  height: 100%;
  overflow-y: auto;
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
  padding: 0 !important;
}
.el-submenu .el-menu-item a {
  display: block;
  color: #666;
  padding: 0 10px 0 44px;
}
.el-menu-item.is-active {
  background: rgb(191, 203, 217);
}
.el-menu-item.is-active a {
  color: rgb(64, 158, 255);
}
</style>
