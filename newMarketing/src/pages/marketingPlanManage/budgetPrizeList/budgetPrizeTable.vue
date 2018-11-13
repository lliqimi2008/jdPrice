<template>
  <div class="budget-prize-table">
    <div class="pub-sm-title">
      <el-row>
        <el-button size="mini" @click="toAddPrize" v-hasPermissions="'marketingPlanManage:planDetail:addPrize'">新增</el-button>
        <el-button size="mini" @click="showInventoryData" v-hasPermissions="'marketingPlanManage:planDetail:showInventory'">查看库存</el-button>
        <el-button size="mini" @click="delPrize" v-hasPermissions="'marketingPlanManage:planDetail:delPrize'">删除</el-button>
        <el-button size="mini" @click="enableAndDisable" v-hasPermissions="'marketingPlanManage:planDetail:EDisablePrize'">启用/停用</el-button>
        <el-button size="mini" @click="generateCouponCode" v-hasPermissions="'marketingPlanManage:planDetail:generateCouponCode'" :disabled="clickCreateCoupons">生成券码</el-button>
        <el-button size="mini" @click="couponCodeDownLoad" v-hasPermissions="'marketingPlanManage:planDetail:couponDownLoad'">券码下载</el-button>
      </el-row>
    </div>
    <!-- 奖品列表 -->
    <div class="table-content" style="margin-bottom: 5px;">
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        ref="multipleTable"
        :data="prizeListData"
        stripe
        border
        tooltip-effect="dark"
        style="width: 100%">
        <!-- <el-table-column
          type="selection"
          width="55"
          :selectable="checkSelectable">
        </el-table-column> -->
        <el-table-column
          label="选择"
          width="55">
          <template slot-scope="scope">
            <el-radio class="radio" v-model="radio" :label="scope.$index" @change.native="getCurrentRow(scope.row)" >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          prop="prizeId"
          label="奖品ID"
          width="120">
          <template slot-scope="scope">
            <p style="color: #409EFF; cursor: pointer;"  @click="prizeDetail(scope.row)">{{ scope.row.prizeId }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="prizeName"
          label="奖品名称"
          width="120">
        </el-table-column>
        <el-table-column
          label="面额"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <p>{{ scope.row.amount === 0 ? '-' : scope.row.amount}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="total"
          label="总数量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="prizeType"
          label="类别"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="createdDate"
          label="创建时间"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.createdDate | formatDate('YYYY-MM-DD hh:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="modifier"
          label="修改人"
          show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column
          prop="rules"
          label="使用规则"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover
              placement="left-end"
              title="标题"
              width="200"
              trigger="hover"
              content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
              <span class="red" slot="reference">规则</span>
            </el-popover>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="auditStatus"
          label="流程"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="gray" v-if="scope.row.auditStatus === '编辑中'">编辑中</span>
            <span class="blue" v-if="scope.row.auditStatus === '待审核'">待审核</span>
            <span class="warning" v-if="scope.row.auditStatus === '审批打回'">审批打回</span>
            <span class="green" v-if="scope.row.auditStatus === '审核通过'">审核通过</span>
            <span class="red" v-if="scope.row.auditStatus === '审核不通过'">审核不通过</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span class="green" v-if="scope.row.status === '启用'">启用</span>
            <span class="red" v-else>停用</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" v-if="pageData.totalRowCount">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="1"
          layout="total, prev, pager, next"
          background
          :page-size="10"
          :total="pageData.totalRowCount">
        </el-pagination>
      </div>
    </div>

    <!-- 生成兑换码弹层 -->
    <div class="app-dialog">
      <el-dialog title="生成兑换码" :visible.sync="dialogTableVisible">
        <el-form class="app-dialog-form" :rules="rules" label-position="right" label-width="90px" ref='formLabelAlign' :model="formLabelAlign" size="small">
          <el-form-item label="奖品ID:">
            <el-input v-model="formLabelAlign.prizeId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="活动ID:" prop="activityId">
            <el-input v-model="formLabelAlign.activityId" placeholder="用于数据统计，请尽量填写"></el-input>
          </el-form-item>
          <el-form-item label="生成数量:" prop="numberPrize">
            <el-input v-model="formLabelAlign.numberPrize"></el-input>
          </el-form-item>
          <el-form-item label="有效时间" prop="valueFixedTime">
            <el-date-picker
            style="width:100%"
            v-model="formLabelAlign.valueFixedTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            @change="logTimeChange"
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

    <!-- 查看库存 -->
    <div class="app-dialog">
      <el-dialog title="查看库存" :visible.sync="isShowInventory">
        <el-table
          :data="inventoryData"
          stripe
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            prop="prizeId"
            label="奖品ID"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="remainingInventory"
            label="剩余可用库存"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="useAmount"
            label="被占用库存"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>

      </el-dialog>
    </div>

  </div>
</template>

<script>
import {
  deleteBudgetPrize,
  queryPrizeInventory,
  enablePrize,
  disablePrize,
  couponsIsGetstock, // 查询奖品券的可用库存
  couponsIsGeneratePrize // 生成奖品兑换码
} from 'api/service'
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    // 预算编码
    budgetCode: {
      type: [String, Number],
      default: ''
    },
    // 预算ID
    budgetId: {
      type: [String, Number],
      default: ''
    },
    // 预算阈值
    thresholdAlarm: {
      type: [String, Number],
      default: ''
    },
    // 账户主体
    settleConfigId: {
      type: [String, Number],
      default: ''
    },
    // 奖品列表数据
    prizeListData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 分页数据
    pageData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      clickCreateCoupons: true,
      numberPrizeAll: '',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },  
      radio: '',
      multipleSelection: {},
      // 显示库存弹窗
      isShowInventory: false,
      // 存库数据
      inventoryData: [],
      // 导出券码变量显示/隐藏
      dialogTableVisible: false,
      // 导出券码弹窗
      formLabelAlign: {
        numberPrize: '',
        activityId: '',
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
  watch: {
    prizeListData() {
      // 清除选中状态
      this.radio = ''
      // 清空选择的数据，否则会出现缓存
      this.multipleSelection = {}
      // 检测数据信息
      this.clickCreateCoupons = true
    }
  },
  methods: {
    logTimeChange(val) {
      this.formLabelAlign.valueFixedTime = val
    },
    // 生成券码弹框
    generateCouponCode() {
      if (!this.multipleSelection.prizeId) {
        // 请选择想要查看库存的奖品
        return this.$message({ message: '请选择想要生成券码的奖品' })
      }
      let params = {
        prizeId: this.multipleSelection.prizeId
      }
      couponsIsGetstock(params)
        .then(res => {
          this.dialogTableVisible = true
          // 弹层时间清空
          this.formLabelAlign.valueFixedTime = []
          this.formLabelAlign.activityId = ''
          if (!this.httpThen(this, res)) return
          let data = res.data || []
          this.formLabelAlign.prizeId = this.multipleSelection.prizeId
          this.formLabelAlign.numberPrize = data.stock
          this.numberPrizeAll = data.stock
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 券码生成确定
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
              planId: this.$route.query.planId,
              prizeId: this.multipleSelection.prizeId,
              activityId: this.formLabelAlign.activityId,
              num: this.formLabelAlign.numberPrize,
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
                // 生成成功后请求当前页数据
                this.$emit('changePrizePage', this.pageData.pageNo)
              })
              .catch(err => {
                this.httpCatch(this, err)
              })
          }
        })
    },
    // 券码下载
    couponCodeDownLoad() {
      this.$router.push({
        path: '/marketingPlanManage/creatCouponsDownLoad',
        query: {
          budgetCode: this.budgetCode,
          budgetId: this.budgetId,
          thresholdAlarm: this.thresholdAlarm,
          planId: this.$route.query.planId,
          settleConfigId: this.settleConfigId
        }
      })
    },
    toAddPrize() {
      this.$router.push({
        path: '/marketingPlanManage/CreateBudgetHome',
        query: {
          budgetCode: this.budgetCode,
          budgetId: this.budgetId,
          thresholdAlarm: this.thresholdAlarm,
          planId: this.$route.query.planId,
          settleConfigId: this.settleConfigId
        }
      })
    },
    delPrize() {
      if (!this.multipleSelection.prizeId) {
        // 请选择想要删除的奖品
        return this.$message({ message: '请选择想要删除的奖品' })
      } else if (this.multipleSelection.auditStatus !== '编辑中') {
        return this.$message({ message: '请选择"编辑中"的数据进行删除' })
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 调用删除接口
          let reqParams = {
            prizeId: this.multipleSelection.prizeId
          }
          deleteBudgetPrize(reqParams)
            .then(res => {
              if (!this.httpThen(this, res)) return
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              // 删除成功后请求当前页数据
              this.$emit('changePrizePage', this.pageData.pageNo)
            })
            .catch((err) => {
              this.httpCatch(this, err)
            })
        })
        .catch(() => {})
    },
    editPrize(row) {
      let path = ''
      let type = 1
      if (row.needActivate === true) {
        // 激活优惠券
        type = 2
        path = '/marketingPlanManage/createCoupons'
      } else if (row.prizeCategory === 'COUPON') {
        path = '/marketingPlanManage/createCoupons'
      } else if (row.prizeCategory === 'REDUCTION') {
        // 目前type: 0 暂时没用
        type = 0
        path = '/marketingPlanManage/CreatePayReduce'
      }

      this.$router.push({
        path: path,
        query: {
          prizeId: row.prizeId,
          planId: this.$route.query.planId,
          code: this.budgetCode,
          // type用于区分通用优惠券和激活优惠券
          type: type,
          settleConfigId: this.settleConfigId
        }
      })
    },
    prizeDetail(row) {
      let path = ''
      let type = 1
      if (row.needActivate === true) {
        // 激活优惠券
        type = 2
        path = '/marketingPlanManage/CouponDeatil'
      } else if (row.prizeCategory === 'COUPON') {
        path = '/marketingPlanManage/CouponDeatil'
      } else if (row.prizeCategory === 'REDUCTION') {
        // 目前type: 0 暂时没用
        type = 0
        path = '/marketingPlanManage/PayReduceDeatil'
      }

      this.$router.push({
        path: path,
        query: {
          prizeId: row.prizeId,
          planId: this.$route.query.planId,
          code: this.budgetCode,
          // type用于区分通用优惠券和激活优惠券
          type: type,
          settleConfigId: this.settleConfigId
        }
      })
    },
    // 查看库存
    showInventoryData() {
      if (!this.multipleSelection.prizeId) {
        // 请选择想要查看库存的奖品
        return this.$message({ message: '请选择想要查看库存的奖品' })
      }
      // 调用查看库存接口
      let reqParams = {
        prizeId: this.multipleSelection.prizeId
      }
      queryPrizeInventory(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          this.isShowInventory = true
          this.inventoryData = [
            {
              prizeId: this.multipleSelection.prizeId,
              remainingInventory: data.stock,
              useAmount: this.multipleSelection.total - data.stock
            }
          ]
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 启用/停用功能
    enableAndDisable() {
      if (!this.multipleSelection.prizeId) {
        // 请选择想要操作的奖品
        return this.$message({ message: '请选择想要操作的奖品' })
      }

      let reqParams = {
        prizeId: this.multipleSelection.prizeId
      }
      if (this.multipleSelection.status === '启用') {
        disablePrize(reqParams)
          .then(res => {
            if (!this.httpThen(this, res)) return
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.$emit('changePrizePage', this.pageData.pageNo)
          })
          .catch((err) => {
            this.httpCatch(this, err)
          })
      } else if (this.multipleSelection.status === '停用') {
        enablePrize(reqParams)
          .then(res => {
            if (!this.httpThen(this, res)) return
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.$emit('changePrizePage', this.pageData.pageNo)
          })
          .catch((err) => {
            this.httpCatch(this, err)
          })
      }
    },
    // 获取当前选中的行数据
    getCurrentRow(val) {
      this.multipleSelection = val
      let prizeIdStr = this.multipleSelection.prizeId.toString().charAt(0)
      if (prizeIdStr === '1') {
        this.clickCreateCoupons = false
      } else {
        this.clickCreateCoupons = true
      }
    },
    // checkSelectable(row, index) {
    //   return true
    // },
    handleCurrentChange(pageNumber) {
      this.$emit('changePrizePage', pageNumber)
    }
  }
}
</script>

<style>
</style>
