<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">兑换码查询</h3>
    </div>

    <div class="table-content">

      <el-form
        :label-position="'right'"
        label-width="120px"
        size="small"
        ref="searchForm"
        :model="searchForm" :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item label="兑换码：" prop="prizeCode">
              <el-input placeholder="" v-model="searchForm.prizeCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="券分类：">
              <el-select class="select100" v-model="searchForm.type">
                <el-option label="活动" value="activity"></el-option>
                <el-option label="支付券" value="zhi"></el-option>
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

      <template>
        <el-table
          v-loading="marketLoading"
          element-loading-text="拼命加载中"
          :data="tableData"
          highlight-current-row
          border
          style="width: 100%" v-show="prizeQueryVisible">
          <el-table-column
            prop="prizeId"
            label="奖品ID"
            width="100">
          </el-table-column>
          <el-table-column
            prop="activityId"
            label="活动ID">
          </el-table-column>
          <el-table-column
            prop="exchangeDate"
            label="兑换时间">
            <template slot-scope="scope">
              <p>{{ scope.row.exchangeDate | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="pin"
            label="pin">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="useDate"
            label="使用时间">
            <template slot-scope="scope">
              <p>{{ scope.row.useDate | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="merchantNo"
            label="商户单号">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
        </el-table>

        <el-table
          v-loading="marketLoading"
          element-loading-text="拼命加载中"
          highlight-current-row
          :data="activityTableData"
          border
          style="width: 100%" v-show="activityQueryVisible">
          <el-table-column
            prop="activityId"
            label="活动ID">
          </el-table-column>
          <el-table-column
            label="兑换时间" width="200px">
            <template slot-scope="scope">
              <p>{{ scope.row.claimTime | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
            </template>
          </el-table-column>

          <el-table-column
            prop="pin"
            label="pin">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态" :formatter="activityTypeTrans">
          </el-table-column>
        </el-table>
      </template>
    </div>
    </el-tabs>
  </section>
</template>

<script>
import {
  operationCodeList,
  operationActivityCodeList
} from 'api/service'

export default {
  name: 'prizeFind',
  data () {
    return {
      marketLoading: false,
      searchForm: {
        prizeCode: '',
        type: 'zhi'
      },
      tableData: [],
      activityTableData: [],
      prizeQueryVisible: false,
      activityQueryVisible: false,
      rules: {
        prizeCode: [
          { required: true, message: '兑换码必填', trigger: 'blur' }
        ]
      },
      activitytatus: {
        'NOTACTIVE': '券码未生效',
        'NOREDEEM': '未兑奖',
        'REDEEM': '已兑奖',
        'INVALID': '已作废'
      }
    }
  },
  activated() {
    this.searchForm.prizeCode = ''
    this.searchForm.type = 'zhi'
  },
  methods: {
    handleSearchMarket() {
      this.$refs['searchForm'].validate((valid) => {
        if (valid) {
          let reqParams = {
            cdKey: this.searchForm.prizeCode
          }
          this.tableData = []
          this.activityTableData = []
          this.prizeQueryVisible = false
          this.activityQueryVisible = false
          if (this.searchForm.type === 'zhi') {
            this.prizeQueryVisible = true
            operationCodeList(reqParams).then(res => {
              let data = res.dto || []
              this.tableData.push(data)
            })
              .catch(err => {
                this.httpCatch(this, err)
              })
          } else {
            this.activityQueryVisible = true
            operationActivityCodeList(reqParams).then(res => {
              let data = res.data || []
              this.activityTableData.push(data)
            })
              .catch(err => {
                this.httpCatch(this, err)
              })
          }
        }
        return false
      })
    },
    activityTypeTrans(row, column) {
      return this.activitytatus[row.status]
    }
  }
}
</script>

<style lang="scss">
 
</style>
