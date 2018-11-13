<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/marketingPlanManage/allPlan">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-show="breadcrumbArr.length" v-for="(item, index) in breadcrumbArr" :key="index" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbArr: []
    }
  },
  watch: {
    $route(newVal, oldVal) {
      this.setBreadcrumb()
    }
  },
  activated() {
    this.setBreadcrumb()
  },
  methods: {
    setBreadcrumb() {
      this.breadcrumbArr = this.$route.meta.routeList
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb{
  overflow: hidden;
  background: #eee;
  padding: 10px;
  // margin-bottom: 10px;
  box-shadow: 0 1px 3px #ddd;
  // margin: -10px -10px 10px -10px;
  .el-breadcrumb{
    margin-bottom: 0;
  }
}
</style>
