<template>
  <!--小金库红包-->
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl" >创建小金库红包</h3>
    </div>
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="奖品名称" prop="prizeName">
          <el-input v-model="form.prizeName" placeholder="请输入奖品名称"></el-input>
        </el-form-item>
        <el-form-item label="奖品数量" prop="prizeNumber">
          <el-input v-model="form.prizeNumber" placeholder="请输入奖品数量"></el-input>
        </el-form-item>
        <el-form-item label="token" prop="prizeToken">
          <el-input v-model="form.prizeToken" placeholder="请输入token"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="prizeDirector">
          <el-input v-model="form.prizeDirector" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="prizeTelephone">
          <el-input v-model="form.prizeTelephone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="prizeEmail">
          <el-input v-model="form.prizeEmail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="小金库红包活动来源" prop="xjkRedpackSource">
          <el-input v-model="form.xjkRedpackSource" placeholder="请输入小金库红包活动来源"></el-input>
        </el-form-item>
        <el-form-item label="奖品类型" prop="prizeType">
          <el-select v-model="form.prizeType" @change="choosePrizeType($event)" placeholder="请选择奖品类型">
            <el-option v-for="prizeItem in options"
            :key="prizeItem.value"
            :label="prizeItem.label"
            :value="prizeItem.value"></el-option>
          </el-select>
        </el-form-item>
        <!--固定面额-->
        <div v-if="prizeDenom">
          <el-form-item prop="prizeDenomination" label="奖品面额">
            <el-input v-model="form.prizeDenomination" placeholder="请输入面额"></el-input>
          </el-form-item>
        </div>
        <!--订单比例-->
        <div v-if="orderProportion">
          <el-form-item prop="prizeIndentScale" label="订单比例">
            <el-input v-model="form.prizeIndentScale">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="prizeAmountScopesEnd" label="金额上限">
            <el-input v-model="form.prizeAmountScopesEnd"></el-input>
          </el-form-item>
        </div>
        <!--随机金额-->
        <div v-if="randomAmount">
          <el-form-item label="金额范围">
            <el-col :span="11">
              <el-form-item prop="prizeAmountScopesSt">
                <el-input v-model="form.prizeAmountScopesSt">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col class="text_center" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="prizeAmountScopesEnd">
                <el-input v-model="form.prizeAmountScopesEnd">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
        <!--概率-->
        <div v-if="prizeProbability">
          <el-form-item
          v-for="(domain, index) in form.domains"
          :label="'概率' + index"
          :key="index"
          :prop="'domains.' + index + '.amount'"
          >
            <el-col :span="8">
              <el-input v-model="domain.amount">
                <template slot="append">元</template>
              </el-input>
            </el-col>
            <el-col class="text_center" :span="2">-</el-col>
            <el-col :span="8">
              <el-input v-model="domain.probability">
                <template slot="append">%</template>
              </el-input>
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button type="primary" @click="addDomain(domain)">添加</el-button>
            </el-col>
            <el-col :span="2">
              <el-button @click.prevent="removeDomain(domain)">删除</el-button>
            </el-col>
          </el-form-item>
        </div>
        <el-form-item prop="prizeThreshValue" label="数量阈值">
          <el-input v-model="form.prizeThreshValue"></el-input>
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
  noBudgetAward,
  newBudgetSearchDetail,
  noBudgetModifyInter
} from 'api/service'
export default {
  data() {
    return {
      butDisabled: false,
      prizeDenom: true, // 固定面额
      orderProportion: false, // 订单比例
      randomAmount: false, // 随机金额
      prizeProbability: false, // 概率
      form: {
        prizeName: '', // 奖品名称
        prizeNumber: '', // 奖品数量
        prizeToken: '', // token
        prizeDirector: '', // 负责人
        prizeTelephone: '', // 电话
        prizeEmail: '', // 邮箱
        prizeType: '', // 奖品类型
        xjkRedpackSource: '', // 小金库红包来源
        prizeDenomination: '', // 奖品面额
        prizeIndentScale: '', // 订单比例
        // prizeFigureCeiling: '', // 金额上限
        prizeAmountScopesSt: '', // 金额范围开始节点
        prizeAmountScopesEnd: '', // 金额范围结束节点
        domains: [{
          amount: '',
          probability: ''
        }], // 概率新增
        prizeThreshValue: '' // 数量阈值
      },
      rules: {
        prizeName: [
          { required: true, message: '请输入奖品名称', trigger: 'blur' }
        ],
        prizeNumber: [
          { required: true,
            validator: (rule, value, callback) => {
              if ((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) === false || value === '') {
                callback(new Error('请填写大于0的数字'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        prizeToken: [
          { required: true, message: '请输入token', trigger: 'blur' }
        ],
        prizeDirector: [
          { required: true, message: '请输入负责人名称', trigger: 'blur' }
        ],
        prizeTelephone: [
          {required: true, message: '请输入正确的手机号', pattern: /^[1][0-9]{10}\d*$/, trigger: 'blur'}
        ],
        prizeEmail: [
          {type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur'}
        ],
        prizeType: [
          { required: true, message: '请输入奖品类型', trigger: 'blur' }
        ],
        xjkRedpackSource: [
          { required: true, message: '请输入小金库红包来源', trigger: 'blur' }
        ],
        prizeDenomination: [
          { required: true, message: '请输入奖品面额', trigger: 'blur' }
        ],
        prizeThreshValue: [
          { required: true, message: '请输入数量阈值', trigger: 'blur' }
        ]
      },
      options: [{
        value: 'XFA',
        label: '固定面额'
      }, {
        value: 'XOP',
        label: '订单金额比例'
      }, {
        value: 'XRA',
        label: '随机金额'
      }, {
        value: 'XPB',
        label: '概率'
      }]
    }
  },
  activated() {
    this.onPerform()
    this.budgetSearchDetail()
  },
  methods: {
    // 页面加载访问该方法给select框付初值
    onPerform() {
      this.form.prizeType = this.options[0].value
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
            this.form.prizeName = data.interName
            this.form.prizeNumber = data.total
            this.form.prizeToken = data.token
            this.form.prizeType = data.interType
            this.form.prizeDenomination = data.amount
            this.form.prizeIndentScale = data.percentage
            this.form.prizeAmountScopesEnd = data.amountCeiling
            this.form.prizeAmountScopesSt = data.amountFloor
            this.form.domains = data.probability
            this.form.prizeDirector = data.director
            this.form.prizeTelephone = data.tel
            this.form.prizeEmail = data.email
            this.form.prizeThreshValue = data.threshold
            this.$route.query.planId = data.planId
            this.form.xjkRedpackSource = data.xjkRedpackSource
          })
          .catch((err) => {
            this.httpCatch(this, err)
          })
      } else {
        this.$refs.form.resetFields()
      }
    },
    // 概率删除按钮
    removeDomain(item) {
      let index = this.form.domains.indexOf(item)
      if (index !== 0) {
        this.form.domains.splice(index, 1)
      }
    },
    // 概率添加按钮
    addDomain(item) {
      let index = this.form.domains.length
      if (index <= 4) {
        this.form.domains.push({
          amount: '',
          probability: ''
          // key: Date.now()
        })
      }
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
          this.prizeDenom = true // 固定面额
          this.orderProportion = false // 订单比例
          this.randomAmount = false // 随机金额
          this.prizeProbability = false // 概率
          break
        case optionLabelArr[1]:
          this.prizeDenom = false // 固定面额
          this.orderProportion = true // 订单比例
          this.randomAmount = false // 随机金额
          this.prizeProbability = false // 概率
          break
        case optionLabelArr[2]:
          this.prizeDenom = false // 固定面额
          this.orderProportion = false // 订单比例
          this.randomAmount = true // 随机金额
          this.prizeProbability = false // 概率
          break
        case optionLabelArr[3]:
          this.prizeDenom = false // 固定面额
          this.orderProportion = false // 订单比例
          this.randomAmount = false // 随机金额
          this.prizeProbability = true // 概率
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
            let reqParams = {
              interId: this.$route.query.prizeId,
              interName: this.form.prizeName,
              total: this.form.prizeNumber,
              token: this.form.prizeToken,
              interType: this.form.prizeType,
              amount: this.form.prizeDenomination,
              percentage: this.form.prizeIndentScale,
              amountCeiling: this.form.prizeAmountScopesEnd,
              amountFloor: this.form.prizeAmountScopesSt,
              probability: this.form.domains,
              director: this.form.prizeDirector,
              tel: this.form.prizeTelephone,
              email: this.form.prizeEmail,
              threshold: this.form.prizeThreshValue,
              planId: this.$route.query.planId,
              xjkRedpackSource: this.form.xjkRedpackSource
            }
            let prizeId = this.$route.query.prizeId
            if (prizeId) {
              noBudgetModifyInter(reqParams)
                .then(res => {
                  setTimeout(() => {
                    this.butDisabled = false
                  }, 1000)
                  if (!this.httpThen(this, res)) return
                  this.$message({
                    message: '修改小金库红包成功',
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
              noBudgetAward(reqParams)
                .then(res => {
                  setTimeout(() => {
                    this.butDisabled = false
                  }, 1000)
                  if (!this.httpThen(this, res)) return
                  this.$message({
                    message: '创建小金库红包成功',
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