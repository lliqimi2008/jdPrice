<template>
  <el-form class="app-form-panel"
    label-position="right"
    label-width="130px"
    size="small"
    ref="ruleForm" :model="ruleForm" :rules="ruleFormRules">

      <el-form-item label="规则名称：">
        <span>{{ruleForm.ruleName}}</span>
      </el-form-item>

      <el-form-item label="规则说明：">
        <span>{{ruleForm.instructions}}</span>
      </el-form-item>

      <el-form-item label="限制类型：">
        <el-select v-model="ruleForm.calType" placeholder="请选择" size="small">
          <el-option
            v-for="item in ruleForm.calTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="订单类型：" prop="orderType">
        <el-radio-group v-model="ruleForm.orderType">
          <el-radio label="全球购"></el-radio>
          <el-radio label="拼购"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="错误文案描述：" prop="noPassDesc">
        <el-input v-model="ruleForm.noPassDesc" placeholder="请输入错误文案描述" size="small"></el-input>
      </el-form-item>

      <el-form-item class="not-label" label="">
        <el-button type="primary" @click="submitRule('ruleForm')" :disabled="butDisabled">确认</el-button>
      </el-form-item>

    </el-form>

</template>

<script>
import { ruleMixins } from 'components/rulesPop/rule.mixins'
export default {
  name: 'rule18',
  mixins: [ruleMixins],
  props: {
    // 规则类型
    ruleType: {
      type: String,
      // 01（活动）、02（奖项）、03（奖品）
      default: ''
    },
    // 用于修改规则时带入的规则数据
    ruleDataTemplate: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      butDisabled: false,
      name: 'orderSendPay',
      ruleCodeName: 'rule18',
      ruleForm: {
        ruleName: '商城订单类型限制',
        instructions: '限制可参加/不可参与活动的商城订单类型',
        calType: 'IN',
        calTypes: [
          {
            label: '白名单',
            value: 'IN'
          },
          {
            label: '黑名单',
            value: 'NOT IN'
          }
        ],
        orderType: '',
        noPassDesc: '非指定的商城订单'
      },
      // 保存规则数据
      requestRelesData: {
        // 规则类型
        ruleType: '',
        // 入口编号（如果是奖项的规则，则为活动ID,如果是奖品的规则，则为奖品ID。）
        entranceId: '',
        // 对应规则(参考规则文档)
        field: '',
        // 对应规则段来源
        fieldSource: 'I',
        // 计算类型
        calType: '',
        // 计算值
        calValue: '',
        // 计算值类型
        calValueType: 'c',
        // 规则组（非奖项默认为1）
        calGroupId: '1',
        // 奖品ID(奖项规则时填true)
        prizeId: '',
        // 是否可叠加使用
        prizeOverlay: 'Y',
        // 规则状态
        status: '0',
        // 规则拓展
        extension: '',
        // 规则不通过文案
        noPassDesc: '',
        // 优先级
        order: ''
      },
      ruleFormRules: {
        orderType: [
          {
            required: true,
            message: '请选择订单类型',
            trigger: 'change'
          }
        ],
        noPassDesc: [
          {
            required: true,
            message: '错误描述方案不能为空且限制20个字符',
            min: 1,
            max: 20,
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    editDefaultVal(data) {
      this.ruleForm.calType = data.calType
      let extension = typeof data.extension === 'string' ? JSON.parse(data.extension) : data.extension
      if (extension.sendPayIndex === '10') {
        this.ruleForm.orderType = '拼购'
      } else if (extension.sendPayIndex === '8') {
        this.ruleForm.orderType = '全球购'
      }
    },
    submitRule(formName) {
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
          // 设置公共属性值
          this.setAttribute()
          // 设置扩展值
          if (this.ruleForm.orderType === '全球购') {
            this.requestRelesData.extension = {
              sendPayIndex: '8'
            }
            this.requestRelesData.calValue = '6'
          } else if (this.ruleForm.orderType === '拼购') {
            this.requestRelesData.extension = {
              sendPayIndex: '10'
            }
            this.requestRelesData.calValue = '7'
          }
          this.$emit('submitRule', this.requestRelesData)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
