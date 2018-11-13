<template>
  <section class="all-plan-section">
    <el-tabs style="width:100%">
    <div class="pub-sm-title clear">
      <h3 class="fl">券码下载</h3>
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
          prop="prizeId"
          label="奖品ID"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="prizeName"
          label="奖品名称">
        </el-table-column>
        <el-table-column
          label="面额"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <p>{{ scope.row.prizeAmount === '0.00' ? '-' : scope.row.prizeAmount}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="genNum"
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
          label="创建时间">
          <template slot-scope="scope">
            <p>{{ scope.row.createdDate | formatDate('YYYY-MM-DD hh:mm:ss') }}</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="againGenerate(scope.row)"
              v-if="scope.row.status === '生成失败'"
            >重新生成</el-button>
            <el-button
              size="mini"
              type="text"
              @click="downLoadData(scope.row)"
              v-if="scope.row.status === '生成成功'"
              >下载</el-button>
            <el-button
              size="mini"
              type="text"
              disabled
              v-if="scope.row.status === '已下载'"
              >已下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 生成兑换码弹层 -->
    <div class="app-dialog">
      <el-dialog title="生成兑换码" :visible.sync="dialogTableVisible">
        <el-form class="app-dialog-form" :rules="rules" label-position="right" label-width="90px" ref='formLabelAlign' :model="formLabelAlign" size="small">
          <el-form-item label="奖品ID:">
            <el-input v-model="formLabelAlign.prizeId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="生成数量:" prop="numberPrize">
            <el-input v-model="formLabelAlign.numberPrize"></el-input>
          </el-form-item>
          <el-form-item label="有效时间" prop="valueFixedTime">
            <el-date-picker
            style="width:100%"
            v-model="formLabelAlign.valueFixedTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions0">
            </el-date-picker>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="couponCodeSave('formLabelAlign')">确定</el-button>
            <el-button @click="dialogTableVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!--<div class="pagination" v-if="searchMarketObj.marketTotal">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        @current-change="pageChange"
        :current-page="searchMarketObj.pageNumber"
        :total="searchMarketObj.marketTotal">
      </el-pagination>
    </div>-->
    </el-tabs>
  </section>
</template>

<script>
import {
  COUPONS_STATUS
} from 'common/config'
import {
  couponsIsQueryCdKey,
  // couponsIsDownLoad,
  couponsIsGetstock,
  couponsIsGeneratePrize
} from 'api/service'
import { BASE_URL } from 'api/index'
export default {
  name: 'createCouponsDownLoad',
  data () {
    return {
      // 分页数据
      // searchMarketObj: {
      // pageNumber: 1,
      // pageSize: 10,
      // marketTotal: 0
      // },
      valEs: {},
      dialogTableVisible: false,
      numberPrizeAll: '',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },  
      marketLoading: false,
      marketList: [],
      // 导出券码弹窗
      formLabelAlign: {
        numberPrize: '',
        valueFixedTime: [], // 有效时间
        prizeId: '',
        id: ''
      },
      rules: {
        valueFixedTime: [
          { required: true, message: '请选择有效时间', trigger: 'blur' }
        ],
        numberPrize: [
          { required: true,
            validator: (rule, value, callback) => {
              if ((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) === false || value === '') {
                callback(new Error('请正确填写需要生成数量'))
              } else {
                callback()
              }
            },
            trigger: 'blur' }
        ]
      }
    }
  },
  activated() {
    this.searchCreateDownloadData()
  },
  methods: {
    // 查询券码列表信息
    searchCreateDownloadData() {
      let params = {
        // pageNumber: this.searchMarketObj.pageNumber,
        // pageSize: 10
        planId: this.$route.query.planId
      }
      couponsIsQueryCdKey(params)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          data.forEach((item, index) => {
            item.status = COUPONS_STATUS[item.status]
          })
          this.marketList = data
          // this.searchMarketObj.marketTotal = res.page ? res.page.totalRowCount : 0
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 券码下载
    downLoadData(e) {
      window.open(BASE_URL + '/rest/cdkey/prize/downloadCdkey?prizeId=' + e.prizeId + '&batchNo=' + e.batchNo + '&planId=' + e.planId)
      this.$router.go(0)
    },
    // 重新生成券码弹框
    againGenerate(e) {
      let params = {
        prizeId: e.prizeId
      }
      couponsIsGetstock(params)
        .then(res => {
          this.valEs = e
          this.dialogTableVisible = true
          // 弹层时间清空
          this.formLabelAlign.valueFixedTime = []
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.formLabelAlign.prizeId = e.prizeId
          this.formLabelAlign.numberPrize = data.stock
          this.numberPrizeAll = data.stock
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 券码重新生成确定
    couponCodeSave(form) {
      if (Number(this.formLabelAlign.numberPrize) > Number(this.numberPrizeAll)) {
        return this.$message({
          message: '您填写的券码生成数量不能大于可生成的总数量',
          type: 'warning'
        })
      }
      this.$refs[form] &&
        this.$refs[form].validate((valid) => {
          if (!valid) {
            return false
          } else {
            let params = {
              planId: this.valEs.planId,
              prizeId: this.valEs.prizeId,
              num: this.formLabelAlign.numberPrize,
              batchNo: this.valEs.batchNo,
              beginDate: this.formLabelAlign.valueFixedTime[0],
              endTDate: this.formLabelAlign.valueFixedTime[1]
            }
            couponsIsGeneratePrize(params)
              .then(res => {
                if (!this.httpThen(this, res)) return
                this.$message({
                  message: '券码生成成功',
                  type: 'success'
                })
                this.dialogTableVisible = false
                this.searchCreateDownloadData()
              })
              .catch(err => {
                this.httpCatch(this, err)
              })
          }
        })
    }
    // pageChange(val) {
    // this.searchMarketObj.pageNumber = val
    // this.searchCreateDownloadData()
    // }
  }
  
}
</script>

<style lang="scss" scoped="scoped">
  .market-content {
    width: 100%;
  }
</style>
