<template>
  <div class="not-data pv text-center">
    <slot name="loading"></slot>
    <p class="text"><span class="el-icon-info"></span>{{text}}~</p>
    <slot name="btns"></slot>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      text: '努力加载中...'
    }
  }
}
</script>

<style lang="scss">
.not-data {
  margin-bottom: 20px;
  padding: 30px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  color: #ccc;
  .el-icon-info {
    font-size: 14px;
    margin-right: 5px;
  }
}
</style>
