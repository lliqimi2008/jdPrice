<template>
  <el-form class="app-form-panel"
    label-position="right"
    label-width="180px"
    size="small"
    ref="ruleForm" :model="ruleForm" :rules="ruleFormRules">

      <el-form-item label="规则名称：">
        <span>{{ruleForm.ruleName}}</span>
      </el-form-item>

      <el-form-item label="规则说明：">
        <span>{{ruleForm.instructions}}</span>
      </el-form-item>

      <el-form-item label="限制类型：">
        <el-select class="select100" v-model="ruleForm.calValue" placeholder="请选择" size="small">
          <el-option
            v-for="item in ruleForm.calValues"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="指定时间：">
        <el-col :span="11">
          <el-form-item class="null-label" label="" prop="startDate">
            <el-date-picker
              class="select100"
              type="date"
              placeholder="开始时间"
              default-time="00:00:00"
              value-format="yyyy-MM-dd"
              v-model="ruleForm.startDate" id="oStartDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="1">-</el-col>
        <el-col :span="12">
          <el-form-item class="null-label" label="" prop="endDate">
            <el-date-picker
              class="select100"
              type="date"
              placeholder="结束时间"
              default-time="23:59:59"
              value-format="yyyy-MM-dd"
              v-model="ruleForm.endDate"></el-date-picker>
          </el-form-item>
        </el-col>
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
  name: 'rule41',
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
    var validateEndDate = (rule, value, callback) => {
      // 这里通过取this.ruleForm获取不到，是一个bug，目前采用原生js获取dom元素的值比较
      if (document.querySelector('#oStartDate').value) {
        if (!value) {
          return callback(new Error('请选择结束时间'))
        } else if (value <= document.querySelector('#oStartDate').value) {
          return callback(new Error('结束时间必须大于开始时间'))
        } else {
          return callback()
        }
      } else {
        return callback()
      }
    }
    return {
      butDisabled: false,
      name: 'isJrAppFirstLoginTimeValid',
      ruleCodeName: 'rule41',
      ruleForm: {
        ruleName: '用户首次登录金融APP时间限制',
        instructions: '选择可参加活动的用户首次登录金融APP时间',
        noPassDesc: '用户首次登录金融APP时间不符合活动要求',
        startDate: '',
        endDate: '',
        calValue: '1',
        calValues: [
          {
            label: '首次登录在指定时间内',
            value: '1'
          },
          {
            label: '首次登录不在指定时间内',
            value: '0'
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
        calValue: '0',
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
        startDate: [
          { required: false, message: '请选择开始时间', trigger: 'change' }
        ],
        endDate: [
          { required: false, validator: validateEndDate, trigger: 'change' }
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
      this.ruleForm.startDate = extension.begin.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
      this.ruleForm.endDate = extension.end.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
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
            begin: this.ruleForm.startDate ? this.ruleForm.startDate.replace(/[-]/g, '') : '',
            end: this.ruleForm.endDate ? this.ruleForm.endDate.replace(/[-]/g, '') : ''
          }
          this.$emit('submitRule', this.requestRelesData)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
