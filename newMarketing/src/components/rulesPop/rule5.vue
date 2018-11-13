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

      <el-form-item label="三级品类值：" prop="sku">
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
        <el-button type="primary">确认</el-button>
      </el-form-item>

    </el-form>

</template>

<script>
export default {
  name: 'ruleSelect5',
  data() {
    return {
      ruleForm: {
        ruleName: '商城订单仅含有指定三级品类商品',
        instructions: '限制商城订单参与活动的三级品类商品',
        conputedType: '1',
        conputedTypes: [
          {
            label: '大于等于',
            value: '0'
          },
          {
            label: '小于等于',
            value: '1'
          }
        ],
        computed: '',
        errMsg: '',
        upFileList: []
      },
      ruleFormRules: {}
    }
  },
  methods: {
    submitRule() {
      this.$emit('saveRule')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
