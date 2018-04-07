<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tabs></tabs>
    <book-text></book-text>
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
