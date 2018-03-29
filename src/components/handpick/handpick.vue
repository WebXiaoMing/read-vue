<template>
  <div class="handpick-wrapper">
    <div class="top-title">
      <div class="switch-wrapper">
        <span class="man-title">男生</span>
        <span class="arrow-btn"><i class="icon-arrow"></i></span>
      </div>
      <div class="title">精选</div>
    </div>
    <scroll class="container" :data="list">
      <div>
        <div class="slider-wrapper">
            <div class="slider-content">
              <slider>
              </slider>
            </div>
          </div>
        <div class="book-list-wrapper recommend">
          <recommend-list></recommend-list>
          <recommend-list></recommend-list>
        </div>
        <div class="book-list-wrapper hot"></div>
        <div class="book-list-wrapper finish"></div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import RecommendList from 'base/recommend-list/recommend-list'

  export default {
    data () {
      return {
        list: []
      }
    },
    created () {
    },
    methods: {
    },
    components: {
      Slider,
      RecommendList,
      Scroll
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .handpick-wrapper
    position fixed
    top 0
    left 0
    right 0
    bottom 3.125rem
    height 100%
    background $background-color-d
    .top-title
      position fixed
      top 0
      left 0
      z-index 998
      width 100%
      height: 3.125rem
      background $theme-color
      color $font-color-ll
      line-height 3.125rem
      .switch-wrapper
        line-height 3.125rem
        padding-left 1rem
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
    .container
      position relative
      left 0
      bottom 3.125rem
      top 3.125rem
      right 0
      width 100%
      height 100%
      overflow hidden
      .slider-wrapper
        position relative
        left 0
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
      .book-list-wrapper
        margin-top 0.625rem
        padding 0 1rem
        background $background-color
</style>
