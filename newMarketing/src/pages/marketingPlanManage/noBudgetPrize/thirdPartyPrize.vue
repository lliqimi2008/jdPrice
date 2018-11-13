<template>
  <!--第三方奖品-->
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl" >创建外部奖品</h3>
    </div>
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="奖品标题">
          <el-col :span="11">
            <el-form-item label="内容" label-width="80px" prop="prizeContent">
              <el-input v-model="form.prizeContent" placeholder="请输入标题内容"></el-input>
              <div class="input-hint-text text-left">最多输入两个中文或三个字符</div>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="单位" label-width="80px" prop="prizeUnit">
              <el-input v-model="form.prizeUnit" placeholder="请输入单位"></el-input>
              <div class="input-hint-text text-left">最多输入一个中文或两个字符</div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="奖品副标题" prop="prizeSubtitle">
          <el-input v-model="form.prizeSubtitle" placeholder="请输入奖品副标题"></el-input>
        </el-form-item>
        <el-form-item label="奖品描述" prop="prizeDescribe">
          <el-input v-model="form.prizeDescribe" placeholder="请输入奖品描述"></el-input>
        </el-form-item>
        <el-form-item label="奖品名称" prop="prizeName">
          <el-input v-model="form.prizeName" placeholder="请输入奖品名称"></el-input>
        </el-form-item>
        <el-form-item label="奖品说明" prop="prizeInstructions">
          <el-input v-model="form.prizeInstructions" placeholder="请输入奖品说明"></el-input>
          <div class="input-hint-text text-left">最多可输入1000个中文</div>
        </el-form-item>
        <el-form-item label="商家名称" prop="prizeMerchants">
          <el-input v-model="form.prizeMerchants" placeholder="请输入商家名称"></el-input>
          <div class="input-hint-text text-left">输入正确的商家名称</div>
        </el-form-item>
        <el-form-item label="负责人" prop="prizeDirector">
          <el-input v-model="form.prizeDirector" placeholder="请输入负责人"></el-input>
          <div class="input-hint-text text-left">输入相关的负责人</div>
        </el-form-item>
        <el-form-item label="电话" prop="prizeTelephone">
          <el-input v-model="form.prizeTelephone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="prizeEmail">
          <el-input v-model="form.prizeEmail" placeholder="请输入邮箱"></el-input>
          <div class="input-hint-text text-left">输入正确的邮箱地址，如jd@jd.com</div>
        </el-form-item>
        <el-form-item label="有效时间类型" prop="prizeTimeType">
          <el-select v-model="form.prizeTimeType" @change="choosePrizeType($event)" placeholder="请选择奖品类型">
            <el-option v-for="prizeItem in options"
            :key="prizeItem.value"
            :label="prizeItem.label"
            :value="prizeItem.value"></el-option>
          </el-select>
        </el-form-item>
        <!--固定类型-->
        <div v-if="prizeFixed">
          <el-form-item label="有效时间" prop="valueFixedTime">
            <el-date-picker
            style="width:100%"
            v-model="form.valueFixedTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <!--动态类型-->
        <div v-if="prizeDynamic">
          <el-form-item label="有效时间" prop="valueDynamicTime">
            <el-input placeholder="请输入有效的天数" v-model="form.valueDynamicTime">
              <template slot="prepend">自领取之日起</template>
              <template slot="append">天后过期</template>
            </el-input>
          </el-form-item>
        </div>
        <el-form-item prop="prizePcLink" label="PC跳转链接">
          <el-input v-model="form.prizePcLink"></el-input>
          <div class="input-hint-text text-left">输入正确的跳转链接，如 http://www.jd.com</div>
        </el-form-item>
        <el-form-item prop="prizeHFiveLink" label="H5跳转链接">
          <el-input v-model="form.prizeHFiveLink"></el-input>
        </el-form-item>
        <el-form-item prop="prizeNativeLink" label="原生跳转链接">
          <el-input v-model="form.prizeNativeLink"></el-input>
        </el-form-item>
        <el-form-item prop="prizeCouponCode" label="券码转二维码">
          <template>
            <el-radio v-model="prizeCouponCode" label="true">是</el-radio>
            <el-radio v-model="prizeCouponCode" label="false">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item prop="prizeThreshValue" label="优惠券介绍">
          <quill-editor ref="myTextEditor"
            style="background-color: #fff;"
            v-model="form.prizeThreshValue"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="butDisabled" @click="submitForm('form')">保存</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    </el-tabs>
  </section>
</template>

