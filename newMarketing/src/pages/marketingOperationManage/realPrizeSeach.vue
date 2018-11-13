<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">实物奖品中奖查询</h3>
    </div>
    <div class="table-content">
      <el-form
        :label-position="'right'"
        label-width="90px"
        size="small"
        ref="searchForm"
        :model="searchForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="时间：" prop="startTime">
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
          <el-col :span="6">
            <el-form-item label="奖品ID：" prop="physicalPrizeId">
              <el-input placeholder="" v-model="searchForm.physicalPrizeId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="JDPIN：" prop="pin">
              <el-input placeholder="" v-model="searchForm.pin" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="活动ID：" prop="activityId">
              <el-input placeholder="" v-model="searchForm.activityId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="instanceStatus">
              <el-select class="select100" v-model="searchForm.instanceStatus">
                <el-option label="请选择" value=""></el-option>
                <el-option
                  v-for="item in couponStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
              <el-button size="small" type="primary" @click="searchRealPrizeData">搜索</el-button>
              <el-button size="small" type="warning" @click="resetRealPrizeData">重置</el-button>
              <el-button size="small" type="primary" plain @click="exportRealPrizeData(searchForm)">导出</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        v-loading="marketLoading"
        ref="multipleTable"
        :data="orderTable"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
        tooltip-effect="dark"
        element-loading-text="拼命加载中"
        border
        stripe
        style="width: 100%">
        <el-table-column
          type="selection"
          :reserve-selection="true"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          label="中奖时间">
          <template slot-scope="scope">
            <p>{{ scope.row.createdDate | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="pin"
          label="JDPin">
        </el-table-column>
        <el-table-column
          prop="fullname"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="postcode"
          label="邮编">
        </el-table-column>
        <el-table-column
          prop="physicalPrizeId"
          label="奖品ID">
        </el-table-column>
        <el-table-column
          prop="oldPrizeId"
          label="老奖品ID">
        </el-table-column>
        <el-table-column
          prop="physicalPrizeName"
          label="奖品名称">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="面额">
        </el-table-column>
        <el-table-column
          prop="token"
          label="token">
        </el-table-column>
        <el-table-column
          prop="activityId"
          label="活动ID">
        </el-table-column>
        <el-table-column
          prop="auditName"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="viewDetail(scope.row)" type="text" size="small">发奖</el-button>
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
    <div class="app-dialog">
      <el-dialog title="发奖" :visible.sync="dialogVisible">
        <el-form class="app-dialog-form" label-position="right" label-width="90px" ref='formLabelAlign' :model="formLabelAlign" size="small">
          <el-form-item v-show="false" label="实物奖品实例id:" prop="physicalPrizeInstanceId">
            <el-input v-model="formLabelAlign.physicalPrizeInstanceId"></el-input>
          </el-form-item>
          <el-form-item label="配送方式:">
            <el-input v-model="formLabelAlign.trackCompanyNames" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="快递公司：" prop="trackCompanyName">
            <el-select class="select100" v-model="formLabelAlign.trackCompanyName" @change="changeSelect()">
              <el-option label="请选择" value=""></el-option>
              <el-option
                v-for="item in couponCompanyName"
                :key="item.label"
                :label="item.value"
                :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物流单号:" prop="trackNo">
            <el-input v-model="formLabelAlign.trackNo"></el-input>
          </el-form-item>
          <el-form-item size="large" class="text-right">
              <el-button @click="physicalAwardsIngle()" type="primary" size="small">提交更改</el-button>
              <el-button type="" size="small" @click="dialogVisible = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import {
  PLAN_HAVE_POST
} from 'common/config'
import {
  physicalIsSearch, // 实物奖品中奖查询
  physicalIsGetPhysical, // 获取实物奖品状态
  physicalIsAwardsIngle // 发奖
} from 'api/service'
import { BASE_URL } from 'api/index'
export default {
  name: 'realPrizeSeach',
  data () {
    return {
      getRowKeys(row) {
        return row.modifiedDate
      },
      // 分页数据
      searchMarketObj: {
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      // table加载之前的loading
      marketLoading: false,
      // table返回的数据集合
      orderTable: [],
      multipleSelection: [],
      select_order_number: '',
      select_orderId: [],
      // 快捷日期选择
      formLabelAlign: {
        physicalPrizeInstanceId: '',
        trackCompanyId: '',
        trackCompanyNames: '',
        trackNo: ''
      },
      couponCompanyName: [{
        label: 1,
        value: '京东快递'
      },
      {
        label: 2,
        value: '顺丰快递'
      },
      {
        label: 3,
        value: '圆通快递'
      },
      {
        label: 4,
        value: '申通快递'
      },
      {
        label: 5,
        value: '韵达快递'
      }],
      startTimeList: {
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
        physicalPrizeId: '', // 查询-奖品ID
        pin: '', // 查询-操作人
        activityId: '', // 活动ID
        instanceStatus: '', // 状态
        startTime: [] // 查询-时间
      },
      dialogVisible: false, // 发奖弹框
      couponStatus: []
    }
  },
  activated() {
    this.getPhysicalStatus()
  },
  methods: {
    changeSelect() {
      this.formLabelAlign.trackNo = ''
    },
    handleSelectionChange(rows) {
      this.multipleSelection = rows
      this.select_order_number = this.multipleSelection.length
      this.select_orderId = []
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.select_orderId.push(row)
          }
        })
      }
    },
    // 发奖弹框
    viewDetail(row) {
      this.dialogVisible = true
      this.formLabelAlign = row
      this.formLabelAlign.trackCompanyNames = '普通快递'
    },
    // 根据条件筛选实物奖品中奖信息-方法
    searchRealPrizeData() {
      let params = {
        pageNumber: this.searchMarketObj.pageNumber, // 页码
        physicalPrizeId: this.searchForm.physicalPrizeId, // 奖品id
        pin: this.searchForm.pin, // jdpin
        activityId: this.searchForm.activityId, // 活动ID
        instanceStatus: this.searchForm.instanceStatus, // 状态
        pageSize: 10, // 每页返回数据
        startTime:
          Date.parse(
            this.searchForm.startTime
              ? this.searchForm.startTime[0]
              : ''
          ) || '',
        endTime:
          Date.parse(
            this.searchForm.startTime
              ? this.searchForm.startTime[1]
              : ''
          ) || ''
      }
      console.log(params)
      physicalIsSearch(params)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          data.list.forEach((item, index) => {
            item.auditName = PLAN_HAVE_POST[item.instanceStatus]
          })
          this.orderTable = data.list
          this.searchMarketObj.marketTotal = data.page ? data.page.totalRowCount : 0
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 重置筛选条件
    resetRealPrizeData() {
      this.$refs.searchForm.resetFields()
    },
    // 导出实物奖品中奖信息
    exportRealPrizeData(row) {
      var startTimedown = Date.parse(row.startTime ? row.startTime[0] : '') || ''
      var endTimedown = Date.parse(row.startTime ? row : '') || ''
      window.location = (BASE_URL + '/rest/prizePhysical/export?physicalPrizeId=' + row.physicalPrizeId + '&pin=' + row.pin + '&startTime=' + startTimedown + '&endTime=' + endTimedown + '&activityid=' + row.activityId + '&instanceStatus=' + row.instanceStatus)
      this.router.go(0)
    },
    // 提交更新
    physicalAwardsIngle() {
      var EtrackCompanyName = ''
      switch (this.formLabelAlign.trackCompanyName) {
        case 1:
          EtrackCompanyName = '京东快递'
          break
        case 2:
          EtrackCompanyName = '顺丰快递'
          break
        case 3:
          EtrackCompanyName = '圆通快递'
          break
        case 4:
          EtrackCompanyName = '申通快递'
          break
        case 5:
          EtrackCompanyName = '韵达快递'
          break
        default:
          break
      }
      let params = {
        physicalPrizeInstanceId: this.formLabelAlign.physicalPrizeInstanceId, // 实物奖品实例ID
        trackNo: this.formLabelAlign.trackNo, // 物流单号
        trackFee: this.formLabelAlign.trackFee, // 物流费用
        trackCompanyId: this.formLabelAlign.trackCompanyName, // 物流公司id
        trackCompanyName: EtrackCompanyName // 物流公司名
      }
      physicalIsAwardsIngle(params)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.orderTable = data
          this.dialogVisible = false
          this.searchRealPrizeData()
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 获取实物奖品状态
    getPhysicalStatus() {
      physicalIsGetPhysical()
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          data.forEach((item, key) => {
            let obj = {}
            for (var key2 in item) {
              obj.value = key2
              obj.label = item[key2]
            }
            this.couponStatus.push(obj)
          })
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    pageChange(val) {
      this.searchMarketObj.pageNumber = val
      this.searchRealPrizeData()
    }
  }
}
</script>
<style>
.el-date-editor .el-range-separator{ width: 30px;}
</style>

