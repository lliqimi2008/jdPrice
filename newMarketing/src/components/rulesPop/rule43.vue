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

      <el-form-item label="规则字段：" prop="field">
        <el-input v-model="ruleForm.field" placeholder="" size="small"></el-input>
      </el-form-item>

      <el-row :span="12">
        <el-form-item label="限制类型：">
          <el-select v-model="ruleForm.calType" placeholder="请选择" size="small">
            <el-option label="属于" value="IN"></el-option>
            <el-option label="不属于" value="NOT IN"></el-option>
            <el-option label="大于等于" value=">="></el-option>
            <el-option label="大于" value=">"></el-option>
            <el-option label="等于" value="=="></el-option>
            <el-option label="小于等于" value="<="></el-option>
            <el-option label="小于" value="<"></el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-form-item label="计算值：" prop="sku">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="支持多个，与'|'分隔"
          v-model="ruleForm.sku">
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
// import { RULES_NAME } from 'common/config'
import { ruleMixins } from 'components/rulesPop/rule.mixins'
export default {
  name: 'rule43',
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
      name: '',
      ruleCodeName: 'rule43',
      ruleForm: {
        rulesList: [],
        ruleName: '外部规则',
        instructions: '以上游传入字段作为规则名进行比对限制',
        calType: 'IN',
        ruleField: '',
        noPassDesc: '错误文案根据填入的规则字段读取'
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
        fieldSource: 'O',
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
        field: [
          {
            required: true,
            message: '请输入规则字段',
            trigger: 'change'
          }
        ],
        sku: [
          {
            required: true,
            message: '请输入计算值，多个与”|“分隔',
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
    // 获取规则字段
    // getRules() {
    //   let tempList = []
    //   for(let key in RULES_NAME) {
    //     tempList.push(key)
    //   }
    //   this.ruleForm.rulesList = tempList
    // },
    editDefaultVal(data) {
      this.ruleForm.field = data.field
      this.ruleForm.sku = data.calValue
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
          this.requestRelesData.field = this.ruleForm.field
          this.requestRelesData.calValue = this.ruleForm.sku
          this.$emit('submitRule', this.requestRelesData)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
