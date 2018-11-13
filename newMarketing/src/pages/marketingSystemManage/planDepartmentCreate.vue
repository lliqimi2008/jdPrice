<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">新增计划部门</h3>
    </div>
    <div class="content-body">
      <el-form :label-position="'right'" label-width="150px" size="small" ref="planDepartment"  :rules="rules" :model="planDepartment">
        <el-form-item label="一级部门：" prop="firstLevDptName">
          <div class="create-item1">
            <el-input
              size="small"
              placeholder="请输入一级部门名称"
              v-model="planDepartment.firstLevDptName"
              maxlength="15"
              clearable>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="二级部门：" prop="secondLevDptName">
          <div class="create-item1">
            <el-input
              size="small"
              placeholder="请输入二级部门名称"
              v-model="planDepartment.secondLevDptName"
              maxlength="15"
              clearable>
            </el-input>
          </div>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="负责人："
              prop="director">
              <div class="create-item1">
                <el-input
                  size="small"
                  placeholder="请输入姓名"
                  v-model="planDepartment.director"
                  maxlength="15"
                  clearable>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号："
              prop="mobile">
              <div class="create-item1">
                <el-input
                  size="small"
                  placeholder="请输入手机号"
                  v-model="planDepartment.mobile"
                  maxlength="11"
                  clearable>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="邮箱："
              prop="email">
              <div class="create-item1">
                <el-input
                  size="small"
                  placeholder="请输入email"
                  v-model="planDepartment.email"
                  maxlength="20"
                  clearable>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item  label="计划目标：" prop="planTarget">
          <div class="pro-list-box">
            <div class="pro-item" v-for="(item1, index) in planDepartment.planTarget" :key="index">
              <el-col :span="6">
                <el-form-item :prop="'planTarget.'+ index + '.field'">
                  <el-select class="select100" v-model="planDepartment.planTarget[index]" value-key="tgtId" @change="selectGetPlanTarget($event,index)" placeholder="请选择" size="small">
                      <el-option
                        v-for="item in planTargetList"
                        :key="item.tgtId"
                        :label="item.tgtName"
                        :value="item">
                      </el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-button type="text" class="el-icon-delete" @click="handleDeletePlanTarget(index)"></el-button>
              {{planTargetDesc[index] }}
            </div>
          </div>
          <div class="pro-addbtn-box">
            <el-button type="primary" size="mini" @click="handleAddPlanTarget">添加计划目标</el-button>
          </div>
        </el-form-item>
        <el-form-item label="业务标识：" prop="bizIdf">
          <div class="pro-list-box">
            <div class="pro-item" v-for="(item, index) in planDepartment.bizIdf" :key="index">
              <el-col :span="6">
                <el-form-item :prop="'bizIdf.'+ index + '.field'">
                  <el-select class="select100" v-model="planDepartment.bizIdf[index]" value-key="bizIdfId" @change="selectGetBizIdf($event,index)" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in bizIdfList"
                      :key="item.bizIdfId"
                      :label="item.bizIdfName"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-button type="text" class="el-icon-delete" @click="handleDeleteBizIdf(index)"></el-button>
              {{planBizIdfDesc[index] }}
            </div>
          </div>
          <div class="pro-addbtn-box">
            <el-button type="primary" size="mini" @click="handleAddBizIdf">添加业务标识</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="nextBtnBox">
        <el-button type="primary" size="mini" @click="handleSavePlanDepartment('planDepartment')">保存</el-button>
      </div>
    </div>
    </el-tabs>
  </section>
</template>
<script>
import {httpLoadingMixins} from 'common/public.mixins'
import {
  allPlanBizIdfList,
  allPlanTargetList,
  createPlanDepartment
} from 'api/service'
export default {
  name: 'createPlan',
  mixins: [httpLoadingMixins],
  data() {
    return {
      bizIdfList: [],
      targetsList: [],
      planTargetDesc: [],
      planBizIdfDesc: [],
      planTargetList: [],
      isVerificationBy: false,
      planDepartment: {
        dptId: '',
        firstLevDptName: '',
        secondLevDptName: '',
        director: '',
        mobile: '',
        email: '',
        planTarget: [],
        bizIdf: []
      },
      rules: {
        firstLevDptName: [
          { required: true, message: '请输入一级部门名称', trigger: 'blur' }
        ],
        secondLevDptName: [
          { required: true, message: '请输入二级部门名称', trigger: 'blur' }
        ],
        director: [
          { required: true, message: '请输入负责人姓名', trigger: 'blur' }
        ],
        mobile: [
          {required: true, message: '请输入正确的手机号', pattern: /^[1][0-9]{10}\d*$/, trigger: 'blur'}
        ],
        email: [
          {type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur'}
        ]
      }
    }
  },
  deactivated() {
    this.$destroy(true)
  },
  activated() {
    this.handleSearchPlanBizIdf1()
    this.handleSearchPlanTarget()
    this.planDepartment.dptId = this.$route.query.dptId
  },
  methods: {
    selectGetPlanTarget(e, index) {
      this.planTargetDesc[index] = e.desc
    },
    selectGetBizIdf(e, index) {
      this.planBizIdfDesc[index] = e.desc
    },
    // 搜索业务标识
    handleSearchPlanBizIdf1() {
      let reqParams = {
        pageNumber: 1,
        pageSize: 100
      }
      allPlanBizIdfList(reqParams)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.bizIdfList = data
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 添加业务标识
    handleAddBizIdf() {
      this.planDepartment.bizIdf.push({
      })
    },
    // 删除业务标识
    handleDeleteBizIdf(index) {
      this.planDepartment.bizIdf.splice(index, 1)
    },
    // 搜索计划目标
    handleSearchPlanTarget() {
      let reqParams = {
        pageNumber: 1,
        pageSize: 100
      }
      allPlanTargetList(reqParams)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.planTargetList = data
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 添加计划目标
    handleAddPlanTarget() {
      this.planDepartment.planTarget.push({
      })
    },
    // 删除计划目标
    handleDeletePlanTarget(index) {
      this.planDepartment.planTarget.splice(index, 1)
    },
    // 新增计划部门
    handleSavePlanDepartment(form) {
      this.$refs[form] &&
        this.$refs[form].validate((valid) => {
          if (!valid) {
            return false
          } else {
            let reqParams = {
              firstLevDptName: this.planDepartment.firstLevDptName,
              secondLevDptName: this.planDepartment.secondLevDptName,
              director: this.planDepartment.director,
              mobile: this.planDepartment.mobile,
              email: this.planDepartment.email,
              bizIdf: this.planDepartment.bizIdf,
              planTarget: this.planDepartment.planTarget
            }
            createPlanDepartment(reqParams)
              .then(res => {
                if (!this.httpThen(this, res)) return
                this.$message({
                  message: '新增计划部门成功',
                  type: 'success'
                })
                this.$router.push({
                  path: '/marketingSystemManage/planDepartmentList',
                  query: {
                    tabs: 'second'
                  }
                })
              })
              .catch(err => {
                this.httpCatch(this, err)
              })
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
.pro-list-box>div{ height: 52px;}
</style>
