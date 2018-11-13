<template>
  <el-dialog title="添加规则" width="680px" :closeOnClickModal="false" :closeOnPressEscape="false" :showClose="false" :visible.sync="isShow">
    <span class="el-icon-close pa close-rules" @click="closeRules"></span>
    <div class="rules-head mar-b-10">
      <el-form label-width="120px">
        <el-form-item label="选择规则：">
          <el-select :disabled="isEdit === 'edit'" size="small" v-model="selectParent" @change="changeSelectFirst" placeholder="请选择">
            <el-option
              v-for="item in selectOptionsParent"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>

          <el-select :disabled="isEdit === 'edit'" size="small" v-model="selectChildren" @change="changeSelectSecond" placeholder="请选择">
            <el-option
              v-for="item in selectChildrens"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

    </div>
    <div class="rules-body">
      <component
        :is="currentView"
        :ruleType="ruleType"
        :ruleDataTemplate="ruleDataTemplate"
        :isShow="popShow"
        :groupId="groupId"
        @submitRule="submitRule"
        @submitRuleTwice="submitRuleTwice"></component>
    </div>
  </el-dialog>
</template>

<script>
import store from 'store'
import { createRule, updateRule } from 'api/service'
import rulesSelectObj from './rulesSelect'
import {
  NO_COUPON_ACTIVITY_RULES_PARENT,
  NO_COUPON_ACTIVITY_RULES_CHILD,
  EXTRA_ACTIVITY_PARENT,
  EXTRA_ACTIVITY_CHILD,
  COUPONS_PARENT,
  COUPONS_CHILD
} from 'common/config'

