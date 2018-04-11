<template>
  <div class="reviews-wrapper">
    <div class="reviews-title">
      <div class="back">
        <i class="icon-back"></i>
        <h1 class="title">书评区</h1>
      </div>
      <div class="reviews-content">
        <reviews></reviews>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Reviews from 'base/reviews/reviews'

  export default {
    components: {
      Reviews
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  .reviews-wrapper
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 100
    background $background-color-d
</style>
