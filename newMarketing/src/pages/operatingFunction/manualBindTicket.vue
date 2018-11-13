<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">手动绑券</h3>
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
            <el-form-item label="奖品ID：" prop="prizeId">
              <el-input placeholder="" v-model="searchForm.prizeId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="操作人：" prop="operationUser">
              <el-input placeholder="" v-model="searchForm.operationUser" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="1">
              <el-button size="small" type="primary" @click="searchManualData">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="div_bodTop clear">
        <el-button size="mini" @click="addManualBind()">新增</el-button>
      </div>
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
          prop="total"
          label="绑定数量">
        </el-table-column>
        <el-table-column
          prop="modifier"
          label="操作人">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <p>已完成</p>
            <!-- <span v-if="scope.row.init ==='NO'">进行中</span>
            <span v-if="scope.row.init ==='OFF'">已完成</span> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="详情"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="detailsData(scope.row)" type="text" size="small">查看</el-button>
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
  newBindList
} from 'api/service'

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
        prizeId: '', // 查询-奖品ID
        operationUser: '', // 查询-操作人
        startTime: [] // 查询-时间
      }
    }
  },
  activated() {
    this.searchManualData()
  },
  methods: {
    indexMethod(index) {
      return (this.searchMarketObj.pageNumber - 1) * 10 + index + 1
    },
    // 页面进入访问方法调取数据信息
    
    // 根据条件筛选信息-方法
    searchManualData() {
      let params = {
        pageNumber: this.searchMarketObj.pageNumber,
        prizeId: this.searchForm.prizeId,
        operationUser: this.searchForm.operationUser,
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
      newBindList(params)
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
    // 点击取消访问方法
    async addManualBind() {
      this.$router.push({
        path: '/operatingFunction/newIncreaBind'
      })
    },
    // 详情--查看
    async detailsData(row) {
      this.$router.push({
        path: '/operatingFunction/vouchersDetails',
        query: {
          bindRocordId: row.bindRocordId
        }
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
.div_bodTop{ padding: 10px 0; border-top: 1px solid #ddd;}
</style>
