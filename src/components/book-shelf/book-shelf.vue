<template>
  <div class="book-shelf-wrapper">
    <div class="top-bar"></div>
    <scroll :bounce="bounce" class="book-shelf-content" :data="[]">
      <div>
        <div class="recent-box">
          <div class="recent-book-wrapper">
            <div class="image">
              <img src="" alt="">
            </div>
            <div class="book-info">
              <h1 class="book-name">斗罗大陆3龙王传说</h1>
              <h2 class="book-author">唐家三少</h2>
              <p class="recent-read">楔子</p>
              <div class="continue-read">继续阅读</div>
            </div>
          </div>
        </div>
        <div class="library">
          <div class="library-item">
            <div class="library-item-wrapper">
              <div class="library-image">
                <img src="" alt="">
              </div>
              <div class="library-name">
                <p class="name">斗罗大陆3龙王传说</p>
              </div>
            </div>
          </div>
          <div class="library-item">
            <div class="library-item-wrapper">
              <div class="library-image">
                <img src="" alt="">
              </div>
              <div class="library-name">
                <p class="name">斗罗大陆3龙王传说大叫好好很舒服很多继父回家双方都快捷快递三跪九叩</p>
              </div>
            </div>
          </div>
          <div class="library-item">
            <div class="library-item-wrapper">
              <div class="library-image">
                <img src="" alt="">
              </div>
              <div class="library-name">
                <p class="name">斗罗大陆3龙王传说大叫好好很舒服很多继父回家双方都快捷快递三跪九叩</p>
              </div>
            </div>
          </div>
          <div class="library-item">
            <div class="library-item-wrapper">
              <div class="library-image">
                <img src="" alt="">
              </div>
              <div class="library-name">
                <p class="name">斗罗大陆3龙王传说大叫好好很舒服很多继父回家双方都快捷快递三跪九叩</p>
              </div>
            </div>
          </div>
          <div class="library-item">
            <div class="library-item-wrapper">
              <div class="library-image">
                <img src="" alt="">
              </div>
              <div class="library-name">
                <p class="name">斗罗大陆3龙王传说大叫好好很舒服很多继父回家双方都快捷快递三跪九叩</p>
              </div>
            </div>
          </div>
          <div class="library-item">
            <div class="library-item-wrapper">
              <div class="library-image">
                <img src="" alt="">
              </div>
              <div class="library-name">
                <p class="name">斗罗大陆3龙王传说大叫好好很舒服很多继父回家双方都快捷快递三跪九叩</p>
              </div>
            </div>
          </div>
          <div class="library-item">
            <div class="library-item-wrapper">
              <div class="library-image">
                <img src="" alt="">
              </div>
              <div class="library-name">
                <p class="name">斗罗大陆3龙王传说大叫好好很舒服很多继父回家双方都快捷快递三跪九叩</p>
              </div>
            </div>
          </div>
          <div class="library-item">
            <div class="library-item-wrapper">
              <div class="library-image">
                <img src="" alt="">
              </div>
              <div class="library-name">
                <p class="name">斗罗大陆3龙王传说大叫好好很舒服很多继父回家双方都快捷快递三跪九叩</p>
              </div>
            </div>
          </div>
          <div class="library-item">
            <div class="library-item-wrapper">
              <div class="library-image">
                <img src="" alt="">
              </div>
              <div class="library-name">
                <p class="name">斗罗大陆3龙王传说</p>
              </div>
            </div>
          </div>
          <div class="library-item">
            <div class="library-item-wrapper add-wrapper">
              <i class="icon-add"></i>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'

  export default {
    data () {
      return {
        bounce: false
      }
    },
    components: {
      Scroll
    }
  }
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.book-shelf-wrapper
  position fixed
  top 0
  left 0
  right 0
  top 0
  bottom 3.125rem
  overflow hidden
  .top-bar
    width 100%
    height 2.75rem
    background $theme-color
    position fixed
    top 0
    z-index 998
  .book-shelf-content
    width 100%
    height 100%
    overflow hidden
    .recent-box
      width 100%
      height 16.125rem
      background $theme-color
      .recent-book-wrapper
        width 70%
        margin 0 auto
        padding-top 5.25rem
        display flex
        .image
          width 6.375rem
          height 8.75rem
          background #fff
          border-radius 0.5rem
        .book-info
          flex 1
          text-align left
          width 152px
          margin-left 0.5rem
          color $font-color-ll
          line-height 1.75rem
          font-size $font-size-medium
          .book-name
            font-size $font-size-medium-x
            no-wrap(1)
          .recent-read,.book-name
            no-wrap(1)
          .continue-read
            width 5.0625rem
            height 1.75rem
            margin-top 0.25rem
            border 1px solid #fff
            border-radius 0.25rem
            text-align center
    .library
      background #fff
      display flex
      flex-flow row wrap
      justify-content space-between
      padding 1.25rem 1rem
      .library-item
        height 10.4375rem
        width 5.6875rem
        margin-bottom 0.625rem
        .library-item-wrapper
          width 100%
          height 100%
          margin 0 auto
          .library-image
            width 100%
            height 7.8125rem
            background #ccc
            border 1px solid $border-color
            border-radius 0.25rem
          .library-name
            vertical-align bottom
            width 100%
            height 2.625rem
            box-sizing border-box
            padding-top 0.625rem
            font-size $font-size-small
            color $font-color-d
            text-align left
            no-wrap(2)
            .name
              line-height 1rem
          &.add-wrapper
            height 7.8125rem
            line-height 7.8125rem
            font-size 2rem
            color $font-color-l
            background $background-color-d
            border 1px solid $border-color
            border-radius 0.25rem
            text-align center
</style>

