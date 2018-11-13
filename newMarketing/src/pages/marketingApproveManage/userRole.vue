<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">用户角色</h3>
    </div>
    <div class="table-content">
      <el-form
        :label-position="'right'"
        label-width="70px"
        size="small"
        ref="searchForm"
        :model="searchForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="ERP：" prop="erp">
              <el-input @input="changeValue" placeholder="" v-model="searchForm.erp" clearable ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="姓名：" prop="name">
              <el-input @input="changeValue" placeholder="" v-model="searchForm.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="4">
            <el-form-item label="状态">
              <el-select v-model="searchForm.status">
                <el-option label="请选择" value=""></el-option>
                <el-option label="开启" value="01"></el-option>
                <el-option label="关闭" value="02"></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
          <el-col :span="3">
            <el-form-item label="">
              <el-button  size="small" type="primary" @click="searchListDataClik" v-hasPermissions="'marketingApproveManage:userRole:searchRole'">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        v-loading="marketLoading"
        element-loading-text="拼命加载中"
        :data="marketList"
        border
        stripe
        style="width: 100%">
        <el-table-column
          fixed
          prop="userId"
          label="ERP">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名">
        </el-table-column>
        <el-table-column
          label="状态"
          prop="status"
        >
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="modifier"
          label="修改人">
        </el-table-column>
        <el-table-column
          label="修改时间">
          <template slot-scope="scope">
            <p>{{ scope.row.modifiedDate | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="dept"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="groups"
          label="角色">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleView(scope.row)" v-hasPermissions="'marketingApproveManage:userRole:distributionRole'">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="app-dialog">
      <el-dialog title="分配角色" :closeOnClickModal="false" :visible.sync="userRoleDialog">
        <el-form :model="userRoleObj"  ref="userRoleObj" class="app-dialog-form" label-position="right" label-width="90px" size="small">
          <el-form-item label="ERP">
            <el-input placeholder=""  v-model="userRoleObj.erp" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input placeholder="" v-model="userRoleObj.name" :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-cascader
              :options="options"
               v-model="userRoleObj.selectedOptions"
              :show-all-levels="false"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="角色">
            <el-select
            v-model="userRoleObj.valueRole"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择角色">
            <el-option
              v-for="item in optionsRole"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          </el-form-item>

          <el-form-item size="large">
            <el-button type="primary" @click="modifyRole()">保存</el-button>
            <el-button @click="userRoleDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
    </el-tabs>
  </section>
</template>
<script>
import {
  // 角色管理
  approveRoleList,
  // 分配角色
  approveUserroleAssign,
  // 查询所有角色
  approvalUserSeachlist,
  // 根据id查询角色和部门
  approveUserSeachUid,
  approveDeparmentSearchall
} from 'api/service'

export default {
  name: 'userRole',
  data () {
    return {
      // 分页数据
      searchMarketObj: {
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      optionsRole: [],
      options: [],
      marketLoading: false,
      userRoleDialog: false,
      departmentList: [],
      roleList: [],
      marketList: [],
      marketListOne: [],
      searchForm: {
        erp: '',
        name: '',
        status: '',
        pageNumber: 1,
        pageSize: 10
      },
      userRoleObj: {
        erp: '',
        name: '',
        keys: '',
        selectedOptions: [],
        valueRole: []
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        totalRecords: 0
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
    this.searchListDataClik()
  },
  methods: {
  // 角色查询
    searchRoleData() {
      let reqObj = {
        pageNumber: this.searchMarketObj.pageNumber,
        pageSize: 100
      }
      approveRoleList(reqObj).then(res => {
        if (!this.httpThen(this, res)) return
        let data = res.data || []
        this.optionsRole = data
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    changeValue() {
      this.searchMarketObj.pageNumber = 1
    },
    // 进入点击查询数据
    searchListDataClik() {
      let params = {
        userId: this.searchForm.erp,
        userName: this.searchForm.name,
        pageNumber: this.searchMarketObj.pageNumber,
        pageSize: 10
      }
      approvalUserSeachlist(params).then(res => {
        this.marketLoading = false
        if (!this.httpThen(this, res)) return
        let data = res.data || []
        data.forEach((item, index) => {
          // let deptId = item.departmentDto.deptId === undefined ? '' : item.departmentDto.deptId
          let deptName = item.departmentDto.deptName === undefined ? '' : item.departmentDto.deptName
          item.dept = deptName
          let bpmGroupDtos = item.bpmGroupDtos
          var groups = ''
          for (var i = 0; i < bpmGroupDtos.length; i++) {
            groups = groups + '|' + bpmGroupDtos[i].name
          }
          item.groups = groups
        })
        this.marketList = data
        this.searchMarketObj.marketTotal = res.page ? res.page.totalRowCount : 0
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 调取部门信息
    searchListDepartment() {
      approveDeparmentSearchall().then(res => {
        if (!this.httpThen(this, res)) return
        let data = res.data || []
        this.options = this.dealDate(data)
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    dealDate(data) {
      let newData = []
      data.forEach((Item, index) => {
        let newObjct = {}
        newObjct.value = Item.deptId
        newObjct.label = Item.deptName
        if (Item.children.length !== 0) {
          newObjct.children = this.dealDate(Item.children)
        } else {
          newObjct.children = null
        }
        newData.push(newObjct)
      })
      return newData
    },
    // 分配角色回显
    apprUserSeachUid (uid) {
      let pramas = {
        userId: uid
      }
      approveUserSeachUid(pramas)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          let bpmGroupDtos = data.bpmGroupDtos
          let bpmGroupDtosArr = []
          if (bpmGroupDtos.length > 0) {
            bpmGroupDtos.forEach((item, index) => {
              bpmGroupDtosArr.push(item.id)
            })
          }
          this.userRoleObj.valueRole = bpmGroupDtosArr
          // 所屬部門
          let departmentDtoArr = []
          if ('departmentDto' in data) {
            let ancestralIds = data.departmentDto.ancestralIds
            if (ancestralIds !== undefined) {
              console.log(ancestralIds)
              departmentDtoArr = ancestralIds.split('/')
              departmentDtoArr.push(data.departmentDto.deptId)
            }
          } else {
            departmentDtoArr = [0]
          }
          this.userRoleObj.selectedOptions = departmentDtoArr
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    handleView(obj) {
      this.userRoleDialog = true
      this.searchListDepartment()
      this.searchRoleData()
      this.apprUserSeachUid(obj.userId)
      this.userRoleObj.erp = obj.userId
      this.userRoleObj.name = obj.userName
    },
    // 点击保存按钮
    modifyRole() {
      let pramas = {
        userId: this.userRoleObj.erp,
        userName: this.userRoleObj.name,
        deptId: this.userRoleObj.selectedOptions[ this.userRoleObj.selectedOptions.length - 1 ],
        groups: this.userRoleObj.valueRole
      }
      approveUserroleAssign(pramas)
        .then(res => {
          if (!this.httpThen(this, res)) return
          this.$message({
            message: '分配角色成功',
            type: 'success'
          })
          this.searchListDataClik()
          // 隐藏弹窗
          this.userRoleDialog = false
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    pageChange(val) {
      this.searchMarketObj.pageNumber = val
      this.searchListDataClik()
    }
  }
}
</script>

<style lang="scss" scoped="scoped">

</style>
