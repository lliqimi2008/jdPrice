<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">白名单列表</h3>
      <el-row class="fr">
        <el-button size="mini" type="primary" @click="back">返回</el-button>
        <el-button size="mini" v-hasPermissions="'marketingPlanManage:whiteUserList:add'" type="primary" @click="showCreate">创建白名单</el-button>
      </el-row>
    </div>
    <!--白名单列表-->
    <div class="table-content">
      <el-table
        v-loading="marketLoading"
        element-loading-text="拼命加载中"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
        >
        </el-table-column>
        <el-table-column
          prop="userValueType"
          label="账户类型"
        >
        </el-table-column>
        <el-table-column
          prop="userValue"
          label="白名单"
        >
        </el-table-column>
        <el-table-column
          prop="created"
          label="添加人"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button @click="deleteWhiteUser(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--新增白名单-->
    <div class="app-dialog" >
      <el-dialog title="新增白名单" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="formRules" ref="form" >
          <el-form-item label="账户类型" :label-width="formLabelWidth">
            <el-select v-model="form.userValueType" placeholder="请选择活动区域" >
              <el-option label="PIN" value="3" ></el-option>
              <el-option label="手机号" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="白名单" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="多个Pin用'|'分开"
              v-model="form.userStr">
            </el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" :disabled="butDisabled" @click="saveWhiteUser('form')">保 存</el-button>
        </div>
      </el-dialog>
    </div>
    </el-tabs>
  </section>
</template>

<script>
import {
  USER_VALUE_TYPE
} from 'common/config'
import {
  createWhiteUser,
  searchWhiteUserList,
  deleteWhiteUser
} from 'api/service'

export default {
  activated() {
    this.searchWhiteUserList()
  },
  methods: {
    searchWhiteUserList() {
      let reqParams = {
        scope: this.$route.query.planId
      }
      this.marketLoading = true
      searchWhiteUserList(reqParams)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          data.forEach((item, index) => {
            item.userValueType = USER_VALUE_TYPE[item.userValueType]
          })
          this.tableData = data
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    deleteWhiteUser(id) {
      // 删除提示
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteWhiteUser({ id: id })
            .then(res => {
              if (res.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.searchWhiteUserList() // 更新列表
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(() => {
              this.$message.error('删除失败')
            })
        })
        .catch(() => {})
    },
    // 显示新增弹框
    showCreate() {
      this.dialogFormVisible = true
      this.resetForm()
    },
    back() {
      this.$router.push({
        path: '/marketingPlanManage/planDetail',
        query: {
          planId: this.$route.query.planId,
          auditStatus: this.$route.query.auditStatus
        }
      })
    },
    // 重置表单
    resetForm() {
      this.form.userValueType = ''
      this.form.userStr = ''
    },

    saveWhiteUser(formName) {
      this.$refs[formName] &&
        this.$refs[formName].validate(valid => {
          if (!valid) {
            return false
          }
          this.butDisabled = true
          // 创建白名单
          let reqParams = {
            planId: this.$route.query.planId,
            userValueType: this.form.userValueType,
            userStr: this.form.userStr
          }
          createWhiteUser(reqParams)
            .then(res => {
              if (!this.httpThen(this, res)) return
              this.$message({
                message: '创建白名单成功',
                type: 'success'
              })
              setTimeout(() => {
                this.butDisabled = false
              }, 1000)
              // 隐藏弹窗
              this.dialogFormVisible = false
              this.searchWhiteUserList()
            })
            .catch((err) => {
              this.httpCatch(this, err)
            })
        })
    }
  },

  data() {
    return {
      butDisabled: false,
      planId: '',
      nowId: '',
      marketLoading: false,
      tableData: [],
      dialogFormVisible: false,
      form: {
        userValueType: '',
        userStr: ''
      },
      // 预算奖品规则
      formRules: {
        userValueType: [
          { required: true, type: 'string', message: '请选择', trigger: 'blur' }
        ],
        userStr: [
          { required: true, type: 'string', message: '请输入', trigger: 'blur' }
        ]
      },
      formLabelWidth: '70px'
    }
  }
}

</script>

<style scoped>
</style>
