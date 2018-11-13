<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">流程实例</h3>
    </div>
    <div class="table-content">
      <el-form
        :label-position="'right'"
        label-width="120px"
        size="small"
        ref="searchForm"
        :model="searchForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="ID：" prop="planUserId">
              <el-input @input="changeValue" placeholder="" v-model="searchForm.id" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务Key：" prop="planUserKey">
              <el-input @input="changeValue" placeholder="" v-model="searchForm.businessKey" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="发起人：" prop="planName">
              <el-input @input="changeValue" placeholder="" v-model="searchForm.startUserId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="流程定义：" prop="definitionName">
              <el-input @input="changeValue" placeholder="" v-model="searchForm.definitionName" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="开始时间：" prop="startTime">
              <el-date-picker
                class="select100"
                v-model="searchForm.startTime"
                @change="changeValue"
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
          <el-col :span="3" :offset="1">
              <el-button  size="small" type="primary" @click="searchSpecificData" v-hasPermissions="'marketingApproveManage:instance:searchInstance'">查询</el-button>
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
          fixed
          prop="id"
          label="ID"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="businessKey"
          label="业务key">
        </el-table-column>
        <el-table-column
          prop="processName"
          label="流程定义">
        </el-table-column>
        <el-table-column
          label="开始时间">
          <template slot-scope="scope">
            <p>{{ scope.row.startTime | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="结束时间">
          <template slot-scope="scope">
            <p>{{ scope.row.endTime | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="startUserId"
          label="发起人">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <p v-if="!scope.row.endTime">进行中</p>
            <p v-if="scope.row.endTime">已结束</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.row.endTime == null ? false : true"
              type="text"
              @click="handleViewActual(scope.row.id)" v-hasPermissions="'marketingApproveManage:instance:trackingInstance'">跟踪</el-button>
            <el-button
              size="mini"
              type="text"
              @click="showDetail(scope.row)" v-hasPermissions="'marketingApproveManage:bpmList:tracking'">详情</el-button>
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
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="70%"
       >
        <img :src="srcUrl" width="100%" />
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">返 回</el-button>
        </span>
      </el-dialog>
    </div>
    </el-tabs>
  </section>
</template>

<script>
import {
  superApproveBpmList,
  approveDiagramActual
} from 'api/service'

export default {
  name: 'processInstance',
  data () {
    return {
    // 分页数据
      searchMarketObj: {
        pageNumber: 1,
        pageSize: 10,
        marketTotal: 0
      },
      marketLoading: false,
      srcUrl: '',
      dialogVisible: false,
      marketList: [],
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
        id: '',
        businessKey: '',
        startUserId: '',
        definitionName: '',
        definitionBusinessKey: '',
        startTime: []
      }
    }
  },
  activated() {
    this.searchSpecificData()
  },
  methods: {
    // 流程跟踪 approveDiagramActual
    handleViewActual(id) {
      let reqParams = {
        processInstanceId: id
      }
      approveDiagramActual(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          this.srcUrl = 'data:image/png;base64,' + res.data
          this.dialogVisible = true
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    changeValue() {
      this.searchMarketObj.pageNumber = 1
    },
    searchSpecificData() {
      let params = {
        id: this.searchForm.id,
        businessKey: this.searchForm.businessKey,
        startUserId: this.searchForm.startUserId,
        definitionName: this.searchForm.definitionName,
        // definitionBusinessKey: this.searchForm.definitionBusinessKey,
        startTime:
          Date.parse(
            this.searchForm.startTime[0]
              ? this.searchForm.startTime[0]
              : ''
          ) || '',
        endTime:
          Date.parse(
            this.searchForm.startTime[1]
              ? this.searchForm.startTime[1]
              : ''
          ) || '',
        pageNumber: this.searchMarketObj.pageNumber,
        pageSize: 10
      }
      superApproveBpmList(params)
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
    async showDetail(row) {
      let pathObj = { }
      if (row.processDefinitionKey === 'plan_preOnline_process') {
        pathObj = {
          // 计划
          path: '/marketingApproveManage/marketingApproval',
          query: {
            planId: row.businessKey,
            id: row.id,
            bpmType: '2'
          }
        }
      }
      if (row.processDefinitionKey === 'activity_online_process') {
        pathObj = {
          // 活动
          path: '/marketingApproveManage/examinationApproval',
          query: {
            activityId: row.businessKey,
            id: row.id,
            bpmType: '2'
          }
        }
      }
      this.$router.push(pathObj)
    },
    pageChange(val) {
      this.searchMarketObj.pageNumber = val
      this.searchSpecificData()
    }
  }
}
</script>
<style lang="scss" scoped="scoped">

</style>
