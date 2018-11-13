<template>
  <div class="header clear">
    <div class="logo fl" style="font-size: 24px; font-weight: bold; color: #fff;">
            营销运营平台
    </div>
    <div class="quick-entry fr">
      <ul class="list clear">
        <li class="item">
          欢迎您: {{username}} ,
        </li>
        <li class="item cur" @click="loginOut">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from 'store'
import { LOGIN_OUT_URL } from 'common/config'
import { loginOut } from 'api/service'
export default {
  name: 'appHeader',
  data () {
    return {
      username: 'userName'
    }
  },
  activated() {
    this.username = store.getters.userInfo.userName
  },
  methods: {
    loginOut() {
      loginOut()
        .then((res) => {
          window.location.href = LOGIN_OUT_URL
        })
        .catch(() => {
          this.$message.error('服务器请求失败')
        })
    }
  }
}
</script>

<style lang="scss">
  .header {
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    color: #9eafda;
    background: #2253cb;
    box-shadow: 0 0 5px #bbb;
  }
  .quick-entry {
    .list .item {
      padding-left: 5px;
      float: left;
      transition: all .3s ease;
      &.cur:hover{
        color: #fff;
      }
    }
  }
</style>
