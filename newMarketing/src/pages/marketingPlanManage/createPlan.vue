<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">营销计划创建</h3>
    </div>

    <div class="content-body">
      <el-form :label-position="'right'" label-width="150px" size="small" :rules="formRules" ref="ruleForm" :model="ruleForm">
        <el-form-item label="营销计划名称：" prop="planName">
          <div class="create-item1">
            <el-input
              size="small"
              placeholder="请输入计划名称"
              v-model="ruleForm.planName"
              maxlength="15"
              clearable>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item label="计划部门：" prop="planDepartment">
          <div class="create-item4">
            <el-select class="select100" v-model="ruleForm.planDepartment" placeholder="请选择" @change="searchTargetByDeptId" size="small">
              <el-option
                v-for="item in planDepartments"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="营销计划说明：" prop="instructions">
          <div class="create-item2">
            <el-input
              class="select100"
              type="textarea"
              :rows="7"
              maxlength="200"
              placeholder="请输入计划说明,限200字以内"
              v-model="ruleForm.instructions">
            </el-input>
            <div class="input-hint-text text-left">您还可以输入{{200 -ruleForm.instructions.length}}个字</div>
          </div>
        </el-form-item>

        <el-form-item class="is-required" label="营销计划关注人：" prop="followersList">
          <div class="pro-list-box">
            <div class="pro-item" v-for="(item, index) in ruleForm.followersList" :key="index">
              <el-col :span="6">
                <el-form-item
                  :prop="'followersList.'+ index + '.name'"
                  :rules="{required: true, pattern: /^[\u4E00-\u9FA5A-Za-z]+$/, message: '请填写正确的姓名', trigger: 'blur'}">
                  <el-input
                    maxlength="15"
                    v-model="item.name"
                    placeholder="请输入姓名"
                    prefix-icon="el-icon-edit"
                    clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col class="text-center" :span="1">
                <span>-</span>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  :prop="'followersList.'+ index + '.telephone'"
                  :rules="{required: true, pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '手机号格式不正确', trigger: 'blur'}">
                  <el-input
                    v-model="item.telephone"
                    placeholder="请输入手机号"
                    prefix-icon="el-icon-mobile-phone"
                    maxlength="11"
                    clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col class="text-center" :span="1">
                <span>-</span>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  :prop="'followersList.'+ index + '.mail'"
                  :rules="{required: true, pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: 'Email格式不正确', trigger: 'blur'}">
                  <el-input
                    maxlength="20"
                    v-model="item.mail"
                    placeholder="请输入Email"
                    prefix-icon="el-icon-message"
                    clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-button type="text" class="el-icon-delete" @click="handleRemoveFollower(index)" :disabled="ruleForm.followersList.length === 1"></el-button>
            </div>
          </div>

          <div class="pro-addbtn-box">
            <el-button type="primary" size="mini" @click="handleAddFollower" :disabled="ruleForm.followersList.length >= 10">添加关注人</el-button>
          </div>
        </el-form-item>

        <el-form-item class="is-required" label="计划目标：" prop="targetsList">
          <div class="pro-list-box">
            <div class="pro-item" v-for="(item, index) in ruleForm.targetsList" :key="index">
              <el-col :span="6">
                <el-form-item
                  :prop="'targetsList.'+ index + '.field'"
                  :rules="{required: true, message: '请选择计算目标类型', trigger: 'change'}">
                  <el-select class="select100" v-model="item.field" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in targetsLists"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="text-center" :span="1">
                <span>-</span>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  :prop="'targetsList.'+ index + '.val'"
                  :rules="{required: true, pattern: /^([0-9]*|[0-9]+[.]{1}[0-9]{1,2})$/, message: '请填写完整数值，最多保留两位小数', trigger: 'blur'}">
                  <el-input
                    v-model="item.val"
                    placeholder=""
                    clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-button type="text" class="el-icon-delete" @click="handleRemoveTarget(index)" :disabled="ruleForm.targetsList.length === 1"></el-button>
            </div>
          </div>
          <div class="pro-addbtn-box">
            <el-button type="primary" size="mini" @click="handleAddTarget" :disabled="ruleForm.targetsList.length >= 5">新增计划目标</el-button>
          </div>
        </el-form-item>
      </el-form>

      <div class="nextBtnBox">
        <el-button type="primary" :disabled="butDisabled" size="mini" @click="handleSaveNext('ruleForm')">保存</el-button>
      </div>
    </div>
    </el-tabs>
  </section>
</template>

<script>
import { httpLoadingMixins } from 'common/public.mixins'
import {
  createPlanSavePlan,
  createPlanModifyPlan,
  allPlanCheckPlanById,
  searchAllDept,
  searchTargetByDeptId
  // searchTargetByPlanId
} from 'api/service'

