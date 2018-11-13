<template>
  <div class="not-fount">
     <div class="content"><span class="icon el-icon-search"></span>{{msg}}</div>
     <el-button type="primary" @click="prevPage">返回上一页</el-button>
  </div>
</template>

<script>
export default {
  name: 'not_found',
  data() {
    return {
      msg: '抱歉，您访问的页面不存在'
    }
  },
  beforeRouteLeave(to, from, next) {
    next()
  }
}
</script>
<style lang="scss" scoped>
.not-fount {
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  position: relative;

  color: #bbb;
  .content {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .icon {
    font-size: 28px;
    margin-right: 10px;
  }
}
</style>
