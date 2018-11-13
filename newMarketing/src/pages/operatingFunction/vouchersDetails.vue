<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">绑券详情</h3>
    </div>
    <div class="table-content">
      <el-form
        :label-position="'right'"
        label-width="90px"
        size="small"
        ref="searchForm"
        :model="searchForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="JDPIN" prop="prizeJdpn">
              <el-input placeholder="" v-model="searchForm.prizeJdpn" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="PHONE" prop="prizePhone">
              <el-input placeholder="" v-model="searchForm.prizePhone" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="1">
              <el-button size="small" type="primary" @click="searchManualListData">搜索</el-button>
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
          type="index"
          width="50"
          :index="indexMethod"
          label="序号">
        </el-table-column>
        <el-table-column
          label="操作时间">
          <template slot-scope="scope">
            <p>{{ scope.row.modifiedDate | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="prizeId"
          label="奖品ID">
        </el-table-column>
        <el-table-column
          prop="pin"
          label="JDPIN">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="PHONE">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span>已完成</span>
            <!--<span v-if="scope.row.init ==='NO'">进行中</span>
            <span v-if="scope.row.init ==='OFF'">已完成</span>-->
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
    <!--<el-button size="mini" type="primary" plain @click="moduleDownload()">下载123</el-button>-->
    </el-tabs>
  </section>
</template>

<script>
import {
  newBindDetailsList
} from 'api/service'
import {
  BASE_URL
} from 'api/index'
export default {
  name: 'manualBindTicket',
  data () {
    return {
      // 分页数据
      searchMarketObj: {
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      // table加载之前的loading
      marketLoading: false,
      // table返回的数据集合
      marketList: [],
      searchForm: {
        prizeJdpn: '', // 查询-奖品ID
        prizePhone: '' // 查询-操作人
      }
    }
  },
  activated() {
    this.searchManualListData()
  },
  methods: {
    // 模板下载
    moduleDownload() {
      window.open(BASE_URL + '/rest/prize/manualCoupon/exportBindDetails?bindRocordId=' + 602 + '&pageNum=' + 1 + '&pageSize=' + 10)
      this.$router.go(0)
    },
    indexMethod(index) {
      return (this.searchMarketObj.pageNumber - 1) * 10 + index + 1
    },
    // 页面进入访问方法调取数据信息
    searchManualListData() {
      let params = {
        pageNumber: this.searchMarketObj.pageNumber,
        pin: this.searchForm.prizeJdpn ? this.searchForm.prizeJdpn : null,
        mobile: this.searchForm.prizePhone ? this.searchForm.prizePhone : null,
        bindRocordId: this.$route.query.bindRocordId
      }
      newBindDetailsList(params)
        .then(res => {
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
    pageChange(val) {
      this.searchMarketObj.pageNumber = val
      this.searchManualListData()
    }
  }
}
</script>
<style>
.el-date-editor .el-range-separator{ width: 30px;}
.div_bodTop{ padding: 10px 0; border-top: 1px solid #ddd;}
</style>
