<template>
  <!--导入外部券码-->
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl" style="line-height: 42px;">导入外部券码</h3>
      <el-row class="fr">
        <div class="text-right">
          <el-button size="mini" type="primary" plain @click="moduleDownload()">模板下载</el-button>
          <el-button size="mini" type="primary" @click="importData()">导入</el-button>
        </div>
        <span class="fr" style="font-size: 12px; line-height: 16px; color: #999;">支持导入的文件格式为.xslx,请按照模板上传</span>
      </el-row>
    </div>
    <div>
      <el-table
        v-loading="marketLoading"
        element-loading-text="拼命加载中"
        :data="marketList"
        border
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="50"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="奖品数量">
        </el-table-column>
        <el-table-column
          label="操作时间">
          <template slot-scope="scope">
            <p>{{ scope.row.modifiedDate | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="modifier"
          label="操作人">
        </el-table-column>
        <el-table-column
          prop="status"
          label="操作"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="couponDetailsData(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出导入框 -->
    <el-dialog
    title="导入券码"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
      <el-upload
        class="upload-demo"
        ref="upload"
        name="cdKeyFile"
        v-show="newShow"
        :action="uploadUrl"
        :data="param"
        :with-credentials="true"
        :on-success="sucessRes"
        :on-progress="progessRes"
        :on-error="errorRes"
        :auto-upload="false">
          <el-button slot="trigger" size="small" plain type="primary">选取文件</el-button>
          <el-button type="primary" size="small" @click="submitUpload">导入</el-button>
        </el-upload>
        <p v-show="!newShow" style="text-align: center; font-size: 22px; padding: 0; margin: 0; line-height: 32px;">{{promptMessage}}</p>
    </el-dialog>
    </el-tabs>
  </section>
</template>

<script>


import {
  noBudgetThirdList
} from 'api/service'
import {
  BASE_URL
} from 'api/index'
export default {
  name: 'importCoupon',
  data () {
    return {
      promptMessage: '',
      uploadUrl: '',
      newShow: true,
      marketLoading: false,
      dialogVisible: false,
      marketList: [],
      param: {}
    }
  },
  activated() {
    this.uploadUrl = 'http:' + BASE_URL + '/rest/prize/nobudget/uploadFileToDB'
    this.searchListData()
  },
  methods: {
    sucessRes(response, file, fileList) {
      this.$refs.upload.clearFiles()
      if (response.code === '1') {
        this.promptMessage = '导入成功'
      } else {
        this.promptMessage = response.errorMsg
      }
    },
    progessRes(event, file, fileList) {
      this.newShow = false
      this.promptMessage = '正在导入...'
    },
    errorRes() {
      this.promptMessage = '导入失败'
    },
    submitUpload() {
      this.param.prizeId = this.$route.query.prizeId
      this.$refs.upload.submit()
    },
    // 确认关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
          this.searchListData()
        })
        .catch(_ => {})
    },
    // 模板下载
    moduleDownload() {
      window.open(BASE_URL + '/rest/prize/nobudget/exportModel')
      this.$router.go(0)
    },
    // 进入页面默认加载数据
    searchListData() {
      let params = {
        prizeId: this.$route.query.prizeId
      }
      noBudgetThirdList(params).then(res => {
        if (!this.httpThen(this, res)) return
        let data = res.data || []
        this.marketList = data
        // this.searchMarketObj.marketTotal = res.page ? res.page.totalRowCount : 0
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 点击查看按钮查看数据
    couponDetailsData(row) {
      this.$router.push({
        path: '/marketingPlanManage/couponDetails',
        query: {
          planId: this.$route.query.planId,
          thirdBatchId: row.thirdBatchId
          // activityStatus: row.activityStatus,
        }
      })
    },
    // 点击导入按钮导入数据
    importData() {
      this.newShow = true
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped="scoped">
.substy{color: #fff; background-color: #409EFF; border-color: #409EFF;font-size: 12px; border-radius: 3px; border: 1px solid #dcdfe6; padding: 7px 15px; cursor: pointer;}
</style>