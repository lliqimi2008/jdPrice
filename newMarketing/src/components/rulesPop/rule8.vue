<template>
  <el-form class="app-form-panel"
    label-position="right"
    label-width="120px"
    size="small"
    ref="budgetPrize" :model="ruleForm" :rules="ruleFormRules">

      <el-form-item label="规则名称：">
        <span>{{ruleForm.ruleName}}</span>
      </el-form-item>

      <el-form-item label="规则说明：">
        <span>{{ruleForm.instructions}}</span>
      </el-form-item>

      <el-form-item label="三级品类值：">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="ruleForm.sku">
        </el-input>
      </el-form-item>

      <el-form-item label="文件上传：">
        <file-upload @success="fileUploadSuccess" @remove="fileRemove"></file-upload>
      </el-form-item>

      <el-row :span="12">
        <el-form-item label="金额限制：">
          <el-select v-model="ruleForm.conputedType" placeholder="请选择" size="small">
            <el-option
              v-for="item in ruleForm.conputedTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row :span="12">
        <el-form-item class="not-label" label="">
          <el-input v-model="ruleForm.computed" placeholder="请输入内容" size="small"></el-input>
          <span>元</span>
        </el-form-item>
      </el-row>

      <el-form-item label="错误文案描述：">
        <el-input v-model="ruleForm.errMsg" placeholder="请输入内容" size="small"></el-input>
      </el-form-item>

      <el-form-item class="not-label" label="">
        <el-button type="primary" @click="submitRule('ruleForm')" :disabled="butDisabled">确认</el-button>
      </el-form-item>

    </el-form>

</template>

<script>
import fileUpload from 'components/rulesPop/fileUpload'
import { ruleMixins } from 'components/rulesPop/rule.mixins'
export default {
  name: 'rule8',
  mixins: [ruleMixins],
  components: {
    fileUpload
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
      name: 'newSkuLimit',
      ruleCodeName: 'rule8',
      ruleForm: {
        ruleName: '商城订单部分含有指定二级品类',
        instructions: '限制商城订单参与活动的二级品类商品',
        noPassDesc: ''
      },
      ruleFormRules: {}
    }
  },
  watch: {
    isShow(newVal, oldVal) {
      // 是否处于编辑
      if (newVal) {
        this.init()
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
        })
      this.butDisabled = true
      // 设置公共属性值
      this.setAttribute()

      // 设置扩展值
      this.requestRelesData.extension = {
        // skuIdAllIn: this.ruleForm.sku
      }

      this.$emit('submitRule', this.requestRelesData)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
