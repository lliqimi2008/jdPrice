/**
 * 规则公共属性
 */

export const ruleMixins = {
  data() {
    return {
      // 存储公共属性
      ruleForm: {
        sku: '',
        calType: '',
        calTypes: [
          {
            label: '大于等于',
            value: '>='
          },
          {
            label: '大于',
            value: '>'
          },
          {
            label: '等于',
            value: '=='
          },
          {
            label: '小于',
            value: '<'
          },
          {
            label: '小于等于',
            value: '<='
          }
        ],
        calValue: '',
        noPassDesc: ''
      }
      // 保存规则数据(默认值 ，可被替换)
      // requestRelesData: {
      //   // 规则类型
      //   ruleType: '',
      //   // 入口编号（如果是奖项的规则，则为活动ID,如果是奖品的规则，则为奖品ID。）
      //   entranceId: '',
      //   // 对应规则(参考规则文档)
      //   field: '',
      //   // 对应规则段来源
      //   fieldSource: 'O',
      //   // 计算类型
      //   calType: '',
      //   // 计算值
      //   calValue: '',
      //   // 计算值类型
      //   calValueType: 'n',
      //   // 规则组（非奖项默认为1）
      //   calGroupId: '1',
      //   // 奖品ID(奖项规则时填true)
      //   prizeId: '',
      //   // 是否可叠加使用
      //   prizeOverlay: 'Y',
      //   // 规则状态
      //   status: '0',
      //   // 规则拓展
      //   extension: '',
      //   // 规则不通过文案
      //   noPassDesc: '',
      //   // 优先级
      //   order: ''
      // }
    }
  },
  watch: {
    isShow(newVal, oldVal) {
      // 是否处于编辑
      if (newVal) {
        this.init()
        this.getRules && this.getRules()
      }
    }
  },
  activated() {
    console.log('create..')
    // 存在表示处于编辑状态
    if (this.ruleDataTemplate.field) {
      this.init()
    }
  },
  methods: {
    // 编辑时进行对象值合并
    init() {
      // console.log(this.ruleDataTemplate)
      // console.log(this.ruleForm)

      // 清空数据验证
      this.resetForm('ruleForm')
      
      if (this.ruleDataTemplate.field) {
        console.log('编辑')
        Object.assign(this.ruleForm, this.ruleForm, this.ruleDataTemplate)
        this.requestRelesData.ruleId = this.ruleDataTemplate.ruleId
        // 编辑情况下需要处理默认值，需要进入到每个规则模板中设置特殊的回调值
        this.editDefaultVal && this.editDefaultVal(this.ruleForm)
      } else {
        console.log('创建')
        Object.assign(this.$data, this.$options.data())
      }
    },
    // 设置字段属性
    setAttribute() {
      // 前端自定义用于展示和做编辑功能的
      this.requestRelesData.field = this.name
      this.requestRelesData.ruleCodeName = this.ruleCodeName
      this.requestRelesData.ruleName = this.ruleForm.ruleName
      // 后端接收的
      this.requestRelesData.ruleType = this.ruleType || this.requestRelesData.ruleType
      this.requestRelesData.calType = this.ruleForm.calType || this.requestRelesData.calType
      // 单个计算值
      this.requestRelesData.calValue = this.ruleForm.calValue || this.requestRelesData.calValue
      this.requestRelesData.noPassDesc = this.ruleForm.noPassDesc
      // 设置规则组(规则组需要根据创建时点击的元素来动态添加)
      // this.requestRelesData.calGroupId = this.groupId
    },
    // 文件上传成功后设置sku
    fileUploadSuccess(data) {
      // 存储sku
      this.ruleForm.sku = data
    },
    // 文件列表移除,同时清空sku值
    fileRemove() {
      this.ruleForm.sku = ''
    },
    // 重置表单
    resetForm(formName) {
      setTimeout(() => {
        // 延迟清空的原因是因为有时候dom及对应的model未渲染
        this.$refs[formName].clearValidate()
      }, 0)
    }
  }
}