<template>
  <div class="paymentScene">
    <div class="imgtitle">
      <img src="../assets/images/Oval.png" width="100%">
      <div class="logoBak">
        <a href="https://m.jr.jd.com"><img src="../assets/images/GroupTitle.png" width="155"/></a>
      </div>
      <div class="imgBottomds">
        <div class="centerOne">
          <img src="../assets/images/Oval Copy2.png" />
        </div>
        <div class="centerTwo">
          <img src="../assets/images/Oval Copy5.png" />
        </div>
        <img src="../assets/images/CombinedShape.png" width="100%" />
        <ul class="imgbotmUl">
          <li>
            <img src="../assets/images/Group13.png" width="35%" />
            <p class="pingFangSem firstPsty">首单立减</p>
            <p class="pingFangMed secondPsty">最低3元起</p>
          </li>
          <li>
            <img src="../assets/images/Group16.png" width="35%"/>
            <p class="pingFangSem firstPsty">后返积分</p>
            <p class="pingFangMed secondPsty">信用卡</p>
          </li>
          <li>
            <img src="../assets/images/Group17.png" width="35%" />
            <p class="pingFangSem firstPsty">随机减</p>
            <p class="pingFangMed secondPsty">最高99元</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="secondBody">
      <h2 class="pingFangSem">推荐银行</h2>
      <p class="pingFangMed">名额有限先到先得，以支付时收银台展示信息为准</p>
    </div>
    <div class="bankAll">
      <ul>
        <li class="listy" v-for="(item, i) in mylist" :key="i">
          <img :src="item.logoUrl" width="32%"/>
          <p class="bankHome pingFangSem">{{item.mainTitle}}</p>
          <P class="bankHome pingFangSem">{{item.subTitle}}</P>
          <p class="pingFangMed bankYh">{{item.mainDesc}}</p>
        </li>
        <li class="clear"></li>
      </ul>
    </div>
    <div class="gohomes">
      <a class="pingFangSem" :href="goBank">去绑卡</a>
    </div>
  </div>
</template>

<script>
function transformRequest (data) {
  var ret = ''
  for (var it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}
export default {
  name: 'paymentScene',
  data () {
    return {
      goBank: '',
      mylist: [{
        logoUrl: '', // 银行小图标
        mainTitle: '', // 银行信息
        subTitle: '', // 银行活动规则
        mainDesc: '' // 活动简单介绍
      }]
    }
  },
  activated () {
    this.getReturnUrl()
  },
  methods: {
    getReturnUrl () {
      var x = document.cookie.split(';')
      console.log(x)
      this.goBank = 'http://www.jd.com?returnUrl=' + this.$route.query.returnUrl
      this.$http.post(
        'http://mk.jd.com/marketing/resource/queryBindCardResource',
        transformRequest({jdPin: 'fxm2017'})
      )
        .then((res) => {
          let data = res.data || []
          if (data.respCode === '00000') {
            this.mylist = data.resourceInfo || []
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped>

</style>
