<template>
  <div class="create-noCoupon-activity display-table">
    <div class="pub-sm-title clear">
      <el-button type="primary" icon="el-icon-edit" size="mini" :disabled="activitySourceFlag==='InnerActivity'" @click="selectActivitySource('InnerActivity')">商城活动</el-button>
      <el-button type="primary" icon="el-icon-edit" size="mini" :disabled="activitySourceFlag==='OuterActivity'" @click="selectActivitySource('OuterActivity')">外部商户活动</el-button>
      <h3 class="fl">创建无券活动信息</h3>
    </div>

    <el-form :model="activityForm" ref="noCouponActivity" label-width="210px" size="small" class="app-form-panel" :rules="activityFormRules">
      <el-form-item label="活动名称：" prop="title">
        <el-input placeholder="不超过20字" v-model="activityForm.title"></el-input>
      </el-form-item>
      <el-form-item label="业务标识：" prop="sign">
        <!-- <el-input placeholder="多个业务标识请使用 | 线隔开" v-model="activityForm.sign"></el-input> -->
        <el-select class="select100" v-model="activityForm.sign" placeholder="请选择">
          <el-option v-for="item in activityForm.signs" :key="item.key" :label="item.value" :value="item.key" ></el-option>
        </el-select>
        <div class="input-hint-text text-left">仅可从已有标识列表中选取，若需新增业务标识，可申请录入</div>
      </el-form-item>
      <el-form-item class="is-required" label="活动时间：">
        <el-col :span="6">
          <el-form-item class="null-label" label="" prop="startDate">
            <el-date-picker
              class="select100"
              type="datetime"
              placeholder="开始时间"
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
              placeholder="结束时间"
              default-time="23:59:59"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="activityForm.endDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" size="small" @click="moreTimes = !moreTimes">更多时间限制</el-button>
        </el-col>
      </el-form-item>
      <transition name="fade">
      <div v-if="moreTimes" transiton="fade">
      <el-form-item label="每日活动时间：">
        <el-col :span="6">
          <el-form-item class="null-label" label="" prop="startTime">
            <el-time-picker
              class="select100"
              type="datetime"
              placeholder="开始时间"
              default-time="00:00:00"
              value-format="HH:mm:ss"
              v-model="activityForm.startTime"></el-time-picker>
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="1">-</el-col>
        <el-col :span="6">
          <el-form-item class="null-label" label="" prop="endTime">
            <el-time-picker
              class="select100"
              type="datetime"
              placeholder="结束时间"
              default-time="23:59:59"
              value-format="HH:mm:ss"
              v-model="activityForm.endTime"></el-time-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div class="input-hint-text text-left">活动期间每天的开始时间和结束时间，如果为全天活动则不填</div>
        </el-col>
      </el-form-item>
      <el-form-item label="每周活动日：">
        <el-select class="select100" v-model="activityForm.dayOfWeek" multiple placeholder="请选择">
          <el-option v-for="item in week" :key="item.key" :label="item.value" :value="item.key" ></el-option>
        </el-select>
        <div class="input-hint-text text-left">活动期间每周的有效时间，可选择多个。无限制则不填</div>
      </el-form-item>
      <el-form-item label="每月活动日：">
        <el-select class="select100" v-model="activityForm.dayOfMonth" multiple placeholder="请选择">
          <el-option v-for="item in month" :key="item" :label="item" :value="item" ></el-option>
        </el-select>
        <div class="input-hint-text text-left">活动期间每月的有效时间，可选择多个。无限制则不填</div>
      </el-form-item>
      </div>
      </transition>
      <!-- 外部商户活动 -->
      <template v-if="activitySourceFlag === 'OuterActivity'">
        <el-form-item label="商户标签：">
          <el-input v-model="activityForm.merchantTag" placeholder="商户标签、活动商户、支付产品至少选填一个，多个商户标签请使用 | 分隔，商户标签在商户系统设置"></el-input>
          <div class="input-hint-text text-left">商户标签、活动商户、支付产品至少填选一个</div>
        </el-form-item>
        <el-form-item label="活动商户：" prop="merchantInput">
          <el-input v-model="activityForm.merchantInput" placeholder="商户标签、活动商户、支付产品至少选填一个，多个活动商户标签请使用 | 分隔"></el-input>
        </el-form-item>
        <el-form-item label="商户白名单：" prop="merchantWhitelists">
          <el-input v-model="activityForm.merchantWhitelists" placeholder="商户白名单，多个商户白名单请使用 | 分隔"></el-input>
        </el-form-item>
        <el-form-item label="支付产品：">
          <el-checkbox-group v-model="activityForm.productType">
            <el-checkbox label="JDPAY02" name="productType">在线支付</el-checkbox>
            <el-checkbox label="JDPAY02SYS" name="productType">自营扫一扫</el-checkbox>
            <el-checkbox label="JDPAY02FKM" name="productType">自营付款码</el-checkbox><br>
            <el-checkbox label="JDPAY02QP" name="productType">京东闪付</el-checkbox>
            <el-checkbox label="UNPQRSCAN" name="productType">银联扫一扫</el-checkbox>
            <el-checkbox label="UNPQRPAY" name="productType">银联付款码</el-checkbox>
            <el-checkbox label="AGENTREC" name="productType">代扣</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </template>
      <el-form-item v-else label="活动商户：" prop="merchant" ref="merchantDom">
        <el-checkbox-group v-model="activityForm.merchant">
          <el-checkbox label="JD_APP_00" name="merchant" class="form-merchant">商城APP端实物</el-checkbox>
          <el-checkbox label="JD_APP_01" name="merchant" class="form-merchant">商城APP端虚拟</el-checkbox><br>
          <el-checkbox label="JD_PC_00" name="merchant" class="form-merchant">商城PC端实物</el-checkbox>
          <el-checkbox label="JD_PC_01" name="merchant" class="form-merchant">商城PC端虚拟</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <!--<el-form-item label="活动优先级：">
        <el-select class="select100" v-model="activityForm.activityPriority" placeholder="请选择">
          <el-option v-for="(item, index) in activityForm.activityPrioritys" :key="index" :label="item" :value="item" ></el-option>
        </el-select>
        <div class="input-hint-text text-left">对有需要通过优先级排序的活动有效，0为最低优先级</div>
      </el-form-item>-->
      <el-form-item label="活动宣传文案：">
        <el-input v-model="activityForm.propagateCW" placeholder=""></el-input>
        <div class="input-hint-text text-left">对有需要展示营销文案的活动有效，无需要可不填，15字以内</div>
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
              <span class="gray font-small">该活动所有奖项的总的发放个数限制；如不限制可不填</span>
            </el-form-item>
          </el-col>-->
        </el-row>
        <div class="input-hint-text text-left">该活动所有奖项的总的发放个数限制</div>
      </el-form-item>

      <!-- <el-form-item label="活动内奖项获取限制：">
        <el-col :span="3">
          <el-form-item label="日" class="text-left" label-width="40px" prop="getPrizeLimitDay">
            <el-input v-model="activityForm.getPrizeLimitDay"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="周" class="text-left" label-width="40px" prop="getPrizeLimitWeek">
            <el-input v-model="activityForm.getPrizeLimitWeek"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="月" class="text-left" label-width="40px" prop="getPrizeLimitMonth">
            <el-input v-model="activityForm.getPrizeLimitMonth"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="总" class="text-left" label-width="40px" prop="getPrizeLimitAll">
            <el-input v-model="activityForm.getPrizeLimitAll"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item class="null-label">
            <span class="gray font-small">用户获取该活动所有奖项的个数限制，如不限制可不填</span>
          </el-form-item>
        </el-col>
      </el-form-item> -->

      <el-form-item label="退款是否恢复用户参与资格：" prop="ifRecover">
        <!-- <el-col :span="4"> -->
          <!-- <el-form-item label="" prop="ifRecover"> -->
            <el-radio-group v-model="activityForm.ifRecover">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          <!-- </el-form-item> -->
        <!-- </el-col> -->
        <div class="input-hint-text text-left">仅恢复用户参与活动的资格一次，库存不恢复</div>
      </el-form-item>

      <el-form-item label="活动说明：">
        <el-input placeholder="限100字以内，非必填" type="textarea" v-model="activityForm.desc" class="bigInput" height="100px"></el-input>
      </el-form-item>
    </el-form>
    <div class="btns mar-b-20">
      <el-button type="primary" size="small" :disabled="butDisabled" @click="createActivitieValidate('noCouponActivity')">下一步</el-button>
      <el-button type="info" size="small" @click="prevPage">取消</el-button>
    </div>
  </div>