<script>
import {
  noBudgetCreateThird,
  newBudgetSearchDetail,
  noBudgetModifyThird
} from 'api/service'
import { quillEditor } from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css' // 调用编辑器css样式
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data() {
    return {
      butDisabled: false,
      prizeCouponCode: 'false', // 券码转二维码
      content: '',
      editorOption: {
        // something config
      },
      prizeFixed: true, // 固定时间类型
      prizeDynamic: false, // 动态时间类型
      form: {
        prizeContent: '', // 奖品标题-内容
        prizeUnit: '', // 奖品标题-单位
        prizeSubtitle: '', // 奖品副标题
        prizeDescribe: '', // 奖品描述
        prizeName: '', // 奖品名称
        prizeDirector: '', // 负责人
        prizeTelephone: '', // 电话
        prizeEmail: '', // 邮箱
        prizeInstructions: '', // 奖品说明
        prizeMerchants: '', // 商家名称
        prizeTimeType: '', // 有效时间类型
        prizePcLink: '', // pc跳转链接
        prizeHFiveLink: '', // h5跳转链接
        prizeNativeLink: '', // 原生跳转链接
        valueFixedTime: [], // 有效固定时间
        valueDynamicTime: '', // 有效动态时间类型
        prizeThreshValue: '' // 文本编译器
      },
      rules: {
        prizeContent: [
          { required: true, message: '请输入奖品标题内容', trigger: 'blur' },
          { min: 1, max: 3, message: '最多输入两个中文或三个字符', trigger: 'blur' }
        ],
        valueFixedTime: [
          { required: true, message: '请选择有效时间', trigger: 'blur' }
        ],
        prizeUnit: [
          { min: 0, max: 2, message: '最多输入一个中文或两个个字符', trigger: 'blur' }
        ],
        a_content: [
          {required: true, message: '请输入详细内容', trigger: 'blur'}
        ],
        prizeSubtitle: [
          { required: true, message: '请输入奖品副标题', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ],
        prizeDescribe: [
          { required: true, message: '请输入奖品描述', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ],
        prizeName: [
          { required: true, message: '请输入奖品名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        prizeInstructions: [
          { required: true, message: '请输入奖品说明', trigger: 'blur' },
          { min: 1, max: 1000, message: '长度在 1 到 1000 个字符', trigger: 'blur' }
        ],
        prizeMerchants: [
          { required: true, message: '请输入商家名称', trigger: 'blur' }
        ],
        prizePcLink: [
          {required: true, message: '请输入正确的跳转链接，只能http://或https://开头', pattern: /^(https?|http):\/\/.+$/, trigger: 'blur'}
        ],
        prizeDirector: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        prizeTelephone: [
          {required: true, message: '请输入正确的手机号', pattern: /^[1][0-9]{10}\d*$/, trigger: 'blur'}
        ],
        prizeEmail: [
          {type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur'}
        ],
        valueDynamicTime: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if ((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) === false || value === '') {
                callback(new Error('请填写大于0的有效天数'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },
      options: [{
        value: 'FIXED',
        label: '固定'
      }, {
        value: 'DYNAMIC',
        label: '动态'
      }]
    }
  },
  components: {
    quillEditor
  },
  activated() {
    this.budgetSearchDetail()
    this.onPerform()
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor
    }
  },
  mounted() {
    // you can use current editor object to do something(editor methods)
    // console.log('this is my editor', this.editor)
    // this.editor to do something...
  },
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      this.content = html
    },
    // 数据回显
    budgetSearchDetail() {
      let prizeId = this.$route.query.prizeId
      if (prizeId) {
        let params = {
          prizeId: this.$route.query.prizeId
        }
        newBudgetSearchDetail(params)
          .then(res => {
            if (!this.httpThen(this, res)) return
            let data = res.data || {}
            this.form.prizeContent = data.titlePrefix
            this.form.prizeUnit = data.titleSuffix
            this.form.prizeSubtitle = data.subTitle
            this.form.prizeDescribe = data.desc
            this.form.prizeName = data.thirdPrizeName
            this.form.prizeDirector = data.director
            this.form.prizeTelephone = data.tel
            this.form.prizeEmail = data.email
            this.form.prizeInstructions = data.instructions
            this.form.prizeMerchants = data.merchantName
            this.form.prizeTimeType = data.validityType
            this.form.valueFixedTime = [data.validityFromTime, data.validityToTime]
            this.form.valueDynamicTime = data.validityDays
            this.form.prizePcLink = data.pcUrl
            this.form.prizeHFiveLink = data.h5Url
            this.form.prizeNativeLink = data.commonUrl
            this.prizeCouponCode = data.showQr.toString()
            this.form.prizeThreshValue = data.introduction
            if (this.form.prizeTimeType === 'DYNAMIC') {
              this.prizeFixed = false // 固定时间类型
              this.prizeDynamic = true // 动态时间类型
            } else {
              this.prizeFixed = true // 固定时间类型
              this.prizeDynamic = false // 动态时间类型
            }
          })
          .catch((err) => {
            this.httpCatch(this, err)
          })
      } else {
        this.$refs.form.resetFields()
      }
    },
    // 页面加载访问方法
    onPerform() {
      this.form.prizeTimeType = this.options[0].value
    },
    // 下拉框选择品类
    choosePrizeType(e) {
      let optionLabel = this.options
      let optionLabelArr = []
      optionLabel.forEach((item, index) => {
        optionLabelArr.push(item.value)
        return optionLabelArr
      })
      switch (e) {
        case optionLabelArr[0]:
          this.prizeFixed = true // 固定时间类型
          this.prizeDynamic = false // 动态时间类型
          break
        case optionLabelArr[1]:
          this.prizeFixed = false // 固定时间类型
          this.prizeDynamic = true // 动态时间类型
          break
        default: break
      }
    },
    // 点击保存访问方法
    submitForm(form) {
      this.$refs[form] &&
        this.$refs[form].validate((valid) => {
          if (!valid) {
            return false
          } else {
            this.butDisabled = true
            let reqParams = {}
            if (this.prizeFixed) {
              reqParams = {
                thirdPrizeId: this.$route.query.prizeId,
                planId: this.$route.query.planId,
                titlePrefix: this.form.prizeContent,
                titleSuffix: this.form.prizeUnit,
                subTitle: this.form.prizeSubtitle,
                desc: this.form.prizeDescribe,
                thirdPrizeName: this.form.prizeName,
                director: this.form.prizeDirector,
                tel: this.form.prizeTelephone,
                email: this.form.prizeEmail,
                instructions: this.form.prizeInstructions,
                merchantName: this.form.prizeMerchants,
                validityType: this.form.prizeTimeType,
                validityFromTime: this.form.valueFixedTime[0],
                validityToTime: this.form.valueFixedTime[1],
                validityDays: this.form.valueDynamicTime,
                pcUrl: this.form.prizePcLink,
                h5Url: this.form.prizeHFiveLink,
                commonUrl: this.form.prizeNativeLink,
                showQr: this.prizeCouponCode,
                introduction: this.form.prizeThreshValue
              }
            } else {
              reqParams = {
                thirdPrizeId: this.$route.query.prizeId,
                planId: this.$route.query.planId,
                titlePrefix: this.form.prizeContent,
                titleSuffix: this.form.prizeUnit,
                subTitle: this.form.prizeSubtitle,
                desc: this.form.prizeDescribe,
                thirdPrizeName: this.form.prizeName,
                director: this.form.prizeDirector,
                tel: this.form.prizeTelephone,
                email: this.form.prizeEmail,
                instructions: this.form.prizeInstructions,
                merchantName: this.form.prizeMerchants,
                validityType: this.form.prizeTimeType,
                validityDays: this.form.valueDynamicTime,
                pcUrl: this.form.prizePcLink,
                h5Url: this.form.prizeHFiveLink,
                commonUrl: this.form.prizeNativeLink,
                showQr: this.prizeCouponCode,
                introduction: this.form.prizeThreshValue
              }
            }
            let prizeId = this.$route.query.prizeId
            if (prizeId) {
              noBudgetModifyThird(reqParams)
                .then(res => {
                  setTimeout(() => {
                    this.butDisabled = false
                  }, 1000)
                  if (!this.httpThen(this, res)) return
                  this.$message({
                    message: '修改第三方奖品成功',
                    type: 'success'
                  })
                  this.$router.push({
                    path: '/marketingPlanManage/planDetail',
                    query: {
                      planId: this.$route.query.planId,
                      auditStatus: this.$route.query.auditStatus
                    }
                  })
                })
                .catch((err) => {
                  this.httpCatch(this, err)
                })
            } else {
              noBudgetCreateThird(reqParams)
                .then(res => {
                  setTimeout(() => {
                    this.butDisabled = false
                  }, 1000)
                  if (!this.httpThen(this, res)) return
                  this.$message({
                    message: '创建第三方奖品成功',
                    type: 'success'
                  })
                  this.$router.push({
                    path: '/marketingPlanManage/planDetail',
                    query: {
                      planId: this.$route.query.planId,
                      auditStatus: this.$route.query.auditStatus
                    }
                  })
                })
                .catch((err) => {
                  this.httpCatch(this, err)
                })
            }
          }
        })
    },
    // 点击取消访问方法
    async resetForm(form) {
      this.$refs[form].resetFields()
      this.$confirm('确认取消操作', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push({
            path: '/marketingPlanManage/planDetail',
            query: {
              planId: this.$route.query.planId,
              auditStatus: this.$route.query.auditStatus
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>
<style scoped="scoped">
  .noBudgetPrize{ width: 100%;}
  .el-select{ display: block;}
  .text_center{ text-align: center;}
</style>
