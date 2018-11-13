<template>
  <div class="create-noCoupon-activity display-table">
    <div class="pub-sm-title clear">
      <h3 class="fl">外部调用发奖活动</h3>
    </div>
    <el-form :model="activityForm" ref="extraActivity" label-width="180px" size="small" class="app-form-panel" :rules="activityFormRules">
      <el-form-item label="活动名称：" prop="title">
        <el-input v-model="activityForm.title" placeholder="不超过20字"></el-input>
      </el-form-item>
      <el-form-item label="业务标识：" prop="sign">
        <!-- <el-input placeholder="多个业务标识请使用 | 线隔开" v-model="activityForm.sign"></el-input> -->
        <el-select class="select100" v-model="activityForm.sign" placeholder="请选择">
          <el-option v-for="(item, index) in activityForm.signs" :key="index" :label="item.value" :value="item.key" ></el-option>
        </el-select>
        <div class="input-hint-text text-left">仅可从已有标识列表中选取，若需新增业务标识，可申请录入</div>
      </el-form-item>
      <!-- <div class="prompts">仅可从已有标识列表中选取，若需新增业务标识，可申请录入</div> -->
      <el-form-item class="is-required" label="活动时间：">
        <el-col :span="6">
          <el-form-item class="null-label" label="" prop="startDate">
            <el-date-picker
              class="select100"
              type="datetime"
              placeholder="活动开始日期"
              default-time="00:00:00"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="activityForm.startDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="1">-</el-col>
        <el-col :span="6">
          <el-form-item class="null-label" label="" prop="endDate">
            <el-date-picker
              class="select100"
              type="datetime"
              placeholder="活动结束日期"
              default-time="23:59:59"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="activityForm.endDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" size="small" @click="moreTimes = !moreTimes">更多时间限制</el-button>
        </el-col>
      </el-form-item>
      <!-- <div class="prompts">整个活动的开始和结束时间</div> -->
      <transition name="fade">
      <div v-if="moreTimes" transiton="fade">
      <el-form-item label="每日活动时间：">
        <el-col :span="6">
          <el-time-picker
            class="select100"
            type="datetime"
            placeholder="选择时间"
            default-time="00:00:00"
            value-format="HH:mm:ss"
            v-model="activityForm.startTime"></el-time-picker>
        </el-col>
        <el-col class="text-center" :span="1">-</el-col>
        <el-col :span="6">
          <el-time-picker
          class="select100"
          type="datetime"
          placeholder="选择时间"
          default-time="23:59:59"
          value-format="HH:mm:ss"
          v-model="activityForm.endTime"></el-time-picker>
        </el-col>
      </el-form-item>
      <!-- <div class="prompts">活动期间每天的开始时间和结束时间，如果为全天活动则不填</div> -->
      <el-form-item label="每周活动日：">
        <el-select class="select100" v-model="activityForm.dayOfWeek" multiple placeholder="请选择">
          <el-option v-for="item in week" :key="item.key" :label="item.value" :value="item.key" ></el-option>
        </el-select>
      </el-form-item>
      <!-- <div class="prompts">活动期间每周的有效时间，可选择多个；无限规则不填</div> -->
      <el-form-item label="每月活动日：">
        <el-select class="select100" v-model="activityForm.dayOfMonth" multiple placeholder="请选择">
          <el-option v-for="item in month" :key="item" :label="item" :value="item" ></el-option>
        </el-select>
      </el-form-item>
      </div>
      </transition>
      <!-- <div class="prompts">活动期间每月的有效时间，可选择多个；无限规则不填</div> -->
      <!-- <el-form-item label="调用渠道：" prop="callChannel">
        <el-checkbox-group v-model="activityForm.callChannel">
          <el-checkbox label="通天塔" name="callChannel"></el-checkbox>
          <el-checkbox label="商城领券中心" name="callChannel"></el-checkbox>
          <el-checkbox label="其他" name="callChannel"></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->

      <el-form-item label="渠道号：" prop="channelNo">
        <!-- <el-input v-model="activityForm.channelNo" placeholder="多个渠道号请使用 | 线隔开"></el-input> -->
        <el-checkbox-group v-model="activityForm.channelNo">
          <el-checkbox label="JD_QD_DEFAULT" name="channelNo">默认(不限制调用渠道)</el-checkbox>
          <el-checkbox label="JD_QD_TTT" name="channelNo">通天塔</el-checkbox>
          <el-checkbox label="JD_QD_NOTPAY" name="channelNo">待付订单</el-checkbox>
          <el-checkbox label="JD_QD_FINANCIAL" name="channelNo">金融领券中心</el-checkbox>
          <el-checkbox label="JD_QD_MALL" name="channelNo">商城领券中心</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="活动内奖项发放限制：">
        <el-row>
          <el-col :span="4">
            <el-form-item label="日" class="text-left" label-width="40px" prop="prizeLimitDay">
              <el-input v-model="activityForm.prizeLimitDay"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="周" class="text-left" label-width="40px" prop="prizeLimitWeek">
              <el-input v-model="activityForm.prizeLimitWeek"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="月" class="text-left" label-width="40px" prop="prizeLimitMonth">
              <el-input v-model="activityForm.prizeLimitMonth"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="总" class="text-left" label-width="40px" prop="prizeLimitAll">
              <el-input v-model="activityForm.prizeLimitAll"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">
            <el-form-item class="null-label">
              <span class="gray font-small">该活动所有奖项的总的发放个数限制</span>
            </el-form-item>
          </el-col>-->
        </el-row>
        <div class="input-hint-text text-left">该活动所有奖项的总的发放个数限制</div>
      </el-form-item>

      <!-- <div class="prompts">该活动所有奖项的总的发放个数限制；如不限制可不填</div> -->
      <!--<el-form-item label="活动优先级：">
        <el-select class="select100" v-model="activityForm.activityPriority" placeholder="请选择">
          <el-option v-for="(item, index) in activityForm.activityPrioritys" :key="index" :label="item" :value="item" ></el-option>
        </el-select>
      </el-form-item>-->

      <el-form-item label="消息通知：">
        <el-checkbox-group v-model="activityForm.isConfig">
          <el-checkbox label="false" name="isConfig">不配置</el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group v-model="activityForm.msg" :disabled="activityForm.isConfig">
          <el-checkbox label="SMS" name="msg">短信</el-checkbox>
          <el-checkbox label="WECHAT_PUBLIC_NO" name="msg">微信公众号</el-checkbox>
          <el-checkbox label="JDJR_APP" name="msg">京东金融APP</el-checkbox><br>
        </el-checkbox-group>
      </el-form-item>
      <!-- <div class="prompts">对有需要通过优先级排序的活动有效，无需要可不填</div> -->
      <!-- <el-form-item label="消息通知：">
        <el-select class="select100" v-model="activityForm.notification" placeholder="请选择">
          <el-option v-for="item in notifications" :key="item" :label="item" :value="item" ></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <div class="prompts">配置鹊桥系统分配的消息模板，并配置文案；消息通知</div> -->
      <el-form-item label="活动说明：">
        <el-input placeholder="限100字以内，非必填" type="textarea" v-model="activityForm.desc" class="bigInput" height="100px"></el-input>
      </el-form-item>
    </el-form>

    <div class="btns mar-b-20">
      <el-button type="primary" :disabled="butDisabled" size="small" @click="createActivitieValidate('extraActivity')">下一步</el-button>
      <el-button type="info" size="small" @click="prevPage">取消</el-button>
    </div>

  </div>
