<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl" >新增金融业务/其它奖品</h3>
    </div>
    <div class="pub-sm-title clear" style=" padding-bottom: 4px;">
      <h4 class="fl">创建无预算奖品</h4>
    </div>
    <div class="create-home-body">
      <el-button class="item" @click="createNextNoBudget('vaultRedEnvelope')" v-hasPermissions="'marketingPlanManage:planDetail:vaultRedEnvelope'">
        <span class="icon el-icon-edit-outline"></span>
        <strong>小金库红包</strong>
      </el-button>
      <el-button class="item" v-hasPermissions="'marketingPlanManage:planDetail:metroplisBean'" @click="createNextNoBudget('metroplisBean')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>京豆</strong>
      </el-button>
      <el-button class="item" v-hasPermissions="'marketingPlanManage:planDetail:iousTicket'" @click="createNextNoBudget('iousTicket')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>白条劵</strong>
      </el-button>
      <el-button class="item" v-hasPermissions="'marketingPlanManage:planDetail:metroplisTicket'" @click="createNextNoBudget('metroplisTicket')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>京券</strong>
      </el-button>
      <el-button class="item" v-hasPermissions="'marketingPlanManage:planDetail:eastTicket'" @click="createNextNoBudget('eastTicket')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>东券</strong>
      </el-button>
      <el-button class="item" v-hasPermissions="'marketingPlanManage:planDetail:physicalPrize'" @click="createNextNoBudget('physicalPrize')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>实物奖</strong>
      </el-button>
      <el-button class="item" v-hasPermissions="'marketingPlanManage:planDetail:thirdPartyPrize'" @click="createNextNoBudget('thirdPartyPrize')">
        <span class="icon el-icon-edit-outline"></span>
        <strong>外部奖品</strong>
      </el-button>
      <div class="clear"></div>
    </div>
    <div class="pub-sm-title clear" style=" padding-bottom: 4px;">
      <h4 class="fl">创建金融业务奖品</h4>
    </div>
    <div class="coupon-list clear">
      <div class="create-home-body">
        <div v-for="item in allCategorys" :key="item.value">
          <div class="item" @click="createFinanceCoupon(item.value, item.name)">
            <span class="icon el-icon-edit-outline"></span>
            <strong>{{item.name}}优惠券</strong>
            <p class="en"></p>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    </el-tabs>
  </section>
</template>

<script>
import {
  findAllCategory
} from 'api/service'
export default {
  name: 'noBudgetPrizeList',
  data() {
    return {
      activeCollapse: '1',
      activeCollapse2: '2',
      allCategorys: ''
    }
  },
  activated() {
    this.findAllCategory()
  },
  methods: {
    // 理财券开始
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
    },
    // 理财券结束
    createNextNoBudget(type) {
      let types = {
        // 小金库红包
        'vaultRedEnvelope': '/marketingPlanManage/vaultRedEnvelope',
        // 京豆
        'metroplisBean': '/marketingPlanManage/metroplisBean',
        // 白条劵
        'iousTicket': '/marketingPlanManage/iousTicket',
        // 京券
        'metroplisTicket': '/marketingPlanManage/metroplisTicket',
        // 东券
        'eastTicket': '/marketingPlanManage/eastTicket',
        // 实物奖
        'physicalPrize': '/marketingPlanManage/physicalPrize',
        // 第三方奖品
        'thirdPartyPrize': '/marketingPlanManage/thirdPartyPrize'
      }
      this.$router.push({
        path: types[type],
        query: {
          planId: this.$route.query.planId,
          auditStatus: this.$route.query.auditStatus
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.coupon-list {
  padding-bottom: 20px;
}
.coupon-list .coupon-category {
  border-bottom: 1px solid #ddd; margin-top: 10px; padding-bottom: 10px;
}
.coupon-list .coupon-category strong {
  margin-left: 10px; font-size: 16px;
}
.create-home-body{ padding-bottom: 20px; margin-bottom: 10px;}
.item{ margin-bottom: 8px;}
h4{ font-size: 16px;}
</style>