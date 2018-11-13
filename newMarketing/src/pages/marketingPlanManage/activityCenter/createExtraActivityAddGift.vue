<template>
  <div class="create-noCoupon-activity display-table">
    <div class="pub-sm-title clear">
      <h3 class="fl">活动信息</h3>
    </div>
    <el-form :model="activityForm" :rules="rules" label-width="210px" class="activity-form">
      <el-form-item label="活动名称：" prop="title">
        <el-input v-model="activityForm.title" class="input1"></el-input>
      </el-form-item>
      <div class="prompts">不超过20字</div>
      <el-form-item label="业务标识：" prop="sign">
        <el-select v-model="activityForm.sign" placeholder="请选择">
          <el-option v-for="item in signs" :key="item" :label="item" :value="item" ></el-option>
        </el-select>
        <el-button type="primary" plain class="add-sign" @click="addsign">新增</el-button>
      </el-form-item>
      <div class="prompts">仅可从已有标识列表中选取，若需新增业务标识，可申请录入</div>
      <el-form-item label="活动时间：" prop="activityDate">
        <el-col :span="7">
          <el-date-picker type="date" placeholder="选择日期" v-model="activityForm.activityDate.startDate" style="width: 170px;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="7">
          <el-date-picker type="date" placeholder="选择日期" v-model="activityForm.activityDate.enddate" style="width: 170px;"></el-date-picker>
        </el-col>
      </el-form-item>
      <div class="prompts">整个活动的开始和结束时间</div>
      <el-form-item label="活动优先级：">
        <el-input v-model="activityForm.activityPriority" class="input1"></el-input>
      </el-form-item>
      <div class="prompts">对有需要通过优先级排序的活动有效，无需要可不填</div>
      <el-form-item label="消息通知：">
        <el-select v-model="activityForm.notification" placeholder="请选择" style="width: 120px;">
          <el-option v-for="item in notifications" :key="item" :label="item" :value="item" ></el-option>
        </el-select>
        <el-input v-model="activityForm.mesgTemplate" class="input1"></el-input>
      </el-form-item>
      <div class="prompts">配置鹊桥系统分配的消息模板，并配置文案；消息通知</div>
    </el-form>
    <el-button type="primary" class="more-set clear" @click="moreSet">更多配置</el-button>
    <el-form v-show="ifMore" :model="activityForm" :rules="rules" label-width="210px" class="activity-form">
      <el-form-item label="每日活动时间：">
        <el-col :span="7">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="activityForm.activityTime.startTime" style="width: 170px;"></el-time-picker>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="7">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="activityForm.activityTime.endTime" style="width: 170px;"></el-time-picker>
        </el-col>
      </el-form-item>
      <div class="prompts">活动期间每天的开始时间和结束时间，如果为全天活动则不填</div>
      <el-form-item label="每周活动日：">
        <el-select v-model="activityForm.dayOfWeek" multiple placeholder="请选择">
          <el-option v-for="item in week" :key="item" :label="item" :value="item" ></el-option>
        </el-select>
      </el-form-item>
      <div class="prompts">活动期间每周的有效时间，可选择多个；无限规则不填</div>
      <el-form-item label="每月活动日：">
        <el-select v-model="activityForm.dayOfMonth" multiple placeholder="请选择">
          <el-option v-for="item in month" :key="item" :label="item" :value="item" ></el-option>
        </el-select>
      </el-form-item>
      <div class="prompts">活动期间每月的有效时间，可选择多个；无限规则不填</div>
      <el-form-item label="活动内奖项发放限制：">
        <div class="prizeLimit">日<el-input v-model="activityForm.prizeLimit.day" class="input2"></el-input></div>
        <div class="prizeLimit">周<el-input v-model="activityForm.prizeLimit.week" class="input2"></el-input></div>
        <div class="prizeLimit">月<el-input v-model="activityForm.prizeLimit.month" class="input2"></el-input></div>
        <div class="prizeLimit">总<el-input v-model="activityForm.prizeLimit.all" class="input2"></el-input></div>
      </el-form-item>
      <div class="prompts">该活动所有奖项的总的发放个数限制；如不限制可不填</div>
    </el-form>
  </div>
</template>

<script>
// import prizeInfoDetail from 'components/prizeInfo/prizeInfoDetail'
export default {
  components: {
    // prizeInfoDetail
  },
  data() {
    return {
      ifMore: false,
      activitySourceFlag: 'mall',
      week: [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期天'
      ],
      month: [],
      activityMerchant: ['商城APP端实物', '商城APP端虚拟', '商城PC端实物', '商城PC端虚拟'],
      signs: ['京东商城', '京东闪付', '外部商户'],
      notifications: ['不配置', 'A', 'B'],
      activityForm: {
        title: '',
        sign: '',
        activityDate: {'startdate': '', 'enddate': ''},
        activityTime: {'startTime': '', 'endTime': ''},
        dayOfWeek: '',
        dayOfMonth: '',
        callChannel: [],
        activityPriority: '',
        prizeLimit: {'day': '', 'week': '', 'month': '', 'all': ''},
        desc: '',
        notification: '',
        mesgTemplate: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { max: 20, message: '不超过20字', trigger: 'blur' }
        ],
        sign: [
          {required: true, message: '请选择业务标识', trigger: 'blur'}
        ],
        activityDate: [
          {required: true, message: '请选择活动时间', trigger: 'blur'}
        ],
        merchant: [
          {required: true, message: '请选择活动商户', trigger: 'blur'}
        ],
        ifRecover: [
          {required: true, message: '请选择是否恢复用户退款资格', trigger: 'blur'}
        ]
      }
    }
  },
  activated() {
    for (let i = 1; i < 32; i++) {
      this.month[i] = i
    }
  },
  methods: {
    moreSet() {
      this.ifMore = !self.ifMore
    },
    addsign() {
      console.log('新增业务标识')
    }
  }
}
</script>

<style lang="scss" scoped>
.create-noCoupon-activity {
  width: 100%;
  margin-top: 0;
  .activity-source{
    position: absolute;
    margin-top: 10px;
    margin-left: 5px;
    text-align: center;
    border-left: 1px solid #000000;
    border-right: 1px solid #000000;
    border-top: 1px solid #000000;
    .activity-source-border{
      display: block;
      border-bottom: 1px solid #000000;
      padding: 5px 10px 5px 10px;
      font-size: 16px;
      cursor:pointer
    }
  }
  .more-set {
    float: left;
    margin-left: 60px;
  }
}
.el-select-dropdown {
  width: 200px;
}
.el-select-dropdown__list {
  width: 200px;
  .el-select-dropdown__item {
    display: inline-block;
  }
}
.el-form-item .el-form-item__content .el-form-item__error{
  position: relative;
}
.activity-form {
  width: 70%;
  padding: 15px;
  margin: 0 auto;
  text-align: left;
  .el-form-item {
    margin-bottom: 3px;
  }
  .input1 {
    width: 320px;
  }
  .input2 {
    width: 80px;
    display: inline-block;
    margin-left: 3px;
    margin-right: 10px;
  }
  .bigInput{
    width: 70%;
  }
  .prizeLimit{
    display: inline-block;
  }
  .form-merchant{
    min-width: 150px;
  }
  .add-sign{
    margin-left: 50px;
  }
}
.prompts {
  font-size: 12px;
  padding-left: 210px;
  margin-bottom: 15px;
  color: #ccc;
}
</style>
