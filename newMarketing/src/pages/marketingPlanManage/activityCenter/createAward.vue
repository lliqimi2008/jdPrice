<template>
  <div class="">
    <div class="pub-sm-title clear">
      <h3 class="fl">奖项信息</h3>
      <el-row class="fr">
        <el-button size="mini" v-hasPermissions="'marketingPlanManage:createAward:addNewAward'" type="primary" @click="addAward">{{createActivity == 1 ? '去关联奖品' : '添加新奖项'}}</el-button>
      </el-row>
    </div>

    <not-data v-if="!awardsDtos.length && !showAddAward" text="暂无奖项信息">
      <app-loading slot="loading" :height="80" v-if="awardsLoading"></app-loading>
    </not-data>
    <!--
      查询奖项信息列表
      @removeAwards: 删除奖项
    -->
    <prize-info-detail
      :isShowClosable="true"
      :awardsData="awardsDtos"
      @removeAwards="removeAwards"
      @editAwards="editAwards"
      v-show="awardsDtos.length"></prize-info-detail>
    <!--
      创建奖项信息
      @getAwardsInfo: 请求奖项信息(需要请求活动详情及规则数据接口)
    -->
    <prize-info
      :show="showAddAward"
      :oldData="oldData"
      @cancelCreate="showAddAward = false"
      @getAwardsInfo="getAwardsInfo"></prize-info>

    <div class="btns mar-b-20 text-center" v-if="awardsDtos.length && !showAddAward">
      <el-button type="primary" @click="toPlanDetail">完成所有奖项创建并跳转</el-button>
    </div>
  </div>
</template>

<script>
import { awardsMixins } from 'common/awards.mixins'
import {
  deleteAwards,
  deleteAwardsRuleGroup
} from 'api/service'
import notData from 'components/notData/notData'
import prizeInfo from 'components/prizeInfo/prizeInfo'
import prizeInfoDetail from 'components/prizeInfo/prizeInfoDetail'
export default {
  name: 'createAward',
  mixins: [awardsMixins],
  components: {
    notData,
    prizeInfo,
    prizeInfoDetail
  },
  data() {
    return {
      awardsLoading: false,
      showAddAward: false,
      oldData: {},
      detailDeta: {},
      tempAwardsDtos: [],
      awardsDtos: [],
      createActivity: 0
    }
  },
  deactivated() {
    this.$destroy(true)
  },
  activated() {
    this.createActivity = this.$route.query.createActivity
    // 调用奖项信息接口，调试规则数据拼接
    this.getAwardsInfo()
  },
  methods: {
    // 删除奖项
    removeAwards(awardsId) {
      this.deleteAwards(
        {
          awardsId
        },
        () => {
          this.deleteAwardsRuleGroup({
            awardsId,
            activityId: this.$route.query.activityId
          })
        }
      )
    },
    // 删除奖项
    deleteAwards(reqParams, callback) {
      deleteAwards(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          // 删除成功，重新请求
          callback && callback()
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 删除奖项下对应的规则组
    deleteAwardsRuleGroup(reqParams) {
      deleteAwardsRuleGroup(reqParams)
        .then(res => {
          if (!this.httpThen(this, res)) return
          // 删除成功，重新请求
          this.getAwardsInfo()
        })
        .catch((err) => {
          this.httpCatch(this, err)
        })
    },
    // 显示创建奖项
    addAward() {
      this.showAddAward = true
      this.oldData = {}
    },
    // 编辑奖项，携带奖项下的所有数据进行回填
    editAwards(data) {
      this.showAddAward = true
      this.oldData = data
    },
    // 跳转详情页
    toPlanDetail() {
      // 创建成功，跳转创建奖项
      this.$router.push({
        path: '/marketingPlanManage/planDetail',
        query: {
          planId: this.$route.query.planId
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
