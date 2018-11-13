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

      <el-form-item label="限制类型：">
        <el-select v-model="ruleForm.limitType" placeholder="请选择" size="small">
          <el-option
            v-for="item in ruleForm.limitTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SKU值：" prop="sku">
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
  name: 'rule19',
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
      name: 'oscOrderSkuLimit',
      ruleCodeName: 'rule19',
      ruleForm: {
        calType: '>=',
        ruleName: '商城OSC拆单品类/SKU限制',
        instructions:
          '根据OSC拆单规则限制可参与活动的商品，并对商品价格进行限制',
        noPassDesc: '订单中含有非活动商品',
        // 限制类型
        limitType: 'skuIdAllIn',
        limitTypes: [
          {
            label: 'SKU白名单',
            value: 'skuIdAllIn'
          },
          {
            label: 'SKU黑名单',
            value: 'skuIdAllNotIn'
          },
          {
            label: '三级品类白名单',
            value: 'skuTypeAllIn'
          },
          {
            label: '三级品类黑名单',
            value: 'skuTypeAllNotIn'
          },
          {
            label: '二级品类名单',
            value: 'skuType2AllIn'
          },
          {
            label: '二级品类黑名单',
            value: 'skuType2AllNotIn'
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
        calType: '',
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
    editDefaultVal(data) {
      let extension = JSON.stringify(data.extension)
      let keys = extension.replace(/[\\{"}]/g, '').split(':')
      this.ruleForm.limitType = keys[0] || 'skuIdAllIn'
      this.ruleForm.sku = keys[1] || ''
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

          // 设置扩展值（根据限制类型设置不同的扩展字段）
          this.requestRelesData.extension = this.setSkuTypes(
            this.ruleForm.limitType
          )

          this.$emit('submitRule', this.requestRelesData)
        })
    },
    setSkuTypes(type) {
      let sku = this.ruleForm.sku
      let types = {
        skuIdAllIn: {
          skuIdAllIn: sku
        },
        skuIdAllNotIn: {
          skuIdAllNotIn: sku
        },
        skuTypeAllIn: {
          skuTypeAllIn: sku
        },
        skuTypeAllNotIn: {
          skuTypeAllNotIn: sku
        },
        skuType2AllIn: {
          skuType2AllIn: sku
        },
        skuType2AllNotIn: {
          skuType2AllNotIn: sku
        }
      }
      return types[type]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
