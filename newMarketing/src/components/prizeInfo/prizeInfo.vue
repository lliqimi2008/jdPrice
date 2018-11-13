<template>
  <div class="prize-info">
    <!-- <div class="pub-sm-title clear">
      <h3 class="fl">奖项信息</h3>
      <span class="el-icon-close"></span>
    </div> -->
    <div class="prize-info-con" v-show="show">
      <el-form class="app-dialog-form demo-form-inline"
        label-width="130px" size="small" label-position="right"
        ref="awardsForm"
        :model="awardsForm"
        :rules="awardsFormRules"
        >

        <!-- 此处需要根据添加活动类型区分奖品类型是否可选择，目前只有在创建无券活动的时候为固定"单个奖品" -->
        <el-form-item label="奖品类型:" v-if="activityType == '0'">
          {{awardsForm.prizeType | awardsType}}
        </el-form-item>

        <el-form-item label="奖品类型:" v-if="activityType != '0'">
          <el-select :disabled="disabledDom" v-model="awardsForm.prizeType" @change="changePrizeType" placeholder="请选择" size="small">
            <el-option
              v-for="item in awardsForm.prizeTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="input-hint-text text-left">注:切换奖品类型时,原有关联数据将会被清空</div>
        </el-form-item>

        <el-form-item label="奖项名称:" prop="prizeName">
          <el-input v-model="awardsForm.prizeName" :disabled="disabledDom"></el-input>
        </el-form-item>
        <el-form-item label="奖项发放数量限制:">
          <el-col :span="3">
            <el-form-item label="日" class="text-left" label-width="40px" prop="day">
              <el-input v-model="awardsForm.day" :disabled="disabledDom" ref="formDay" @blur="validationLimit('formDay')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="周" class="text-left" label-width="40px" prop="week">
              <el-input v-model="awardsForm.week" :disabled="disabledDom" ref="formWeek" @blur="validationLimit('formWeek')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="月" class="text-left" label-width="40px" prop="month">
              <el-input v-model="awardsForm.month" :disabled="disabledDom" ref="formMonth" @blur="validationLimit('formMonth')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="总" class="text-left" label-width="40px" prop="all">
              <el-input v-model="awardsForm.all" :disabled="disabledDom" ref="formAll" @blur="validationLimit('formAll')"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="用户获取数量限制:">
          <el-col :span="3">
            <el-form-item label="日" class="text-left" label-width="40px" prop="getDay">
              <el-input v-model="awardsForm.getDay" :disabled="disabledDom" ref="formGetDay" @blur="validationGetLimit('formGetDay')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="周" class="text-left" label-width="40px" prop="getWeek">
              <el-input v-model="awardsForm.getWeek" :disabled="disabledDom" ref="formGetWeek" @blur="validationGetLimit('formGetWeek')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="月" class="text-left" label-width="40px" prop="getMonth">
              <el-input v-model="awardsForm.getMonth" :disabled="disabledDom" ref="formGetMonth" @blur="validationGetLimit('formGetMonth')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="总" class="text-left" label-width="40px" prop="getAll">
              <el-input v-model="awardsForm.getAll" :disabled="disabledDom" ref="formGetAll" @blur="validationGetLimit('formGetAll')"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <!-- 根据不同奖项类型切换不同奖项模板 -->
        <el-form-item :label="awardsForm.labelTitle">
          <component
            :is="prizeTypeTmpl"
            :data="showPrizeDataList"
            @stockBlurSetStoks="stockBlurSetStoks"
            @addPrizePop="addPrizePop"
            @deletePrizeItem="deletePrizeItem"
            ></component>
          </el-form-item>

        <template v-if="createAwardsStep==='awards'">
          <el-form-item size="large">
            <el-button type="primary" :disabled="disabledDom" @click="saveAward('awardsForm')" v-hasPermissions="'marketingPlanManage:createAward:nextOrder'">{{oldData.awardsType ? '保存并添加规则' : '下一步'}}</el-button>
            <el-button :disabled="disabledDom" @click="cancelCreate">取消</el-button>
          </el-form-item>
        </template>
        <!-- 添加规则组
          ruleType: 01活动
          showRuleType: group规则组
        -->
        <template v-if="createAwardsStep==='ruleGroup'">
          <!-- 规则组 -->
          <rules-index showRuleType="group" ruleType="01" :getRulesGroups="getRulesGroups" :watchRulesGroups="dateTimer"></rules-index>
          <el-form-item size="large">
            <el-button type="primary" @click="saveAwardResult" v-hasPermissions="'marketingPlanManage:createAward:saveAward'">保存</el-button>
          </el-form-item>
        </template>

      </el-form>
    </div>

    <!--
      关联奖品弹窗(根据不同奖品类型，切换不同关联奖品模板)
      show: 弹窗的显示
      data: 查询出来的奖品列表
      @queryAwards: 查询弹窗中列表数据
      @queryGiftPrize: 礼包数据查询
      @addPrizeItem: 添加奖品
      @cancelAddPrizeItem: 取消添加奖品
      @hideDialog: 关闭奖品弹窗
    -->
    <component
      :is="prizeTypeDialogTmpl"
      :loading="loading"
      :show="showAddPrizePop"
      :data="queryPrizeDataList"
      @queryAwards="queryAwards"
      @queryGiftPrize="queryGiftPrize"
      @addPrizeItem="addPrizeItem"
      @cancelAddPrizeItem="cancelAddPrizeItem"
      @hideDialog="hideDialog"
      @changePage="changePage"
      :pageData="pageData"
    ></component>

  </div>
