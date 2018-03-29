<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tabs></tabs>
  </div>
</template>

<script type="text/ecmascript">
import Tabs from 'components/tabs/tabs'
export default {
  components: {
    Tabs
  }
}
</script>

<style scoped lang="stylus">
</style>
