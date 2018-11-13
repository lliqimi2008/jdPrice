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

    <el-form-item label="用户类型"  prop="calValue">
      <el-radio-group v-model="ruleForm.calValue">
        <el-radio label="true">众筹新手</el-radio>
        <el-radio label="false">众筹老用户</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="错误文案描述：" prop="noPassDesc">
      <el-input v-model="ruleForm.noPassDesc" placeholder="非活动指定的众筹用户类型" size="small"></el-input>
    </el-form-item>


    <el-form-item class="not-label" label="">
      <el-button type="primary" @click="submitRule('ruleForm')" :disabled="butDisabled">确认</el-button>
    </el-form-item>

  </el-form>

</template>

<script>

import { ruleMixins } from 'components/rulesPop/rule.mixins'
export default {
  name: 'rule45',
  mixins: [ruleMixins],
  components: {

  },
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
      // 存储该规则不同的属性值
      name: 'crowdfundingNewUser',
      ruleCodeName: 'rule45',
      ruleForm: {
        ruleName: '众筹用户类型',
        instructions: '限制参加活动的众筹用户类型',
        noPassDesc: '非活动指定的众筹用户类型'
      },
      ruleFormRules: {
        calValue: [
          {
            required: true,
            message: '请选择用户类型',
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
      }
    }
  },
  methods: {
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
        this.$emit('submitRule', this.requestRelesData)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