</template>

<script>
import {
  createNoCouponActivity,
  updateNoCouponActivity,
  queryNocouponActivity,
  searchBizTypeByPlanId
} from 'api/service'
import { formatDate } from 'utils/util'
export default {
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
          return callback(new Error('请选择结束时间'))
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
      activitySource: [
        {
          key: 'InnerActivity',
          name: '商城活动'
        },
        {
          key: 'OuterActivity',
          name: '外部商户活动'
        }
      ],
      activitySourceFlag: 'InnerActivity',
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
      // activityMerchant: [
      //   {
      //     key: 'JD_app_00',
      //     value: '商城APP端实物'
      //   },
      //   {
      //     key: 'JD_app_01',
      //     value: '商城APP端虚拟'
      //   },
      //   {
      //     key: 'JD_PC_00',
      //     value: '商城PC端实物'
      //   },
      //   {
      //     key: 'JD_PC_01',
      //     value: '商城PC端虚拟'
      //   }
      // ],
      activityForm: {
        title: '',
        sign: '',
        signs: [],
        startDate: '',
        endDate: '',
        startTime: '00:00:00',
        endTime: '23:59:59',
        dayOfWeek: [],
        dayOfMonth: [],
        merchant: [],
        merchantInput: '',
        merchantWhitelists: '',
        productType: [],
        activityPriority: '',
        activityPrioritys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        propagateCW: '',
        merchantTag: '',
        prizeLimitDay: '',
        prizeLimitWeek: '',
        prizeLimitMonth: '',
        prizeLimitAll: '',
        getPrizeLimitDay: '',
        getPrizeLimitWeek: '',
        getPrizeLimitMonth: '',
        getPrizeLimitAll: '',
        ifRecover: '',
        desc: ''
      },
      activityFormRules: {
        prizeLimitDay: [
          {
            required: true,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'blur'
          }
        ],
        prizeLimitWeek: [
          {
            required: false,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'blur'
          }
        ],
        prizeLimitMonth: [
          {
            required: false,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'blur'
          }
        ],
        prizeLimitAll: [
          {
            required: true,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'blur'
          }
        ],
        // getPrizeLimitDay: [
        //   { required: true, message: '只能输入数字', pattern: /^\d+$/, trigger: 'blur' }
        // ],
        // getPrizeLimitWeek: [
        //   { required: true, message: '只能输入数字', pattern: /^\d+$/, trigger: 'blur'}
        // ],
        // getPrizeLimitMonth: [
        //   { required: true, message: '只能输入数字', pattern: /^\d+$/, trigger: 'blur' }
        // ],
        // getPrizeLimitAll: [
        //   { required: true, message: '只能输入数字', pattern: /^\d+$/, trigger: 'blur' }
        // ],
        title: [
          {
            required: true,
            min: 1,
            max: 20,
            message: '请输入活动名称,不超过20字',
            trigger: 'blur'
          }
        ],
        sign: [
          {
            required: true,
            message: '请输入业务标识，多个业务标识请使用 | 线隔开',
            trigger: 'blur'
          }
        ],
        startDate: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endDate: [{ validator: validateEndDate, trigger: 'change' }],
        startTime: [
          { required: false, message: '请选择开始时间', trigger: 'blur' }
        ],
        endTime: [
          { required: false, validator: validateEndTime, trigger: 'blur' }
        ],
        activityDate: [
          { required: true, message: '请选择活动时间', trigger: 'blur' }
        ],
        merchant: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动商户',
            trigger: 'change'
          }
        ],
        ifRecover: [
          {
            required: true,
            message: '请选择是否恢复用户退款资格',
            trigger: 'change'
          }
        ],
        // 缓存表单数据
        cacheFormData: {}
      }
    }
  },
  deactivated () {
    this.$destroy(true)
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      // 存在活动id，说明是修改功能
      if (this.activityId) {
        this.queryNocouponActivity()
      }
      // 查询计划下的业务标识
      this.searchBizTypeByPlanId()
    },
    // 查询活动数据
    queryNocouponActivity() {
      let reqParams = {
        activityId: this.activityId
      }
      queryNocouponActivity(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          console.log(data)
          // 缓存数据，用于切换时做值的修改
          this.cacheFormData = data
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

          // 根据不同活动类型来判断是否需要转换数据格式
          if (data.remark === 'InnerActivity') {
            this.activityForm.merchant = data.merchantNosArr || []
          } else {
            this.activityForm.merchantInput = data.merchantNos || ''
          }
          this.activitySourceFlag = data.remark
          this.activityForm.activityPriority = data.priority
          this.activityForm.propagateCW = data.copywriting || ''
          this.activityForm.prizeLimitDay = data.sendLimitDay || ''
          this.activityForm.prizeLimitWeek = data.sendLimitWeek || ''
          this.activityForm.prizeLimitMonth = data.sendLimitMonth || ''
          this.activityForm.prizeLimitAll = data.sendLimitTotal || ''
          this.activityForm.ifRecover = data.recoverRefunding
          this.activityForm.desc = data.activityDesc || ''
          this.activityForm.productType = data.productTypeArr ? data.productTypeArr : []
          this.activityForm.merchantTag = data.merchantTags || ''
          this.activityForm.merchantWhitelists = data.merchantWhitelists || ''
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 创建无券活动
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
          this.butDisabled = true
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
          // 外部商户活动时细节处理
          if (this.activitySourceFlag === 'OuterActivity') {
            if (
              this.activityForm.merchantTag === '' &&
              this.activityForm.merchantInput === '' &&
              !this.activityForm.productType.length
            ) {
              return this.$message({
                message: '商户标签、活动商户、支付产品至少填选一个，请检查',
                type: 'warning'
              })
            }
          }

          // 变态的数据传递，后台不愿处理，前端处理 ^_^!~~~
          if (!this.activityForm.startTime && this.activityForm.endTime) {
            this.activityForm.startTime = '00:00:00'
          }
          if (this.activityForm.startTime && !this.activityForm.endTime) {
            this.activityForm.endTime = '23:59:59'
          }
          // 拼接每日活动时间为数组传输
          let times = []
          times.push(this.activityForm.startTime)
          times.push(this.activityForm.endTime)
          if (!this.activityForm.startTime && !this.activityForm.endTime) {
            times = []
          }

          let reqParams = {
            remark: this.activitySourceFlag,
            activityName: this.activityForm.title,
            bizType: this.activityForm.sign,
            startTime: this.activityForm.startDate,
            endTime: this.activityForm.endDate,
            perDayTimeArr: times.length ? times : '',
            perWeekTimeArr: this.activityForm.dayOfWeek,
            perMonthTimeArr: this.activityForm.dayOfMonth,
            // 区分外部商户与商城活动
            merchantNosArr:
              this.activitySourceFlag === 'OuterActivity'
                ? this.activityForm.merchantInput.split('|')
                : this.activityForm.merchant,
            priority: this.activityForm.activityPriority,
            copywriting: this.activityForm.propagateCW,
            sendLimitDay: this.activityForm.prizeLimitDay,
            sendLimitWeek: this.activityForm.prizeLimitWeek,
            sendLimitMonth: this.activityForm.prizeLimitMonth,
            sendLimitTotal: this.activityForm.prizeLimitAll,
            recoverRefunding: this.activityForm.ifRecover,
            activityDesc: this.activityForm.desc,
            productTypeArr: this.activityForm.productType.join('|'),
            merchantTags: this.activityForm.merchantTag,
            merchantWhitelists: this.activityForm.merchantWhitelists
          }

          // 存在活动id，表示是修改操作
          if (this.activityId) {
            reqParams.activityId = this.activityId
            this.updateNoCouponActivity(reqParams)
          } else {
            reqParams.planId = this.planId
            this.createNoCouponActivity(reqParams)
          }
        })
    },
    // 创建活动
    createNoCouponActivity(reqParams) {
      createNoCouponActivity(reqParams)
        .then(res => {
          setTimeout(() => {
            this.butDisabled = false
          }, 1000)
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          // 创建成功，跳转创建奖项
          this.$router.push({
            path: '/marketingPlanManage/createAward',
            query: {
              planId: this.planId,
              activityId: data.activityId,
              // type用于区分创建奖项时的奖品类型是否可供选择,1:可选择,0:不可选择
              type: 0,
              day: this.activityForm.prizeLimitDay,
              week: this.activityForm.prizeLimitWeek,
              month: this.activityForm.prizeLimitMonth,
              total: this.activityForm.prizeLimitAll,
              ruleType: 'noCoupons',
              // 跳转页面根据该参数，显示不同按钮
              createActivity: 1
            }
          })
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 修改活动
    updateNoCouponActivity(reqParams) {
      updateNoCouponActivity(reqParams)
        .then(res => {
          setTimeout(() => {
            this.butDisabled = false
          }, 1000)
          if (!this.httpThen(this, res)) return
          console.log(res)
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.push({
            path: '/marketingPlanManage/createAward',
            query: {
              planId: this.planId,
              activityId: this.$route.query.activityId,
              // type用于区分创建奖项时的奖品类型是否可供选择,1:可选择,0:不可选择
              type: 0,
              // 控制奖项发放数量限制
              day: this.activityForm.prizeLimitDay,
              week: this.activityForm.prizeLimitWeek,
              month: this.activityForm.prizeLimitMonth,
              total: this.activityForm.prizeLimitAll,
              ruleType: 'noCoupons',
              createActivity: 0
            }
          })
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 切换活动类型
    selectActivitySource(value) {
      if (value === 'OuterActivity') {
        this.$refs['merchantDom'].clearValidate()
        // 清空缓存数据,防止后端无法处理或者修改异常情况
        // 清空商城活动下的活动商户
        this.activityForm.merchant = []
        if (this.activityId) {
          // 获取缓存数据
          if (this.cacheFormData.productTypeArr) {
            this.activityForm.productType = this.cacheFormData.productTypeArr[0].split(
              ','
            )
          }
          this.activityForm.merchantTag = this.cacheFormData.merchantTags
            ? this.cacheFormData.merchantTags
            : ''
          /* this.activityForm.merchantInput = this.cacheFormData.merchantNos
            ? this.cacheFormData.merchantNos
            : '' */
        }
      } else if (value === 'InnerActivity') {
        // 清空商户标签、活动商户、支付产品
        this.activityForm.merchantInput = ''
        this.activityForm.merchantTag = ''
        this.activityForm.productType = []
        if (this.activityId) {
          // 获取缓存数据
          /*  if (this.cacheFormData.merchantNosArr) {
            this.activityForm.merchant = this.cacheFormData.merchantNosArr
          } */
        }
      }
      this.activitySourceFlag = value
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
    // position: absolute;
    margin-top: 10px;
    // .activity-source-border {
    //   display: block;
    //   border-bottom: 1px solid #000000;
    //   padding: 5px 10px 5px 10px;
    //   font-size: 16px;
    //   cursor: pointer;
    // }
  }
  .el-form-item.text-left {
    margin-right: 8px;
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
.input2 {
  width: 80px;
  display: inline-block;
  margin-left: 3px;
  margin-right: 10px;
}
.prizeLimit {
  display: inline-block;
}
.form-merchant {
  min-width: 150px;
}
.prompts {
  font-size: 12px;
  padding-left: 210px;
  margin-bottom: 15px;
  color: #ccc;
}
.btns {
  margin-left: 210px;
}
</style>
