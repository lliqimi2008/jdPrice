<template>
  <el-table
    :data="cdkeyRecordList"
    stripe
    border
    style="width: 100%">
    <el-table-column
      prop="activityId"
      label="活动ID"
      width="180">
    </el-table-column>

    <el-table-column
      prop="activityName"
      label="活动名称"
      width="180">
    </el-table-column>

    <el-table-column
      prop="totalNum"
      label="生成数量">
    </el-table-column>

    <el-table-column
      prop="batchNo"
      label="批次号">
    </el-table-column>

    <el-table-column
      prop="status"
      label="生成状态">
    </el-table-column>

    <el-table-column
      prop="creator"
      label="创建人">
    </el-table-column>

    <el-table-column
      prop="createDate"
      label="创建时间">
      <template slot-scope="scope">
        {{ scope.row.createdDate | formatDate('YYYY-MM-DD hh:mm:ss') }}
      </template>
    </el-table-column>

    <el-table-column
      prop="operateStatus"
      label="操作">
      <template slot-scope="scope">
        <el-button v-if="scope.row.operateStatus === 'DL' ? true : false" @click="downloadCdkey(scope.row.activityId,scope.row.batchNo)"  type="text" size="small">下载</el-button>
        <el-button v-if="scope.row.operateStatus === 'DA' ? true : false" @click="downloadCdkey(scope.row.activityId,scope.row.batchNo)" type="text" size="small">已下载</el-button>
        <el-button v-if="scope.row.operateStatus === 'GA' ? true : false" @click="reGenerateCdkey(scope.row.activityId,scope.row.batchNo,scope.row.totalNum)" type="text" size="small">重新生成</el-button>
      </template>
    </el-table-column>


  </el-table>
</template>

<script>
import {
  getCdkeyRecordDataList,
  createCdkey
} from 'api/service'

import { BASE_URL } from 'api/index'

export default {
  name: 'downloadCdkey',
  data() {
    return {
      cdkeyRecordList: []
    }
  },
  methods: {
    getCdkeyRecordData() {
      let reqParams = {
        planId: this.$route.query.planId
      }
      getCdkeyRecordDataList(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.cdkeyRecordList = data
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    downloadCdkey(activityId, batchNo) {
      window.location = (BASE_URL + '/rest/cdkey/downloadCdkey?activityId=' + activityId + '&batchNo=' + batchNo)
      // this.getCdkeyRecordData()
    },
    reGenerateCdkey(activityId, batchNo, totalNum) {
      let reqParams = {
        activityId: activityId,
        num: totalNum,
        batchNo: batchNo
      }
      createCdkey(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          this.$message({
            message: '创建成功',
            type: 'success'
          })
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    }
  },
  activated() {
    this.getCdkeyRecordData()
  }

}
</script>

<style scoped>

</style>
