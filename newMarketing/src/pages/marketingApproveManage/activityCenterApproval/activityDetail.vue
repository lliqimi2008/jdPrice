<template>
  <div class="activity-detail display-table">
    <!-- 为了可维护性，根据不同活动类型渲染不同活动详情模板 -->
    <component :is="detailTemplate" :data="detailData" @editActivity="editActivity"></component>
    <!-- 奖项信息 -->
    <div class="pub-sm-title clear" slot="header">
      <h3 class="fl">奖项信息</h3>
    </div>
    <prize-info-detail :awardsData="awardsDtos" :limitData="limitData"></prize-info-detail>
  </div>
</template>

<script>
import { awardsMixins } from 'common/awards.mixins'
import prizeInfoDetail from 'components/prizeInfo/prizeInfoDetail'
import detailsObj from './detailTemplate/details'
export default {
  name: 'activityDetail',
  mixins: [awardsMixins],
  components: {
    prizeInfoDetail,
    detailsObj
  },
  data() {
    return {
      detailData: {},
      detailTemplate: null
    }
  },
  activated() {
    this.init()
    this.getAwardsInfo()
  },
  methods: {
    init() {
      // 筛选详情模板
      this.detailTemplate = detailsObj['noCouponDetail']
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
          activityId: this.$route.query.activityId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped="scoped">
</style>
