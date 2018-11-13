<template>
  <div class="">
    <div class="pub-sm-title clear">
      <h3>通用优惠券配置</h3>
    </div>
    <!--
      规则弹窗 02: 奖项
      规则弹窗 03: 奖品
      showRuleType: 显示规则类型(规则、规则组) single/group
    -->
    <rules-index showRuleType="single" ruleType="03"></rules-index>
    <!-- <rules-index showRuleType="group" ruleType="03"></rules-index> -->
    <div class="btns mar-b-30">
      <el-button type="primary" size="small" @click="saveRule">保存</el-button>
    </div>
  </div>
</template>

<script>
import rulesIndex from 'components/rulesPop'
export default {
  name: '',
  components: {
    rulesIndex
  },
  data() {
    return {}
  },
  created() {},
  deactivated() {
    this.$destroy(true)
  },
  methods: {
    saveRule() {
      this.$router.push({
        path: '/marketingPlanManage/planDetail',
        query: {
          planId: this.$route.query.planId
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
