<template>
  <div class="prize-info-detail">
    <!-- 奖项信息 -->
    <slot name="header"></slot>
    <div class="pv prize-content">
      <el-button v-if="awardsData.length" class="pa edit-btn" size="mini" type="primary" @click="editAwards">编辑奖项</el-button>
      <not-data v-if="!awardsData.length" text="暂无奖项信息">
        <app-loading slot="loading" :height="120" v-if="awardsLoading"></app-loading>
        <div slot="btns" class="mar-t-10"><el-button v-if="!awardsData.length" size="mini" type="primary" @click="createAwards">立即创建奖项</el-button></div>
      </not-data>
      <el-tabs v-else
        class="tab-content" tab-position="top"
        v-model="awardsTabActive"
        :closable="isShowClosable"
        @tab-remove="removeAwards"
        @tab-click="awardsTabClick">
        <el-tab-pane v-for="(awardsItem, index) in awardsData"
          :label="awardsItem.awardsName"
          :name="'awardsTabActive_'+index"
          :awardsId="awardsItem.awardsId"
          :key="index">
          <div class="bg-pad-border mar-b-15">
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple"><strong>奖项id：</strong>{{awardsItem.awardsId}}</div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"><strong>奖项名称：</strong>{{awardsItem.awardsName}}</div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"><strong>奖项类型：</strong>{{awardsItem.awardsType | awardsType}}</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple-light"><strong>奖项发放数量：</strong>日{{awardsItem.sendLimitDay}} 周{{awardsItem.sendLimitWeek || '--'}} 月{{awardsItem.sendLimitMonth || '--'}} 总{{awardsItem.sendLimitTotal}}</div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light"><strong>用户获取限制：</strong>日{{userGetLimitData.prizeDailyRedisGet}} 周{{userGetLimitData.prizeWeeklyRedisGet || '--'}} 月{{userGetLimitData.prizeMonthlyRedisGet || '--'}} 总{{userGetLimitData.prizeTotalRedisGet}}</div></el-col>
            </el-row>
          </div>

          <!-- 奖品 -->
          <div class="table-content">
            <!-- 单个奖品模板 -->
            <template v-if="awardsItem.awardsType === 'SINGLE_PRIZE' || awardsItem.awardsType === 'POOL_SINGLE_PRIZE'">
              <el-table
                ref="siglePrizeTable"
                :data="awardsItem.prizeDtos"
                border
                stripe
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                  label="奖品ID"
                  width="120">
                  <template slot-scope="scope">{{ scope.row.prizeId }}</template>
                </el-table-column>
                <el-table-column
                  prop="prizeName"
                  label="奖品名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="amount"
                  label="奖品面值"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  label="奖品类型"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.prizeCategory | prizeType }}</template>
                </el-table-column>
                <el-table-column
                  prop="budgetCode"
                  label="预算编码"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="stock"
                  label="配置库存"
                  show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </template>

            <!-- 礼包模板 -->
            <template v-if="awardsItem.awardsType === 'PRIZE_BAG' || awardsItem.awardsType === 'POOL_BAG_PRIZE'">
              <el-table
                ref="bagPrizeTable"
                :data="awardsItem.bagDtos"
                border
                stripe
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                  label="奖品ID"
                  width="120">
                  <template slot-scope="scope">{{ scope.row.bagId }}</template>
                </el-table-column>
                <el-table-column
                  prop="bagName"
                  label="奖品名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="amount"
                  label="奖品面值"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  label="配置库存"
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    {{scope.row.assigned}}
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>

          <!-- 规则组 -->
          <el-tabs class="mar-b-30" v-model="ruleTabActiveName" tab-position="top">
            <el-tab-pane
              v-for="(ruleGroupItem, ruleGroupIndex) in awardsItem.restAwardRulesModels[0]" 
              :name="'ruleTabActiveName_'+ruleGroupIndex"
              :label="'规则组'+ruleGroupItem.groupId"
              :key="ruleGroupIndex">
              <div class="rules-box-body">
                <el-table
                  class="fixed-height"
                  :data="ruleGroupItem.promotionRuleDtoList"
                  border
                  stripe>
                  <el-table-column
                    prop="ruleName"
                    label="规则名称">
                    <template slot-scope="scope">
                      {{scope.row.field | ruleNames}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="field"
                    label="对应规则">
                    <template slot-scope="scope">
                      {{scope.row.field}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="calType"
                    label="计算类型">
                    <template slot-scope="scope">
                      {{scope.row.calType}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="calValue"
                    label="计算值">
                    <template slot-scope="scope">
                      {{scope.row.calValue}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="extension"
                    label="扩展值">
                    <template slot-scope="scope">
                      {{scope.row.extension}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="noPassDesc"
                    label="错误文案">
                    <template slot-scope="scope">
                      {{scope.row.noPassDesc}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="order"
                    label="优先级">
                    <template slot-scope="scope">
                      {{scope.row.order}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" class="font18 el-icon-caret-top" @click="sortTop(ruleGroupItem.promotionRuleDtoList, scope.row)"></el-button>
                      <el-button type="text" size="small" class="font18 el-icon-caret-bottom" @click="sortBottom(ruleGroupItem.promotionRuleDtoList, scope.row)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>

        </el-tab-pane>
      </el-tabs>
      
    </div>
    
  </div>
</template>

<script>
import { rulesGroupMisinx } from 'common/awards.mixins'
import { queryAwardsGetList } from 'api/service'
import notData from 'components/notData/notData'
export default {
  mixins: [rulesGroupMisinx],
  props: {
    // 奖项数据
    awardsData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 活动内奖项发放限制
    limitData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否显示关闭按钮
    isShowClosable: {
      type: Boolean,
      default: false
    }
  },
  components: {
    notData
  },
  watch: {
    // awardsTabActive(newVal, oldVal) {
    //   if (newVal.length) {
    //     // 防止删除奖项过后不能选中奖项
    //     this.awardsTabActive = 'awardsTabActive_0'
    //   }
    // },
    // 监听数据，用于第一次加载或者删除功能的回调时检测数据变化过后调用用户获取限制数据
    awardsData(newVal, oldVal) {
      this.awardsLoading = false
      if (newVal.length) {
        this.awardsTabActive = 'awardsTabActive_0'
        this.saveAwardsData = this.awardsData[0]
        this.userGetlimit(newVal[0].awardsId)
      }
    }
  },
  data() {
    return {
      awardsLoading: true,
      awardsTabActive: 'awardsTabActive_0',
      // 设置tab选中的名字
      ruleTabActiveName: 'ruleTabActiveName_0',
      // 用户获取限制限制
      userGetLimitData: {},
      // 保存当前奖项被选中的数据
      saveAwardsData: {}
    }
  },
  methods: {
    // 创建奖项
    createAwards() {
      // 点击时获取当前页面路由状态，如果是活动详情页，需要跳转到编辑页进行编辑
      if (this.$route.name === 'activityDetail') {
        this.$router.push({
          path: '/marketingPlanManage/createAward',
          query: {
            planId: this.$route.query.planId,
            activityId: this.$route.query.activityId,
            // type用于区分创建奖项时的奖品类型是否可供选择,1:可选择（外部调用发奖活动）,0:不可选择（无券活动）
            type: this.$route.query.type,
            day: this.limitData.day,
            week: this.limitData.week,
            month: this.limitData.month,
            total: this.limitData.total,
            ruleType: String(this.$route.query.type) === '0' ? 'noCoupons' : 'extraActivity'
          }
        })
        return
      }
      // 用户获取限制数据
      this.saveAwardsData.userGetLimitData = this.userGetLimitData
      this.$emit('editAwards', this.saveAwardsData)
    },
    // 编辑奖项
    editAwards() {
      // 点击时获取当前页面路由状态，如果是活动详情页，需要跳转到编辑页进行编辑
      if (this.$route.name === 'activityDetail') {
        this.$router.push({
          path: '/marketingPlanManage/createAward',
          query: {
            planId: this.$route.query.planId,
            activityId: this.$route.query.activityId,
            // type用于区分创建奖项时的奖品类型是否可供选择,1:可选择（外部调用发奖活动）,0:不可选择（无券活动）
            type: this.$route.query.type,
            day: this.limitData.day,
            week: this.limitData.week,
            month: this.limitData.month,
            total: this.limitData.total,
            ruleType: String(this.$route.query.type) === '0' ? 'noCoupons' : 'extraActivity'
          }
        })
        return
      }
      // 用户获取限制数据
      this.saveAwardsData.userGetLimitData = this.userGetLimitData
      this.$emit('editAwards', this.saveAwardsData)
    },
    // 删除奖项
    removeAwards(nameIndex) {
      // console.log(this.awardsData[nameIndex].awardsId)
      this.$confirm('确认删除奖项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('removeAwards', this.awardsData[nameIndex.split('_')[1]].awardsId)
        })
        .catch(() => {})
    },
    // 奖项tab切换
    awardsTabClick(tab) {
      this.saveAwardsData = this.awardsData[tab.index]
      this.ruleTabActiveName = 'ruleTabActiveName_0'
      // 根据奖项id，获取用户获取限制数据
      // tab.$attrs.awardsId
      this.userGetlimit(tab.$attrs.awardsId)
    },
    // 用户获取限制数据
    userGetlimit(id) {
      let reqParams = {
        entranceId: id
      }
      queryAwardsGetList(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          let data = res.data || {}
          this.userGetLimitData = {
            prizeDailyRedisGet: data.prizeDailyRedisGet ? data.prizeDailyRedisGet.calValue : '',
            prizeWeeklyRedisGet: data.prizeWeeklyRedisGet ? data.prizeWeeklyRedisGet.calValue : '',
            prizeMonthlyRedisGet: data.prizeMonthlyRedisGet ? data.prizeMonthlyRedisGet.calValue : '',
            prizeTotalRedisGet: data.prizeTotalRedisGet ? data.prizeTotalRedisGet.calValue : '',
            prizeDailyRedisGetId: data.prizeDailyRedisGet ? data.prizeDailyRedisGet.ruleId : '',
            prizeWeeklyRedisGetId: data.prizeWeeklyRedisGet ? data.prizeWeeklyRedisGet.ruleId : '',
            prizeMonthlyRedisGetId: data.prizeMonthlyRedisGet ? data.prizeMonthlyRedisGet.ruleId : '',
            prizeTotalRedisGetId: data.prizeTotalRedisGet ? data.prizeTotalRedisGet.ruleId : ''
          }
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.prize-content {
  .edit-btn {
    top: 20px;
    right: 20px;
    z-index: 1;
  }
}
</style>
