<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
        <div class="pub-sm-title clear">
          <h3 class="fl">业务标识</h3>
          <div class="fr">

            <el-button type="primary" @click="handleResetBizIdf">新增业务标识</el-button>
            <el-dialog :visible.sync="dialogFormVisible">
              <el-form :model="planBizIdf">
                <el-form-item label="业务标识名称" class="is-required">
                  <el-input placeholder="限10字以内" v-model="planBizIdf.bizIdfName" auto-complete="off"></el-input>
                  <div class="input-hint-text text-left">您还可以输入{{10 -planBizIdf.bizIdfName.length}}个字</div>
                </el-form-item>
                <el-form-item label="业务标识描述" class="is-required">
                  <el-input placeholder="限50字以内" v-model="planBizIdf.desc" auto-complete="off"></el-input>
                  <div class="input-hint-text text-left">您还可以输入{{50 -planBizIdf.desc.length}}个字</div>
                </el-form-item>
                <el-form-item label="申请人" class="is-required">
                  <el-input  v-model="planBizIdf.applicant" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleCreatePlanBizIdf">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>

        <div class="plan-content">
          <el-form
            :label-position="'right'"
            label-width="120px"
            size="small"
            ref="searchPlanBizIdfObj"
            :model="searchPlanBizIdfObj">

            <el-row>
              <el-col :span="8">
                <el-form-item label="业务标识：" prop="bizIdfName">
                  <el-input placeholder="请输入业务标识" v-model="searchPlanBizIdfObj.bizIdfName" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="">
                  <el-button size="small" type="primary" @click="handleSearchPlanBizIdf">查询</el-button>
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
                prop="bizIdfId"
                label="业务标识ID"
                width="100px">
              </el-table-column>
              <el-table-column
                prop="bizIdfName"
                label="业务标识名称">
              </el-table-column>
              <el-table-column
                prop="desc"
                label="业务标识描述">
              </el-table-column>
              <el-table-column
                prop="applicant"
                label="申请人">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleSetBizIdfId(scope.row.bizIdfId);handleSearchPlanBizIdfAndEdit(scope.row.bizIdfName)">编辑</el-button>
                  <el-button size="mini" type="text" @click="handlePlanBizIdfDelete(scope.row.bizIdfId)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div class="pagination" v-if="searchPlanBizIdfObj.marketTotal">
            <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              @current-change="pageChange"
              :current-page="searchPlanBizIdfObj.pageNumber"
              :total="searchPlanBizIdfObj.marketTotal">
            </el-pagination>
          </div>
        </div>
      <el-dialog :visible.sync="dialogFormVisible2">
        <el-form :model="planBizIdf">
          <el-form-item label="业务标识名称" class="is-required">
            <el-input placeholder="限10字以内" v-model="planBizIdf.bizIdfName" auto-complete="off"></el-input>
            <div class="input-hint-text text-left">您还可以输入{{10 -planBizIdf.bizIdfName.length}}个字</div>
          </el-form-item>
          <el-form-item label="业务标识描述" class="is-required">
            <el-input placeholder="限50字以内" v-model="planBizIdf.desc" auto-complete="off"></el-input>
            <div class="input-hint-text text-left">您还可以输入{{50 -planBizIdf.desc.length}}个字</div>
          </el-form-item>
          <el-form-item label="申请人" class="is-required">
            <el-input  v-model="planBizIdf.applicant" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="handleEditPlanBizIdf">确 定</el-button>
        </div>
      </el-dialog>
    </el-tabs>
  </section>
</template>

<script>
import {
  createPlanBizIdf,
  modifyPlanBizIdf,
  allPlanBizIdfList,
  deletePlanBizIdf
} from 'api/service'

export default {
  name: 'allPlan',
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      marketLoading: false,
      goSerch: true,
      inputErr: true,
      activeTabName: 'second', // 当前tab
      searchPlanBizIdfObj: {
        bizIdfName: '',
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      planBizIdf: {
        bizIdfId: '',
        bizIdfName: '',
        applicant: '',
        desc: ''
      },
      marketList: []
    }
  },
  activated() {
    this.handleSearchPlanBizIdf()
  },
  methods: {
    // 数据重置
    handleResetBizIdf() {
      this.planBizIdf = {
        bizIdfName: '',
        applicant: '',
        desc: ''
      }
      this.dialogFormVisible = true
    },
    // 设置业务标识id
    handleSetBizIdfId(id) {
      this.dialogFormVisible2 = true
      this.planBizIdf.bizIdfId = id
    },
    // 新增业务标识
    handleCreatePlanBizIdf() {
      let reqParams = {
        bizIdfName: this.planBizIdf.bizIdfName,
        applicant: this.planBizIdf.applicant,
        desc: this.planBizIdf.desc
      }
      createPlanBizIdf(reqParams)
        .then(res => {
          if (res.code === '1') {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.dialogFormVisible = false
            this.handleSearchPlanBizIdf() // 更新列表
          } else {
            this.dialogFormVisible = false
            this.$message.error(res.message)
          }
        })
    },
    // 修改业务标识
    handleEditPlanBizIdf() {
      let reqParams = {
        bizIdfId: this.planBizIdf.bizIdfId,
        bizIdfName: this.planBizIdf.bizIdfName,
        applicant: this.planBizIdf.applicant,
        desc: this.planBizIdf.desc
      }
      modifyPlanBizIdf(reqParams)
        .then(res => {
          if (res.code === '1') {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.dialogFormVisible2 = false
            this.handleSearchPlanBizIdf() // 更新列表
          } else {
            this.dialogFormVisible2 = false
            this.$message.error(res.message)
          }
        })
    },
    // 查询业务标识
    handleSearchPlanBizIdf() {
      // 点击搜索业务标识
      this.marketLoading = true
      let reqParams = {
        pageNumber: this.searchPlanBizIdfObj.pageNumber,
        pageSize: this.searchPlanBizIdfObj.pageSize,
        bizIdfName: this.searchPlanBizIdfObj.bizIdfName
      }
      allPlanBizIdfList(reqParams)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.marketList = data
          this.searchPlanBizIdfObj.marketTotal = res.page ? res.page.totalRowCount : 0
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 编辑页查询业务标识
    handleSearchPlanBizIdfAndEdit(bizIdfName) {
      // 点击搜索业务标识
      this.marketLoading = true
      let reqParams = {
        pageNumber: this.searchPlanBizIdfObj.pageNumber,
        pageSize: this.searchPlanBizIdfObj.pageSize,
        bizIdfName: bizIdfName
      }
      allPlanBizIdfList(reqParams)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.planBizIdf.bizIdfName = data[0].bizIdfName
          this.planBizIdf.desc = data[0].desc
          this.planBizIdf.applicant = data[0].applicant
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 删除业务标识
    handlePlanBizIdfDelete(id) {
      this.$confirm('确认删除该业务标识?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deletePlanBizIdf({ bizIdfId: id })
            .then(res => {
              if (res.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.handleSearchPlanBizIdf() // 更新列表
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
      this.searchPlanBizIdfObj.pageNumber = val
      this.handleSearchPlanBizIdf()
    }

  }
}
</script>

<style lang="scss">

</style>
