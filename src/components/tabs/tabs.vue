<template>
  <div class="tab-wrapper">
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/bookshelf">
        <div class="tab-icon">
          <i class="icon icon-bookshelf"></i>
          <span class="icon-title">书架</span>
        </div>
      </router-link>
      <router-link tag="div" class="tab-item" to="/handpick/">
        <div class="tab-icon">
          <i class="icon icon-handpick"></i>
          <span class="icon-title">精选</span>
        </div>
      </router-link>
      <router-link tag="div" class="tab-item" to="/classify">
        <div class="tab-icon">
          <i class="icon icon-class"></i>
          <span class="icon-title">分类</span>
        </div>
      </router-link>
      <router-link tag="div" class="tab-item" to="/search">
        <div class="tab-icon">
          <i class="icon icon-search"></i>
          <span class="icon-title">搜索</span>
        </div>
      </router-link>
      <router-link tag="div" class="tab-item" to="/mine">
        <div class="tab-icon">
          <i class="icon icon-mine"></i>
          <span class="icon-title">我的</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.tab-wrapper
  position fixed
  bottom 0
  left 0
  width 100%
  height 3.125rem
  box-sizing border-box
  background $background-color-d
  border-top 1px solid $border-color
  .tab
    width 100%
    height 100%
    display flex
    align-items center
    .tab-item
      flex 1
      height 100%
      &.router-link-active
        color $theme-color
      .tab-icon
        text-align center
        display flex
        flex-direction column
        justify-content center
        align-items center
        height 100%
        .icon
          font-size $font-size-large-x
          margin-bottom 0.625rem
        .icon-title
          font-size $font-size-small-s
</style>

