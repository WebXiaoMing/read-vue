<template>
<transition name="reviews">
  <div class="reviews-wrapper" v-show="showFlag">
    <div class="reviews-title">
      <div class="back" @click="hide">
        <i class="icon-back"></i>
        <h1 class="title">书评区</h1>
      </div>
    </div>
    <div class="reviews-content">
      <reviews :data="data"></reviews>
    </div>
  </div>
</transition>
</template>
<script type="text/ecmascript-6">
  import Reviews from 'base/reviews/reviews'

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      }
    },
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
    .reviews-title
      position fixed
      top 0
      left 0
      right 0
      height 2.75rem
      line-height 2.75rem
      background $theme-color
      color $font-color-ll
      .back
        height 100%
        width 2rem
        text-align center
        font-size $font-size-large-x
      .title
        position absolute
        top 0
        left 15%
        width 70%
        text-align center
    .reviews-content
      position fixed
      top 2.75rem
      left 0
      right 0
      bottom 0
      width 100%

  .reviews-enter-active, .reviews-leave-active
    transition all 0.3s
  .reviews-enter, .reviews-leave-to
    opacity 0
    transform translate3d(-100%, 0, 0)
</style>
