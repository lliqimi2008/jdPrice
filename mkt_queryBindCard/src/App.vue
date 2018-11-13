<template>
  <div id="app">
  <keep-alive>
    <router-view/>
  </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  height: 100%;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
