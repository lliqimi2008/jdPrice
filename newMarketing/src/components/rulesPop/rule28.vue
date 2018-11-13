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

      <el-form-item label="银行卡编码:" prop="cardCode">
        <el-input v-model="ruleForm.cardCode" placeholder="输入参加活动的卡编码，支持多个，与'|'分隔 " size="small"></el-input>
      </el-form-item>

      <el-form-item label="银行卡类型：" prop="cardType">
        <el-select v-model="ruleForm.cardType" placeholder="请选择" size="small">
          <el-option label="不限制" value="0"></el-option>
          <el-option label="信用卡" value="2"></el-option>
          <el-option label="借记卡" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="银行卡卡bin:" prop="bin">
        <el-input v-model="ruleForm.bin" placeholder="参加活动的卡bin，与'|'分隔多个值，不限制可不填 " size="small"></el-input>
      </el-form-item>

      <el-form-item label="新老用户时间点:" prop="userDate">
        <el-date-picker
          class="select100"
          type="datetime"
          placeholder="开始时间"
          default-time="00:00:00"
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="ruleForm.userDate"></el-date-picker>
        <div class="input-hint-text text-left">若指定时间，则该时间节点之前为老用户，该时间节点之后为新用户，未指定时间，则与用户与系统交互时间为准</div>
      </el-form-item>

      <el-form-item label="用户绑卡状态：" prop="bindStatus">
        <el-radio-group v-model="ruleForm.bindStatus">
          <el-radio class="line-radio" label="NO_CARD">从未绑卡（不受以上配置的时间节点限制）</el-radio><br>
          <el-radio class="line-radio" label="NEW">在以上时间节点后新绑卡</el-radio><br>
          <el-radio class="line-radio" label="NEW_NO_CARD">在以上时间节点后绑卡且已解绑</el-radio><br>
          <el-radio class="line-radio" label="OLD">在以上时间节点前绑卡</el-radio><br>
          <el-radio class="line-radio" label="OLD_NO_CARD">在以上时间节点前绑卡且已解绑</el-radio><br>
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
  name: 'rule28',
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
      name: 'isBindCard',
      ruleCodeName: 'rule28',
      ruleForm: {
        ruleName: '银行卡绑卡状态分类',
        instructions: '限制可参加活动的用户绑卡状态',
        bin: '',
        userDate: '',
        cardCode: '',
        cardType: '',
        bindStatus: '',
        noPassDesc: '用户绑卡状态不符合活动要求'
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
        calType: 'IN',
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
        cardCode: [
          {
            required: true,
            message: '请输入银行卡编码',
            trigger: 'change'
          }
        ],
        bindStatus: [
          {
            required: true,
            message: '请选择用户绑卡状态',
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
      let extension = typeof data.extension === 'string' ? JSON.parse(data.extension) : data.extension
      this.ruleForm.cardCode = extension.bankCode
      this.ruleForm.bin = extension.cardBins
      this.ruleForm.cardType = extension.cardType
      this.ruleForm.userDate = extension.checkTime
      this.ruleForm.bindStatus = data.calValue
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
          if (this.ruleForm.cardType) {
            this.requestRelesData.extension = {
              checkTime: this.ruleForm.userDate,
              cardType: this.ruleForm.cardType,
              bankCode: this.ruleForm.cardCode,
              cardBins: this.replaceSeparator(this.ruleForm.bin)
            }
          } else {
            this.requestRelesData.extension = {
              checkTime: this.ruleForm.userDate,
              bankCode: this.ruleForm.cardCode,
              cardBins: this.replaceSeparator(this.ruleForm.bin)
            }
          }
          // 设置计算值（多个计算值使用|分隔）
          this.requestRelesData.calValue = this.ruleForm.bindStatus
          this.$emit('submitRule', this.requestRelesData)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
