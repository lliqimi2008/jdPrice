<template>
  <transition name="fade">
    <div class="loading" :style="'line-height:' + height + 'px'">
      <span class="el-icon-loading"></span>拼命加载中...
    </div>
  </transition>
</template>

<script>
export default {
  // 名称命或规范使用-分隔（必须，否则无法注册）
  name: 'app-loading',
  components: {},
  props: {
    height: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang='scss' scoped>
.loading{
  position: absolute;
  z-index: 1000;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #eee;
  border-radius: 5px;
  text-align: center;
  color: #409EFF;
  font-size: 14px;
  .el-icon-loading{
    margin-right: 2px;
    font-size: 16px;
    color: #409EFF;
  }
}
</style>
