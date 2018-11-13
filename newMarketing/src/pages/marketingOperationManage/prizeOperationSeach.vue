<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">奖品操作实例列表</h3>
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
            <el-form-item label="pin：" prop="pin">
              <el-input placeholder="" v-model="searchForm.pin" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实例ID：" prop="prizeInstanceId">
              <el-input placeholder="" v-model="searchForm.prizeInstanceId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="奖品ID：" prop="prizeId">
              <el-input placeholder="" v-model="searchForm.prizeId" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="老奖品ID：" prop="oldPrizeId">
              <el-input placeholder="" v-model="searchForm.oldPrizeId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="活动ID：" prop="activityId">
              <el-input placeholder="" v-model="searchForm.activityId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预算ID：" prop="budgetId">
              <el-input placeholder="" v-model="searchForm.budgetId" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预算编码：" prop="budgetCode">
              <el-input placeholder="" v-model="searchForm.budgetCode" clearable></el-input>
            </el-form-item>
          </el-col>
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
          <el-col :span="8">
            <el-form-item label="费用结算主体：" prop="settleConfigId">
              <el-select class="select100" v-model="searchForm.settleConfigId">
                <el-option label="请选择" value=""></el-option>
                <el-option
                  v-for="item in getSettleconfig"
                  :key="item.settleConfigId"
                  :label="item.settleCompanyName"
                  :value="item.accountEnCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="状态：" prop="operateType">
              <el-select class="select100" v-model="searchForm.operateType">
                <el-option label="请选择" value=""></el-option>
                <el-option
                  v-for="item in gettoperatetype"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="奖品类型：" prop="prizeCategory">
              <el-select class="select100" v-model="searchForm.prizeCategory">
                <el-option label="请选择" value=""></el-option>
                <el-option
                  v-for="item in getPrizecateCory"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="1">
              <el-button size="small" type="primary" @click="searchManualData">查询</el-button>
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
          prop="pin"
          label="PIN">
        </el-table-column>
        <el-table-column
          prop="prizeInstanceOperateId"
          label="操作ID">
        </el-table-column>
        <el-table-column
          prop="prizeInstanceId"
          label="实例ID">
        </el-table-column>
        <el-table-column
          prop="activityId"
          label="活动ID">
        </el-table-column>
        <el-table-column
          prop="prizeId"
          label="奖品ID">
        </el-table-column>
        <el-table-column
          prop="oldPrizeId"
          label="老奖品ID">
        </el-table-column>
        <el-table-column
          prop="prizeName"
          label="奖品名称">
        </el-table-column>
        <el-table-column
          prop="PrizeCategoryEnum"
          label="奖品类型">
        </el-table-column>
        <el-table-column
          prop="PrizeInstanceOperateTypeEnum"
          label="操作类型">
        </el-table-column>
        <el-table-column
          prop="budgetId"
          label="预算ID">
        </el-table-column>
        <el-table-column
          prop="budgetCode"
          label="预算编码">
        </el-table-column>
        <el-table-column
          prop="merchantOrderNo"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="voucher"
          label="支付单号">
        </el-table-column>
        <el-table-column
          prop="tradeAmount"
          label="订单金额(元)">
        </el-table-column>
        <el-table-column
          prop="actualAmount"
          label="优惠金额(元)">
        </el-table-column>
        <el-table-column
          label="创建时间">
          <template slot-scope="scope">
            <p>{{ scope.row.createdDate | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
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
  operateIsSearch, // 查询券的可用库存
  operateIsGetSettleconfig, // 费用结算主体查询
  operateIsGettoperatetype, // 操作类型查询
  operateIsGetPrizecateCory // 奖品类型查询
} from 'api/service'

export default {
  name: 'prizeOperationSeach',
  data () {
    return {
      // 分页数据
      searchMarketObj: {
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      getSettleconfig: [], // 费用结算主体查询
      gettoperatetype: [], // 操作类型查询
      getPrizecateCory: [], // 奖品类型查询
      // table加载之前的loading
      marketLoading: false,
      // table返回的数据集合
      marketList: [],
      // 快捷日期选择
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
        pin: '', // jdpin
        prizeInstanceId: '', // 实例id
        prizeId: '', // 奖品ID
        oldPrizeId: '', // 老奖品id
        activityId: '', // 活动id
        budgetId: '', // 预算id
        budgetCode: '', // 预算编码
        startTime: [], // 查询-时间
        settleConfigId: '', // 费用结算主体
        operateType: '', // 状态
        prizeCategory: '' // 奖品类型
      }
    }
  },
  activated() {
    this.settleconfigManualData()
    this.operatetypeManualData()
    this.cateCoryManualData()
  },
  methods: {
    // 根据条件筛选信息-方法
    searchManualData() {
      let params = {
        pageNumber: this.searchMarketObj.pageNumber,
        pin: this.searchForm.pin,
        operateType: this.searchForm.operateType,
        budgetId: this.searchForm.budgetId,
        budgetCode: this.searchForm.budgetCode,
        settleConfigId: this.searchForm.settleConfigId,
        prizeId: this.searchForm.prizeId,
        oldPrizeId: this.searchForm.oldPrizeId,
        prizeCategory: this.searchForm.prizeCategory,
        activityId: this.searchForm.activityId,
        prizeInstanceId: this.searchForm.prizeInstanceId,
        pageSize: 10,
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
      operateIsSearch(params)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          this.marketList = data.list
          this.searchMarketObj.marketTotal = data.page ? data.page.totalRowCount : 0
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 费用结算主体查询-方法
    settleconfigManualData() {
      operateIsGetSettleconfig()
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.getSettleconfig = data
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 操作类型查询-方法
    operatetypeManualData() {
      operateIsGettoperatetype()
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          data.forEach((item, key) => {
            let obj = {}
            for (var key2 in item) {
              obj.value = key2
              obj.label = item[key2]
            }
            this.gettoperatetype.push(obj)
          })
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 奖品类型查询-方法
    cateCoryManualData() {
      operateIsGetPrizecateCory()
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          data.forEach((item, key) => {
            let obj = {}
            for (var key2 in item) {
              obj.value = key2
              obj.label = item[key2]
            }
            this.getPrizecateCory.push(obj)
          })
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    pageChange(val) {
      this.searchMarketObj.pageNumber = val
      this.searchManualData()
    }
  }
}
</script>
<style>
.el-date-editor .el-range-separator{ width: 30px;}
</style>
