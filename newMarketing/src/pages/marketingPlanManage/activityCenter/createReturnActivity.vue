<template>
  <div class="create-noCoupon-activity display-table">
    <div class="pub-sm-title clear">
      <h3 class="fl">后返活动信息</h3>
    </div>

    <el-form :model="activityForm" ref="returnActivity" label-width="210px" size="small" class="app-form-panel" :rules="activityFormRules">
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
      <!--&lt;!&ndash; 外部商户活动 &ndash;&gt;-->
      <!--<template v-if="activitySourceFlag === 'OuterActivity'">-->
        <!--<el-form-item label="商户标签：">-->
          <!--<el-input v-model="activityForm.merchantTag" placeholder="商户标签、活动商户、支付产品至少选填一个，多个商户标签请使用 | 分隔，商户标签在商户系统设置"></el-input>-->
          <!--<div class="input-hint-text text-left">商户标签、活动商户、支付产品至少填选一个</div>-->
        <!--</el-form-item>-->
      <!--</template>-->
      <!--<el-form-item v-else label="活动商户：" prop="merchant" ref="merchantDom">-->
        <!--<el-checkbox-group v-model="activityForm.merchant">-->
          <!--<el-checkbox label="JD_APP_00" name="merchant" class="form-merchant">商城APP端实物</el-checkbox>-->
          <!--<el-checkbox label="JD_APP_01" name="merchant" class="form-merchant">商城APP端虚拟</el-checkbox><br>-->
          <!--<el-checkbox label="JD_PC_00" name="merchant" class="form-merchant">商城PC端实物</el-checkbox>-->
          <!--<el-checkbox label="JD_PC_01" name="merchant" class="form-merchant">商城PC端虚拟</el-checkbox>-->
        <!--</el-checkbox-group>-->
      <!--</el-form-item>-->

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

      <el-form-item label="退款是否回收用户奖品：" prop="ifRecover">
         <!--<el-col :span="4">-->
         <!--<el-form-item label="" prop="ifRecover"> -->
        <el-radio-group v-model="activityForm.ifRecover">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
         <!--</el-form-item> -->
         <!--</el-col>-->
        <div class="input-hint-text text-left">仅恢复用户参与活动的资格一次，库存不恢复</div>
      </el-form-item>

      <el-form-item label="触发条件：" prop="triggerCondition">
        <el-select class="select100" v-model="activityForm.triggerCondition" placeholder="请选择" @change="clearTriggerMode">
          <el-option v-for="item in activityForm.triggerConditions" :key="item.key" :label="item.value" :value="item.key" ></el-option>
        </el-select>
        <div class="input-hint-text text-left">仅可从已有标识列表中选取，若需新增触发条件，可申请录入</div>
      </el-form-item>

      <el-form-item label="返奖形式：" prop="obtainManner">
        <el-select class="select100" v-model="activityForm.obtainManner" placeholder="请选择" @change="clearTriggerMode" >
          <el-option v-for="item in activityForm.obtainManners" :key="item.key" :label="item.value" :value="item.key" ></el-option>
        </el-select>
        <div class="input-hint-text text-left">仅可从已有标识列表中选取，若需新增返奖形式，可申请录入</div>
      </el-form-item>

      <el-form-item label="触达方式：" prop="triggerMode">
        <el-select class="select100" v-model="activityForm.triggerMode" placeholder="请选择" @focus="initTriggerMode" @change="initTextConfigCardView" >
          <el-option v-for="item in activityForm.triggerModes" :key="item.key" :label="item.value" :value="item.key" ></el-option>
        </el-select>
        <div class="input-hint-text text-left">仅可从已有标识列表中选取，若需新增触达方式，可申请录入</div>
      </el-form-item>

      <!--文字配置扩展填写 仅当返奖形式为资源 触达方式为文字时显示 -->
      <el-collapse-transition>
        <el-card class="box-card" v-if="textLineConfigVisible">
          <div slot="header" class="clearfix">
            <span>文字提示信息填写</span>
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div>
            <el-form-item label="文字提示ICON：" prop="iconText">
              <el-input placeholder="不超过3字" v-model="activityForm.iconText"></el-input>
            </el-form-item>
            <el-form-item label="文字提示内容：" prop="iconContent">
              <el-input placeholder="不超过15字" v-model="activityForm.iconContent"></el-input>
            </el-form-item>
            <el-form-item label="H5页文字提示跳转链接：" prop="h5Link">
              <el-input placeholder="URL" v-model="activityForm.h5Link"></el-input>
            </el-form-item>
            <el-form-item label="PC页文字提示跳转链接：" prop="pcLink">
              <el-input placeholder="URL" v-model="activityForm.pcLink"></el-input>
            </el-form-item>
          </div>
        </el-card>
      </el-collapse-transition>

      <el-collapse-transition>
        <el-card class="box-card" v-if="pwConfigVisible">
          <div slot="header" class="clearfix">
            <span>弹窗信息填写</span>
          </div>

          <div>
            <el-form-item label="APP弹窗成功页按钮描述：" prop="appBtnDesc">
              <el-input placeholder="不超过6字" v-model="activityForm.appBtnDesc"></el-input>
            </el-form-item>
            <el-form-item label="APP弹窗成功页按钮跳转链:" prop="appBtnLink">
              <el-input placeholder="按钮跳转链接" v-model="activityForm.appBtnLink"></el-input>
            </el-form-item>
            <el-form-item label="H5弹窗成功页按钮描述：" prop="h5BtnDesc">
              <el-input placeholder="不超过6字" v-model="activityForm.h5BtnDesc"></el-input>
            </el-form-item>
            <el-form-item label="H5弹窗成功页按钮跳转链接：" prop="h5BtnLink">
              <el-input placeholder="按钮跳转链接" v-model="activityForm.h5BtnLink"></el-input>
            </el-form-item>
            <el-form-item label="PC弹窗成功页按钮描述：" prop="pcBtnDesc">
              <el-input placeholder="不超过6字" v-model="activityForm.pcBtnDesc"></el-input>
            </el-form-item>
            <el-form-item label="PC弹窗成功页按钮跳转链接：" prop="pcBtnLink">
              <el-input placeholder="按钮跳转链接" v-model="activityForm.pcBtnLink"></el-input>
            </el-form-item>
          </div>

        </el-card>
      </el-collapse-transition>

      <el-form-item label="渠道通知：" prop="channelNotify">

        <el-select class="select100" v-model="activityForm.channelNotify" multiple placeholder="请选择">
          <el-option v-for="item in activityForm.channelNotifys" :key="item.key" :label="item.value" :value="item.key" ></el-option>
        </el-select>
        <div class="input-hint-text text-left">触达方式为渠道通知时配置，可选择多个通知渠道。其它触达方式不建议配置。</div>
      </el-form-item>

      <el-form-item label="活动商户：" prop="merchantNos">
        <el-input v-model="activityForm.merchantNos" placeholder="选填，多个活动商户请使用 | 分隔，如AAA|BBB"></el-input>
      </el-form-item>
      <el-form-item label="商编白名单：" prop="merchantWhitelists">
        <el-input v-model="activityForm.merchantWhitelists" placeholder="选填，多个商编白名单请使用 | 分隔，如：AAA|BBB"></el-input>
      </el-form-item>

      <el-form-item label="支付产品：" v-if="activityForm.triggerCondition === 'NON_JD_MALL'">
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

      <el-form-item label="活动说明：">
        <el-input placeholder="限100字以内，非必填" type="textarea" v-model="activityForm.desc" class="bigInput" height="100px"></el-input>
      </el-form-item>
    </el-form>

    <div class="btns mar-b-20">
      <el-button type="primary" :disabled="butDisabled" size="small" @click="createActivitieValidate('returnActivity')">下一步</el-button>
      <el-button type="info" size="small" @click="prevPage">取消</el-button>
    </div>
  </div>