</template>

<script>
import {
  createRule,
  updateRule,
  createAwards,
  updateAwards,
  queryAwardsList,
  queryGiftList
} from 'api/service'
import store from 'store'
import { httpLoadingMixins } from 'common/public.mixins'
import { arrRemove } from 'utils/util'
import rulesIndex from 'components/rulesPop'
// 单个奖品
import singlePrize from 'components/prizeInfo/singlePrize'
// 单个礼包
import singleGiftBag from 'components/prizeInfo/singleGiftBag'
// 抽奖（无礼包）
import luckyDrawNotGift from 'components/prizeInfo/luckyDrawNotGift'
// 抽奖（礼包）
import luckyDrawGift from 'components/prizeInfo/luckyDrawGift'
// 单个奖品
import singlePrizeDialog from 'components/prizeInfo/singlePrizeDialog'
// 单个礼包
import singleGiftBagDialog from 'components/prizeInfo/singleGiftBagDialog'
// 抽奖（无礼包）
import luckyDrawNotGiftDialog from 'components/prizeInfo/luckyDrawNotGiftDialog'
// 抽奖（礼包）
import luckyDrawGiftDialog from 'components/prizeInfo/luckyDrawGiftDialog'

export default {
  name: 'prizeInfo',
  mixins: [httpLoadingMixins],
  components: {
    rulesIndex,
    singlePrize,
    singleGiftBag,
    luckyDrawNotGift,
    luckyDrawGift,
    singlePrizeDialog,
    singleGiftBagDialog,
    luckyDrawNotGiftDialog,
    luckyDrawGiftDialog
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    // 用于编辑奖项携带的数据
    oldData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dateTimer: 0,
      errorText: '',
      errorClass: 'el-input el-input--small error',
      defaultClass: 'el-input el-input--small',
      limitData: {},
      isEditAwards: false,
      disabledDom: false,
      loading: false,
      // 修改奖项时获取的规则组数据
      getRulesGroups: [],
      tempRulesGroups: [],
      // 创建活动的类型，根据该类型来控制奖品类型的展示
      activityType: '',
      prizeTypeTmpl: singlePrize,
      prizeTypeDialogTmpl: singlePrizeDialog,
      // 创建奖项步骤
      createAwardsStep: 'awards', // ruleGroup
      // 添加的奖品列表id集合
      // prizeDataListIds: [],
      prizeDataListIds: {
        ids: [],
        stocks: []
      },
      pageData: {},
      showPrizeDataList: [],
      queryPrizeDataList: [],
      multipleSelection: [],
      showAddPrizePop: false,
      labelTitles: {
        SINGLE_PRIZE: '关联奖品',
        PRIZE_BAG: '关联礼包',
        POOL_SINGLE_PRIZE: '关联奖品',
        POOL_BAG_PRIZE: '关联礼包'
      },
      // 奖项模板（四种奖品类型）
      componentTmpl: {
        SINGLE_PRIZE: singlePrize,
        PRIZE_BAG: singleGiftBag,
        POOL_SINGLE_PRIZE: luckyDrawNotGift,
        POOL_BAG_PRIZE: luckyDrawGift
      },
      // 关联奖品模板弹窗
      componentDialogTmpl: {
        SINGLE_PRIZE: singlePrizeDialog,
        PRIZE_BAG: singleGiftBagDialog,
        POOL_SINGLE_PRIZE: luckyDrawNotGiftDialog,
        POOL_BAG_PRIZE: luckyDrawGiftDialog
      },
      // 奖项id，用于保存规则时使用
      awardsId: '',
      // 保存创建规则的次数，用于创建”用户获取数量限制“规则的次数
      saveRulesCount: 0,
      awardsForm: {
        labelTitle: '关联奖品:', // 关联礼包
        prizeType: 'SINGLE_PRIZE', // 单个奖品
        prizeTypes: [
          {
            label: '单个奖品',
            value: 'SINGLE_PRIZE'
          },
          {
            label: '单个礼包',
            value: 'PRIZE_BAG'
          },
          {
            label: '抽奖（无礼包）',
            value: 'POOL_SINGLE_PRIZE'
          },
          {
            label: '抽奖（礼包）',
            value: 'POOL_BAG_PRIZE'
          }
        ],
        prizeName: '',
        day: '',
        week: '',
        month: '',
        all: '',
        getDay: '',
        getWeek: '',
        getMonth: '',
        getAll: ''
      },
      awardsFormRules: {
        prizeName: [
          {
            required: true,
            min: 1,
            max: 20,
            message: '请输入奖项名称,不超过20字',
            trigger: 'change'
          }
        ],
        day: [
          {
            required: true,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'change'
          }
        ],
        week: [
          {
            required: false,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'change'
          }
        ],
        month: [
          {
            required: false,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'change'
          }
        ],
        all: [
          {
            required: true,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'change'
          }
        ],
        getDay: [
          {
            required: true,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'change'
          }
        ],
        getWeek: [
          {
            required: false,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'change'
          }
        ],
        getMonth: [
          {
            required: false,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'change'
          }
        ],
        getAll: [
          {
            required: true,
            message: '只能输入非零的整数',
            pattern: /^[1-9]{1}\d*$/,
            trigger: 'change'
          }
        ]
      }
    }
  },
  watch: {
    // 控制创建奖项流程步骤
    show(newVal, oldVal) {
      if (newVal) {
        // 显示时清空表单验证
        this.$refs['awardsForm'].resetFields()
        this.showPrizeDataList = []

        this.createAwardsStep = 'awards'
        console.log(newVal)
        this.setAwardsData(this.oldData)
      }
    },
    oldData(newVal, oldVal) {
      // 存在某一个属性表示有数据，进行编辑数据配置
      if (newVal.awardsId !== oldVal.awardsId) {
        // 赋值奖项数据(编辑)
        this.setAwardsData(newVal)
      }
    }
  },
  activated() {
    this.init()
  },
  methods: {
    init() {
      let routerParams = this.$route.query
      // 活动内奖项发放限制
      this.limitData = {
        day: Number(routerParams.day),
        week: Number(routerParams.week),
        month: Number(routerParams.month),
        total: Number(routerParams.total)
      }
      this.activityType = routerParams.type
    },
    /**
     * 添加奖品
     * type: 区分查询的是礼包还是奖品,目前只有两种类型
     */
    addPrizePop(type) {
      // 已经提交过的数据禁用点击
      if (this.disabledDom) {
        return
      }
      // 清空弹窗列表数据，防止缓存
      this.queryPrizeDataList = []
      this.showAddPrizePop = true
      if (type === 'prize') {
        this.queryAwards({
          pageNumber: 1,
          pageSize: 5
        })
      } else {
        this.queryGiftPrize({
          pageNumber: 1,
          pageSize: 5
        })
      }
    },
    // 查询关联奖品
    queryAwards(data) {
      this.loading = true
      let reqParams = {
        planId: this.$route.query.planId,
        prizeId: data.prizeId || '',
        prizeName: data.prizeName || '',
        // prizeCategorys: data.prizeType || '',
        pageNumber: data.pageNumber || 1,
        pageSize: data.pageSize || 5,
        sort: 'desc'
      }

      // console.log(String(this.activityType))

      // 无券活动为固定参数（立减）
      if (String(this.activityType) === '0') {
        reqParams.prizeCategorys = ['REDUCTION']
      } else if (String(this.activityType) === '1') {
        // 外部调用发奖活动
        if (!data.prizeType) {
          reqParams.prizeCategorys = ['COUPON', 'INTER_PRIZE', 'PHYSICAL_PRIZE']
        } else {
          reqParams.prizeCategorys = [data.prizeType]
        }
      }
      queryAwardsList(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          let dataList = data.list || []
          this.loading = false
          this.pageData = {
            totalRowCount: data.totalRowCount
          }
          console.log(this.prizeDataListIds)
          dataList.forEach((item, index) => {
            item.setStock = ''
            item.index = index
            // 用于标识是否已添加到列表中
            if (this.prizeDataListIds.ids.includes(item.prizeId)) {
              // 配置库存
              item.setStock = this.prizeDataListIds.stocks[this.prizeDataListIds.ids.indexOf(item.prizeId)]
              // 已添加到列表中
              item.on = 1
            } else {
              // 未添加到列表中
              item.on = 0
            }
          })
          this.queryPrizeDataList = dataList
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 查询礼包
    queryGiftPrize(data) {
      this.loading = true
      let reqParams = {
        // 礼包id
        planId: this.$route.query.planId,
        prizeId: data.prizeId || '',
        prizeName: data.prizeName || '',
        pageNumber: data.pageNumber || 1,
        pageSize: data.pageSize || 5,
        sort: 'desc'
      }
      queryGiftList(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          let dataList = data.list || []
          this.loading = false
          this.pageData = {
            totalRowCount: data.totalRowCount || 0
          }
          // console.log(this.prizeDataListIds.stocks[0] = 13)
          // console.log(dataList)

          dataList.forEach((item, index) => {
            item.setStock = ''
            item.index = index
            // 用于标识是否已添加到列表中
            if (this.prizeDataListIds.ids.includes(item.bagId)) {
              // 配置库存
              item.setStock = this.prizeDataListIds.stocks[this.prizeDataListIds.ids.indexOf(item.bagId)]
              // 已添加到列表中
              item.on = 1
            } else {
              // 未添加到列表中
              item.on = 0
            }
          })

          this.queryPrizeDataList = dataList
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 分页回调请求数据
    changePage(type, data) {
      this.loading = true
      // 区分查询的类型(礼包 or 奖品)
      if (type === 'prize') {
        // 查询奖品列表
        this.queryAwards({
          pageNumber: data.pageNumber || 1,
          prizeId: data.prizeId || '',
          prizeName: data.prizeName || '',
          prizeCategory: data.prizeType || '',
          pageSize: 5,
          sort: 'desc'
        })
      } else {
        // 查询礼包列表
        this.queryGiftPrize({
          pageNumber: data.pageNumber || 1,
          prizeId: data.prizeId || '',
          prizeName: data.prizeName || '',
          pageSize: 5,
          sort: 'desc'
        })
      }
    },
    // 在弹窗中添加奖品
    addPrizeItem(row) {
      let flag = false
      if (
        this.awardsForm.prizeType === 'SINGLE_PRIZE' ||
        this.awardsForm.prizeType === 'POOL_SINGLE_PRIZE'
      ) {
        for (let i = 0; i < this.showPrizeDataList.length; i++) {
          let item = this.showPrizeDataList[i]
          if (row.prizeId === item.prizeId) {
            flag = true
            break
          }
        }
      } else if (
        this.awardsForm.prizeType === 'PRIZE_BAG' ||
        this.awardsForm.prizeType === 'POOL_BAG_PRIZE'
      ) {
        for (let i = 0; i < this.showPrizeDataList.length; i++) {
          let item = this.showPrizeDataList[i]
          if (row.bagId === item.bagId) {
            flag = true
            break
          }
        }
      }

      if (flag) {
        return this.$message({
          message: '您已添加该奖品~',
          type: 'warning'
        })
      }

      // 解决双向绑定机制
      row.showStock = row.setStock
      this.showPrizeDataList.push(row)

      // 存储添加奖品的id，用于关联添加的奖品数据
      this.prizeDataListIds.ids.push(row.prizeId || row.bagId)
      this.prizeDataListIds.stocks.push(row.setStock)

      // 修改状态，1已添加
      row.on = 1

      // 存储奖品数据，用于做添加限制
      store.dispatch('setSinglePrize', this.showPrizeDataList)
    },
    cancelAddPrizeItem(row) {
      // 修改状态，0未添加
      row.on = 0
      this.deletePrizeItem(row)
    },
    // 关联添加奖品的状态
    checkPrizeDataList() {},
    // 删除奖品
    deletePrizeItem(item) {
      console.log(item.index)
      let id = item.bagId || item.prizeId

      this.showPrizeDataList.forEach((item, index) => {
        let itemId = item.bagId || item.prizeId
        if (itemId === id) {
          // console.log(this.prizeDataListIds.ids.indexOf(id))
          this.showPrizeDataList.splice(
            this.prizeDataListIds.ids.indexOf(id),
            1
          )
        }
      })

      // this.showPrizeDataList.splice(item.index, 1)
      // 移除对应的奖品id
      arrRemove(this.prizeDataListIds.ids, id)
      arrRemove(this.prizeDataListIds.stocks, item.setStock)
      console.log(this.showPrizeDataList)
      store.dispatch('setSinglePrize', [])
    },
    stockBlurSetStoks(row, val) {
      this.prizeDataListIds.stocks[this.prizeDataListIds.ids.indexOf(row.bagId || row.prizeId)] = val
    },
    // 验证奖项发放数量限制
    validationLimit(formEl) {
      var flag = false
      let oEl = this.$refs[formEl].$el
      if (!oEl.children[0].value || !Number(this.awardsForm.all)) {
        oEl.className = this.defaultClass
        return true
      } else {
        switch (formEl) {
          case 'formDay':
            // 奖项发放数量限制
            if (Number(this.awardsForm.day) > this.limitData.day) {
              oEl.className = this.errorClass
              this.errorText = '奖项发放数量限制“每日”不能超过活动内奖项“每日”发放限制'
              this.warningMsg()
              flag = false
            } else {
              oEl.className = this.defaultClass
              flag = true
            }
            break
          case 'formWeek':
            if (!this.limitData.week) {
              // “周”不存在，限制不能小于“日”，不能大于“总”
              if (Number(this.awardsForm.week) < Number(this.awardsForm.day)) {
                oEl.className = this.errorClass
                this.errorText = '奖项发放数量限制“每周”不能小于“每日”发放限制'
                this.warningMsg()
                flag = false
              } else if (Number(this.awardsForm.week) > Number(this.awardsForm.all)) {
                // 不能大于“总”数量
                oEl.className = this.errorClass
                this.errorText = '奖项发放数量限制“每周”不能超过“总”发放限制'
                this.warningMsg()
                flag = false
              } else {
                oEl.className = this.defaultClass
                flag = true
              }
            } else if (Number(this.awardsForm.week) < Number(this.awardsForm.day)) {
              oEl.className = this.errorClass
              this.errorText = '奖项发放数量限制“每周”不能小于“每日”发放限制'
              this.warningMsg()
              flag = false
            } else if (Number(this.awardsForm.week) > this.limitData.week) {
              oEl.className = this.errorClass
              this.errorText = '奖项发放数量限制“每周”不能超过活动内奖项“每周”发放限制'
              this.warningMsg()
              flag = false
            } else if (Number(this.awardsForm.week) > Number(this.awardsForm.all)) {
              oEl.className = this.errorClass
              this.errorText = '奖项发放数量限制“每周”不能超过“总”发放限制'
              this.warningMsg()
              flag = false
            } else {
              oEl.className = this.defaultClass
              flag = true
            }
            break
          case 'formMonth':
            if (!this.limitData.month) {
              // “月”不存在，限制不能小于“日”，不能大于“总”
              if (Number(this.awardsForm.month) < Number(this.awardsForm.day)) {
                oEl.className = this.errorClass
                this.errorText = '奖项发放数量限制“每月”不能小于“每日”发放限制'
                this.warningMsg()
                flag = false
              } else if (Number(this.awardsForm.month) > Number(this.awardsForm.all)) {
                // 不能大于“总”数量
                oEl.className = this.errorClass
                this.errorText = '奖项发放数量限制“每月”不能超过“总”发放限制'
                this.warningMsg()
                flag = false
              } else {
                oEl.className = this.defaultClass
                flag = true
              }
            } else if (Number(this.awardsForm.month) < Number(this.awardsForm.day)) {
              oEl.className = this.errorClass
              this.errorText = '奖项发放数量限制“每月”不能小于“每日”发放限制'
              this.warningMsg()
              flag = false
            } else if (Number(this.awardsForm.month) > this.limitData.month) {
              oEl.className = this.errorClass
              this.errorText = '奖项发放数量限制“每月”不能超过活动内奖项“每月”发放限制'
              this.warningMsg()
              flag = false
            } else if (Number(this.awardsForm.month) > Number(this.awardsForm.all)) {
              oEl.className = this.errorClass
              this.errorText = '奖项发放数量限制“每周”不能超过“总”发放限制'
              this.warningMsg()
              flag = false
            } else {
              oEl.className = this.defaultClass
              flag = true
            }
            break
          case 'formAll':
            if (Number(this.awardsForm.all) > this.limitData.total) {
              oEl.className = this.errorClass
              this.errorText = '奖项发放数量限制“总数”不能超过活动内奖项“总数”发放限制'
              this.warningMsg()
              flag = false
            } else {
              oEl.className = this.defaultClass
              flag = true
            }
            break
        }
      }
      return flag
    },
    // 验证用户数量获取限制
    validationGetLimit(formEl) {
      var flag = false
      let oEl = this.$refs[formEl].$el
      if (!oEl.children[0].value || !Number(this.awardsForm.getAll)) {
        oEl.className = this.defaultClass
        return true
      } else {
        switch (formEl) {
          case 'formGetDay':
            // 用户数量获取限制
            if (Number(this.awardsForm.getDay) > Number(this.awardsForm.day)) {
              oEl.className = this.errorClass
              this.errorText = '用户数量获取限制“每日”不能超过奖项数量“每日”发放限制'
              this.warningMsg()
              flag = false
            } else {
              oEl.className = this.defaultClass
              flag = true
            }
            break
          case 'formGetWeek':
            if (!Number(this.awardsForm.week)) {
              // “周”不存在，限制不能小于“日”，不能大于“总”
              if (Number(this.awardsForm.getWeek) < Number(this.awardsForm.getDay)) {
                oEl.className = this.errorClass
                this.errorText = '用户数量获取限制“每周”不能小于“每日”获取限制'
                this.warningMsg()
                flag = false
              } else if (Number(this.awardsForm.getWeek) > Number(this.awardsForm.getAll)) {
                // 不能大于“总”数量
                oEl.className = this.errorClass
                this.errorText = '用户数量获取限制“每周”不能超过“总”获取限制'
                this.warningMsg()
                flag = false
              } else {
                oEl.className = this.defaultClass
                flag = true
              }
            } else if (Number(this.awardsForm.getWeek) > Number(this.awardsForm.week)) {
              oEl.className = this.errorClass
              this.errorText = '用户数量获取限制“每周”不能超过奖项数量“每周”获取限制'
              this.warningMsg()
              flag = false
            } else if (Number(this.awardsForm.getWeek) < Number(this.awardsForm.getDay)) {
              oEl.className = this.errorClass
              this.errorText = '用户数量获取限制“每周”不能小于用户获取“每日”限制'
              this.warningMsg()
              flag = false
            } else if (Number(this.awardsForm.getWeek) > Number(this.awardsForm.getAll)) {
              oEl.className = this.errorClass
              this.errorText = '用户数量获取限制“每周”不能超过“总”限制'
              this.warningMsg()
              flag = false
            } else {
              oEl.className = this.defaultClass
              flag = true
            }
            break
          case 'formGetMonth':
            if (!Number(this.awardsForm.month)) {
              // “月”不存在，限制不能小于“日”，不能大于“总”
              if (Number(this.awardsForm.getMonth) < Number(this.awardsForm.getDay)) {
                oEl.className = this.errorClass
                this.errorText = '用户数量获取限制“每月”不能小于“每日”获取限制'
                this.warningMsg()
                flag = false
              } else if (Number(this.awardsForm.getMonth) > Number(this.awardsForm.getAll)) {
                // 不能大于“总”数量
                oEl.className = this.errorClass
                this.errorText = '用户数量获取限制“每月”不能超过“总”获取限制'
                this.warningMsg()
                flag = false
              } else {
                oEl.className = this.defaultClass
                flag = true
              }
            } else if (Number(this.awardsForm.getMonth) > Number(this.awardsForm.month)) {
              oEl.className = this.errorClass
              this.errorText = '用户数量获取限制“每月”不能超过奖项数量“每月”获取限制'
              this.warningMsg()
              flag = false
            } else if (Number(this.awardsForm.getMonth) < Number(this.awardsForm.getDay)) {
              oEl.className = this.errorClass
              this.errorText = '用户数量获取限制“每月”不能小于用户获取“每日”限制'
              this.warningMsg()
              flag = false
            } else if (Number(this.awardsForm.getMonth) > Number(this.awardsForm.getAll)) {
              oEl.className = this.errorClass
              this.errorText = '用户数量获取限制“每月”不能超过“总”限制'
              this.warningMsg()
              flag = false
            } else {
              oEl.className = this.defaultClass
              flag = true
            }
            break
          case 'formGetAll':
            if (Number(this.awardsForm.getAll) > Number(this.awardsForm.all)) {
              oEl.className = this.errorClass
              this.errorText = '用户数量获取限制“总数”不能超过奖项数量“总数”获取限制'
              this.warningMsg()
              flag = false
            } else {
              oEl.className = this.defaultClass
              flag = true
            }
            break
        }
      }

      return flag
    },
    warningMsg() {
      this.$message({
        message: this.errorText,
        type: 'warning'
      })
    },
    // 保存奖项
    saveAward(formName) {
      this.$refs[formName] &&
        this.$refs[formName].validate(valid => {
          if (!valid) {
            return this.$message({
              message: '您输入的数据格式有误，请检查',
              type: 'warning'
            })
          }
          // 验证日与总之见的数据关系
          if (
            Number(this.awardsForm.day) >
            Number(this.awardsForm.all)
          ) {
            return this.$message({
              message: '您填写的日发放量不能超过总发放量',
              type: 'warning'
            })
          }
          if (
            Number(this.awardsForm.getDay) >
            Number(this.awardsForm.getAll)
          ) {
            return this.$message({
              message: '您填写的日发放量不能超过总发放量',
              type: 'warning'
            })
          }
          if (
            !this.validationLimit('formDay') ||
            !this.validationLimit('formWeek') ||
            !this.validationLimit('formMonth') ||
            !this.validationLimit('formAll') ||
            !this.validationGetLimit('formGetDay') ||
            !this.validationGetLimit('formGetWeek') ||
            !this.validationGetLimit('formGetMonth') ||
            !this.validationGetLimit('formGetAll')
          ) {
            // this.$message({
            //   message: '奖项发放数量“日、周、月、总”不能超过活动奖项发放限制',
            //   type: 'warning'
            // })
            this.warningMsg()
            return
          }

          // 必须添加关联奖品数据
          if (!this.showPrizeDataList.length) {
            // 当为后返活动时 不校验
            console.log(this.$route.query.type)
            if (this.$route.query.type !== 3) {
              return this.$message({
                message: '您还未选择关联的奖品，请先添加关联奖品',
                type: 'warning'
              })
            }
          }

          // 关联奖品限制不能超过 奖项发放数量限制 总数

          let stockSum = 0
          // console.log(this.showPrizeDataList)
          this.showPrizeDataList.forEach((item, index) => {
            stockSum += Number(item.setStock)
          })

          if (stockSum > this.awardsForm.all) {
            return this.$message({
              message:
                '关联奖品/礼包的库存总和不能超过“奖项发放数量限制”的总数',
              type: 'warning'
            })
          }

          this.$confirm(
            '进入下一步过后数据将暂时无法修改，确定下一步吗？',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              this.showHttpLoading()
              this.disabledDom = true
              // 根据状态验证是修改还是创建
              if (this.isEditAwards) {
                this.updateAwards()
              } else {
                // 验证通过创建奖项
                this.createAwards()
              }
            })
            .catch(() => {})
        })
    },
    // 创建奖项
    createAwards() {
      let reqParams = {
        activityId: this.$route.query.activityId,
        awardsName: this.awardsForm.prizeName,
        awardsType: this.awardsForm.prizeType,
        sendLimitDay: this.awardsForm.day,
        sendLimitWeek: this.awardsForm.week,
        sendLimitMonth: this.awardsForm.month,
        sendLimitTotal: this.awardsForm.all,
        // 关联奖品
        relatePrizeList: this.setPrizeParams()
      }
      createAwards(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          /**
           * 1.创建完奖项，将返回的奖项id保存，用于保存规则
           * 2.保存奖项id,供创建规则使用
           */
          this.awardsId = data.awardsId
          store.dispatch('setAwardsId', data.awardsId)
          // 创建"用户获取数量限制"规则（后台不能扩展接口，需要手动调用四次创建规则接口，如果发生需求变更，创建100个,1000个，可想而知-.-!!！）
          // 记录创建次数,此处优化用permise会更好,目前这样不能保证创建的顺序，可修改
          this.saveRulesCount = 0
          this.saveRulesData('day')
          this.saveRulesData('week')
          this.saveRulesData('month')
          this.saveRulesData('all')
        })
        .catch(err => {
          this.httpCatch(err)
        })
    },
    // 修改奖项
    updateAwards() {
      let reqParams = {
        activityId: this.$route.query.activityId,
        awardsId: this.awardsId,
        awardsName: this.awardsForm.prizeName,
        awardsType: this.awardsForm.prizeType,
        sendLimitDay: this.awardsForm.day,
        sendLimitWeek: this.awardsForm.week,
        sendLimitMonth: this.awardsForm.month,
        sendLimitTotal: this.awardsForm.all,
        // 关联奖品
        relatePrizeList: this.setPrizeParams()
      }
      updateAwards(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          // 创建完奖项，将返回的奖项id保存，用于保存规则
          // 保存奖项id,供创建规则使用
          store.dispatch('setAwardsId', this.awardsId)
          // 创建"用户获取数量限制"规则（后台不能扩展接口，需要手动调用四次创建规则接口，如果发生需求变更，创建100个,1000个，可想而知-.-!!！）
          // 记录创建次数,此处优化用permise会更好,目前这样不能保证创建的顺序，可修改
          this.saveRulesCount = 0
          this.updateRulesData('day')

          // 修改时需要验证是否有创建过
          if (this.oldData.userGetLimitData.prizeWeeklyRedisGet) {
            this.updateRulesData('week')
          } else {
            this.saveRulesData('week')
          }
          if (this.oldData.userGetLimitData.prizeMonthlyRedisGet) {
            this.updateRulesData('month')
          } else {
            this.saveRulesData('month')
          }
          this.updateRulesData('all')
        })
        .catch(err => {
          this.httpCatch(err)
        })
    },
    // 保存最终创建奖项的数据
    saveAwardResult() {
      // 必须添加规则数据, 获取规则组的数据，从store里面获取
      if (!store.state.rulesGroups.length) {
        return this.$message({
          message: '您还未添加奖项规则，请先添加奖项规则',
          type: 'warning'
        })
      }

      this.$confirm('确认保存数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            message: '成功创建一条奖项数据',
            type: 'success'
          })
          // 创建成功后清空数据
          this.disabledDom = false
          this.clearDefaultData()

          // 调用奖品列表查询接口
          this.$emit('getAwardsInfo')
        })
        .catch(() => {})
    },
    // 保存规则，隐藏创建奖项面板，清空创建奖项模板
    saveRulesData(type) {
      createRule(this.setRulesParams(type, 'save'))
        .then(res => {
          // 记数，创建完1次过后，表示创建成功
          if (++this.saveRulesCount === 4) {
            // 下一步进入创建规则组
            this.createAwardsStep = 'ruleGroup'
            // 关闭请求遮罩层
            this.closeHttpLoading()
          }
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 修改规则
    updateRulesData(type) {
      // 修改规则
      updateRule(this.setRulesParams(type, 'update'))
        .then(res => {
          // 记数，修改完1次过后，表示修改成功
          if (++this.saveRulesCount === 4) {
            // 下一步进入修改规则组
            this.createAwardsStep = 'ruleGroup'
            // 关闭请求遮罩层
            this.closeHttpLoading()

            // 修改完奖项过后进入下一步为规则组数据赋值
            setTimeout(() => {
              this.dateTimer = new Date().getTime()
              this.getRulesGroups = []
              this.tempRulesGroups.forEach((item, index) => {
                this.getRulesGroups.push({
                  groupTitle: '规则组' + item.groupId,
                  rulesDataList: item.promotionRuleDtoList
                })
              })
            }, 10)
          }
        })
        .catch(err => {
          this.httpCatch(this, err)
        })
    },
    // 修改奖项时赋值
    setAwardsData(data) {
      this.clearDefaultData()
      if (!data.awardsType) {
        this.isEditAwards = false
        this.getRulesGroups = []
        // 不存在奖项ID表示创建奖项功能
        console.log('创建奖项,清空数据...')
        this.$refs['awardsForm'].resetFields()
        return
      }

      this.isEditAwards = true
      // 切换关联奖品标题
      this.awardsForm.labelTitle = this.labelTitles[data.awardsType]
      // 切换关联奖品模板
      this.prizeTypeTmpl = this.componentTmpl[data.awardsType]
      // 切换关联奖品弹窗模板
      this.prizeTypeDialogTmpl = this.componentDialogTmpl[data.awardsType]

      // 奖项基本属性
      this.awardsId = data.awardsId
      this.awardsForm.prizeType = data.awardsType
      this.awardsForm.prizeName = data.awardsName
      this.awardsForm.day = data.sendLimitDay
      this.awardsForm.week = data.sendLimitWeek || ''
      this.awardsForm.month = data.sendLimitMonth || ''
      this.awardsForm.all = data.sendLimitTotal

      // 用户获取限制
      this.awardsForm.getDay = data.userGetLimitData.prizeDailyRedisGet
      this.awardsForm.getWeek = data.userGetLimitData.prizeWeeklyRedisGet
      this.awardsForm.getMonth = data.userGetLimitData.prizeMonthlyRedisGet
      this.awardsForm.getAll = data.userGetLimitData.prizeTotalRedisGet

      // 新增id属性用于修改规则的修改
      this.awardsForm.getDayId = data.userGetLimitData.prizeDailyRedisGetId
      this.awardsForm.getWeekId = data.userGetLimitData.prizeWeeklyRedisGetId
      this.awardsForm.getMonthId = data.userGetLimitData.prizeMonthlyRedisGetId
      this.awardsForm.getAllId = data.userGetLimitData.prizeTotalRedisGetId

      this.showPrizeDataList = []
      // 设置关联奖品
      let prizeDtos = data.prizeDtos || data.bagDtos || []
      // 单条数据与多条数据目前采用一种循环添加的方法
      console.log(prizeDtos)
      prizeDtos.forEach((item, index) => {
        item.showStock = item.total || item.quantity
        item.setStock = item.stock || item.assigned

        // item.stock = item.total

        this.showPrizeDataList.push(item)
        // 存储添加奖品的id，用于关联添加的奖品数据
        this.prizeDataListIds.ids.push(item.prizeId || item.bagId)
        // 存储配置库存
        this.prizeDataListIds.stocks.push(item.stock || item.assigned)
        // 修改状态，1已添加
        item.on = 1
      })

      // 存储规则组(转换数据，防止数据源的内存关联)
      this.tempRulesGroups = JSON.parse(
        JSON.stringify(data.restAwardRulesModels[0] || [])
      )

      // 存储奖品数据，用于做添加限制
      store.dispatch('setSinglePrize', this.showPrizeDataList)
    },
    // 切换奖品类型时同时切换不同的奖品列表模板
    changePrizeType(val) {
      // 切换关联奖品标题
      this.awardsForm.labelTitle = this.labelTitles[val]
      // 切换关联奖品模板
      this.prizeTypeTmpl = this.componentTmpl[val]
      // 切换关联奖品弹窗模板
      this.prizeTypeDialogTmpl = this.componentDialogTmpl[val]
      // 奖品类型切换时，清空非当前奖品类型模块下的数据
      this.clearDefaultData()
    },
    // 清空奖品数据
    clearDefaultData() {
      this.awardsForm.prizeName = ''
      this.awardsForm.day = ''
      this.awardsForm.week = ''
      this.awardsForm.month = ''
      this.awardsForm.all = ''
      this.awardsForm.getDay = ''
      this.awardsForm.getWeek = ''
      this.awardsForm.getMonth = ''
      this.awardsForm.getAll = ''
      this.showPrizeDataList = []
      this.queryPrizeDataList = []
      // 清空已添加的奖品id
      this.prizeDataListIds = {
        ids: [],
        stocks: []
      }
      store.dispatch('setSinglePrize', [])
    },
    // 创建修改奖项时的公共参数
    setPrizeParams() {
      // 过滤请求参数
      let tempPrizeData = []
      // 单个奖品
      if (
        this.awardsForm.prizeType === 'SINGLE_PRIZE' ||
        this.awardsForm.prizeType === 'POOL_SINGLE_PRIZE'
      ) {
        this.showPrizeDataList.forEach((item, index) => {
          tempPrizeData.push({
            relateId: item.prizeId,
            relateName: item.prizeName,
            amount: item.amount,
            awardRelateCategory: item.prizeCategory,
            stock: item.setStock
          })
        })
      } else if (
        this.awardsForm.prizeType === 'PRIZE_BAG' ||
        this.awardsForm.prizeType === 'POOL_BAG_PRIZE'
      ) {
        // 单个礼包
        this.showPrizeDataList.forEach((item, index) => {
          tempPrizeData.push({
            relateId: item.bagId,
            relateName: item.bagName,
            amount: item.amount,
            awardRelateCategory: 'BAG',
            stock: item.setStock
          })
        })
      }
      return tempPrizeData
    },
    // 创建修改奖项下规则的公共参数
    setRulesParams(ruleType, type) {
      const CAL_VALUES = {
        day: this.awardsForm.getDay,
        week: this.awardsForm.getWeek,
        month: this.awardsForm.getMonth,
        all: this.awardsForm.getAll
      }

      const RULE_ID = {
        day: this.awardsForm.getDayId,
        week: this.awardsForm.getWeekId,
        month: this.awardsForm.getMonthId,
        all: this.awardsForm.getAllId
      }

      const FIELDS = {
        day: 'prizeDailyRedisGet',
        week: 'prizeWeeklyRedisGet',
        month: 'prizeMonthlyRedisGet',
        all: 'prizeTotalRedisGet'
      }

      let reqParams = {
        calValue: CAL_VALUES[ruleType],
        field: FIELDS[ruleType],
        entranceId: this.awardsId,
        // 以下为默认参数
        calGroupId: '1',
        calType: '<',
        calValueType: 'n',
        fieldSource: 'I',
        noPassDesc: '',
        order: '',
        prizeId: 'true',
        prizeOverlay: 'Y',
        extension: { dimension: 'jdPin|uuid|phone|idNo|bankCardNo|customerId' },
        ruleType: '02',
        status: '0'
      }

      if (type === 'update') {
        reqParams.ruleId = RULE_ID[ruleType]
      }

      return reqParams
    },
    // 取消创建
    cancelCreate() {
      this.$emit('cancelCreate')
    },
    // 关闭奖品弹窗
    hideDialog() {
      this.showAddPrizePop = false
    }
  }
}
</script>

<style lang="scss">
.el-form-item.text-left {
  .el-form-item__label {
    // text-align: left;
    padding: 0 10px 0 0;
  }
  .el-form-item__content {
    margin-right: 5px;
  }
}
.prize-info-con {
  .hint-text,
  .single-hint-text {
    line-height: 16px;
    color: #999;
    font-size: 12px;
  }
  .single-hint-text {
    line-height: 30px;
  }
}
</style>
