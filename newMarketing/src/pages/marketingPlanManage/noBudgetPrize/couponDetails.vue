<template>
  <!--券码详情-->
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl" >券码详情</h3>
      <el-row class="fr">
        <el-button size="mini" type="primary" @click="returnImport()">返回</el-button>
      </el-row>
    </div>
    <div>
      <el-form
        :label-position="'right'"
        label-width="100px"
        size="small"
        ref="searchForm"
        :model="searchForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="券码：" prop="coupon">
              <el-input placeholder="" v-model="searchForm.coupon" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="">
              <el-button size="small" type="primary" @click="searchListDataClik">搜索</el-button>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="10" :offset="3">
            <div class="fr">
              <ul class="ul_stylsu">
                <li class="fl">未发放:<span>28</span></li>
                <li class="fl">已发放:<span>287</span></li>
              </ul>
            </div>
          </el-col> -->
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
          :index="indexMethod"
          width="50"
          label="序号">
        </el-table-column>
        <el-table-column
          label="导入时间">
          <template slot-scope="scope">
            <p>{{ scope.row.modifiedDate | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="cdKey"
          label="券码">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.instanceStatus ==='INIT'">未发放</span>
            <span v-if="scope.row.instanceStatus ==='GIVE_OUT'">已发放</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" v-if="searchMarketObj.marketTotal">
        <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        @current-change="pageChange"
        :current-page="searchMarketObj.pageNumber"
        :total="searchMarketObj.marketTotal">
        </el-pagination>
      </div>
    </div>
    </el-tabs>
  </section>
</template>

<script>
import {
  noBudgetInstanceList,
  noBudgetSearchInstance
} from 'api/service'
export default {
  name: 'couponDetails',
  data() {
    return {
      searchForm: {
        coupon: ''
      },
      // 分页数据
      searchMarketObj: {
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      marketLoading: false,
      marketList: []
    }
  },
  activated() {
    this.noBudgetInstanc()
  },
  methods: {
    indexMethod(index) {
      return (this.searchMarketObj.pageNumber - 1) * 10 + index + 1
    },
    // 返回按钮
    returnImport() {
      this.$router.push({
        path: '/marketingPlanManage/importCoupon',
        query: {
          planId: this.$route.query.planId
          // activityId: row.activityId,
          // activityStatus: row.activityStatus,
        }
      })
    },
    // 搜索按钮
    searchListDataClik() {
      let params = {
        cdKey: this.searchForm.coupon
      }
      noBudgetSearchInstance(params).then(res => {
        if (!this.httpThen(this, res)) return
        console.log(res)
        let data = res.data || []
        this.marketList = data
        this.searchMarketObj.marketTotal = res.page ? res.page.totalRowCount : 0
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 进入页面加载
    noBudgetInstanc(val) {
      let params = {
        thirdBatchId: this.$route.query.thirdBatchId,
        pageNumber: val
      }
      noBudgetInstanceList(params).then(res => {
        if (!this.httpThen(this, res)) return
        console.log(res)
        let data = res.data || []
        this.marketList = data
        this.searchMarketObj.marketTotal = res.page ? res.page.totalRowCount : 0
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 分页
    pageChange(val) {
      this.searchMarketObj.pageNumber = val
      this.noBudgetInstanc(val)
    }
  }
}
</script>

<style scoped="scoped">
.ul_stylsu{ height: auto; line-height: auto;}
.ul_stylsu li{ margin: 0 8px;}
.ul_stylsu li:first-child,.ul_stylsu li:first-child span{font-size: 16px; line-height: 32px; height: 32px; color: #FF0000;}
.ul_stylsu li:last-child,.ul_stylsu li:last-child span{font-size: 16px; line-height: 32px; height: 32px; color: #13CE66;}
</style>