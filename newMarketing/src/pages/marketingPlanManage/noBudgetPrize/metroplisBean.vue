<template>
  <!--京豆-->
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl" >创建京豆</h3>
    </div>
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" class="demo-ruleForm">
        <el-form-item label="奖品名称" prop="prizeName">
          <el-input v-model="form.prizeName" placeholder="请输入奖品名称"></el-input>
        </el-form-item>
        <el-form-item label="奖品数量" prop="prizeNumber">
          <el-input v-model="form.prizeNumber" placeholder="请输入奖品数量"></el-input>
        </el-form-item>
        <el-form-item label="callerId" prop="prizeCallerId">
          <el-input v-model="form.prizeCallerId" placeholder="请输入callerId"></el-input>
        </el-form-item>
        <el-form-item label="token" prop="prizeToken">
          <el-input v-model="form.prizeToken" placeholder="请输入token"></el-input>
        </el-form-item>
        <el-form-item label="businessId" prop="prizeBusinessId">
          <el-input v-model="form.prizeBusinessId" placeholder="请输入businessId"></el-input>
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
        <el-form-item label="topBusinessId" prop="prizeTopBusinessId">
          <el-input v-model="form.prizeTopBusinessId" placeholder="请输入topBusinessId"></el-input>
        </el-form-item>
        <el-form-item label="secondBusinessId" prop="prizeSecondBusinessId">
          <el-input v-model="form.prizeSecondBusinessId" placeholder="请输入secondBusinessId"></el-input>
        </el-form-item>
        <el-form-item label="key" prop="prizeKey">
          <el-input v-model="form.prizeKey" placeholder="请输入key"></el-input>
        </el-form-item>
        <el-form-item label="orgId" prop="prizeOrgId">
          <el-input v-model="form.prizeOrgId" placeholder="请输入orgId"></el-input>
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
          :key="domain.key"
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
        jdBeanBizParam: {}, // 扩展字段
        prizeDirector: '', // 负责人
        prizeTelephone: '', // 电话
        prizeToken: '', // token
        prizeEmail: '', // 邮箱
        prizeCallerId: '', // callerId
        prizeBusinessId: '', // businessId
        prizeTopBusinessId: '', // topBusinessId
        prizeSecondBusinessId: '', // secondBusinessId
        prizeKey: '', // key
        prizeOrgId: '', // orgId
        prizeType: '', // 奖品类型
        prizeDenomination: '', // 奖品面额
        prizeIndentScale: '', // 订单比例
        prizeFigureCeiling: '', // 金额上限
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
          { required: true, message: '请输入奖品数量', trigger: 'blur' }
        ],
        prizeToken: [
          { required: true, message: '请输入token', trigger: 'blur' }
        ],
        
        prizeCallerId: [
          { required: true, message: '请输入prizeCallerId', trigger: 'blur' }
        ],
        prizeBusinessId: [
          { required: true, message: '请输入businessId', trigger: 'blur' }
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
        prizeTopBusinessId: [
          { required: true, message: '请输入topBusinessId', trigger: 'blur' }
        ],
        prizeSecondBusinessId: [
          { required: true, message: '请输入secondBusinessId', trigger: 'blur' }
        ],
        prizeKey: [
          { required: true, message: '请输入key', trigger: 'blur' }
        ],
        prizeOrgId: [
          { required: true, message: '请输入orgId', trigger: 'blur' }
        ],
        prizeType: [
          { required: true, message: '请输入奖品类型', trigger: 'blur' }
        ],
        prizeDenomination: [
          { required: true, message: '请输入奖品面额', trigger: 'blur' }
        ],
        prizeThreshValue: [
          { required: true, message: '请输入数量阈值', trigger: 'blur' }
        ]
      },
      options: [{
        value: 'JFA',
        label: '固定面额'
      }, {
        value: 'JOP',
        label: '订单比例'
      }, {
        value: 'JRA',
        label: '随机金额'
      }, {
        value: 'JPB',
        label: '概率'
      }]
    }
  },
  activated() {
    this.onPerform()
    this.budgetSearchDetail()
  },
  methods: {
    // 页面加载访问方法
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
            this.form.prizeDirector = data.director
            this.form.prizeToken = data.token
            this.form.prizeTelephone = data.tel
            this.form.prizeEmail = data.email
            this.form.prizeCallerId = data.extendValue.callerId
            this.form.prizeBusinessId = data.extendValue.businessId
            this.form.prizeTopBusinessId = data.extendValue.topBusinessId
            this.form.prizeSecondBusinessId = data.extendValue.secondBusinessId
            this.form.prizeKey = data.extendValue.key
            this.form.prizeOrgId = data.extendValue.orgId
            this.form.prizeType = data.interType
            this.form.prizeDenomination = data.amount
            this.form.prizeIndentScale = data.percentage
            this.form.prizeAmountScopesEnd = data.amountCeiling
            this.form.prizeAmountScopesSt = data.amountFloor
            this.form.domains = data.probability
            this.form.prizeThreshValue = data.threshold
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
      console.log(e)
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
              planId: this.$route.query.planId,
              interName: this.form.prizeName,
              total: this.form.prizeNumber,
              director: this.form.prizeDirector,
              token: this.form.prizeToken,
              tel: this.form.prizeTelephone,
              email: this.form.prizeEmail,
              jdBeanBizParam: {
                callerId: this.form.prizeCallerId,
                businessId: this.form.prizeBusinessId,
                topBusinessId: this.form.prizeTopBusinessId,
                secondBusinessId: this.form.prizeSecondBusinessId,
                key: this.form.prizeKey,
                orgId: this.form.prizeOrgId
              },
              interType: this.form.prizeType,
              amount: this.form.prizeDenomination,
              percentage: this.form.prizeIndentScale,
              amountCeiling: this.form.prizeAmountScopesEnd,
              amountFloor: this.form.prizeAmountScopesSt,
              probability: this.form.domains,
              threshold: this.form.prizeThreshValue
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
                    message: '修改京豆成功',
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
                    message: '创建京豆成功',
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