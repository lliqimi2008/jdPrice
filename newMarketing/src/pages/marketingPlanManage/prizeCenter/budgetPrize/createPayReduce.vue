<template>
    <section class="budget-prize2">
      <div class="content-header">
        <span>支付立减配置</span>
      </div>
      <el-form class="app-form-panel" label-width="130px" size="small" :model="payReduceForm" :rules="payReduceRules" ref="payReduce">
        <el-form-item label="名额数量：" prop="count">
          <el-input
            v-model="payReduceForm.count"
            placeholder="必填，1-1000000之间"
            clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="类别：" prop="type">
          <el-select class="select100" placeholder="请选择" v-model="payReduceForm.type" @change="typeChange">
            <el-option
              v-for="item in payReduceForm.types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <template v-if="payReduceForm.type == 'SATISFY'">
          <el-form-item label="奖品面值：" prop="reductionMoney">
            <el-input
              v-model="payReduceForm.reductionMoney"
              placeholder="0.00"
              clearable>
            </el-input>
          </el-form-item>
        </template>

        <template v-if="payReduceForm.type == 'DISCOUNT'">
          <el-form-item label="折扣：" prop="discount">
            <el-input
              v-model="payReduceForm.discount"
              placeholder="立减金额为交易金额*（1-折扣），8折即80%"
              >
            </el-input>
            <span class="tips-text">%</span>
          </el-form-item>

          <el-form-item label="面额上限：" prop="ceiling">
            <el-input
              v-model="payReduceForm.ceiling"
              placeholder="奖品面值上限金额，最多两位小数"
              >
            </el-input>
            <span class="tips-text">元</span>
          </el-form-item>
        </template>

        <template v-if="payReduceForm.type == 'RANDOM'">
          <el-col :span="12">
            <el-form-item label="金额范围：" prop="scope">
              <el-input
                v-model="payReduceForm.scope"
                placeholder="必填，立减金额为设置的两个数之间的随机一个数，最多两位小数"
                >
              </el-input>
              <span class="tips-text">元</span>
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="1">
            <span>-</span>
          </el-col>
          <el-col :span="11">
            <el-form-item class="null-label" label="" prop="scope2">
              <el-input
                v-model="payReduceForm.scope2"
                placeholder="必填，立减金额为设置的两个数之间的随机一个数，最多两位小数"
                >
              </el-input>
              <span class="tips-text">元</span>
            </el-form-item>
          </el-col>
        </template>
        <div class="clear"></div>

        <el-form-item class="is-required" label="概率：" v-if="payReduceForm.type == 'PROBABILITY'">
          <div class="pro-list-box">
            <div class="pro-item" v-for="(item, index) in payReduceForm.prList" :key="index">
              <el-col :span="6">
                <el-form-item
                  :prop="'prList.'+ index + '.amount'"
                  :rules="{required: true, pattern: /^(\d+)?(?:\.\d{1,2})?$/, message: '金额格式不正确,最多保留两位小数', trigger: 'blur'}">
                  <el-input
                    v-model="item.amount"
                    maxlength="15"
                    placeholder="金额">
                  </el-input>
                  <span class="tips-text">元</span>
                </el-form-item>
              </el-col>
              <el-col class="text-center" :span="1">
                <span>-</span>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  :prop="'prList.'+ index + '.probability'"
                  :rules="{required: true, pattern: /^(\d+)?(?:\.\d{1,4})?$/, message: '概率格式不正确，最多保留4位小数', trigger: 'blur'}">
                  <el-input
                    v-model="item.probability"
                    maxlength="15"
                    placeholder="概率">
                  </el-input>
                  <span class="tips-text">%</span>
                </el-form-item>
              </el-col>
              <el-button type="text" @click="removeProbability(index)" class="el-icon-delete" :disabled="payReduceForm.prList.length === 1"></el-button>
            </div>
          </div>

          <div class="pro-addbtn-box">
            <el-button type="primary" size="mini" @click="addProbability" :disabled="payReduceForm.prList.length === 10">添加概率</el-button>
          </div>

          <div class="input-hint-text text-left warning">注:概率减对应的概率之和只能等于100</div>
        </el-form-item>

        <el-form-item label="订单金额下限：" prop="lower">
          <el-input
            v-model="payReduceForm.lower"
            placeholder="必填，订单门槛金额，无门槛填写0.00，支持两位小数"
            clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="奖品名称：" prop="reduceName">
          <el-input
            v-model="payReduceForm.reduceName"
            placeholder="必填，限10个字"
            clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="奖品描述：" prop="describe">
          <el-input
            v-model="payReduceForm.describe"
            placeholder="必填，限7个字，用于收银台展示，请谨慎填写"
            clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="数量阈值：" prop="numThreshold">
          <el-input
            v-model="payReduceForm.numThreshold"
            placeholder="选填，1-1000000之间"
            clearable>
          </el-input>
        </el-form-item>

        <!-- <el-form-item label="预算阈值：" prop="budgetThreshold">
          <el-input
            v-model="payReduceForm.budgetThreshold"
            placeholder="选填，1-1000000之间"
            clearable>
          </el-input>
        </el-form-item> -->
      </el-form>
      <div class="btns">
        <el-button type="primary" size="small" :disabled="butDisabled" @click="createCoupons('payReduce')">保存</el-button>
        <el-button type="info" size="small" @click="prevPage">取消</el-button>
      </div>
    </section>
