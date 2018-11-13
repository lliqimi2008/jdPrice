<template>
  <div class="bak_styOne pv">
    <h2 class="title_h2"><a :href="hrefUrl"></a></h2>
    <div class="bak_rightTop pa"></div>
    <div class="bak_leftMiddle pa"></div>
    <div class="bak_leftBottom pa"></div>
    <div class="bak_rightBottom pa"></div>
    <div class="gify_div pa">
      <div class="errImport" v-if="!activityTf">
        <div>
          <a :href="actityData.extensionMap.TP_APP_ERR_PAGE_BG_IMG_LINK" target="_blank">
            <img src="../assets/images/errDog.png" />
            <p>{{errImport.preferVouchers}}</p>
            <p>{{errImport.preferImport}}</p>
          </a>
        </div>
        <div>
          <a class="pv" :href="actityData.extensionMap.TP_APP_ERR_PAGE_BTN_REDIRECT_LINK" target="_blank">{{actityData.extensionMap.TP_APP_ERR_PAGE_BTN_DESC}}</a>
        </div>
      </div>
      <div class="sucessImport" v-if="activityTf">
        <div>
          <p class="title_sucess"><span>恭喜</span>您获得</p>
          <div class="redPackage" v-if="sw_flag&&banners.length">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div id="swiper" class="swiper-slide" v-for="(v,i) in actityData.prizeinfoList" :key="i">
                  <div class="redPackageDivli">
                    <div>
                      <p class="pMoney"><i>¥</i>{{v.assignedAmount}}</p>
                      <p class="importText">{{v.prizeName}}</p>
                    </div>
                    <div>
                      <p class="instrution">{{v.platformLimitDesc}}</p>
                      <p class="instTime">{{v.beginDate | formatDate}}-{{v.endDate | formatDate}}</p>
                    </div>
                  </div>
                </div>
              </div>
             </div>
          </div>
        </div>
        <div class="divLastChild pv">
          <a :href="actityData.extensionMap.TP_APP_SUC_PAGE_BTN_REDIRECT_LINK" target="_blank" class="sucessAgo">{{actityData.extensionMap.TP_APP_SUC_PAGE_BTN_DESC}}</a>
          <a class="toViewCoupon" target="_blank" :href="actityData.extensionMap.TP_APP_SUC_PAGE_BTN_REDIRECT_LINK">{{actityData.extensionMap.TP_APP_SUC_PAGE_BTN_DESC}}</a>
        </div>
      </div>
    </div>
    <div class="activedRules" @click="boxShow = true">
      <p>活动规则</p>
    </div>
    <div class="box animated fadeInRightBig" v-show="boxShow">
      <div class="boxChren">
        <h3>活动规则说明</h3>
        <p class="pactivedTxt" v-text="actityData.extensionMap.TP_APP_RULE_DESC"></p>
        <button class="determine" @click="boxShow = false">确定</button>
      </div>
    </div>
    <div class="advertising">
      <a :href="actityData.extensionMap.TP_APP_BANNER_IMG_REDIRECT_LINK" target="_blank"><img :src="actityData.extensionMap.TP_APP_BANNER_IMG_LINK" /></a>
    </div>
  </div>
</template>

<script>
import '../assets/js/rem.js'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {formatDate} from '../utils/util.js'
function transformRequest (data) {
  var ret = ''
  for (var it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}
export default {
  name: 'ledVouchers',
  data () {
    return {
      errText: {
        respDesc: ''
      },
      actityData: {
        activityName: '',
        extensionMap: {
          TP_APP_BANNER_IMG_LINK: '',
          TP_APP_ERR_PAGE_BG_IMG_LINK: 'http://www.jd.com',
          TP_APP_SUC_PAGE_BTN_DESC: '',
          TP_APP_TEMP_TITLE: '',
          TP_APP_ERR_PAGE_BTN_REDIRECT_LINK: 'http://www.jd4.com',
          TP_APP_SUC_PAGE_BTN_REDIRECT_LINK: '',
          TP_APP_BANNER_IMG_REDIRECT_LINK: '',
          TP_APP_SUC_PAGE_BG_IMG_LINK: '',
          TP_APP_ERR_PAGE_BTN_DESC: '更多优惠券'
        },
        prizeinfoList: [
          {
            assignedAmount: '',
            assignedAmountTip: '',
            beginDate: '',
            couponCanUseAmount: '',
            endDate: '',
            maxRewardAmount: '',
            platformLimitDesc: '',
            prizeAmount: '',
            prizeDesc: '',
            prizeId: '',
            prizeInstanceId: '',
            prizeName: '',
            prizeStatus: '',
            prizeType: '',
            shortPrizeDesc: '',
            validDays: ''
          }
        ],
        respCode: ''
      },
      sw_flag: 0,
      boxShow: false,
      hrefUrl: 'http://jr.jd.com',
      activityTf: true,
      errImport: {
        preferVouchers: '很遗憾，你没有领到奖',
        preferImport: '仅限京东支付新用户领取~'
      }
    }
  },
  activated () {
    this.getId()
  },
  filters: {
    formatDate (time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy.MM.dd')
    }
  },
  methods: {
    swiperInit () {
      /* eslint-disable no-new */
      new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationType: 'bullets',
        speed: 400,
        autoplay: true,
        loop: true,
        observer: true,
        observeParents: false
      })
    },
    getId () {
      this.sw_flag = 0
      let urlActiviyId = this.$route.query.activityId
      if (!urlActiviyId) {
        window.location.href = 'http://www.jd.com'
        return
      }
      if (urlActiviyId) {
        this.$http.post(
          'http://mkt.jd.com:8080/activity/pageTake/takePrize',
          transformRequest({activityId: this.$route.query.activityId})
        )
          .then((res) => {
            let data = res.data || {}
            if (data.respCode === 'A00000') {
              this.actityData = data
              this.activityTf = true
              if (data) {
                this.banners = data.prizeinfoList || ''
                this.sw_flag = 1
                this.$nextTick(function () {
                  if (this.banners.length) {
                    this.swiperInit()
                  }
                })
              }
            }
            if (data.respCode === 'A00001') {
              this.activityTf = false
              this.errImport.preferVouchers = data.respDesc
            }
            if (data.respCode === 'A00002') {
              this.activityTf = false
              this.errImport.preferVouchers = data.respDesc
            }
            if (data.respCode === 'A00003') {
              this.activityTf = false
              this.errImport.preferVouchers = data.respDesc
            }
            if (data.respCode === 'A00008') {
              this.activityTf = false
              this.errImport.preferVouchers = data.respDesc
            }
            if (data.respCode === 'A00004') {
              this.activityTf = false
              this.errImport.preferVouchers = '获取奖项规则失败'
            }
            if (data.respCode === 'A00005') {
              this.activityTf = false
              this.errImport.preferVouchers = '奖品已经被领走了~'
            }
            if (data.respCode === 'A00006') {
              this.activityTf = false
              this.errImport.preferVouchers = data.respDesc
            }
            if (data.respCode === 'A00007') {
              let urlActivityId = window.location.href
              let Urls = 'http://plogin.m.jd.com/user/login.action?appid=702&returnurl=' + urlActivityId
              window.location.href = Urls
            }
            if (data.respCode === 'A99999') {
              this.activityTf = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>
<style scoped>
.toViewCoupon{ text-decoration: underline;}
</style>
