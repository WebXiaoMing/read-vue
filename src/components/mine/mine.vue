<template>
  <div class="mine-wrapper">
    <div class="mine-header">
      <div class="mine-title">
        <i class="icon-news"></i>
        <i class="icon-setting"></i>
      </div>
      <div class="mine-info">
        <img class="mine-image" src="./images.jpg"/>
        <div class="mine-info-text">
          <p class="name">_撒手没_</p>
          <p class="mine-ticket">10 月票 | 20 推荐票</p>
        </div>
      </div>
    </div>
    <div class="mine-content">
      <div class="mine-balance">
        <p class="balance-text">账户余额 0 点</p>
        <p class="balance-btn">充值</p>
      </div>
      <ul class="mine-info-list">
        <li class="mine-info-item">
          <p class="item-text"><i class="icon-rank"></i>我的等级</p>
          <p class="item-arrow">Lv8 <i class="icon-arrow"></i></p>
        </li>
        <li class="mine-info-item">
          <p class="item-text"><i class="icon-read"></i>我的阅历</p>
          <p class="item-arrow">小白<i class="icon-arrow"></i></p>
        </li>
        <li class="mine-info-item">
          <p class="item-text"><i class="icon-love"></i>阅读偏好</p>
          <p class="item-arrow"><i class="icon-arrow"></i></p>
        </li>
        <li class="mine-info-item">
          <p class="item-text"><i class="icon-handpick"></i>粉丝称号</p>
          <p class="item-arrow"><i class="icon-arrow"></i></p>
        </li>
        <li class="mine-info-item">
          <p class="item-text"><i class="icon-bookmark"></i>签到</p>
          <p class="item-arrow"><i class="icon-arrow"></i></p>
        </li>
        <li class="mine-info-item">
          <p class="item-text"><i class="icon-pen"></i>成为作家</p>
          <p class="item-arrow"><i class="icon-arrow"></i></p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  .mine-wrapper
    padding 0 1rem
    .mine-header
      position fixed
      top 0
      left 0
      right 0
      height 7.8125rem
      color #fff
      background $theme-color
      .mine-title
        line-height 2.25rem
        text-align right
        padding 0 1rem
        font-size $font-size-large
        .icon-setting
          margin-left 0.5rem
      .mine-info
        padding 0 1rem
        margin-top 1rem
        display flex
        .mine-image
          width 4.0625rem
          height 4.0625rem
          border-radius 50%
          margin-right 1rem
        .mine-info-text
          display flex
          flex-direction column
          justify-content center
          .name
            margin-bottom 0.5rem
          .mine-ticket
            font-size $font-size-medium
    .mine-content
      position fixed
      top 7.8125rem
      left 0
      right 0
      background $background-color-d
      .mine-balance
        padding 0 1rem
        height 3.5rem
        line-height 3.5rem
        background #fff
        display flex
        margin-bottom 0.5rem
        .balance-text
          flex 1
          color $border-color-dd
        .balance-btn
          width 4rem
          height 1.875rem
          line-height 1.875rem
          text-align center
          background $theme-color
          color #fff
          margin auto 0
          border-radius 0.25rem
      .mine-info-list
        padding 0 1rem
        background #fff
        .mine-info-item
          display flex
          line-height 3rem
          border-bottom 1px solid $border-color
          .item-text
            font-size $font-size-medium-x
            color $font-color-dd
            flex 1
            i
              margin-right 0.5rem
              color $theme-color
          .item-arrow
            font-size $font-size-medium
            color $font-color
            .icon-arrow
              margin-left 0.25rem
</style>
