<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">活动类型选择</h3>
    </div>
    <div class="create-home-body">
      <div class="item" @click="handleCreateNext('noCoupon')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>无券活动</strong>
        <p class="en">No Coupon Activities</p>
      </div>
      <div class="item" @click="handleCreateNext('linkPrize')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>链接领奖活动</strong>
        <p class="en">Link Award Activities</p>
      </div>
      <div class="item" @click="handleCreateNext('outsideCalls')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>外部调用发奖活动</strong>
        <p class="en">External Prize Activities</p>
      </div>
      <div class="item" @click="handleCreateNext('returnCalls')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>后返活动</strong>
        <p class="en">Return Activities</p>
      </div>
    </div>
    </el-tabs>
  </section>
</template>

<script>
export default {
  name: 'createActivityHome',
  data() {
    return {
      activeCollapse: '1',
      activeCollapse2: '2'
    }
  },
  activated() {},
  methods: {
    handleChangeCollapse() {},
    handleCreateNext(type) {
      let types = {
        'noCoupon': '/marketingPlanManage/createNoCouponActivity',
        'outsideCalls': '/marketingPlanManage/createExtraActivityAddPrize',
        'returnCalls': '/marketingPlanManage/createReturnActivity',
        'linkPrize': '/marketingPlanManage/createLinkPrizeActivity'
      }
      this.$router.push({
        path: types[type],
        query: {
          planId: this.$route.query.planId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
