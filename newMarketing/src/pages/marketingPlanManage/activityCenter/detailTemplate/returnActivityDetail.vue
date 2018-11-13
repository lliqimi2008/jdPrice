<template>
  <div class="activity-detail">
    <div class="pub-sm-title clear">
      <h3 class="fl">后返活动详情</h3>
      <el-row class="fr">
        <el-button size="mini" type="primary" @click="editActivity" v-hasPermissions="'plan:*:*'">编辑</el-button>
        <!--<el-button v-show="data.activityStatus === 'EDITING' ? true : false" size="mini" type="primary" @click="editActivity">编辑</el-button>-->
        <!--<el-button v-show="data.activityStatus === 'AUDITED' ? true : false" size="mini" type="primary" @click="editActivity">编辑</el-button>-->
        <!--<el-button v-show="data.activityStatus === 'AUDITING_FAIL' ? true : false" size="mini" type="primary" @click="editActivity">编辑</el-button>-->
        <!--<el-button v-show="data.activityStatus === 'TEST_PASS' ? true : false" size="mini" type="primary" @click="editActivity">编辑</el-button>-->
        <!--<el-button v-show="data.activityStatus === 'TEST_FAIL' ? true : false" size="mini" type="primary" @click="editActivity">编辑</el-button>-->
        <!--<el-button v-show="data.activityStatus === 'PRE_ONLINE' ? true : false" size="mini" type="primary" @click="editActivity">编辑</el-button>-->
        <!-- <el-button size="mini" type="primary">活动数据</el-button>
        <el-button size="mini" type="primary">发起审核</el-button>
        <el-button size="mini" type="primary">测试</el-button>
        <el-button size="mini" type="primary">测试通过</el-button>
        <el-button size="mini" type="primary">暂停</el-button>
        <el-button size="mini" type="primary">上线</el-button> -->
      </el-row>
    </div>
    <div class="pv bg-pad-border">
      <app-loading :height="270" v-if="!data.activityId"></app-loading>
      <el-row>
        <el-col :span="12"><strong>活动id：</strong>{{data.activityId}}</el-col>
        <el-col :span="9"><strong>活动名称：</strong>{{data.activityName}}</el-col>
        <el-col :span="3"><strong>当前状态：</strong><span class="red">{{data.activityStatus | activityStatus}}</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>业务标识：</strong>{{data.bizTypeName}}</el-col>
        <el-col :span="10"><strong>活动优先级：</strong>{{data.priority}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>活动时间：</strong>{{data.startTime | formatDate('YYYY-MM-DD hh:mm:ss')}} / {{data.endTime | formatDate('YYYY-MM-DD hh:mm:ss')}}</el-col>
        <el-col :span="10"><strong>每日活动时间：</strong>{{data.perDayTimeArr | splitArr('|') || '不限'}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>每周活动日：</strong>{{perWeekTimeArr.substring(0, perWeekTimeArr.length - 1) || '不限'}}</el-col>
        <el-col :span="10"><strong>每月活动日：</strong>{{data.perMonthTimeArr | splitArr('|') || '不限'}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>活动商户：</strong>{{data.merchantNos ? data.merchantNos :'无'}}</el-col>
        <el-col :span="12"><strong>商户白名单：</strong>{{data.merchantWhitelists ? data.merchantWhitelists :'无'}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>活动内奖项发放限制：</strong>日{{data.sendLimitDay}} 周{{data.sendLimitWeek || '--'}} 月{{data.sendLimitMonth || '--'}} 总{{data.sendLimitTotal}}</el-col>
        <el-col :span="12"><strong>退款是否回收用户奖品：</strong>{{data.recoverRefunding === true ? '是' : '否'}}</el-col>
        <!-- <el-col :span="10"><strong>活动内奖项获取限制：</strong></el-col> -->
      </el-row>
      <el-row>
        <el-col :span="12"><strong>活动说明：</strong>{{data.activityDesc}}</el-col>
        <el-col :span="12"><strong>支付产品：</strong>{{productType.substring(0, productType.length - 1) || '不限'}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>触发条件：</strong>{{triggerConditionStr}}</el-col>
        <el-col :span="12"><strong>返奖形式：</strong>{{obtainMannerStr}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><strong>触发方式：</strong>{{triggerModeStr}}</el-col>
        <el-col :span="10"><strong>活动宣传文案：</strong>{{data.copywriting}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { PRODUCT_TYPES, WEEK_ARR } from 'common/config'
export default {
  name: '',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      productType: '',
      perWeekTimeArr: ''
    }
  },
  computed: {
    triggerConditionStr: function () {
      if (this.data.triggerCondition === 'JD_MALL') {
        return '商城订单支付'
      } else {
        return '外单京东支付'
      }
    },
    obtainMannerStr: function () {
      if (this.data.obtainManner === 'MUST_RETURN') {
        return '必返返奖'
      } else if (this.data.obtainManner === 'SELECT_RETURN') {
        return '非必返返奖'
      } else if (this.data.obtainManner === 'USER_GET') {
        return '用户领奖'
      } else if (this.data.obtainManner === 'RESOURCE_INFO') {
        return '资源'
      }
    },
    triggerModeStr: function () {
      let triggerMode = this.data.triggerMode
      if (triggerMode === 'TEXT_LINK') {
        return '文字提示'
      } else if (triggerMode === 'POPUP_WINDOW') {
        return '弹窗'
      } else if (triggerMode === 'SCRATCH_CARD') {
        return '刮刮卡'
      } else if (triggerMode === 'CHANNEL_NOTIFY') {
        return '渠道通知'
      }
    }
  },
  watch: {
    data(newVal, oldVal) {
      this.setProductType()
      this.setWeekTimeArr()
    }
  },
  methods: {
    setProductType() {
      if (!this.data.productType) return
      this.productType = ''
      let aProList = this.data.productType.split('|')
      aProList.forEach((item, index) => {
        this.productType += PRODUCT_TYPES[item] + ','
      })
    },
    setWeekTimeArr() {
      if (!this.data.perWeekTimeArr) return
      this.perWeekTimeArr = ''
      this.data.perWeekTimeArr.forEach((item, index) => {
        this.perWeekTimeArr += WEEK_ARR[item] + ','
      })
    },
    editActivity() {
      this.$emit('editActivity')
    }
  }
}
</script>

<style lang='scss'>
.activity-detail {
  width: 100%;
  margin-bottom: 20px;
  .el-row {
    line-height: 30px;
  }
}
.detail-head {
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
  background: #eee;
}
</style>
