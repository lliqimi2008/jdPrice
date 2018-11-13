<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">创建预算奖品</h3>
    </div>
    <div class="create-home-body">
      <div class="item" @click="handleCreateNext('createCoupons')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>通用优惠券</strong>
        <p class="en">General Coupon Prizes</p>
      </div>
      <div class="item" @click="handleCreateNext('reduce')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>支付立减</strong>
        <p class="en">Pay Reduction Prizes</p>
      </div>
      <!--<div class="item">
        <span class="icon el-icon-edit-outline"></span>
        <strong>鼓励金</strong>
        <p class="en">Encourage gold Prizes</p>
      </div>-->
      <div class="item" @click="handleCreateNext('activeCoupons')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>激活优惠券</strong>
        <p class="en">Active Coupon Prizes</p>
      </div>
    </div>
    </el-tabs>
  </section>
</template>

<script>
export default {
  name: 'createBudgetHome',
  data() {
    return {}
  },
  activated() {
    console.log(this.$route.query.budgetCode)
  },
  methods: {
    handleCreateNext(type) {
      let urls = {
        path: '/marketingPlanManage/createCoupons',
        query: {
          planId: this.$route.query.planId,
          budgetId: this.$route.query.budgetId,
          thresholdAlarm: this.$route.query.thresholdAlarm,
          code: this.$route.query.budgetCode,
          settleConfigId: this.$route.query.settleConfigId || ''
        }
      }
      if (type === 'createCoupons') {
        // 通用优惠券
        urls.query.type = '1'
      }
      if (type === 'activeCoupons') {
        // 激活优惠券
        urls.query.type = '2'
      }

      if (type === 'reduce') {
        // 立减优惠券
        urls.path = '/marketingPlanManage/createPayReduce'
      }

      this.$router.push(urls)
    }
  }
}
</script>

<style lang="scss" scoped>
.create-budget-home {
  &::after {
    content: '';
    display: block;
    clear: both;
  }
  .content-header {
    height: 50px;
    overflow: hidden;
    border-bottom: 1px solid #dddddd;
    span {
      float: left;
      color: #606266;
      font-size: 24px;
      line-height: 50px;
      margin: 0 0 0 10px;
    }
  }
}
</style>
