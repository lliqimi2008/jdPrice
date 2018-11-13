<template>
  <div class="app-wrap">
    <app-header></app-header>
    <tree-menu></tree-menu>
    <!-- <div class="container">
      后台默认页,没有必要可以删除
      <router-view />
    </div> -->
    <div ref="container" class="container">
      <div class="scroll-content">
        后台默认页,没有必要可以删除
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import appHeader from 'components/header/header'
import TreeMenu from 'components/treeMenu/treeMenu'
export default {
  name: 'index',
  components: {
    appHeader,
    TreeMenu
  },
  data () {
    return {
      name: 'hello index'
    }
  }
}
</script>
