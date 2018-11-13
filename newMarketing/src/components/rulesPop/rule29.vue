<template>
  <el-form class="app-form-panel"
    label-position="right"
    label-width="160px"
    size="small"
    ref="ruleForm" :model="ruleForm" :rules="ruleFormRules">

      <el-form-item label="规则名称：">
        <span>{{ruleForm.ruleName}}</span>
      </el-form-item>

      <el-form-item label="规则说明：">
        <span>{{ruleForm.instructions}}</span>
      </el-form-item>

      <el-form-item label="银行卡编码:" prop="cardCode">
        <el-input v-model="ruleForm.cardCode" placeholder="输入参加活动的卡bin，一般为6位，支持多个，与'|'分隔 " size="small"></el-input>
      </el-form-item>

      <el-form-item label="银行卡类型：">
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

      <el-form-item label="绑卡链接参数配置：">
        <div class="input-hint-text text-left">{{ruleForm.urlTest}}</div>
      </el-form-item>

      <el-form-item label="source：">
        <el-input v-model="ruleForm.source" placeholder="" size="small"></el-input>
      </el-form-item>

      <el-form-item label="rezType：">
        <el-input v-model="ruleForm.rezType" placeholder="" size="small"></el-input>
      </el-form-item>

      <el-form-item label="from：">
        <el-input v-model="ruleForm.from" placeholder="" size="small"></el-input>
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
  name: 'rule29',
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
      name: 'newBindCard',
      ruleCodeName: 'rule29',
      ruleForm: {
        urlTest:
          'https://msc.jd.com/card/loginpage/wcoo/preBindCard?source=xxx&rezType=xxx&from=xxx&returnUrl=xxx',
        ruleName: '银行领券引导绑卡限制规则',
        instructions: '限制指定的绑卡用户领券，未绑卡用户引导绑卡',
        bin: '',
        userDate: '',
        cardCode: '',
        cardType: '',
        source: '',
        rezType: '',
        from: '',
        noPassDesc: '用户不符合活动指定绑卡要求'
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
        calType: '==',
        // 计算值
        calValue: '1',
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
        ]
      }
    }
  },
  methods: {
    editDefaultVal(data) {
      let extension = typeof data.extension === 'string' ? JSON.parse(data.extension) : data.extension
      this.ruleForm.source = extension.h5Source || ''
      this.ruleForm.rezType = extension.h5RezType || ''
      this.ruleForm.from = extension.h5From || ''
      this.ruleForm.cardType = extension.cardType || ''
      this.ruleForm.cardCode = extension.bankCode || ''
      this.ruleForm.userDate = extension.bindTime.replace(/[>]/, '') || ''
      this.ruleForm.bin = extension.cardBins || ''
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
          this.requestRelesData.extension = {
            h5Source: this.ruleForm.source,
            h5RezType: this.ruleForm.rezType,
            h5From: this.ruleForm.from,
            cardType: this.ruleForm.cardType,
            bankCode: this.ruleForm.cardCode,
            bindTime: '>' + this.ruleForm.userDate,
            cardBins: this.replaceSeparator(this.ruleForm.bin)
          }
          this.$emit('submitRule', this.requestRelesData)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
