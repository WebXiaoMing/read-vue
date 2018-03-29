<template>
  <div class="recommend">
    <div class="recommend-title-wrapper">
      <div class="recommend-title">
        <span class="line-icon"></span>
        <span class="recommend-name">主编力荐</span>
      </div>
      <div class="recommend-more">
        <span class="more-text">查看更多</span>
        <i class="icon-arrow"></i>
      </div>
    </div>
    <div class="recommend-book-list">
      <div class="recommend-top-book">
        <div class="top-book-left">
          <img class="book-image" src="./图层 6.png" />
        </div>
        <div class="top-book-right">
          <h1 class="top-book-name">神医凤后：傲娇暴君，强势回归啊哈哈哈</h1>
          <p class="top-book-short">大墟的祖训说，天黑，别出门。大墟残老村的老弱病残们从江边捡到了一个婴儿，取名秦牧，含辛茹苦将他养大。这一天夜......</p>
          <div class="top-book-info">
            <div class="book-author">
              <i class="icon-author"></i>
              <span class="author-name">苏小暖</span>
            </div>
            <div class="book-info">
              <span class="book-genre">玄幻</span>
              <span class="book-pop">1000人气</span>
            </div>
          </div>
        </div>
      </div>
      <div class="book-list">
        <div class="book-item">
          <img class="book-item-image" src="./图层 6.png" />
          <p class="book-item-name">凡人修仙之仙界篇</p>
          <p class="book-item-author">忘语</p>
        </div>
        <div class="book-item">
          <img class="book-item-image" src="./图层 6.png" />
          <p class="book-item-name">凡人修仙之仙界篇</p>
          <p class="book-item-author">大叫好啊</p>
        </div>
        <div class="book-item">
          <img class="book-item-image" src="./图层 6.png" />
          <p class="book-item-name">凡人修仙之仙界篇</p>
          <p class="book-item-author">忘语大家好</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

</script>
<style scoped lang="stylus">
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  .recommend-title-wrapper
    width 100%
    height 3.125rem
    line-height 3.125rem
    vertical-align middle
    color $font-color-d
    .recommend-title
      float left
      .line-icon
        display inline-block
        height 1.125rem
        width 0.1875rem
        background $theme-color
        vertical-align middle
      .recommend-name
        font-size $font-size-medium-x
    .recommend-more
      float right
      font-size $font-size-medium
  .recommend-book-list
    .recommend-top-book
      width 100%
      height 7.8125rem
      padding 0.75rem 0
      border-bottom 1px solid $border-color
      display flex
      .top-book-left
        width 5.625rem
        margin-right 1rem
        height 100%
        .book-image
          width 100%
          height 100%
          border-radius 0.25rem
          border 1px solid $border-color
      .top-book-right
        flex 1
        display flex
        height 100%
        flex-direction column
        .top-book-name
          font-size $font-size-medium-x
          color $font-color-dd
          height 2rem
          line-height 2rem
          no-wrap(1)
        .top-book-short
          font-size $font-size-medium
          text-indent 1.5em
          color $font-color
          line-height 1.25rem
          no-wrap(3)
        .top-book-info
          flex 1
          position relative
          width 100%
          vertical-align bottom
          .book-author
            position absolute
            left 0
            bottom 0
            font-size $font-size-small
            color $font-color
          .book-info
            position absolute
            right 0
            bottom 0
            font-size $font-size-small-s
            color $font-color
            span
              display inline-block
              height 0.75rem
              line-height 0.75rem
              padding 0 0.125rem
              border 1px solid $font-color
    .book-list
      display flex
      justify-content space-between
      padding 0.75rem 0
      height 11.375rem
      width 100%
      .book-item
        width 5.625rem
        height 100%
        display flex
        flex-direction column
        .book-item-image
          width 100%
          height 7.8125rem
          border-radius 0.25rem
        .book-item-name
          font-size $font-size-medium
          color $font-color-d
          padding 0.625rem 0
          no-wrap(2)
        .book-item-author
          height 1rem
          font-size $font-size-small
          color $font-color
</style>
