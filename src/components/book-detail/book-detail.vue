<template>
<transition name="bookDetail">
  <div class="book-detail">
    <div class="top-title">
      <i class="icon-back"></i>
      <p class="top-book-name"></p>
    </div>
    <div class="book-detail-content">
      <div class="book-info-wrapper">
        <div class="book-image">
          <img src="">
        </div>
        <div class="book-info">
          <h1 class="book-name">完美人生</h1>
          <p class="book-author">刀一耕</p>
          <div class="rating-wrapper">
            <div class="rating-star"></div>
            <p class="rating-info">6.6分 (1.4万人评)</p>
          </div>
          <p class="category">都市 | 都市生活</p>
          <p class="words">461.0万字 | 连载</p>
        </div>
      </div>
      <div class="book-content"></div>
      <div class="book-class-wrapper"></div>
    </div>
    <div class="book-detail-btn"></div>
  </div>
</transition>
</template>
<script type="text/ecmascript-6">

</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  .book-detail
    position fixed
    z-index 1000
    top 0
    left 0
    right 0
    bottom 0
    background $background-color

  .bookDetail-enter-active, .bookDetail-leave-active
    transition all 0.3s
  .bookDetail-enter, .bookDetail-leave-to
    transform translate3d(100%, 0, 0)
    opacity 0
</style>

