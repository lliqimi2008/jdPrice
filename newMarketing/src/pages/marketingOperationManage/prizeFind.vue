<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">奖品查询</h3>
    </div>
    <div class="table-content">

      <el-form
        :label-position="'right'"
        label-width="120px"
        size="small"
        ref="searchForm"
        :model="searchForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="状态更新时间：" prop="startTime">
              <el-date-picker
                class="select100"
                v-model="searchForm.startTime"
                type="datetimerange"
                :picker-options="startTimeList"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['','23:59:59']"
                align="right"
                size="small">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!--<el-col :span="4">-->
            <!--<el-form-item label="券分类：">-->
              <!--<el-select v-model="searchForm.type" @change="selectChange">-->
                <!--<el-option label="理财券" value="li"></el-option>-->
                <!--<el-option label="支付券" value="zhi"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="8">
            <el-form-item label="pin：" prop="pin">
              <el-input placeholder="" v-model="searchForm.pin" clearable></el-input>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
          <el-col :span="8">
            <el-form-item label="状态：" prop="status">
              <el-select class="select100" v-model="searchForm.status">
                <el-option label="全部" value=""></el-option>
                <el-option
                           v-for="item in couponStatus"
                           :key="item.key"
                           :label="item.value"
                           :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-form-item label="">
              <el-button size="small" type="primary" @click="handleSearchMarket">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>

      <el-row style="margin-bottom: 20px; padding-top: 10px; border-top: 1px solid #ddd;">
        <el-button type="primary" size="small" @click="viewDetail" :disabled="searchForm.type == 'li'">查看</el-button>
      </el-row>


      <el-table
        v-loading="marketLoading"
        element-loading-text="拼命加载中"
        :data="marketList"
        highlight-current-row
        @current-change="handleCurrentChange"
        border
        style="width: 100%">
        <el-table-column
          label="状态更新时间">
          <template slot-scope="scope">
            <p>{{ scope.row.modifiedTime | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="pin"
          label="JDpin">
        </el-table-column>
        <el-table-column
          prop="couponNum"
          label="奖品ID">
        </el-table-column>
        <el-table-column
          prop="couponName"
          label="奖品名称">
        </el-table-column>
        <el-table-column
          prop="prizeCategory"
          label="奖品类型"
          :formatter="couponTypeTrans">
        </el-table-column>
        <el-table-column
          prop="couponProfit"
          label="面值">
        </el-table-column>
        <el-table-column
          prop="prizeInstanceId"
          label="券编号">
        </el-table-column>
        <el-table-column
          label="生效时间">
          <template slot-scope="scope">
            <p>{{ scope.row.startTime | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="失效时间">
          <template slot-scope="scope">
            <p>{{ scope.row.endTime | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="activityId"
          label="活动ID">
        </el-table-column>
        <el-table-column
          prop="activityName"
          label="活动名称">
        </el-table-column>
        <el-table-column
          prop="orderAmount"
          label="交易金额">
        </el-table-column>
        <el-table-column
          prop="orderNo"
          label="订单号">
        </el-table-column>

        <el-table-column
          prop="operateType"
          label="状态"
          :formatter="couponStatusTrans">
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


    <el-dialog
      title="奖品明细"
      :visible.sync="dialogVisible"
      width="60%">
      <span>
        <el-table
          :data="marketDetailList"
          border
          style="width: 100%">
        <el-table-column
          label="状态更新时间">
          <template slot-scope="scope">
            <p>{{ scope.row.modifiedDate | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="prizeId"
          label="奖品ID">
        </el-table-column>
        <el-table-column
          prop="prizeName"
          label="奖品名称">
        </el-table-column>
        <el-table-column
          prop="prizeCategory"
          label="奖品类型"
          :formatter="operateCategoryTrans">
        </el-table-column>

        <el-table-column
          prop="tradeAmount"
          label="交易金额">
        </el-table-column>
          <el-table-column
            prop="actualAmount"
            label="营销金额">
        </el-table-column>
        <el-table-column
          prop="merchantOrderNo"
          label="订单号">
        </el-table-column>

        <el-table-column
          prop="operateType"
          label="状态"
          :formatter="operateTypeTrans">
        </el-table-column>
      </el-table>
      </span>
    </el-dialog>
    </el-tabs>
  </section>
</template>

<script>
import {
  operationPrizeList,
  operationPrizeDetailList
} from 'api/service'

export default {
  name: 'prizeFind',
  data () {
    return {
      marketLoading: false,
      dialogVisible: false,
      marketList: [],
      selectRow: {},
      marketDetailList: [],
      liCouponType: {
        '1': '返现券（加息券）',
        '2': '每满返券',
        '3': '满返券',
        '8': '众筹满减券',
        '11': '金条折扣券',
        '12': '金条固定费率券',
        '13': '黄金满返券',
        '14': '保险提额券',
        '15': '满减券',
        '16': '折扣券',
        '17': '体验券',
        '99': '兑换码支付券'
      },
      zhiCouponType: {
        'C': '优惠券',
        'R': '立减',
        'I': '接口奖品',
        'P': '实物奖品',
        'T': '第三方奖品'
      },
      liCouponStatus: {
        '1': '已领取',
        '2': '已使用',
        '3': '已支付',
        '4': '已返利',
        '5': '已作废',
        '6': '已更新返利金额',
        '7': '已过期'
      },
      zhiCouponStatus: {
        'UA': '未激活',
        'UU': '未使用',
        'UI': '使用中',
        'US': '已使用',
        'EP': '过期',
        'CC': '回收',
        'IV': '作废'
      },
      zhiPrizeStatus: {
        'TAKEN': '发奖',
        'USE_ING': '用奖中',
        'USE_SUCCESS': '用奖成功',
        'USE_FAIL': '用奖失败',
        'BACK_PART': '部分退奖',
        'BACK': '退奖',
        'BACK_SUCCSS': '退奖成功',
        'BACK_FAIL': '退奖失败',
        'EXPIRE': '过期',
        'CANCEL': '回收',
        'ACTIVATE': '激活',
        'TRANSFORM': '手机号转换',
        'USER_DELETE': '用户删券',
        'USER_RECOVER': '用户恢复券'
      },
      zhiPrizeCategory: {
        'COUPON': '优惠券',
        'REDUCTION': '立减',
        'INTER_PRIZE': '接口奖品',
        'PHYSICAL_PRIZE': '实物奖品',
        'THIRD_PRIZE': '第三方奖品'
      },
      couponStatus: [],
      startTimeList: {
        // 快捷日期选择
        shortcuts: [
          {
            text: '最近7天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      searchForm: {
        startTime: '',
        pin: '',
        startDate: '',
        endDate: '',
        type: 'zhi',
        status: '',
        pageNumber: 1,
        pageSize: 10
      },
      page: {
        pageNo: 1,
        pageSize: 10,
        totalRecords: 0
      },
      tempData: {}
    }
  },
  activated() {
    this.searchForm.startTime = ''
    this.searchForm.pin = ''
    this.searchForm.type = 'zhi'
    this.selectChange()
  },
  methods: {
    searchListData() {
      if (this.searchForm.startTime === '' || this.searchForm.startTime === undefined) {
        this.$message.error('请填写查询时间')
        return false
      }
      if (this.searchForm.pin === '' || this.searchForm.pin === undefined) {
        this.$message.error('请输入用户pin')
        return false
      }

      this.searchForm.startDate = Date.parse(
        this.searchForm.startTime
          ? this.searchForm.startTime[0]
          : ''
      ) || ''
      this.searchForm.endDate = Date.parse(
        this.searchForm.startTime
          ? this.searchForm.startTime[1]
          : ''
      ) || ''

      let reqParams = {
        pin: this.searchForm.pin,
        type: this.searchForm.type,
        startDate: this.searchForm.startDate,
        endDate: this.searchForm.endDate,
        days: (this.searchForm.startTime === '' || this.searchForm.startTime === undefined) ? 7 : -1,
        status: this.searchForm.status,
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize
      }
      operationPrizeList(reqParams).then(res => {
        this.marketLoading = false
        if (!this.httpThen(this, res)) return
        let data = res.jrCouponResultDtoList || []
        this.marketList = data
        this.page.totalRecords = res.page ? res.page.totalRowCount : 0
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    pageChange(val) {
      this.page.pageNo = val
      this.searchListData()
    },
    handleSearchMarket() {
      this.page.pageNo = 1
      this.searchListData()
    },
    couponTypeTrans(row, column) {
      if (this.searchForm.type === 'li') {
        return this.liCouponType[row.couponType]
      } else {
        return this.zhiCouponType[row.couponType]
      }
    },
    couponStatusTrans(row, column) {
      if (this.searchForm.type === 'li') {
        return this.liCouponStatus[row.status]
      } else {
        return this.zhiCouponStatus[row.status]
      }
    },
    operateCategoryTrans(row, column) {
      if (this.searchForm.type === 'li') {
        return this.liCouponStatus[row.prizeCategory]
      } else {
        return this.zhiPrizeCategory[row.prizeCategory]
      }
    },
    operateTypeTrans(row, column) {
      if (this.searchForm.type === 'li') {
        return this.liCouponStatus[row.operateType]
      } else {
        return this.zhiPrizeStatus[row.operateType]
      }
    },
    selectChange() {
      this.searchForm.status = ''
      let ayyayInit
      if (this.searchForm.type === 'li') {
        ayyayInit = this.liCouponStatus
      } else {
        ayyayInit = this.zhiCouponStatus
      }
      this.couponStatus = []
      for (let key in ayyayInit) {
        let obj = {
          key: key,
          value: ayyayInit[key]
        }
        this.couponStatus.push(obj)
      }
      this.marketList = []
      this.page.totalRecords = 0
    },
    handleCurrentChange(val) {
      this.selectRow = val
    },
    viewDetail() {
      this.dialogVisible = true
      let reqParams = {
        prizeInstanceId: this.selectRow.prizeInstanceId
      }
      operationPrizeDetailList(reqParams).then(res => {
        let data = res.list || []
        this.marketDetailList = data
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    }
  }
}
</script>

<style lang="scss">
  .el-date-editor .el-range-separator{ width: 30px;}
</style>
