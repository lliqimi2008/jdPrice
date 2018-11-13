<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
        <div class="pub-sm-title clear">
          <h3 class="fl">计划部门</h3>
          <div class="fr">
            <el-button type="primary" size="small" @click="createEditPlanDepartment">新增计划部门</el-button>
          </div>
        </div>
        <div class="plan-content">
          <el-form
            :label-position="'right'"
            label-width="120px"
            size="small"
            ref="searchPlanDepartmentObj"
            :model="searchPlanDepartmentObj">
            <el-row>
              <el-col :span="8">
                <el-form-item label="一级部门：" prop="firstLevDptName">
                  <el-input placeholder="请输入一级部门名称" v-model="searchPlanDepartmentObj.firstLevDptName" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态：" prop="status">
                  <el-select class="select100" v-model="searchPlanDepartmentObj.status" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in searchPlanDepartmentObj.statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="">
                  <el-button size="small" type="primary" @click="handleSearchPlanDepartment">查询</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
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
                prop="dptId"
                label="计划部门ID"
                width="100px">
              </el-table-column>
              <el-table-column
                prop="firstLevDptName"
                label="一级部门">
              </el-table-column>
              <el-table-column
                prop="secondLevDptName"
                label="二级部门">
              </el-table-column>
              <el-table-column
                prop="director"
                label="负责人">
              </el-table-column>
              <el-table-column
                label="状态"
                width="100">
                <template slot-scope="scope">
                  <span  v-if="scope.row.status === 'ON'">有效</span>
                  <span  v-if="scope.row.status === 'OFF'">无效</span>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                align="center">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="handlePlanDepartmentDetail(scope.row.dptId)">查看</el-button>
                  <el-button  v-show="scope.row.status === 'ON'" size="mini" type="text" @click="handleDisablePlanDepartment(scope.row.dptId)">停用</el-button>
                  <el-button v-show="scope.row.status === 'OFF'" size="mini" type="text" @click="handleEnablePlanDepartment(scope.row.dptId)">启用</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination" v-if="searchPlanDepartmentObj.marketTotal">
            <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              @current-change="pageChange"
              :current-page="searchPlanDepartmentObj.pageNumber"
              :total="searchPlanDepartmentObj.marketTotal">
            </el-pagination>
          </div>
        </div>
    </el-tabs>
  </section>
</template>
<script>
import {
  allPlanDepartmentList,
  enablePlanDepartment,
  disablePlanDepartment
} from 'api/service'
export default {
  name: 'allPlan',
  data() {
    return {
      activityLoading: false,
      marketLoading: false,
      goSerch: true,
      inputErr: true,
      activeTabName: 'second', // 当前tab
      // 营销计划列表对象
      searchPlanDepartmentObj: {
        firstLevDptName: '',
        status: '',
        statusOptions: [
          {
            label: '全部',
            value: null
          },
          {
            label: '有效',
            value: 'ON'
          },
          {
            label: '无效',
            value: 'OFF'
          }
        ],
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      // 营销计划列表
      marketList: []
    }
  },
  activated() {
    this.handleSearchPlanDepartment()
  },
  methods: {
    createEditPlanDepartment() {
      // 跳转新建计划页 有入参即编辑 无入参即新建
      let pathObj = {
        path: '/marketingSystemManage/planDepartmentCreate'
      }
      this.$router.push(pathObj)
    },
    // 查询计划部门
    handleSearchPlanDepartment() {
      // 点击搜索计划部门
      this.marketLoading = true
      let reqParams = {
        pageNumber: this.searchPlanDepartmentObj.pageNumber,
        pageSize: this.searchPlanDepartmentObj.pageSize,
        firstLevDptName: this.searchPlanDepartmentObj.firstLevDptName,
        status: this.searchPlanDepartmentObj.status
      }
      allPlanDepartmentList(reqParams)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.marketList = data
          this.searchPlanDepartmentObj.marketTotal = res.page ? res.page.totalRowCount : 0
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 启用计划部门
    handleEnablePlanDepartment(id) {
      let reqParams = {
        dptId: id
      }
      enablePlanDepartment(reqParams).then(res => {
        this.handleSearchPlanDepartment()
      }).catch(err => {
        this.httpCatch(this, err)
      })
      this.handleSearchPlanDepartment()
    },
    // 停用计划部门
    handleDisablePlanDepartment(id) {
      let reqParams = {
        dptId: id
      }
      disablePlanDepartment(reqParams).then(res => {
        this.handleSearchPlanDepartment()
      }).catch(err => {
        this.httpCatch(this, err)
      })
    },
    // 计划部门详情
    handlePlanDepartmentDetail(id) {
      let pathObj = {
        path: '/marketingSystemManage/planDepartmentDetail',
        query: {
          dptId: id
        }
      }
      this.$router.push(pathObj)
    },
    pageChange(val) {
      this.searchPlanDepartmentObj.pageNumber = val
      this.handleSearchPlanDepartment()
    }
  }
}
</script>
<style lang="scss">

</style>
