<template>
  <section class="all-plan-section">
    <el-tabs v-model="activeTabName">
        <div class="pub-sm-title clear">
          <h3 class="fl">我的营销计划</h3>
          <div class="fr">
            <el-button type="primary" size="small" @click="createEditMarket" v-hasPermissions="'marketingPlanManage:allPlan:createPlan'">创建新的营销计划</el-button>
          </div>
        </div>
        <div class="plan-content">
          <el-form
            :label-position="'right'"
            label-width="120px"
            size="small"
            ref="searchMarketObj"
            :rules="searchMarketObjRules"
            :model="searchMarketObj">
            <el-row>
              <el-col :span="8">
                <el-form-item label="营销计划ID：" prop="planId">
                  <el-input placeholder="请输入营销计划ID" v-model="searchMarketObj.planId" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="营销计划名称：" prop="planName">
                  <el-input placeholder="营销计划名称" v-model="searchMarketObj.planName" clearable></el-input>
                </el-form-item>
              </el-col>

              <!--<el-col :span="8">-->
                <!--<el-form-item label="创建人：" prop="creator">-->
                  <!--<el-input placeholder="请输入创建人erp" v-model="searchMarketObj.creator" clearable></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->

              <el-col :span="8">
                <el-form-item label="活动ID：" prop="activityId">
                  <el-input placeholder="请输入活动ID" v-model="searchMarketObj.activityId" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="奖品ID：" prop="prizeId">
                  <el-input placeholder="请输入奖品ID" v-model="searchMarketObj.prizeId" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="商户号：" prop="merchantNo">
                  <el-input placeholder="请输入商户号" v-model="searchMarketObj.merchantNo" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11">
                <el-form-item label="创建时间：" prop="createTime">
                  <el-date-picker
                    class="select100"
                    v-model="searchMarketObj.createTime"
                    type="datetimerange"
                    :picker-options="createTimeList"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['','23:59:59']"
                    align="right"
                    size="small">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-col :span="24">
              <el-form-item label="">
                <el-button size="small" type="primary" @click="handleSearchMarket">查询</el-button>
              </el-form-item>
            </el-col>

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
                prop="planId"
                label="营销计划ID"
                width="100px">
              </el-table-column>
              <el-table-column
                prop="planName"
                label="营销计划名称">
              </el-table-column>
              <el-table-column
                prop="creator"
                label="创建人">
              </el-table-column>
              <el-table-column
                label="创建时间">
                <template slot-scope="scope">
                  <p>{{ scope.row.createdDate | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
                </template>
              </el-table-column>
              <el-table-column
                label="状态"
                prop="auditName"
                width="100">
                <!--<template slot-scope="scope">-->
                  <!--<span class="green" v-if="scope.row.auditStatus === '已审核'">{{ scope.row.auditStatus | planStatus }}</span>-->
                  <!--<span class="gray" v-if="scope.row.auditStatus === '未审核'">{{ scope.row.auditStatus | planStatus }}</span>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleCheckMarketDetail(scope.row)"
                    v-hasPermissions="'marketingPlanManage:allPlan:showDetail'">查看</el-button>
                  <!-- <el-button
                    size="medium"
                    type="primary"
                    @click="createEditMarket(scope.row)">编辑</el-button> -->
                  <el-button
                    size="mini"
                    type="text"
                    @click="launchApproval(scope.row.planId)">提审</el-button>
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleDeleteMarket(scope.row.planId)"
                    v-hasPermissions="'marketingPlanManage:allPlan:deletePlan'">删除</el-button>
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
        </div>
    </el-tabs>
  </section>
</template>

<script>
import store from 'store'
import {
  PLAN_STATUS
} from 'common/config'
import {
  allPlanTotalActivity,
  allPlanSearchPlanList,
  // allPlanCheckPlanById,
  allPlanDeletePlan,
  launchPlanApprove,
  searchAllDept
} from 'api/service'
export default {
  name: 'allPlan',
  data() {
    return {
      activityLoading: false,
      marketLoading: false,
      goSerch: true,
      inputErr: true,
      createTimeList: {
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
      activeTabName: 'second', // 当前tab
      totalActivityList: [],
      searchActivityObj: {
        // 活动列表条件对象
        planDepartment: '',
        departmentsOptions: [],
        activityStatus: 'ALL',
        statusOptions: [
          {
            label: '全部',
            value: 'ALL'
          },
          {
            label: '进行中',
            value: 'ONGOING'
          },
          {
            label: '未开始',
            value: 'NOTSTART'
          },
          {
            label: '已结束',
            value: 'ENDED'
          }
        ],
        merchantNo: '',
        creator: '',
        planId: '',
        pageNumber: 1,
        pageSize: 10,
        activityTotal: 0
      },
      searchActivityObjRules: {},
      // 活动列表
      activityList: [],
      formRules: {
        planActivityDepartment: [{}]
      },
      echartOption: {
        title: {
          text: '活动月份分布'
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          type: 'scroll',
          left: '20%',
          data: [
            {
              name: '未开始'
            },
            {
              name: '进行中'
            },
            {
              name: '已结束'
            },
            {
              name: '暂停中'
            },
            {
              name: '已超时'
            }
          ]
        },
        grid: {
          show: true,
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: [
            '一月',
            '二月',
            '三月',
            '四月',
            '五月',
            '六月',
            '七月',
            '八月',
            '九月',
            '十月',
            '十一月',
            '十二月'
          ]
        },
        yAxis: {
          type: 'category',
          boundaryGap: true,
          data: []
        },
        series: []
      },
      // 营销计划列表对象
      searchMarketObj: {
        merchantNo: '',
        planId: '',
        planName: '',
        activityId: '',
        prizeId: '',
        creator: '',
        createTime: '',
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      searchMarketObjRules: {},
      // 营销计划列表
      marketList: []
    }
  },
  watch: {
    activityList: function(val) {
      // 更新Echart
      this.activityEchartUpdate(val)
    }
  },
  activated() {
    this.resetForm(this, 'searchMarketObj')
    // this.resetForm(this, 'searchActivityObj')
    if (this.$route.query && this.$route.query.tabs) {
      // tab页切换
      this.activeTabName = this.$route.query.tabs
    }

    this.searchMarketObj.pageNumber = 1
    this.searchActivityObj.pageNumber = 1
    setTimeout(() => {
      // TODO 请求营销计划初始数据
      this.handleSearchMarket()
      this.searchAllDept()
      // this.handleSearchActivity()
    }, 10)
  },

  methods: {
    // 重置表单
    resetForm(_this, formName) {
      setTimeout(() => {
        // 延迟清空的原因是因为有时候dom及对应的model未渲染
        _this.$refs[formName].resetFields()
      }, 0)
    },

    planTabClick(tab) {
      if (tab.index === '1') {
        // TODO 请求活动总览初始数据
        this.handleSearchActivity()
      }
    },
    createEditMarket(item) {
      // 跳转新建计划页 有入参即编辑 无入参即新建
      let pathObj = {
        path: '/marketingPlanManage/createPlan'
      }
      if (item) {
        pathObj = {
          path: '/marketingPlanManage/createPlan',
          query: {
            planId: item.planId
          }
        }
      }
      this.$router.push(pathObj)
    },

    async handleSearchActivity() {
      this.activityLoading = true
      // 点击搜索活动总览
      let re = /^[0-9]+.?[0-9]*$/
      if (
        this.searchActivityObj.planId.length > 0 &&
        !re.test(this.searchActivityObj.planId)
      ) {
        this.goSerch = false
      } else {
        this.goSerch = true
      }

      let reqObj = {
        pageNumber: this.searchActivityObj.pageNumber,
        pageSize: 10,
        creator: this.searchActivityObj.creator,
        planId: this.searchActivityObj.planId,
        merchantNo: this.searchActivityObj.merchantNo,
        activityStatus: this.searchActivityObj.activityStatus,
        planDepartment: this.searchActivityObj.planDepartment
      }

      if (this.goSerch) {
        let res = await this.queryTotalActivity(reqObj)
        if (res.code === '1') {
          // 请求成功
          if (res.data.activityCounts && res.data.activityCounts.length > 0) {
            // 活动总数总览
            this.totalActivityList = res.data.activityCounts
          } else {
            this.totalActivityList = []
          }

          if (res.data.list && res.data.list.length > 0) {
            // 活动条目列表
            this.activityList = res.data.list
          } else {
            this.activityList = []
          }

          this.searchActivityObj.activityTotal = res.data.totalRowCount
        } else {
          // 失败
          this.$message.error(res.message)
        }
        this.activityLoading = false
      } else {
        this.$alert('营销计划ID输入不合法', '错误提示', {
          confirmButtonText: '确定',
          callback: () => {
            this.goSerch = true
            this.activityLoading = false
          }
        })
      }
    },
    async queryTotalActivity(reqObj) {
      // 查询活动总览
      let res = await allPlanTotalActivity(reqObj)
      return res
    },
    activityStatusFormat(status, startTime, endTime) {
      // 格式化活动状态
      if (status === 'OFFLINE') {
        return '已结束'
      }
      if (status === 'PAUSE') {
        return '暂停中'
      }
      if (status === 'ONLINE') {
        const curTime = Date.parse(new Date()) // 当前时间戳毫秒
        if (curTime >= startTime && curTime <= endTime) {
          return '进行中'
        }
        if (curTime < startTime) {
          return '未开始'
        }
        if (curTime >= endTime) {
          return '已超时'
        }
      }
    },
    activityMonthFormat(startTime, endTime, text) {
      // 遍历活动数组 输出echart所需的数组
      let monthArr = ['', '', '', '', '', '', '', '', '', '', '', '']
      let startMonth = new Date(startTime).getMonth()
      let endMonth = new Date(endTime).getMonth()
      monthArr.forEach(function(item, index) {
        // 月份从0开始 索引亦然
        if (
          endMonth >= startMonth &&
          index >= startMonth &&
          index <= endMonth
        ) {
          monthArr[index] = text
        }
        if (
          endMonth < startMonth &&
          ((index >= 0 && index <= endMonth) ||
            (index <= 11 && index >= startMonth))
        ) {
          monthArr[index] = text
        }
      })
      return monthArr
    },
    activityEchartUpdate(list) {
      // 更新echart视图
      let actlist = list || this.activityList
      let ydata = []
      let seriesData = []

      actlist.forEach((item, index) => {
        ydata.push(item.activityName)
        let seriesObj = {
          // 按echart要求的格式 data中的字段要和ydata中的一致 name字段要和legend中的一致
          type: 'line',
          name: this.activityStatusFormat(
            item.activityStatus,
            item.startTime,
            item.offlineTime || item.endTime
          ),
          data: this.activityMonthFormat(
            item.startTime,
            item.offlineTime || item.endTime,
            item.activityName
          )
        }
        seriesData.push(seriesObj)
      })
      this.echartOption.yAxis.data = ydata
      this.echartOption.series = seriesData
    },
    activityPageChange(val) {
      this.searchActivityObj.pageNumber = val
      this.handleSearchActivity()
    },
    // 查询营销计划
    handleSearchMarket() {
      // 点击搜索营销计划
      this.marketLoading = true
      let reqParams = {
        pageNumber: this.searchMarketObj.pageNumber,
        pageSize: this.searchMarketObj.pageSize,
        planId: this.searchMarketObj.planId,
        planName: this.searchMarketObj.planName,
        creator: store.getters.userInfo.erp,
        activityId: this.searchMarketObj.activityId,
        prizeId: this.searchMarketObj.prizeId,
        merchantNo: this.searchMarketObj.merchantNo,
        createdDateFrom:
          Date.parse(
            this.searchMarketObj.createTime
              ? this.searchMarketObj.createTime[0]
              : ''
          ) || '',
        createdDateTo:
          Date.parse(
            this.searchMarketObj.createTime
              ? this.searchMarketObj.createTime[1]
              : ''
          ) || ''
      }

      allPlanSearchPlanList(reqParams)
        .then(res => {
          this.marketLoading = false
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          // 重新组装数据(活动状态)
          data.forEach((item, index) => {
            item.auditName = PLAN_STATUS[item.auditStatus]
          })
          this.marketList = data
          this.searchMarketObj.marketTotal = res.page ? res.page.totalRowCount : 0
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    async handleCheckMarketDetail(row) {
      // 查看营销计划详细
      this.$router.push({
        path: '/marketingPlanManage/planDetail',
        query: {
          planId: row.planId,
          auditStatus: row.auditStatus
        }
      })

      // TODO 测试通过id拿基本信息接口
      // let res = await allPlanCheckPlanById({planId: id})
      // if (res.code === '1') {
      //
      // } else {
      //
      // }
    },
    // 发起审批
    async launchApproval(id) {
      this.$confirm('确认发起审批', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          launchPlanApprove({ planId: id })
            .then(res => {
              if (res.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.handleSearchMarket() // 更新列表
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(() => {
              this.$message.error('发起审批失败')
            })
        })
        .catch(() => {})
    },
    handleDeleteMarket(id) {
      // 删除营销计划
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          allPlanDeletePlan({ planId: id })
            .then(res => {
              if (res.code === '1') {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.handleSearchMarket() // 更新列表
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
    searchAllDept() {
      let reqParams = {}
      let target = {}
      searchAllDept(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.searchActivityObj.departmentsOptions = []
          data.forEach((item, index) => {
            target = {}
            target.value = item.dptId + ''
            target.label = item.firstLevDptName + '-' + item.secondLevDptName
            this.searchActivityObj.departmentsOptions.push(target)
          })
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    pageChange(val) {
      this.searchMarketObj.pageNumber = val
      this.handleSearchMarket()
    }
  }
}
</script>

<style lang="scss">
.all-plan-section {
  display: flex;
  // padding: 0 0 50px 0;
  .el-tabs__content {
    padding: 25px;
    border-radius: 4px;
    background: #fff;
  }
  &::after {
    content: '';
    display: block;
    clear: both;
  }

  .content-body1 {
    margin: 20px 0 0 0;
    overflow: hidden;

    .input-item1 {
      overflow: hidden;
      margin: 0 0 20px 0;
      .label {
        float: left;
        min-width: 150px;
        line-height: 32px;
        text-align: right;
      }
      .el-select {
        float: left;
        width: 150px;
      }
      .el-input {
        float: left;
        width: 150px;
      }
      .el-button {
        float: left;
        /*width: 150px;*/
        margin: 0 0 0 240px;
      }
    }

    .total-activity-pandect {
      width: 80%;
      height: 220px;
      padding: 10px;
      margin-bottom: 40px;
      overflow-y: hidden;
      overflow-x: scroll;
      white-space: nowrap;
      /*background-color: #fff;*/
      .totalActivityListNone {
        height: 100%;
        line-height: 135px;
        text-align: center;
        color: #666;
        font-size: 24px;
      }
      .pandect-item {
        display: inline-block;
        width: 150px;
        height: 200px;
        background-color: #fff;
        text-align: center;
        margin: 0 15px 0 0;
        box-shadow: 1px 2px 15px #ddd;
        border-radius: 4px;
        .pandect-item-header {
          height: 100px;
          font-size: 42px;
          line-height: 150px;
          color: #333;
        }
        .pandect-item-body {
          height: 100px;
          font-size: 16px;
          line-height: 100px;
          color: #333;
        }
      }
    }

    .activity-pandect {
      /*width: 1000px;*/
      /*margin: 0 auto;*/
    }


  }

  .echarts {
    margin: 40px auto 15px;
    width: 100%;
    height: 300px;
    /*background-color: #fff;*/
  }

  .plan-content {
    padding: 10px 0 0 0;
  }
  .el-date-editor .el-range-separator {
    width: 25px;
  }
}
</style>
