<template>
  <div class="handpick-wrapper">
    <div class="top-title">
      <div class="switch-wrapper">
        <span class="man-title">男生</span>
        <span class="arrow-btn"><i class="icon-arrow"></i></span>
      </div>
      <div class="title">精选</div>
    </div>
    <div class="slider-wrapper">
      <div class="slider-content">
        <slider>
        </slider>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  export default {
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
    },
    components: {
      Slider
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .handpick-wrapper
    position relative
    top 0
    left 0
    right 0
    bottom 3.125rem
    overflow hidden
    .top-title
      position relative
      top 0
      left 0
      width 100%
      height: 3.125rem
      background $theme-color
      color $font-color-ll
      line-height 3.125rem
      .switch-wrapper
        line-height 3.125rem
        padding-left 1.125rem
        font-size 1rem
        .arrow-btn
          position absolute
          margin-left 0.625rem
          font-size 0.875rem
      .title
        position absolute
        width 70%
        left 15%
        top 0
        text-align center
        font-size $font-size-large
    .slider-wrapper
      position relative
      width 100%
      height 0
      padding-top 40%
      overflow hidden
      .slider-content
        position absolute
        top 0
        left 0
        width 100%
        height 100%
</style>
