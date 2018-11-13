<template>
  <div class="plan-detail">
    <div class="pub-sm-title clear" v-if="bpmType == 1">
      <h3 class="fl">活动审批</h3>
    </div>
    <div class="radios" v-if="bpmType == 1">
      <el-row>
        <el-col :span="24">
          <el-radio v-model="radio" label="true">审批通过</el-radio>
          <el-radio v-model="radio" label="false">审批不通过</el-radio>
        </el-col>
        <el-col class="topPad" :span="20">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea">
          </el-input>
        </el-col>
        <el-col class="topPad" :span="5">
          <el-button type="primary" size="small" @click="taskComplete">提交</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="pub-sm-title clear">
      <h3 class="fl">审批记录</h3>
    </div>
    <div class="table-content">
      <el-table
        :data="marketList"
        border
        stripe
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="processName"
          label="流程名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="taskName"
          label="当前节点"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="approvedStatus"
          label="审批状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="comment"
          label="审批意见"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="assignee"
          label="操作人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createdDate"
          label="操作时间"
          width="170"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.endTime | formatDate('YYYY-MM-DD hh:mm:ss') }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="activity-detail">
    <!-- 为了可维护性，根据不同活动类型渲染不同活动详情模板 -->
    <component :is="detailTemplate" :data="detailData" @editActivity="editActivity"></component>
    <!-- 奖项信息 -->
    <div class="pub-sm-title clear" slot="header">
      <h3 class="fl">奖项信息</h3>
    </div>
    <prize-info-detail :awardsData="awardsDtos" :limitData="limitData"></prize-info-detail>
  </div>
  </div>
</template>

<script>
import { awardsMixins } from 'common/awards.mixins'
import prizeInfoDetail from 'components/prizeInfo/prizeInfoDetailactiv'
import detailsObj from './activityCenterApproval/detailTemplate/details'
import {
  approveTaskDeal,
  approveTaskComplete,
  searchProcessByInstanceId
} from 'api/service'
export default {
  name: 'activityDetail',
  mixins: [awardsMixins],
  components: {
    prizeInfoDetail,
    detailsObj
  },
  data() {
    return {
      // 办理任务
      marketList: [],
      radio: 'true',
      textarea: '',
      detailData: {},
      detailTemplate: null,
      activityTableLoading: false,
      bpmType: ''
    }
  },
  activated() {
    this.init()
    this.getAwardsInfo()
    this.appenSeachs()
  },
  methods: {
    appenSeachs() {
      this.bpmType = this.$route.query.bpmType
      if (this.bpmType === '1') {
        this.appenUyiver()
      } else if (this.bpmType === '2') {
        this.searchProcessByInstanceId()
      }
    },
    // 查询审批结果方法
    appenUyiver() {
      let reqParams = {
        taskId: this.$route.query.id
      }
      approveTaskDeal(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data.approvedHistoryModels || []
          this.marketList = data
        }).catch((err) => {
          this.httpCatch(this, err)
        })
      // this.dialogFormVisible = false
    },
    // 查询审批结果方法
    searchProcessByInstanceId() {
      let reqParams = {
        processInstanceId: this.$route.query.id
      }
      searchProcessByInstanceId(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data.approvedHistoryModels || []
          this.marketList = data
        }).catch((err) => {
          this.httpCatch(this, err)
        })
      // this.dialogFormVisible = false
    },
    // 审批提交approveTaskComplete
    taskComplete() {
      let reqParams = {
        taskId: this.$route.query.id,
        parameterMap: {
          approved: [this.radio],
          comment: [this.textarea]
        }
      }
      approveTaskComplete(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let pathObj = {
            path: '/marketingApproveManage/approveList'
          }
          this.$router.push(pathObj)
        }).catch((err) => {
          this.httpCatch(this, err)
        })
    },
    init() {
      // 筛选详情模板
      this.detailTemplate = detailsObj['noCouponDetail']
      console.log(this.detailTemplate)
    },
    // 编辑活动
    editActivity() {
      // 区分活动类型
      let activityTypes = {
        // 无券活动
        '0': '/marketingPlanManage/createNoCouponActivity',
        // 外部调用发奖
        '1': '/marketingPlanManage/createExtraActivityAddPrize',
        // 链接领奖活动
        '2': '/marketingPlanManage/createLinkPrizeActivity'
      }
      this.$router.push({
        path: activityTypes[this.$route.query.type],
        query: {
          planId: this.$route.query.planId,
          activityId: this.$route.query.taskId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
.project-goals {
  background: #fff;
  padding: 20px 30px 0;
}
.plan-detail {
  width: 100%;
  .el-row {
    line-height: 30px;
  }
}
.detail-head {
  margin-bottom: 15px;
  .edit-btn{
    right: 15px;
    top: 15px;
    z-index: 1;
  }
}
.counts-list {
  margin-bottom: 10px;
}
.app-dialog {
}
.app-dialog-form {
  // .el-form-item__label{
  //   width: 90px !important;
  // }
  // .el-form-item__content{
  //   margin-left: 90px !important;
  // }
  .el-dialog__body {
    padding: 10px;
  }
  // .el-form-item {
  //   margin-bottom: 10px;
  // }
}
.detail-flex{
  // display: flex;
  width: 100%;
  .list li{
    white-space: nowrap;
    span {
      margin-right: 10px;
    }
  }
  .icon{
    padding: 0;
    font-size: 16px;
  }
  .key{
    float: left;
    width: 100px;
    // flex: none;
  }
  .val{
    flex: 1;
  }
  .value span {
    float: left;
  }
  .text{
    display: block;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 95%;
  }
}
.single-text {
  // display: block;
  // overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
  // span{
  //   word-break: break-all;
  // }
  word-break: break-all;
  height: 24px;
  overflow: hidden;
  padding-right: 10px;
}
.el-popover--plain{
  word-break: break-all;
}
.tableOnesbak{ background-color: #fff; border: none; width: 100%;}
  .tableOnesbak tr th,.tableOnesbak tr td { border-bottom: 1px solid #eee; vertical-align: middle; line-height: 23px; padding: 6px 0; }
  .tableOnesbak tr th { color: #909399;}
  .tableOnesbak tr td{ color:#606266; text-align: center; border-right: 1px solid #eee;}
  .tableOnesbak tr td:last-child{ border-right: none;}
  .tableOnesbak tbody tr:hover{ background-color: #f4f4f4;}
  .pub-sm-title h3 {
    margin-top: 10px
  }
  .radios {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
  }

  .topPad {
    padding-top: 10px
  }

  .detail-head .el-row {
    line-height: 30px;
  }

  .el-input {
    width: auto;
  }
  .table_tops{
    margin-top: 10px;
  }
</style>