export default {
  name: 'rulesPop',
  components: {
    rulesSelectObj
  },
  data() {
    return {
      popShow: false,
      isEdit: '',
      // 渲染组件
      currentView: rulesSelectObj.rule1,
      // 全部规则列表
      totalRulesList: [
        {
          ruleId: '1.1',
          label: '订单金额限制',
          value: 'rule1',
          selectClass: [1, 2]
        },
        // 放开做规则合并测试
        {
          ruleId: '1.2',
          label: '商城订单品类或SKU限制',
          value: 'rule2',
          selectClass: [1, 2]
        },
        // {
        //   label: '商城订单部分含指定sku',
        //   value: 'rule3',
        //   selectClass: [1, 2]
        // },
        // {
        //   label: '商城订单不含有指定sku',
        //   value: 'rule4',
        //   selectClass: [1, 2]
        // },
        // {
        //   label: '商城订单仅含有指定三级品类',
        //   value: 'rule5',
        //   selectClass: [1]
        // },
        // {
        //   label: '商城订单部分含有指定三级品类',
        //   value: 'rule6',
        //   selectClass: [1, 2]
        // },
        // {
        //   label: '商城订单不含有指定三级品类',
        //   value: 'rule7',
        //   selectClass: [1, 2]
        // },
        // {
        //   label: '商城订单仅含有指定二级品类',
        //   value: 'rule8',
        //   selectClass: [1, 2]
        // },
        // {
        //   label: '商城订单部分含有指定二级品类',
        //   value: 'rule9',
        //   selectClass: [1, 2]
        // },
        // {
        //   label: '商城订单不含有指定二级品类',
        //   value: 'rule10',
        //   selectClass: [1, 2]
        // },
        // {
        //   label: '商城订单仅含有指定店铺商品',
        //   value: 'rule11',
        //   selectClass: [1, 2]
        // },
        {
          ruleId: '1.3',
          label: '商城订单所属店铺ID限制',
          value: 'rule12',
          selectClass: [1, 2]
        },
        // {
        //   label: '商城订单不含有指定店铺商品',
        //   value: 'rule13',
        //   selectClass: [1, 2]
        // },
        {
          ruleId: '1.4',
          label: '商城订单收货地址省级编码限制',
          value: 'rule14',
          selectClass: [1, 2]
        },
        {
          ruleId: '1.5',
          label: '商城订单收货地址市级编码限制',
          value: 'rule15',
          selectClass: [1, 2]
        },
        {
          ruleId: '1.6',
          label: '商城订单自营/POP限制',
          value: 'rule16',
          selectClass: [1, 2]
        },
        {
          ruleId: '1.7',
          label: '商城订单客户端来源限制',
          value: 'rule17',
          selectClass: [1, 2]
        },
        {
          ruleId: '1.8',
          label: '商城订单类型限制',
          value: 'rule18',
          selectClass: [1, 2]
        },
        {
          ruleId: '1.9',
          label: 'OSC拆单品类或SKU限制',
          value: 'rule19',
          selectClass: [1, 2]
        },
        {
          ruleId: '1.10',
          label: '金融订单业务类型限制',
          value: 'rule20',
          selectClass: [1, 8]
        },
        {
          ruleId: '1.11',
          label: '外部自营商户订单SKU限制',
          value: 'rule21',
          selectClass: [1, 3]
        },
        {
          ruleId: '1.12',
          label: '商户标签限制',
          value: 'rule22',
          selectClass: [1, 3]
        },
        {
          ruleId: '1.13',
          label: '支付PI限制',
          value: 'rule23',
          selectClass: [1, 4]
        },
        {
          ruleId: '1.14',
          label: '支付产品限制',
          value: 'rule24',
          selectClass: [1, 4]
        },
        {
          ruleId: '1.15',
          label: '银行卡编码',
          value: 'rule25',
          selectClass: [1, 5]
        },
        {
          ruleId: '1.16',
          label: '银行卡类型',
          value: 'rule26',
          selectClass: [1, 5]
        },
        {
          ruleId: '1.17',
          label: '银行卡bin',
          value: 'rule27',
          selectClass: [1, 5]
        },
        {
          ruleId: '1.18',
          label: '银行卡绑卡状态分类',
          value: 'rule28',
          selectClass: [1, 5]
        },
        {
          ruleId: '1.19',
          label: '银行领券引导绑卡限制规则',
          value: 'rule29',
          selectClass: [1, 5]
        },
        {
          ruleId: '1.20',
          label: '京东支付新老用户',
          value: 'rule30',
          selectClass: [1, 6]
        },
        {
          ruleId: '1.21',
          label: '用户最后一次使用京东支付时间',
          value: 'rule31',
          selectClass: [1, 6]
        },
        {
          ruleId: '1.22',
          label: '京东闪付激活用户',
          value: 'rule32',
          selectClass: [1, 6]
        },
        {
          ruleId: '1.23',
          label: '小金库新老用户',
          value: 'rule33',
          selectClass: [1, 6]
        },
        {
          ruleId: '1.24',
          label: '京东金融实名用户',
          value: 'rule34',
          selectClass: [1, 6]
        },
        {
          ruleId: '1.25',
          label: '京东会员PLUS',
          value: 'rule35',
          selectClass: [1, 6]
        },
        {
          ruleId: '1.26',
          label: '白条用户分类',
          value: 'rule36',
          selectClass: [1, 6]
        },
        {
          ruleId: '1.27',
          label: '金采用户分类',
          value: 'rule37',
          selectClass: [1, 6]
        },
        {
          ruleId: '1.28',
          label: '付款码新老用户限制',
          value: 'rule38',
          selectClass: [1, 6]
        },
        {
          ruleId: '1.29',
          label: '京东到家新老用户限制',
          value: 'rule39',
          selectClass: [1, 6]
        },
        {
          ruleId: '1.30',
          label: '数据部人群ID',
          value: 'rule40',
          selectClass: [1, 6]
        },
        {
          ruleId: '1.31',
          label: '用户首次登录金融APP时间限制',
          value: 'rule41',
          selectClass: [1, 6]
        },
        {
          ruleId: '1.32',
          label: '商户号限制',
          value: 'rule42',
          selectClass: [1, 8]
        },
        {
          ruleId: '1.34',
          label: '外部规则',
          value: 'rule43',
          selectClass: [1, 8]
        },
        {
          ruleId: '1.35',
          label: '众筹用户类型',
          value: 'rule45',
          selectClass: [1, 8]
        },
        {
          ruleId: '1.36',
          label: '金融会员类型',
          value: 'rule46',
          selectClass: [1, 8]
        },
        {
          ruleId: '1.37',
          label: '黄金用户类型',
          value: 'rule47',
          selectClass: [1, 8]
        },
        {
          ruleId: '1.38',
          label: '商城会员京享值',
          value: 'rule48',
          selectClass: [1, 8]
        },
        {
          ruleId: '1.39',
          label: '保险提额可用',
          value: 'rule49',
          selectClass: [1, 8]
        },
        {
          ruleId: '1.40',
          label: '赠险可用',
          value: 'rule50',
          selectClass: [1, 8]
        }
        // {
        //   label: '商城订单排除部分店铺商品',
        //   value: 'rule44',
        //   selectClass: [1, 2]
        // }
      ],
      // 全部规则筛选条件 类
      selectParent: 1,
      selectOptionsParent: [
        {
          label: '全部规则',
          value: 1
        },
        {
          label: '商城订单规则',
          value: 2
        },
        {
          label: '外部商户规则',
          value: 3
        },
        {
          label: '支付工具规则',
          value: 4
        },
        {
          label: '银行卡规则',
          value: 5
        },
        {
          label: '用户事实规则',
          value: 6
        },
        // 二期规则
        // {
        //   label: '用户参加活动次数限制',
        //   value: 7
        // },
        {
          label: '其它',
          value: 8
        }
      ],
      // 规则选择 子类
      selectChildren: '',
      selectChildrens: []
    }
  },
  props: {
    // 显示弹窗
    isShow: {
      type: Boolean,
      default: false
    },
    // 指定是哪种条件: 02（奖项）、03（奖品）
    ruleType: {
      type: String,
      default: ''
    },
    // 用于修改规则时展示的规则模板名
    ruleCodeName: {
      type: String,
      default: ''
    },
    // 用于修改规则时带入的规则数据
    ruleDataTemplate: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 优化级
    order: {
      type: Number,
      default: 0
    },
    // 区分规则组
    groupId: {
      type: [Number, String],
      default: 1
    }
  },
  watch: {
    isShow(newVal, oldVal) {
      // alert('pop ' + newVal)
      console.log(this.groupId)
      console.log(this.$route.query.ruleType)

      // 动态加载规则分类
      let ruleType = this.$route.query.ruleType || 'noCoupons'
      if (ruleType === 'noCoupons') {
        // 无券活动
        this.selectOptionsParent = NO_COUPON_ACTIVITY_RULES_PARENT
        this.totalRulesList = NO_COUPON_ACTIVITY_RULES_CHILD
      } else if (ruleType === 'extraActivity') {
        // 外部调用发奖活动
        this.selectOptionsParent = EXTRA_ACTIVITY_PARENT
        this.totalRulesList = EXTRA_ACTIVITY_CHILD
      } else if (ruleType === 'generalCoupons') {
        // 通用优惠券
        this.selectOptionsParent = COUPONS_PARENT
        this.totalRulesList = COUPONS_CHILD
      }

      // console.log('watch rulePop...' + newVal)
      // console.log(this.ruleDataTemplate)
      
      // console.log(this.ruleDataTemplate.type)
      if (newVal && this.ruleDataTemplate.type) {
        this.isEdit = 'edit'
      } else {
        this.isEdit = ''
      }

      if (newVal) {
        // let dataIndex = this.$refs.test.$el.getAttribute('data-index')
        // let index = Number(dataIndex)
        // if (!this.isEdit) {
        //   index = 1
        // }
        // console.log(index)
        this.selectParent = 1
        // 用于修改,需要获取到
        this.changeSelectFirst(1, this.ruleCodeName === '外部规则' ? 'rule43' : this.ruleCodeName)
      }

      // console.log(this.ruleDataTemplate)
      if (newVal) {
        setTimeout(() => {
          this.popShow = true
        }, 100)
      } else {
        setTimeout(() => {
          this.popShow = false
        }, 100)
      }
      // console.log(this.isEdit)
    }
  },
  created() {
    console.log('create rulePop...')
  },
  activated() {
    // console.log(this.totalRulesList.length)
    console.log('mounted rulePop...')
    // 初始化选择器
    this.changeSelectFirst(1)
  },
  methods: {
    // 选择大类
    changeSelectFirst(selectClass, ruleName) {
      // console.log('selectClass: ' + selectClass)
      // console.log(selectClass)
      // 1: 全部规则
      if (selectClass === 1) {
        // this.selectParent = 1
        // console.log(this.totalRulesList[0])
        this.selectChildrens = this.totalRulesList
        // this.selectChildren = ruleName || this.totalRulesList[0].value
        if (!this.isEdit) {
          this.selectChildren = this.totalRulesList[0].value
        } else {
          this.selectChildren = ruleName || this.totalRulesList[0].value
        }
        this.changeSelectSecond(this.selectChildren)
        return
      }
      console.log(selectClass)
      let selectChildrens = []
      this.totalRulesList.forEach(function(item) {
        if (item.selectClass.indexOf(selectClass) > -1) {
          selectChildrens.push(item)
        }
      })
      // 更新子选择列表
      this.selectChildrens = selectChildrens
      // 默认选择第一个
      this.selectChildren = selectChildrens[0].value
      this.changeSelectSecond(this.selectChildren)
    },
    // 选择子类
    changeSelectSecond(ruleName) {
      this.currentView = rulesSelectObj[ruleName]
    },
    // 提交规则
    submitRule(data) {
      console.log(data)
      // console.log(this.isEdit)

      let reqParams = {
        ruleName: data.ruleName,
        calGroupId: this.groupId,
        calType: data.calType,
        calValue: data.calValue,
        calValueType: data.calValueType,
        // 入口编号（如果是奖项的规则，则为活动ID,如果是奖品的规则，则为奖品ID。）
        // entranceId: data.entranceId,
        field: data.field,
        fieldSource: data.fieldSource,
        noPassDesc: data.noPassDesc,
        prizeOverlay: data.prizeOverlay,
        extension: data.extension,
        ruleType: data.ruleType,
        status: data.status,
        ruleCodeName: data.ruleCodeName,
        // order: data.order,
        // order的自增在组件外面创建时传递
        order: this.order,
        entranceId: '', // this.ruleType === '02' ? this.$route.query.activityId : '1000377', //this.$route.query.prizeId, // 测试时先使用奖品id  this.$route.query.prizeId , this.$route.query.activityId
        prizeId: ''
      }

      /**
       * 如果是奖项则为奖项ID，如果是奖品则为“true”
       * 02（奖项）、03（奖品）
       */
      // 规则组，活动id
      if (this.ruleType === '01') {
        reqParams.prizeId = store.state.awardsId
        reqParams.entranceId = this.$route.query.activityId
      } else if (this.ruleType === '02') {
        // 此处prizeId目前采用从store里面获取
        reqParams.prizeId = 'true' // '奖项id' // this.$route.query.awardId
        reqParams.entranceId = store.state.awardsId // this.$route.query.activityId
      } else if (this.ruleType === '03') {
        reqParams.prizeId = 'true'
        reqParams.entranceId = this.$route.query.prizeId
      }
      // console.log(this.isEdit)
      if (!this.isEdit) {
        // 是否添加规则组？添加isNewGroup参数 = Y
        console.log(store.state.isAddRuleGroup)
        if (store.state.isAddRuleGroup) {
          reqParams.isNewGroup = 'Y'
        }
        console.log(reqParams)
        this.create(reqParams)
      } else {
        // 如果是修改规则，需要传输规则id
        reqParams.ruleId = data.ruleId
        this.update(reqParams)
      }
    },
    submitRuleTwice(dataArray) {
      if (dataArray.length === 1) {
        this.submitRule(JSON.parse(dataArray[0]))
      } else if (dataArray.length === 2) {
        // 两次的情况单独处理：后续再优化
        let data = JSON.parse(dataArray[0])
        let twiceData = JSON.parse(dataArray[1])
        let reqParams = {
          ruleName: data.ruleName,
          calGroupId: this.groupId,
          calType: data.calType,
          calValue: data.calValue,
          calValueType: data.calValueType,
          // 入口编号（如果是奖项的规则，则为活动ID,如果是奖品的规则，则为奖品ID。）
          // entranceId: data.entranceId,
          field: data.field,
          fieldSource: data.fieldSource,
          noPassDesc: data.noPassDesc,
          prizeOverlay: data.prizeOverlay,
          extension: data.extension,
          ruleType: data.ruleType,
          status: data.status,
          ruleCodeName: data.ruleCodeName,
          // order: data.order,
          // order的自增在组件外面创建时传递
          order: this.order,
          entranceId: '', // this.ruleType === '02' ? this.$route.query.activityId : '1000377', //this.$route.query.prizeId, // 测试时先使用奖品id  this.$route.query.prizeId , this.$route.query.activityId
          prizeId: ''
        }

        /**
         * 如果是奖项则为奖项ID，如果是奖品则为“true”
         * 02（奖项）、03（奖品）
         */
        // 规则组，活动id
        if (this.ruleType === '01') {
          reqParams.prizeId = store.state.awardsId
          reqParams.entranceId = this.$route.query.activityId
        } else if (this.ruleType === '02') {
          // 此处prizeId目前采用从store里面获取
          reqParams.prizeId = 'true' // '奖项id' // this.$route.query.awardId
          reqParams.entranceId = store.state.awardsId // this.$route.query.activityId
        } else if (this.ruleType === '03') {
          reqParams.prizeId = 'true'
          reqParams.entranceId = this.$route.query.prizeId
        }
        if (!this.isEdit) {
          // 是否添加规则组？添加isNewGroup参数 = Y
          if (store.state.isAddRuleGroup) {
            reqParams.isNewGroup = 'Y'
          }
          createRule(reqParams)
            .then(res => {
              console.log(res)
              let data = res.data || []
              if (!data.length) {
                return this.$message.error(res.message)
              }
              // window.console.log(this)
              // 赋值规则id，暂时用于删除使用
              reqParams.ruleId = data[0].ruleId // || new Date().getTime()
              reqParams.calGroupId = data[0].calGroupId
              twiceData.calGroupId = reqParams.calGroupId
              this.$emit('createRulePopCallBack', reqParams)
              store.dispatch('setIsAddRuleGroup', false)
              this.$emit('createRulePopCallBackTwice')
              this.submitRule(twiceData)
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          // 如果是修改规则，需要传输规则id
          reqParams.ruleId = data.ruleId
          this.update(reqParams)
        }
      }
    },
    create(reqParams) {
      createRule(reqParams)
        .then(res => {
          console.log(res)
          let data = res.data || []
          if (!data.length) {
            return this.$message.error(res.message)
          }
          // window.console.log(this)
          // 赋值规则id，暂时用于删除使用
          reqParams.ruleId = data[0].ruleId // || new Date().getTime()
          reqParams.calGroupId = data[0].calGroupId
          this.$emit('createRulePopCallBack', reqParams)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    update(reqParams) {
      updateRule(reqParams)
        .then(res => {
          console.log(res)
          // 添加修改类型返回
          // reqParams.isEdit = 'edit'
          // reqParams.ruleId = res.data.promotionRuleDtos[0].ruleId // || new Date().getTime()

          let ruleDtos = res.data.promotionRuleDtos[0]
          ruleDtos.oldRuleId = res.data.oldRuleId
          ruleDtos.isEdit = 'edit'

          this.$emit('createRulePopCallBack', ruleDtos)
        })
        .catch(() => {
          this.$message.error('服务器请求失败')
        })
    },
    // 关闭弹窗
    closeRules(type) {
      this.$emit('close', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.close-rules {
  right: 15px;
  top: 15px;
  font-size: 20px;
  cursor: pointer;
}
.rules-head {
  .el-select {
    width: 250px;
  }
}
</style>
