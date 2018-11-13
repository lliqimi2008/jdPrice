<template>
  <section class="market-contentn">
    <div class="pub-sm-title clear">
      <h3 class="fl">流程功能</h3>
    </div>
    <div class="table-content">
      <el-form
        label-width="0px"
        size="small"
        ref="searchForm"
        :model="searchForm">
        <el-row>
          <el-col :span="3">
            <el-form-item label="">
              <el-button size="small" type="primary" @click="handleView()">新增功能</el-button>
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
          prop="id"
          label="功能ID"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="name"
          label="功能名称">
        </el-table-column>
        <el-table-column
          prop="bpm"
          label="流程名称">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleView(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        @current-change="pageChange"
        :current-page="page.pageNo"
        :page-size="page.pageSize"
        :total="page.totalRecords">
      </el-pagination>
    </div>

    <div class="app-dialog">
      <el-dialog title="流程功能" :closeOnClickModal="false" :visible.sync="BpmFuncDialog">
        <el-form :model="bpmFuncObj"  ref="bpmFuncObj" class="app-dialog-form" label-position="right" label-width="90px" size="small">
          <el-form-item label="功能ID" prop="code">
            <el-input placeholder="" :clearable="true" v-model="bpmFuncObj.id"></el-input>
          </el-form-item>
          <el-form-item label="功能名称" prop="totalNumber">
            <el-input v-model="bpmFuncObj.funcname" :clearable="true" ></el-input>
          </el-form-item>
          <el-form-item label="流程名称" prop="name">
            <el-input v-model="bpmFuncObj.processname" :clearable="true" ></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="modifyBpmFunc()">保存</el-button>
            <el-button @click="BpmFuncDialog = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>


  </section>
</template>

<script>
import {
  approveBpmFuncList,
  approveBpmFuncCreate,
  approveBpmFuncUpdate,
  approveBpmFuncDel
} from 'api/service'

export default {
  name: 'bpmFunc',
  data () {
    return {
      marketLoading: false,
      marketList: [],
      BpmFuncDialog: false,
      modifyFlag: false,
      searchForm: {
        pageNumber: 1,
        pageSize: 10
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        totalRecords: 0
      },
      bpmFuncObj: {
        id: '',
        funcname: '',
        processname: ''

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
        data: [
          {
            auditStatus: 'UNAUDITED',
            creator: 'lichengzhao',
            deleted: false,
            bpm: '8-22计划',
            pic: 1534909102252,
            endDate: 1534909102252,
            modifier: 'lichengzhao',
            xml: 'JDPAY',
            id: 10074,
            name: '8-22计划'
          },
          {
            auditStatus: 'UNAUDITED',
            creator: 'lichengzhao',
            deleted: false,
            bpm: '123123',
            pic: 1534909102252,
            endDate: 1534909102252,
            modifier: 'lichengzhao',
            xml: 'JDPAY',
            id: 10072,
            name: 'ycceshi'
          },
          {
            auditStatus: 'UNAUDITED',
            creator: 'lichengzhao',
            deleted: false,
            bpm: 'sdas',
            pic: 1534909102252,
            endDate: 1534909102252,
            modifier: 'lichengzhao',
            xml: 'ALL',
            id: 10071,
            name: 'fxmPlan1'
          },
          {
            auditStatus: 'UNAUDITED',
            creator: 'lichengzhao',
            deleted: false,
            bpm: '11魂牵梦萦朝秦暮楚地11魂牵梦萦朝秦暮楚地11魂牵梦萦朝秦暮楚地11魂牵梦萦朝秦暮楚地11魂牵梦萦朝秦暮楚地',
            pic: 1534909102252,
            endDate: 1534909102252,
            modifier: 'lichengzhao',
            xml: 'ALL',
            id: 10070,
            name: '半夜计划'
          }
        ],
        code: '1'
      }
    }
  },
  activated() {
    this.searchListData()
  },
  methods: {
    searchListData() {
      approveBpmFuncList(this.searchForm).then(res => {
        this.marketLoading = false
        if (!this.httpThen(this, res)) return
        // let data = res.data || []
        let data = this.tempData.data || []

        this.marketList = data
        this.page.totalRecords = res.page ? res.page.totalRowCount : 0
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    handleDel(id) {
      // 删除
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          approveBpmFuncDel({ planId: id })
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
      this.searchForm.pageNumber = val
      this.searchListData()
    },
    handleSearchMarket() {
      this.searchForm.pageNumber = 1
      this.searchListData()
    },
    handleView(obj) {
      if (obj) {
        this.modifyFlag = true
        this.bpmFuncObj.id = obj.id
        this.bpmFuncObj.funcname = obj.name
        this.bpmFuncObj.processname = obj.bpm
      } else {
        this.modifyFlag = false
        this.bpmFuncObj.id = ''
        this.bpmFuncObj.funcname = ''
        this.bpmFuncObj.processname = ''
      }
      this.BpmFuncDialog = true
    },
    modifyBpmFunc() {
      if (this.modifyFlag) {
        this.handleUpdate()
      } else {
        this.createBpmFunc()
      }
    },
    createBpmFunc() {
      approveBpmFuncCreate(this.bpmFuncObj)
        .then(res => {
          if (!this.httpThen(this, res)) return
          this.$message({
            message: '创建流程功能成功',
            type: 'success'
          })
          this.handleSearchMarket()
          // 隐藏弹窗
          this.BpmFuncDialog = false
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    handleUpdate() {
      approveBpmFuncUpdate(this.bpmFuncObj)
        .then(res => {
          if (!this.httpThen(this, res)) return
          this.$message({
            message: '更新流程功能成功',
            type: 'success'
          })
          this.handleSearchMarket()
          // 隐藏弹窗
          this.BpmFuncDialog = false
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
  .market-content {
    width: 100%;
  }
</style>
