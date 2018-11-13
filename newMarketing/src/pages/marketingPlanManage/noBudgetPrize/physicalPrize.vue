<template>
  <!--实物奖-->
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl" >创建实物奖</h3>
    </div>
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" class="demo-ruleForm">
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
        <el-form-item label="邮箱" prop="prizeEmail">
          <el-input v-model="form.prizeEmail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="奖品面额" prop="prizeDenomination">
          <el-input v-model="form.prizeDenomination" placeholder="请输入奖品面额"></el-input>
        </el-form-item>
        <el-form-item label="奖品描述" prop="prizeDescribe">
          <el-input v-model="form.prizeDescribe" placeholder="请输入奖品描述"></el-input>
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
  noBudgetCreatephy,
  newBudgetSearchDetail,
  noBudgetModifyPhysical
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
        prizeEmail: '', // 邮箱
        prizeDenomination: '', // 奖品面额
        prizeDescribe: '' // 奖品描述
      },
      rules: {
        prizeName: [
          { required: true, message: '请输入奖品名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
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
        prizeNumber: [
          { required: true,
            validator: (rule, value, callback) => {
              if ((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) === false || value === '') {
                callback(new Error('请填写大于0小于八位的数字'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        prizeDenomination: [
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
        prizeDescribe: [
          { required: true, message: '奖品描述', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
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
            this.form.prizeName = data.physicalPrizeName
            this.form.prizeNumber = data.total
            this.form.prizeDirector = data.director
            this.form.prizeTelephone = data.tel
            this.form.prizeEmail = data.email
            this.form.prizeDenomination = data.amount
            this.form.prizeDescribe = data.desc
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
              physicalPrizeId: this.$route.query.prizeId,
              planId: this.$route.query.planId,
              physicalPrizeName: this.form.prizeName,
              total: this.form.prizeNumber,
              director: this.form.prizeDirector,
              tel: this.form.prizeTelephone,
              email: this.form.prizeEmail,
              amount: this.form.prizeDenomination,
              desc: this.form.prizeDescribe
            }
            let prizeId = this.$route.query.prizeId
            if (prizeId) {
              noBudgetModifyPhysical(reqParams)
                .then(res => {
                  setTimeout(() => {
                    this.butDisabled = false
                  }, 1000)
                  if (!this.httpThen(this, res)) return
                  this.$message({
                    message: '修改实物奖品成功',
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
              noBudgetCreatephy(reqParams)
                .then(res => {
                  setTimeout(() => {
                    this.butDisabled = false
                  }, 1000)
                  if (!this.httpThen(this, res)) return
                  this.$message({
                    message: '创建实物奖品成功',
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