</template>

<script>
import { createReductionPrize, queryReductionDetail } from 'api/service'
export default {
  name: 'budgetPrize2',
  data() {
    var validateSize = (rule, value, callback) => {
      if (!value) {
        return callback()
      } else if (Number(value) > Number(this.payReduceForm.count)) {
        return callback(new Error('数量阈值不能大于名额数量'))
      } else {
        return callback()
      }
    }
    return {
      payReduceForm: {
        count: '',
        type: 'SATISFY',
        types: [
          {
            value: 'SATISFY',
            label: '满减'
          },
          {
            value: 'DISCOUNT',
            label: '折扣减'
          },
          {
            value: 'RANDOM',
            label: '随机减'
          },
          {
            value: 'PROBABILITY',
            label: '概率减'
          }
        ],
        reductionMoney: '',
        discount: '',
        ceiling: '',
        scope: '',
        scope2: '',
        prList: [
          {
            amount: '',
            probability: ''
          }
        ],
        lower: '',
        reduceName: '',
        describe: '',
        numThreshold: ''
        // budgetThreshold: ''
      },
      butDisabled: false,
      // 开始验证
      payReduceRules: {
        count: [
          {
            required: true,
            message: '格式错误，1-1000000000之间的整数',
            pattern: /^([1-9]\d{0,8}?|1000000000)$/,
            trigger: 'blur'
          }
        ],
        reductionMoney: [
          {
            required: false,
            message: '满减金额只能是数字或保留两位小数',
            pattern: /^([0-9]*|[0-9]+[.]{1}[0-9]{1,2})$/,
            trigger: 'blur'
          }
        ],
        discount: [
          {
            required: true,
            message: '必填，立减金额为交易金额*（1-折扣），8折即80%',
            pattern: /^([1-9]\d(\.\d{1,2})?|100)$/,
            trigger: 'blur'
          }
        ],
        ceiling: [
          {
            required: true,
            message: '必填，奖品面值上限金额，最多两位小数',
            pattern: /^(\d+)?(?:\.\d{1,2})?$/,
            trigger: 'blur'
          }
        ],
        scope: [
          {
            required: true,
            message: '必填，立减金额为设置的两个数之间的随机一个数，最多两位小数',
            pattern: /^(\d+)?(?:\.\d{1,2})?$/,
            trigger: 'blur'
          }
        ],
        scope2: [
          {
            required: true,
            message: '必填，立减金额为设置的两个数之间的随机一个数，最多两位小数',
            pattern: /^(\d+)?(?:\.\d{1,2})?$/,
            trigger: 'blur'
          }
        ],
        lower: [
          {
            required: true,
            message: '必填，使用支付立减的订单最小金额，最多两位小数',
            pattern: /^(\d+)?(?:\.\d{1,2})?$/,
            trigger: 'blur'
          }
        ],
        reduceName: [
          {
            required: true,
            min: 1,
            max: 10,
            message: '必填，限10个字',
            trigger: 'blur'
          }
        ],
        describe: [
          {
            required: true,
            min: 1,
            max: 7,
            message: '必填，限7个字，用于收银台展示，请谨慎填写',
            trigger: 'blur'
          }
        ],
        numThreshold: [
          { validator: validateSize, trigger: 'blur' },
          {
            required: false,
            message: '格式不正确，1-1000000之间',
            pattern: /^[1-9]\d{0,6}$/,
            min: 1,
            max: 7,
            trigger: 'blur'
          }
        ]
        // budgetThreshold: [
        //   {
        //     required: false,
        //     message: '预算阈值格式不正确，整数或保留两位小数',
        //     pattern: /^(\d+)?(?:\.\d{1,2})?$/,
        //     trigger: 'blur'
        //   }
        // ]
      }
    }
  },
  deactivated() {
    this.$destroy(true)
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      let prizeId = this.$route.query.prizeId
      // 存在奖品id，说明是修改功能
      if (prizeId) {
        this.queryReductionDetail(prizeId)
      }
    },
    // 查询奖品数据详情
    queryReductionDetail(prizeId) {
      let reqParams = {
        prizeId: prizeId
      }
      queryReductionDetail(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data.domain

          this.payReduceForm.count = data.total
          this.payReduceForm.type = data.reductionType
          this.payReduceForm.reductionMoney = data.amount
          this.payReduceForm.discount = data.discount
          this.payReduceForm.ceiling = data.amountCeiling
          this.payReduceForm.scope = data.amountFloor
          this.payReduceForm.scope2 = data.amountCeiling
          this.payReduceForm.prList = data.probability || [{
            amount: '',
            probability: ''
          }]
          this.payReduceForm.lower = data.orderAmountFloor
          this.payReduceForm.reduceName = data.reductionName
          this.payReduceForm.describe = data.desc
          this.payReduceForm.numThreshold = data.threshold
          // this.payReduceForm.budgetThreshold = data.threshol
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    /**
     * 创建优惠券
     * @param formName: 指ref属性
     */
    createCoupons(formName) {
      this.$refs[formName] &&
        this.$refs[formName].validate(valid => {
          if (!valid) {
            this.$message({
              message: '您输入的数据格式有误，请检查',
              type: 'warning'
            })
            console.log('error submit!!')
            return false
          }

          // 如果是概率减，需要验证概率的百分比是否等于100%
          if (this.payReduceForm.type === 'PROBABILITY') {
            // let aProbabilitys = []
            let resut = 0
            this.payReduceForm.prList.forEach((item, index) => {
              resut += Number(item.probability)
            })
            if (resut !== 100) {
              return this.$message({
                message: '概率减对应的概率之和只能等于100，请检查',
                type: 'error'
              })
            }
            return false
          }
          this.butDisabled = true
          // 验证通过，创建奖品
          this.createPayReduceCoupons()
        })
    },
    // 创建支付立减奖品
    createPayReduceCoupons() {
      let reqParams = {
        total: this.payReduceForm.count,
        reductionType: this.payReduceForm.type,
        discount: this.payReduceForm.discount,
        amountCeiling: this.payReduceForm.ceiling,
        orderAmountFloor: this.payReduceForm.lower,
        reductionName: this.payReduceForm.reduceName,
        desc: this.payReduceForm.describe,
        threshold: this.payReduceForm.numThreshold,
        budgetCode: this.$route.query.code,
        budgetId: this.$route.query.budgetId,
        amount: this.payReduceForm.reductionMoney,
        probability: this.payReduceForm.prList
      }
      // 存在账户主体传账户主体
      if (this.$route.query.settleConfigId) {
        reqParams.settleConfigId = this.$route.query.settleConfigId
      }

      // 如果是随机减 ，需要判断一下取值
      if (this.payReduceForm.type === 'RANDOM') {
        reqParams.amountFloor = this.payReduceForm.scope
        reqParams.amountCeiling = this.payReduceForm.scope2
      }

      // 存在prizeId，表示是修改操作
      if (this.$route.query.prizeId) {
        reqParams.reductionId = this.$route.query.prizeId
      } else {
        // 预算阈值
        reqParams.amountThreshold = this.$route.query.thresholdAlarm
        // 创建时需要planId,修改不需要
        reqParams.planId = this.$route.query.planId
        reqParams.extendValue = {
          settMod: 'BS',
          procMod: 'NEW'
        }
      }
      createReductionPrize(reqParams)
        .then(res => {
          setTimeout(() => {
            this.butDisabled = false
          }, 1000)
          if (!this.httpThen(this, res)) return
          // let data = res.data
          this.$message({
            message: this.$route.query.prizeId ? '修改成功' : '创建成功',
            type: 'success'
          })

          // 跳转创建规则
          this.$router.push({
            path: '/marketingPlanManage/planDetail',
            query: {
              planId: this.$route.query.planId
              // prizeId: data ? data.reductionId : this.$route.query.prizeId,
              // createRule: '1'
            }
          })
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 添加概率
    addProbability() {
      let obj = {
        amount: '',
        probability: ''
      }
      this.payReduceForm.prList.push(obj)
    },
    // 移除概率
    removeProbability(index) {
      this.payReduceForm.prList.splice(index, 1)
    },
    // 类别切换清空数据验证
    typeChange() {
      this.payReduceForm.reductionMoney = ''
      this.payReduceForm.discount = ''
      this.payReduceForm.ceiling = ''
      this.payReduceForm.scope = ''
      this.payReduceForm.scope2 = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.btns {
  margin-left: 130px;
}
.budget-prize2 {
  &::after {
    content: '';
    display: block;
    clear: both;
  }
  .content-header {
    width: 100%;
    height: 50px;
    overflow: hidden;
    border-bottom: 1px solid #dddddd;
    span {
      float: left;
      color: #606266;
      font-size: 24px;
      line-height: 50px;
      margin: 0 0 0 10px;
    }
  }

  .pro-list-box {
    overflow: hidden;
    .pro-item {
      margin: 0 0 10px 0;
      clear: both;
      .el-icon-delete {
        margin-left: 10px;
        font-size: 16px;
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>
