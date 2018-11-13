<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">审批待办</h3>
    </div>
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
          prop="id"
          label="ID"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="name"
          label="任务名称">
        </el-table-column>
        <el-table-column
          prop="businessKey"
          label="业务key">
        </el-table-column>
        <el-table-column
          prop="processDefinitionName"
          label="流程定义">
        </el-table-column>
        <el-table-column
          label="任务创建时间">
          <template slot-scope="scope">
            <p>{{ scope.row.createTime | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="assignee"
          label="办理人">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleViewActual(scope.row.processInstanceId)" v-hasPermissions="'marketingApproveManage:approveList:tracking'">跟踪</el-button>
            <el-button
              size="mini"
              v-show="scope.row.assignee === ''"
              type="text"
              @click="approveTaskClaimView(scope.row.id)" v-hasPermissions="'marketingApproveManage:approveList:receiving'">签收</el-button>
            <el-button
              size="mini"
              v-show="scope.row.assignee !== ''"
              type="text"
              @click="handleOperate(scope.row)" v-hasPermissions="'marketingApproveManage:approveList:toHandle'">办理</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="70%"
       >
        <img :src="srcUrl" width="100%"/>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    </el-tabs>
  </section>
</template>

<script>
import {
  approveSearchList,
  approveTaskClaim,
  approveDiagramActual
} from 'api/service'

export default {
  name: 'approveList',
  data () {
    return {
      marketLoading: false,
      dialogVisible: false,
      marketList: [],
      srcUrl: '',
      pathID: ''
    }
  },
  activated() {
    this.searchListData()
  },
  methods: {
    searchListData() {
      approveSearchList().then(res => {
        this.marketLoading = false
        if (!this.httpThen(this, res)) return
        let data = res.data || []
        data.forEach((item, index) => {
          item.assignee = item.assignee === 'null' ? '' : item.assignee
        })
        this.marketList = data
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    approveTaskClaimView(taskId) {
      let params = {
        taskId: taskId
      }
      approveTaskClaim(params).then(res => {
        if (!this.httpThen(this, res)) return
        this.searchListData()
      })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 流程跟踪 approveDiagramActual
    handleViewActual(processInstanceId) {
      let reqParams = {
        processInstanceId: processInstanceId
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
    async handleOperate(row) {
      let pathObj = { }
      if (row.processDefinitionKey === 'plan_preOnline_process') {
        pathObj = {
          // 计划
          path: '/marketingApproveManage/marketingApproval',
          query: {
            planId: row.businessKey,
            id: row.id,
            bpmType: '1'
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
            bpmType: '1'
          }
        }
      }
      this.$router.push(pathObj)
      console.log(this.$router)
    },
    pageChange(val) {
      this.searchForm.pageNumber = val
      this.searchListData()
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
</style>
