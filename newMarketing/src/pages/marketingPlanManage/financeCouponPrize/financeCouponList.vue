<template>
  <section class="create-activity-home">
    <div class="pub-sm-title clear">
      <h3 class="fl">创建金融业务品类奖品</h3>
    </div>
    <div class="coupon-list clear">
      <div class="coupon-category">
        <strong>选择奖品大类</strong>
      </div>
      <div class="create-home-body">
        <div v-for="item in allCategorys" :key="item.value">
          <div class="item" @click="createFinanceCoupon(item.value, item.name)" style="margin-left: 15px;">
            <span class="icon el-icon-edit-outline"></span>
            <strong>{{item.name}}优惠券</strong>
            <p class="en"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  findAllCategory
} from 'api/service'

export default {
  name: 'createActivityHome',
  data() {
    return {
      allCategorys: ''
    }
  },
  activated() {
    this.findAllCategory()
  },
  methods: {
    createFinanceCoupon(value, name) {
      this.$router.push({
        path: '/marketingPlanManage/financeCouponPrize/createOrUpdateFinanceCoupon',
        query: {
          planId: this.$route.query.planId,
          bigCategory: value,
          bigCategoryName: name
        }
      })
    },
    findAllCategory() {
      findAllCategory()
        .then(res => {
          let data = res || {} 
          this.allCategorys = data
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.coupon-list {
  border:1px solid #ddd;
  padding-bottom: 20px;
}
.coupon-list .coupon-category {
  border-bottom: 1px solid #ddd; margin-top: 10px; padding-bottom: 10px;
}
.coupon-list .coupon-category strong {
  margin-left: 10px; font-size: 16px;
}
</style>
