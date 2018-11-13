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

      <el-form-item label="店铺ID值：" prop="sku">
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
          <el-select v-model="ruleForm.calType" placeholder="请选择" size="small">
            <el-option
              v-for="item in ruleForm.calTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row :span="12">
        <el-form-item label="计算值：" prop="calValue">
          <el-input v-model="ruleForm.calValue" placeholder="请输入内容计算值" size="small"></el-input>
        </el-form-item>
      </el-row>

      <el-form-item label="错误文案描述：" prop="noPassDesc">
        <el-input v-model="ruleForm.noPassDesc" placeholder="请输入错误文案描述" size="small"></el-input>
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
  name: 'rule44',
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
      name: '',
      ruleCodeName: 'rule44',
      ruleForm: {
        calType: '>=',
        ruleName: '商城订单排除部分店铺商品',
        instructions:
          '商城订单中排队掉以下店铺商品后，计算其他商品满足金额即可',
        noPaseDesc: '订单中含有非活动店铺商品'
      },
      ruleFormRules: {

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
          // 设置扩展值
          this.requestRelesData.extension = {
            shopIdNotIn: this.ruleForm.sku
          }
          this.$emit('submitRule', this.requestRelesData)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
