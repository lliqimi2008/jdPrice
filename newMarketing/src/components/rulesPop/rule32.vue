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

      <el-form-item label="会员类型：" prop="calValue">
        <el-radio-group v-model="ruleForm.calValue">
          <el-radio class="line-radio" label="1">闪付激活用户</el-radio><span class="input-hint-text">(激活次数大于等于1)</span><br><br>
          <el-radio class="line-radio" label="0">闪付未激活用户</el-radio><span class="input-hint-text">(激活次数等于0)</span><br><br>
          <el-radio class="line-radio" label="2">闪付首次激活用户</el-radio><span class="input-hint-text">(仅激活一次，且激活时间在5s内)</span>
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
  name: 'rule32',
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
      name: 'quickPassUserActivate',
      ruleCodeName: 'rule32',
      ruleForm: {
        ruleName: '京东闪付激活用户限制',
        instructions: '选择可参加活动的闪付用户',
        noPassDesc: '非活动指定闪付用户'
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
        calValueType: 'n',
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
        calValue: [
          {
            required: true,
            message: '请选择会员类型',
            trigger: 'blur'
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
      if (data.calValue === '1' && data.calType === '>=') {
        this.ruleForm.calValue = '1'
      } else if (data.calValue === '1' && data.calType === '==') {
        this.ruleForm.calValue = '2'
      } else {
        this.ruleForm.calValue = '0'
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
          
          // 覆盖属性
          if (this.ruleForm.calValue === '1') {
            // 激活用户
            this.requestRelesData.calType = '>='
            this.requestRelesData.calValue = '1'
          } else if (this.ruleForm.calValue === '0') {
            // 未激活用户
            this.requestRelesData.calType = '=='
            this.requestRelesData.calValue = '0'
          } else if (this.ruleForm.calValue === '2') {
            // 首次激活用户
            this.requestRelesData.calType = '=='
            this.requestRelesData.calValue = '1'
          }

          // 设置扩展值
          this.requestRelesData.extension = {
            timeInaccuracy: '5',
            timeUnit: 'second'
          }
          this.$emit('submitRule', this.requestRelesData)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