</template>

<script>
import {
  createReturnActivity,
  updateReturnActivity,
  queryReturnActivity,
  searchBizTypeByPlanId
} from 'api/service'
import { formatDate } from 'utils/util'
import ReturnRuleIndex from './returnRuleIndex'
export default {
  components: {ReturnRuleIndex},
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

      //
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
      textLineConfigVisible: false,
      pwConfigVisible: false,
      productTypeVisible: false,
      activityForm: {
        title: '',
        sign: '',
        signs: [],
        startDate: '',
        merchantNos: '',
        endDate: '',
        startTime: '00:00:00',
        endTime: '23:59:59',
        dayOfWeek: [],
        dayOfMonth: [],
        merchant: [],
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
        triggerCondition: '',
        triggerConditions: [
          {
            value: '外单京东支付',
            key: 'NON_JD_MALL'
          },
          {
            value: '商城订单支付',
            key: 'JD_MALL'
          }
        ],
        obtainManner: '',
        obtainManners: [
          {
            value: '必返返奖',
            key: 'MUST_RETURN'
          },
          {
            value: '非必返返奖',
            key: 'SELECT_RETURN'
          },
          {
            value: '用户领奖',
            key: 'USER_GET'
          },
          {
            value: '资源',
            key: 'RESOURCE_INFO'
          }
        ],
        triggerMode: '',
        triggerModes: [],
        channelNotify: [],
        channelNotifys: [
          {
            key: 'SMS',
            value: '短信'
          },
          {
            key: 'PUBLIC_NO',
            value: '微信公众号'
          },
          {
            key: 'JRAPP',
            value: '金融APP'
          }
        ],
        // 扩展字段数组
        activityExtDtos: [],

        // 扩展字段 文字链内容
        iconText: '',
        iconContent: '',
        h5Link: '',
        pcLink: '',

        // 弹窗内容
        appBtnDesc: '',
        appBtnLink: '',
        h5BtnDesc: '',
        h5BtnLink: '',
        pcBtnDesc: '',
        pcBtnLink: '',
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
        triggerCondition: [
          {
            required: true,
            message: '触发条件不能为空',
            trigger: 'change'
          }
        ],
        obtainManner: [
          {
            required: true,
            message: '返奖形式不能为空',
            trigger: 'blur'
          }
        ],
        triggerMode: [
          {
            required: true,
            message: '触达方式不能为空',
            trigger: 'blur'
          }
        ],
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
        cacheFormData: {},
        activityExtDtos: [
          {
            key: 'AP_COPY_TEXT',
            value: ''
          }
        ]
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
    fillActivityExts() {
      let exts = []
      // 文字链内容 必须在触达方式为资源时才有值
      if (this.activityForm.triggerMode === 'TEXT_LINK' && this.activityForm.obtainManner === 'RESOURCE_INFO') {
        if (this.activityForm.iconText.length !== 0) {
          exts.push(
            {
              'extField': 'AP_COPY_TEXT_ICON',
              'extValue': this.activityForm.iconText
            }
          )
        }
        if (this.activityForm.iconContent.length !== 0) {
          exts.push(
            {
              'extField': 'AP_COPY_TEXT',
              'extValue': this.activityForm.iconContent
            }
          )
        }
        if (this.activityForm.h5Link.length !== 0) {
          exts.push(
            {
              'extField': 'AP_COPY_H5_URL',
              'extValue': this.activityForm.h5Link
            }
          )
        }
        if (this.activityForm.pcLink.length !== 0) {
          exts.push(
            {
              'extField': 'AP_COPY_PC_URL',
              'extValue': this.activityForm.pcLink
            }
          )
        }
      }



      // 弹窗内容 在触达方式为弹窗时有值
      if (this.activityForm.triggerMode === 'POPUP_WINDOW') {
        if (this.activityForm.appBtnDesc.length !== 0) {
          exts.push(
            {
              'extField': 'AP_XVIEW_APP_BUTTON',
              'extValue': this.activityForm.appBtnDesc
            }
          )
        }
        if (this.activityForm.appBtnLink.length !== 0) {
          exts.push(
            {
              'extField': 'AP_XVIEW_BUTTON_APP_URL',
              'extValue': this.activityForm.appBtnLink
            }
          )
        }
        if (this.activityForm.pcBtnDesc.length !== 0) {
          exts.push(
            {
              'extField': 'AP_XVIEW_PC_BUTTON',
              'extValue': this.activityForm.pcBtnDesc
            }
          )
        }
        if (this.activityForm.pcBtnLink.length !== 0) {
          exts.push(
            {
              'extField': 'AP_XVIEW_BUTTON_PC_URL',
              'extValue': this.activityForm.pcBtnLink
            }
          )
        }
        if (this.activityForm.h5BtnDesc.length !== 0) {
          exts.push(
            {
              'extField': 'AP_XVIEW_H5_BUTTON',
              'extValue': this.activityForm.h5BtnDesc
            }
          )
        }
        if (this.activityForm.h5BtnLink.length !== 0) {
          exts.push(
            {
              'extField': 'AP_XVIEW_BUTTON_H5_URL',
              'extValue': this.activityForm.h5BtnLink
            }
          )
        }
      }


      if (this.activityForm.channelNotify.length !== 0) {
        let tempNotify = ''
        tempNotify += '|'
        this.activityForm.channelNotify.forEach(function(e) {
          tempNotify += e + '|'
        })
        exts.push(
          {
            'extField': 'RP_MSG_NOTIFY_CHANNEL',
            'extValue': tempNotify
          }
        )
      }
      console.log(exts)
      return exts
    },
    initTextConfigCardView() {
      console.log(this.activityForm.obtainManner)
      if (this.activityForm.obtainManner === 'RESOURCE_INFO' && this.activityForm.triggerMode === 'TEXT_LINK') {
        this.textLineConfigVisible = true
      } else {
        this.textLineConfigVisible = false
      }

      if (this.activityForm.triggerMode === 'POPUP_WINDOW') {
        this.pwConfigVisible = true
      } else {
        this.pwConfigVisible = false
      }
      this.initTriggerMode()
    },
    clearTriggerMode() {
      this.activityForm.triggerMode = ''
      // 非商城支付显示支付方式
      if (this.activityForm.triggerCondition === 'NON_JD_MALL') {
        this.productTypeVisible = true
      } else {
        this.productTypeVisible = false
      }
    },
    initTriggerMode() {
      this.activityForm.triggerModes = []
      let obm = this.activityForm.obtainManner
      // 外单京东
      if (this.activityForm.triggerCondition === 'NON_JD_MALL') {
        // 触达方式根据触发条件和返奖形式决定
        if (obm === 'MUST_RETURN') {
          // 渠道通知 CN
          this.activityForm.triggerModes.push({
            value: '渠道通知',
            key: 'CHANNEL_NOTIFY'
          })
        } else if (obm === 'SELECT_RETURN') {
          // 渠道通知 文字提示 CN TL
          this.activityForm.triggerModes.push({
            value: '渠道通知',
            key: 'CHANNEL_NOTIFY'
          })
          this.activityForm.triggerModes.push({
            value: '文字提示',
            key: 'TEXT_LINK'
          })
        } else if (obm === 'USER_GET') {
          // 刮刮卡 SC
          this.activityForm.triggerModes.push({
            value: '刮刮卡',
            key: 'SCRATCH_CARD'
          })
          console.log('njm 用户获取入口')
        } else if (obm === 'RESOURCE_INFO') {
          // 文字提示 TL
          this.activityForm.triggerModes.push({
            value: '文字提示',
            key: 'TEXT_LINK'
          })
          console.log('njm 资源')
        }
      } else if (this.activityForm.triggerCondition === 'JD_MALL') {
        if (obm === 'MUST_RETURN') {
          // 渠道通知 CN
          this.activityForm.triggerModes.push({
            value: '渠道通知',
            key: 'CHANNEL_NOTIFY'
          })
        } else if (obm === 'SELECT_RETURN') {
          // 渠道通知 CN
          this.activityForm.triggerModes.push({
            value: '渠道通知',
            key: 'CHANNEL_NOTIFY'
          })
        } else if (obm === 'USER_GET') {
          // 刮刮卡 弹窗 SC PW
          this.activityForm.triggerModes.push({
            value: '刮刮卡',
            key: 'SCRATCH_CARD'
          })
          this.activityForm.triggerModes.push({
            value: '弹窗',
            key: 'POPUP_WINDOW'
          })
        } else if (obm === 'RESOURCE_INFO') {
          // 文字提示 TL
          this.activityForm.triggerModes.push({
            value: '文字提示',
            key: 'TEXT_LINK'
          })
        }
      }
    },
    init() {
      // 存在活动id，说明是修改功能
      if (this.activityId) {
        this.queryReturnActivity()
      }
      // 查询计划下的业务标识
      this.searchBizTypeByPlanId()
    },
    // 查询活动数据
    queryReturnActivity() {
      let reqParams = {
        activityId: this.activityId
      }
      queryReturnActivity(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}

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
          this.activityForm.merchantNos = data.merchantNosArr ? data.merchantNosArr.length !== 0 ? data.merchantNosArr.join('|') : '' : ''
          this.activityForm.activityPriority = data.priority
          this.activityForm.propagateCW = data.copywriting || ''
          this.activityForm.prizeLimitDay = data.sendLimitDay || ''
          this.activityForm.prizeLimitWeek = data.sendLimitWeek || ''
          this.activityForm.prizeLimitMonth = data.sendLimitMonth || ''
          this.activityForm.prizeLimitAll = data.sendLimitTotal || ''
          this.activityForm.ifRecover = data.recoverRefunding || ''
          this.activityForm.desc = data.activityDesc || ''
          this.activityForm.productType = data.productTypeArr ? data.productTypeArr : []
          this.activityForm.merchantWhitelists = data.merchantWhitelists ? data.merchantWhitelists.length !== 0 ? data.merchantWhitelists.join('|') : '' : ''
          // 触发条件
          this.activityForm.triggerCondition = data.triggerCondition
          // 返奖形式
          this.activityForm.obtainManner = data.obtainManner
          // 触发方式
          this.activityForm.triggerMode = data.triggerMode
          // 文字模块扩展
          this.activityForm.activityExtDtos = data.activityExtDtos
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 创建后返活动
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
          // 拼装扩展字段
          let activityExtDtos = this.fillActivityExts()
          console.log(activityExtDtos)
          let reqParams = {
            activityName: this.activityForm.title,
            bizType: this.activityForm.sign,
            startTime: this.activityForm.startDate,
            endTime: this.activityForm.endDate,
            perDayTimeArr: times.length ? times : '',
            perWeekTimeArr: this.activityForm.dayOfWeek,
            perMonthTimeArr: this.activityForm.dayOfMonth,
            merchantNosArr: this.activityForm.merchantNos === '' ? [] : this.activityForm.merchantNos.split('|'),
            priority: this.activityForm.activityPriority,
            copywriting: this.activityForm.propagateCW,
            sendLimitDay: this.activityForm.prizeLimitDay,
            sendLimitWeek: this.activityForm.prizeLimitWeek,
            sendLimitMonth: this.activityForm.prizeLimitMonth,
            sendLimitTotal: this.activityForm.prizeLimitAll,
            // 退款是否回收奖品
            recoverRefunding: this.activityForm.ifRecover,
            activityDesc: this.activityForm.desc,
            // 回收奖品是否恢复资格
            // recoverQualify: this.activityForm.ifRecover,
            productTypeArr: this.activityForm.productType,
            merchantWhitelists: this.activityForm.merchantWhitelists === '' ? '' : this.activityForm.merchantWhitelists.split('|'),
            triggerCondition: this.activityForm.triggerCondition,
            obtainManner: this.activityForm.obtainManner,
            triggerMode: this.activityForm.triggerMode,
            activityExtDtos: activityExtDtos
          }

          // 存在活动id，表示是修改操作
          if (this.activityId) {
            reqParams.activityId = this.activityId
            this.updateReturnActivity(reqParams)
          } else {
            reqParams.planId = this.planId
            this.createReturnActivity(reqParams)
          }
        })
    },
    // 创建活动
    createReturnActivity(reqParams) {
      createReturnActivity(reqParams)
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

          let pathVal = '/marketingPlanManage/createAward'
          let queryVal = {
            planId: this.planId,
            activityId: data.activityId,
            // type用于区分创建奖项时的奖品类型是否可供选择,1:可选择,0:不可选择
            type: 3,
            // 控制奖项发放数量限制
            day: this.activityForm.prizeLimitDay,
            week: this.activityForm.prizeLimitWeek,
            month: this.activityForm.prizeLimitMonth,
            total: this.activityForm.prizeLimitAll,
            // activityType: 'returnActivity'
            // 返奖形式 传给创建奖项 可不关联奖品
            obtainManner: this.activityForm.obtainManner
          }
          // 创建成功，跳转创建奖项
          this.$router.push({
            path: pathVal,
            query: queryVal
          })
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 修改活动
    updateReturnActivity(reqParams) {
      updateReturnActivity(reqParams)
        .then(res => {
          setTimeout(() => {
            this.butDisabled = false
          }, 1000)
          if (!this.httpThen(this, res)) return
          this.$message({
            message: '修改成功',
            type: 'success'
          })

          let pathVal = '/marketingPlanManage/createAward'
          let queryVal = {
            planId: this.planId,
            activityId: this.$route.query.activityId,
            // type用于区分创建奖项时的奖品类型是否可供选择,1:可选择,0:不可选择
            type: 3,
            // 控制奖项发放数量限制
            day: this.activityForm.prizeLimitDay,
            week: this.activityForm.prizeLimitWeek,
            month: this.activityForm.prizeLimitMonth,
            total: this.activityForm.prizeLimitAll,
            // ruleType: 'returnActivity'
            // activityType: 'returnActivity'
            // 返奖形式 传给创建奖项 可不关联奖品
            obtainManner: this.activityForm.obtainManner
          }

          this.$router.push({
            path: pathVal,
            query: queryVal
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
  },
  watch: {
    triggerModeVal: function () {
      this.initTextConfigCardView()
    },
    activityExtsVal: function () {
      let tempExts = this.activityForm.activityExtDtos
      if (!tempExts) {
        return
      }
      if (this.activityForm.activityExtDtos.length !== 0) {
        for (var i = 0; i < tempExts.length; i++) {
          let item = tempExts[i]
          let field = tempExts[i].extField
          let value = tempExts[i].extValue
          if (item.extField === 'RP_MSG_NOTIFY_CHANNEL') {
            let tempVal = item.extValue.substr(1, item.extValue.length - 2)
            this.activityForm.channelNotify = tempVal.split('|')
          }
          if (field === 'AP_COPY_PC_URL') {
            this.activityForm.pcLink = value
          }
          if (item.extField === 'AP_COPY_H5_URL') {
            this.activityForm.h5Link = value
          }
          if (item.extField === 'AP_COPY_TEXT') {
            this.activityForm.iconContent = value
          }
          if (item.extField === 'AP_COPY_TEXT_ICON') {
            this.activityForm.iconText = value
          }
          if (item.extField === 'AP_XVIEW_APP_BUTTON') {
            this.activityForm.appBtnDesc = value
          }
          if (item.extField === 'AP_XVIEW_BUTTON_APP_URL') {
            this.activityForm.appBtnLink = value
          }
          if (item.extField === 'AP_XVIEW_H5_BUTTON') {
            this.activityForm.h5BtnDesc = value
          }
          if (item.extField === 'AP_XVIEW_BUTTON_H5_URL') {
            this.activityForm.h5BtnLink = value
          }
          if (item.extField === 'AP_XVIEW_PC_BUTTON') {
            this.activityForm.pcBtnDesc = value
          }
          if (item.extField === 'AP_XVIEW_BUTTON_PC_URL') {
            this.activityForm.pcBtnLink = value
          }
        }
      }
    }

  },
  computed: {
    triggerModeVal: function () {
      return this.activityForm.triggerMode
    },
    activityExtsVal: function () {
      return this.activityForm.activityExtDtos
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

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 600px;
    margin-bottom: 20px;
    margin-left: 210px;
  }
</style>