</template>

<script>
import {
  createOutsideCallsActivity,
  updateOutsideCallsActivity,
  queryQutsideCallsActivity,
  searchBizTypeByPlanId
} from 'api/service'
import { formatDate } from 'utils/util'
export default {
  name: 'createExtraActivityAddPrize',
  data() {
    var validateEndDate = (rule, value, callback) => {
      if (this.activityForm.startDate) {
        if (!value) {
          return callback(new Error('请选择结束时间'))
        } else if (value <= this.activityForm.startDate) {
          return callback(new Error('结束时间必须大于开始时间'))
        } else {
          return callback()
        }
      } else {
        return callback()
      }
    }
    var validateEndTime = (rule, value, callback) => {
      if (this.activityForm.startTime) {
        if (!value) {
          return callback(new Error('请选择活动日期'))
        } else if (value <= this.activityForm.startTime) {
          return callback(new Error('结束时间必须大于开始时间'))
        } else {
          return callback()
        }
      } else {
        return callback()
      }
    }
    return {
      butDisabled: false,
      moreTimes: false,
      planId: this.$route.query.planId,
      activityId: this.$route.query.activityId,
      activitySourceFlag: 'mall',
      week: [
        {
          key: '1',
          value: '星期一'
        },
        {
          key: '2',
          value: '星期二'
        },
        {
          key: '3',
          value: '星期三'
        },
        {
          key: '4',
          value: '星期四'
        },
        {
          key: '5',
          value: '星期五'
        },
        {
          key: '6',
          value: '星期六'
        },
        {
          key: '7',
          value: '星期天'
        }
      ],
      month: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31'
      ],
      // notifications: ['不配置', 'A', 'B'],
      activityForm: {
        title: '',
        sign: '',
        signs: [],
        startDate: '',
        endDate: '',
        startTime: '00:00:00',
        endTime: '23:59:59',
        dayOfWeek: '',
        dayOfMonth: '',
        // callChannel: [],
        channelNo: [],
        activityPriority: '',
        activityPrioritys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        msg: [],
        isConfig: false,
        prizeLimitDay: '',
        prizeLimitWeek: '',
        prizeLimitMonth: '',
        prizeLimitAll: '',
        desc: ''
      },
      activityFormRules: {
        prizeLimitDay: [
          {
            required: true,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'change'
          }
        ],
        prizeLimitWeek: [
          {
            required: false,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'change'
          }
        ],
        prizeLimitMonth: [
          {
            required: false,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'change'
          }
        ],
        prizeLimitAll: [
          {
            required: true,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'change'
          }
        ],
        // callChannel: [
        //   {
        //     type: 'array',
        //     required: true,
        //     message: '请至少选择一个调用渠道',
        //     trigger: 'change'
        //   }
        // ],
        channelNo: [
          { type: 'array', required: false, message: '请选择渠道号', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { max: 20, message: '不超过20字', trigger: 'blur' }
        ],
        sign: [
          { required: true, message: '请选择业务标识', trigger: 'change' }
        ],
        startDate: [
          { required: true, message: '请选择活动日期', trigger: 'change' }
        ],
        endDate: [{ validator: validateEndDate, trigger: 'change' }],
        startTime: [
          { required: false, message: '请选择开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: false, validator: validateEndTime, trigger: 'blur' }
        ]
      }
    }
  },
  deactivated() {
    this.$destroy(true)
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      // let activityId = this.$route.query.activityId
      // 存在活动id，说明是修改功能
      if (this.activityId) {
        this.queryQutsideCallsActivity()
      }
      // 查询计划下的业务标识
      this.searchBizTypeByPlanId()
    },
    queryQutsideCallsActivity() {
      let reqParams = {
        activityId: this.activityId
      }
      queryQutsideCallsActivity(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          this.activityForm.title = data.activityName || ''
          this.activityForm.sign = data.bizType || ''
          this.activityForm.startDate = formatDate(
            'YYYY-MM-DD hh:mm:ss',
            data.startTime
          )
          this.activityForm.endDate = formatDate(
            'YYYY-MM-DD hh:mm:ss',
            data.endTime
          )
          this.activityForm.startTime = data.perDayTimeArr ? data.perDayTimeArr[0] : ''
          this.activityForm.endTime = data.perDayTimeArr ? data.perDayTimeArr[1] : ''
          this.activityForm.dayOfWeek = data.perWeekTimeArr || []
          this.activityForm.dayOfMonth = data.perMonthTimeArr || []
          this.activityForm.channelNo = data.channelNo ? data.channelNo.split('|') : []
          this.activityForm.activityPriority = data.priority || ''
          this.activityForm.propagateCW = data.copywriting || ''
          this.activityForm.prizeLimitDay = data.sendLimitDay || ''
          this.activityForm.prizeLimitWeek = data.sendLimitWeek || ''
          this.activityForm.prizeLimitMonth = data.sendLimitMonth || ''
          this.activityForm.prizeLimitAll = data.sendLimitTotal || ''
          this.activityForm.desc = data.activityDesc || ''
          this.activityForm.callerPermit = data.callerPermit || ''
          this.activityForm.msg = data.msgNotifys || []
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 创建活动
    createActivitieValidate(formName) {
      this.$refs[formName] &&
        this.$refs[formName].validate(valid => {
          if (!valid) {
            this.$message({
              message: '您输入的数据格式有误，请检查',
              type: 'warning'
            })
            return false
          }
          if (!this.activityForm.startTime && this.activityForm.endTime) {
            this.activityForm.startTime = '00:00:00'
          }
          if (this.activityForm.startTime && !this.activityForm.endTime) {
            this.activityForm.endTime = '23:59:59'
          }
          let times = []
          times.push(this.activityForm.startTime || '')
          times.push(this.activityForm.endTime || '')

          let reqParams = {
            planId: this.planId,
            activityName: this.activityForm.title,
            bizType: this.activityForm.sign,
            startTime: this.activityForm.startDate,
            endTime: this.activityForm.endDate,
            perDayTimeArr: times.length ? times : '',
            perWeekTimeArr: this.activityForm.dayOfWeek,
            perMonthTimeArr: this.activityForm.dayOfMonth,
            channelNo: this.activityForm.channelNo.join('|'),
            priority: this.activityForm.activityPriority,
            copywriting: this.activityForm.propagateCW,
            sendLimitDay: this.activityForm.prizeLimitDay,
            sendLimitWeek: this.activityForm.prizeLimitWeek,
            sendLimitMonth: this.activityForm.prizeLimitMonth,
            sendLimitTotal: this.activityForm.prizeLimitAll,
            activityDesc: this.activityForm.desc
            // msgNotifys: this.activityForm.msg.length ? this.activityForm.msg : []
          }
          // 是否配置消息
          if (this.activityForm.isConfig) {
            reqParams.msgNotifys = []
          } else {
            reqParams.msgNotifys = this.activityForm.msg
          }
          // 验证日与总之见的数据关系
          if (
            Number(this.activityForm.prizeLimitDay) >
            Number(this.activityForm.prizeLimitAll)
          ) {
            return this.$message({
              message: '您填写的日发放量不能超过总发放量',
              type: 'warning'
            })
          }
          this.butDisabled = true
          // 存在活动id，表示是修改操作
          if (this.activityId) {
            reqParams.activityId = this.activityId
            this.updateOutsideCallsActivity(reqParams)
          } else {
            this.createOutsideCallsActivity(reqParams)
          }
        })
    },
    // 创建活动
    createOutsideCallsActivity(reqParams) {
      createOutsideCallsActivity(reqParams)
        .then(res => {
          setTimeout(() => {
            this.butDisabled = false
          }, 1000)
          if (!this.httpThen(this, res)) return
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          // 创建成功，跳转创建奖项
          this.$router.push({
            path: '/marketingPlanManage/createAward',
            query: {
              planId: this.planId,
              activityId: res.data.activityId,
              // type用于区分创建奖项时的奖品类型是否可供选择,1:可选择,0:不可选择
              type: 1,
              day: this.activityForm.prizeLimitDay,
              week: this.activityForm.prizeLimitWeek,
              month: this.activityForm.prizeLimitMonth,
              total: this.activityForm.prizeLimitAll,
              ruleType: 'extraActivity'
            }
          })
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 修改活动
    updateOutsideCallsActivity(reqParams) {
      updateOutsideCallsActivity(reqParams)
        .then(res => {
          setTimeout(() => {
            this.butDisabled = false
          }, 1000)
          if (!this.httpThen(this, res)) return
          this.$message({
            message: '修改成功',
            type: 'success'
          })

          // 创建成功，跳转创建奖项
          this.$router.push({
            path: '/marketingPlanManage/createAward',
            query: {
              planId: this.planId,
              activityId: this.$route.query.activityId,
              // type用于区分创建奖项时的奖品类型是否可供选择,1:可选择,0:不可选择
              type: 1,
              // 控制奖项发放数量限制
              day: this.activityForm.prizeLimitDay,
              week: this.activityForm.prizeLimitWeek,
              month: this.activityForm.prizeLimitMonth,
              total: this.activityForm.prizeLimitAll,
              ruleType: 'extraActivity'
            }
          })
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    searchBizTypeByPlanId() {
      let reqParams = {
        planId: this.planId
      }
      let target = {}
      searchBizTypeByPlanId(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.activityForm.signs = []
          data.forEach((item, index) => {
            target = {}
            target.value = item.bizIdfName
            target.key = item.bizIdfId + ''
            this.activityForm.signs.push(target)
          })
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.create-noCoupon-activity {
  width: 100%;
  margin-top: 0;
  .activity-source {
    position: absolute;
    margin-top: 10px;
    margin-left: 5px;
    text-align: center;
    border-left: 1px solid #000000;
    border-right: 1px solid #000000;
    border-top: 1px solid #000000;
    .activity-source-border {
      display: block;
      border-bottom: 1px solid #000000;
      padding: 5px 10px 5px 10px;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
.el-select-dropdown {
  width: 200px;
}
.el-select-dropdown__list {
  width: 200px;
  .el-select-dropdown__item {
    // display: inline-block;
  }
}
.el-form-item .el-form-item__content .el-form-item__error {
  position: relative;
}
.btns {
  margin-left: 180px;
}
</style>
