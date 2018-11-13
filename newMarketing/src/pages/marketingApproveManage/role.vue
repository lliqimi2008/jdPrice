<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">角色管理</h3>
      <div class="fr">
        <el-button type="primary" size="small" @click="handleCenter" v-hasPermissions="'marketingApproveManage:plan:create'">新增角色</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
        v-loading="marketLoading"
        element-loading-text="拼命加载中"
        :data="marketList"
        border
        stripe
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="部门名称">
        </el-table-column>
        <el-table-column
          prop="type"
          label="角色类型">
        </el-table-column>
        <!-- <el-table-column
          label="角色类型"
          width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.type === '01'">营销</span>
            <span v-if="scope.row.type === '02'">商户</span>
            <span v-if="scope.row.type === '03'">资源</span>
          </template>
        </el-table-column> -->
        <el-table-column
          fixed="right"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleView(scope.row)" v-hasPermissions="'marketingApproveManage:role:nodifyRole'">修改</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDel(scope.row.id)" v-hasPermissions="'marketingApproveManage:role:deleteRole'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination" v-if="searchMarketObj.marketTotal">
      <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      @current-change="pageChange"
      :current-page="searchMarketObj.pageNumber"
      :total="searchMarketObj.marketTotal">
      </el-pagination>
    </div>
    <div class="app-dialog">
      <el-dialog title="修改角色" :closeOnClickModal="false" :visible.sync="roleDialog">
        <el-form :model="roleObj"  ref="roleObj" class="app-dialog-form" label-position="right" label-width="90px" size="small">
          <el-form-item label="ID" prop="code">
            <el-input placeholder="" :clearable="true" v-model="roleObj.id" readonly></el-input>
          </el-form-item>
          <el-form-item label="角色名称" prop="totalNumber">
            <el-input placeholder="" v-model="roleObj.name" :clearable="true" ></el-input>
          </el-form-item>
          <el-form-item label="角色类型">
            <el-select v-model="roleObj.type">
              <el-option label="审批" value="审批"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="modifyRole()">保存</el-button>
            <el-button @click="roleDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!------------->
      <el-dialog title="添加角色" :closeOnClickModal="false" :visible.sync="roleCreate">
        <el-form :model="roleObj"  ref="roleObj" class="app-dialog-form" label-position="right" label-width="90px" size="small">
          <el-form-item label="ID" prop="code">
            <el-input placeholder="" :clearable="true" v-model="roleObj.id"></el-input>
          </el-form-item>
          <el-form-item label="角色名称" prop="totalNumber">
            <el-input placeholder="" v-model="roleObj.name" :clearable="true" ></el-input>
          </el-form-item>
          <el-form-item label="角色类型">
            <el-select v-model="roleObj.type">
              <el-option label="审批" value="审批"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="modifyCreate()">保存</el-button>
            <el-button @click="roleCreate = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    </el-tabs>
  </section>
</template>
<script>
import {
  approveRoleList,
  approveRoleCreate,
  approveRoleUpdate,
  approveRoleDel
} from 'api/service'

export default {
  name: 'role',
  data () {
    return {
      marketLoading: false,
      roleDialog: false,
      roleCreate: false,
      modifyFlag: false,
      marketList: [],
      // 分页数据
      searchMarketObj: {
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      roleObj: {
        id: '',
        name: '',
        type: ''

      },
      tempData: {
        message: '请求成功',
        page: {
          firstPageNo: 0,
          hasNextPage: true,
          hasPrePage: false,
          lastPageNo: 15,
          nextPageNo: 1,
          pageNo: 0,
          pageSize: 10,
          prePageNo: 0,
          totalPageCount: 16,
          totalRowCount: 155
        },
        code: '1'
      }
    }
  },
  activated() {
    this.searchListData()
  },
  methods: {
    searchListData() {
      let reqObj = {
        pageNumber: this.searchMarketObj.pageNumber,
        pageSize: 10
      }
      approveRoleList(reqObj).then(res => {
        this.marketLoading = false
        if (!this.httpThen(this, res)) return
        let data = res.data || []
        this.marketList = data
        this.searchMarketObj.marketTotal = res.page ? res.page.totalRowCount : 0
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    handleDel(id) {
      // 删除营销计划
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          approveRoleDel({ id: id })
            .then(res => {
              if (res.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.searchListData() // 更新列表
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
    pageChange(val) {
      this.searchMarketObj.pageNumber = val
      this.searchListData()
    },
    handleView(obj) {
      this.roleObj.id = obj.id
      this.roleObj.name = obj.name
      this.roleObj.type = obj.type
      this.roleDialog = true
    },
    handleCenter(obj) {
      this.roleObj.id = ''
      this.roleObj.name = ''
      this.roleObj.type = ''
      this.roleCreate = true
    },
    modifyRole() {
      approveRoleUpdate(this.roleObj)
        .then(res => {
          if (!this.httpThen(this, res)) return
          this.$message({
            message: '更新角色成功',
            type: 'success'
          })
          this.searchListData() // 更新列表
          // 隐藏弹窗
          this.roleDialog = false
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    modifyCreate() {
      approveRoleCreate(this.roleObj)
        .then(res => {
          if (!this.httpThen(this, res)) return
          this.$message({
            message: '创建角色成功',
            type: 'success'
          })
          this.searchListData() // 更新列表
          // 隐藏弹窗
          this.roleCreate = false
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">

</style>
