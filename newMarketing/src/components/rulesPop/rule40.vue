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

      <el-form-item label="限制类型：" prop="calValue">
        <el-select v-model="ruleForm.calValue" placeholder="请选择" size="small">
          <el-option label="白名单" value="1"></el-option>
          <el-option label="黑名单" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="人群ID：" prop="pid">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="支持多个，与'|'隔开"
          v-model="ruleForm.pid">
        </el-input>
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
  name: 'rule40',
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
      name: 'dataCenterUserTagLimit',
      ruleCodeName: 'rule40',
      ruleForm: {
        ruleName: '数据部人群ID',
        instructions: '通过人群ID，限制参与活动中用户黑白名单',
        pid: '',
        calValue: '1',
        noPassDesc: '非活动指定人群'
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
        pid: [
          {
            required: true,
            message: '请输入人群ID，多个与"|"分隔开',
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
      this.ruleForm.pid = extension.ruleIds
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
          // 设置计算值
          this.requestRelesData.extension = {
            ruleIds: this.ruleForm.pid,
            compareType: 'userTagAllIn'
          }

          // let aPid = this.ruleForm.pid.split('|')
          if (this.ruleForm.pid.split('|').length >= 2) {
            this.requestRelesData.extension.compareType = 'userTagNotAllIn'
          }

          this.$emit('submitRule', this.requestRelesData)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
