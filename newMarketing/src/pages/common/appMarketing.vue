<template>
  <div class="app-wrap">
    <app-header></app-header>
    <tree-menu></tree-menu>
    <breadcrumb></breadcrumb>
    <div ref="container" class="container">
      <div class="scroll-content">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import appHeader from 'components/header/header'
import breadcrumb from 'components/breadcrumb/breadcrumb'
import TreeMenu from 'components/treeMenu/treeMenu'
export default {
  components: {
    appHeader,
    breadcrumb,
    TreeMenu
  },
  mounted() {
    this.initHeight()
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.initHeight()
      }, 200)
    })
  },
  methods: {
    initHeight() {
      let container = this.$refs.container
      let winHei = document.documentElement.offsetHeight || document.body.offsetHeight
      // let winWid = document.documentElement.offsetWidth || document.body.offsetWidth
      let breadcrumb = document.querySelector('.breadcrumb')
      let header = document.querySelector('.header')
      // container.style.width = winWid - 200 + 'px'
      container.style.height = winHei - (breadcrumb.offsetHeight + header.offsetHeight + 10) + 'px'
    }
  }
}
</script>

<style>
.container{
  /* width: 100%; */
  height: 100%;
  position: relative;
  overflow-y: scroll;
}
</style>