export default {
  name: 'createPlan',
  mixins: [httpLoadingMixins],
  data() {
    return {
      butDisabled: false,
      planDepartments1: [
        {
          value: 'ALL',
          label: '全部'
        },
        {
          value: 'JDPAY',
          label: '京东支付业务部'
        }
      ],
      planDepartments: [
      ],
      targetsLists: [
      ],
      isVerificationBy: false,
      ruleForm: {
        planId: '',
        planName: '',
        instructions: '',
        planDepartment: '',
        followersList: [
          {
            name: '',
            telephone: '',
            mail: ''
          }
        ],
        targetsList: [
          {
            field: '',
            val: ''
          }
        ]
      },
      formRules: {
        planName: [
          { required: true, message: '自行定义，限15字以内', trigger: 'change' }
        ],
        planDepartment: [
          { required: true, message: '请选择计划部门', trigger: 'change' }
        ],
        instructions: [
          { required: true, message: '请输入计划说明', trigger: 'change' }
        ]
      },
      deptId: ''
    }
  },
  deactivated() {
    this.$destroy(true)
  },
  activated() {
    if (this.$route.query.planId) {
      this.showHttpLoading()
      // TODO 从编辑来的 值回填 需请求接口
      this.ruleForm.planId = this.$route.query.planId
      this.handleFillin(this.$route.query.planId)
    } else {
      this.searchAllDept()
    }
  },
  methods: {
    searchAllDept() {
      let reqParams = {}
      let target = {}
      searchAllDept(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.planDepartments = []
          data.forEach((item, index) => {
            target = {}
            target.value = item.dptId + ''
            target.label = item.firstLevDptName + '-' + item.secondLevDptName
            this.planDepartments.push(target)
          })
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    searchTargetByDeptId() {
      let reqParams = {
        dptId: this.ruleForm.planDepartment
      }
      let target = {}
      searchTargetByDeptId(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.targetsLists = []
          data.forEach((item, index) => {
            target = {}
            target.value = item.tgtId + ''
            target.label = item.tgtName
            this.targetsLists.push(target)
          })
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    handleAddFollower() {
      if (this.ruleForm.followersList.length >= 10) return
      // 新增关注人
      this.ruleForm.followersList.push({
        name: '',
        telephone: '',
        mail: ''
      })
    },
    handleRemoveFollower(index) {
      // 移除关注人
      this.ruleForm.followersList.splice(index, 1)
    },
    handleAddTarget() {
      if (this.ruleForm.targetsList.length >= 5) return
      this.ruleForm.targetsList.push({
        field: '',
        val: ''
      })
    },
    handleRemoveTarget(index) {
      this.ruleForm.targetsList.splice(index, 1)
    },
    async handleFillin(planId) {
      // TODO 值回填 需要拿计划ID查信息 接口目前没有这些字段
      let res = await allPlanCheckPlanById({ planId: planId })
      if (res.code === '1') {
        this.ruleForm.planName = res.data.planName
        this.ruleForm.instructions = res.data.instructions
        this.ruleForm.planDepartment = res.data.planDepartment
        this.ruleForm.followersList = res.data.restPersonModels
        this.ruleForm.targetsList = res.data.restTargetModels
        console.log(this.ruleForm)
        // 关注人 数据为空数组
        // 计划目标 数据为空数组
        this.closeHttpLoading()
      }
      this.searchAllDept()
      this.searchTargetByDeptId()
    },
    async handleSaveNext(formName) {
      // 保存营销计划
      this.testValidator('ruleForm')
      if (!this.isVerificationBy) {
        this.$message.error('创建营销计划失败')
      } else {
        this.butDisabled = true
        let reqObj = {
          planName: this.ruleForm.planName,
          instructions: this.ruleForm.instructions,
          restPersonModels: this.ruleForm.followersList,
          planDepartment: this.ruleForm.planDepartment,
          restTargetModels: this.ruleForm.targetsList
        }

        let res
        if (this.ruleForm.planId) {
          reqObj.planId = this.ruleForm.planId
          res = await createPlanModifyPlan(reqObj)
        } else {
          res = await createPlanSavePlan(reqObj)
        }

        if (res.code === '1') {
          this.$message({
            message: '创建营销计划成功',
            type: 'success'
          })
          setTimeout(() => {
            this.butDisabled = false
          }, 1000)
          this.$router.push({
            path: '/marketingPlanManage/planDetail',
            query: {
              planId: res.data.planId || this.$route.query.planId
            }
          })
        } else {
          this.$message.error(res.message)
        }
      }
    },
    testValidator(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isVerificationBy = true
        } else {
          this.isVerificationBy = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nextBtnBox {
  margin: 40px 40px 40px 0; float: right;
}
.pro-list-box {
  overflow: hidden;
  .pro-item {
    margin: 0 0 10px 0;
    clear: both;
    .el-icon-delete {
      margin-left: 10px;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>
