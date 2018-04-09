<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tabs></tabs>
  </div>
</template>

<script type="text/ecmascript">
import Tabs from 'components/tabs/tabs'
import BookText from 'components/book-text/book-text'
export default {
  components: {
    Tabs,
    BookText
  }
}
</script>

<style scoped lang="stylus">
</style>
