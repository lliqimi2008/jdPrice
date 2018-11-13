<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">流程定义</h3>
    </div>
    <div class="table-content">
      <div style="margin-bottom: 16px;">
        <el-row>
          <el-col :span="6">
            <el-upload
            class="upload-demo"
            ref="upload"
            name="file"
            :action="uploadUrl"
            :with-credentials="true"
            :on-success="sucessRes"
            :on-error="errorRes"
            :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button type="success" size="small" @click="submitUpload">部署</el-button>
              </el-upload>
          </el-col>
        </el-row>
      </div>
      <el-table
        v-loading="marketLoading"
        element-loading-text="拼命加载中"
        :data="marketList"
        border
        stripe
        style="width: 100%">
        <el-table-column
          fixed
          prop="deploymentId"
          label="ID"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="name"
          label="流程名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="流程定义">
        </el-table-column>
        <el-table-column
          prop="resourceName"
          label="XML资源名称">
        </el-table-column>
        <el-table-column
          prop="diagramResourceName"
          label="图片资源名称">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDel(scope.row.deploymentId)" v-hasPermissions="'marketingApproveManage:bpmDefine:deleteBpm'">删除</el-button>
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
    </el-tabs>
  </section>
</template>

<script>
import {
  approveBpmPd, // 流程定义查询
  approveBpmDefineDel
} from 'api/service'
import {
  BASE_URL
} from 'api/index'
export default {
  name: 'bpmDefine',
  data () {
    return {
      // 分页数据
      searchMarketObj: {
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      uploadUrl: '',
      imgObj: {},
      marketLoading: false,
      marketList: [],
      tempData: {
        message: '请求成功',
        code: '1'
      }
    }
  },
  activated() {
    this.uploadUrl = 'http:' + BASE_URL + '/rest/bpm/pd/deploy'
    this.searchListData()
  },
  methods: {
    sucessRes() {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      this.searchListData()
    },
    errorRes() {
      this.$message({
        message: '操作失败',
        type: 'warning'
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    Preview(ev) {
      const file = ev.target.files[0]
      // console.log(file)
      this.imgObj = ev.target.files[0]
      let obj = new FileReader()
      obj.readAsDataURL(file)
      obj.onload = () => {
        this.picReduce(obj.result, base64 => {
          this.img = base64
        })
      }
    },
    searchListData() {
      let reqObj = {
        pageNumber: this.searchMarketObj.pageNumber,
        pageSize: 10
      }
      approveBpmPd(reqObj).then(res => {
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
          approveBpmDefineDel({ deploymentId: id })
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
    }
  }
}
</script>

<style lang="scss" scoped="scoped">

</style>
