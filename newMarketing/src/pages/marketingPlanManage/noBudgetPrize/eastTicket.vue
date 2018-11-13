<template>
  <!--东券-->
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl" >创建东券</h3>
    </div>
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="200px" class="demo-ruleForm">
        <el-form-item label="奖品名称" prop="prizeName">
          <el-input v-model="form.prizeName" placeholder="请输入奖品名称"></el-input>
        </el-form-item>
        <el-form-item label="奖品数量" prop="prizeNumber">
          <el-input v-model="form.prizeNumber" placeholder="请输入奖品数量"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="prizeDirector">
          <el-input v-model="form.prizeDirector" placeholder="请输入负责人"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="prizeTelephone">
          <el-input v-model="form.prizeTelephone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="token" prop="prizeToken">
          <el-input v-model="form.prizeToken" placeholder="请输入token"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="prizeEmail">
          <el-input v-model="form.prizeEmail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="东券ID" prop="prizeRoleId">
          <el-input v-model="form.prizeRoleId" placeholder="请输入东券ID"></el-input>
        </el-form-item>
        <el-form-item label="京东商城优惠券key" prop="jdCouponKey">
          <el-input v-model="form.jdCouponKey" placeholder="请输入京东商城优惠券key"></el-input>
        </el-form-item>
        <el-form-item label="京东商城优惠券活动规则ID" prop="jdCouponRuleId">
          <el-input v-model="form.jdCouponRuleId" placeholder="请输入京东商城优惠券活动规则ID"></el-input>
        </el-form-item>
        <el-form-item prop="prizeThreshValue" label="数量阈值">
          <el-input v-model="form.prizeThreshValue" placeholder="请输入数量阈值"></el-input>
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
      form: {
        prizeName: '', // 奖品名称
        prizeNumber: '', // 奖品数量
        prizeDirector: '', // 负责人
        prizeTelephone: '', // 电话
        interType: '',
        prizeToken: '', // token
        prizeEmail: '', // 邮箱
        prizeRoleId: '', // role id
        prizeThreshValue: '', // 数量阈值
        jdCouponKey: '',
        jdCouponRuleId: ''
      },
      rules: {
        prizeName: [
          { required: true, message: '请输入奖品名称', trigger: 'blur' }
        ],
        prizeNumber: [
          { required: true, message: '请输入奖品数量', trigger: 'blur' }
        ],
        prizeRoleId: [
          { required: true, message: '请输入 role ID', trigger: 'blur' }
        ],
        prizeDirector: [
          { required: true, message: '请输入负责人', trigger: 'blur' }
        ],
        prizeTelephone: [
          {required: true, message: '请输入正确的手机号', pattern: /^[1][0-9]{10}\d*$/, trigger: 'blur'}
        ],
        prizeToken: [
          { required: true, message: '请输入token', trigger: 'blur' }
        ],
        prizeEmail: [
          {type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur'}
        ],
        jdCouponKey: [
          { required: true, message: '请输入京东商城优惠券key', trigger: 'blur' }
        ],
        jdCouponRuleId: [
          { required: true, message: '请输入京东商城优惠券活动规则ID', trigger: 'blur' }
        ],
        prizeBatchId: [
          { required: true, message: '请输入 batch ID', trigger: 'blur' }
        ],
        prizeThreshValue: [
          { required: true, message: '请输入数量阈值', trigger: 'blur' }
        ]
      }
    }
  },
  activated() {
    this.budgetSearchDetail()
  },
  methods: {
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
            this.form.prizeDirector = data.director
            this.form.prizeTelephone = data.tel
            this.form.prizeEmail = data.email
            this.form.prizeToken = data.token
            this.form.prizeNumber = data.total
            this.form.prizeRoleId = data.dongId
            this.form.prizeThreshValue = data.threshold
            this.form.jdCouponKey = data.jdCouponKey
            this.form.jdCouponRuleId = data.jdCouponRuleId
          })
          .catch((err) => {
            this.httpCatch(this, err)
          })
      } else {
        this.$refs.form.resetFields()
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
              director: this.form.prizeDirector,
              tel: this.form.prizeTelephone,
              email: this.form.prizeEmail,
              interType: 'DONG_QUAN',
              token: this.form.prizeToken,
              total: this.form.prizeNumber,
              dongId: this.form.prizeRoleId,
              threshold: this.form.prizeThreshValue,
              jdCouponKey: this.form.jdCouponKey,
              jdCouponRuleId: this.form.jdCouponRuleId
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
                    message: '修改东券成功',
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
                    message: '创建东券成功',
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
