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
      
      <el-row>
        <el-col :span="13">
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
        </el-col>
        <el-col :span="11">
          <el-form-item class="label-mar-l-5" label="" prop="calValue">
            <el-input v-model="ruleForm.calValue" placeholder="请输入金额" size="small"></el-input>
            <span class="hint-tips">元</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="错误文案描述：">
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
  name: 'rule7',
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
      ruleCodeName: 'rule7',
      ruleForm: {
        ruleName: '商城订单不含有指定三级品类',
        instructions: '限制商城订单不可参与活动的三级品类',
        noPassDesc: '订单中含有非活动三级品类商品'
      },
      ruleFormRules: {
        sku: [
          {
            required: true,
            message: '请输入或上传SKU',
            trigger: 'change'
          }
        ],
        calValue: [
          {
            required: true,
            message: '请输入金额',
            trigger: 'blur'
          },
          {
            message: '金额格式错误，只允许输入整数或保留2位小数',
            pattern: /^(\d+)?(?:\.\d{1,2})?$/,
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
            skuTypeAllNotIn: this.ruleForm.sku
          }
          this.$emit('submitRule', this.requestRelesData)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
