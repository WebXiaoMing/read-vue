<template>
  <transition name="setting">
    <div v-show="showFlag">
      <div class="back-group">
        <div class="back-content" @click.stop="back">
          <i class="icon-arrow"></i>
          <span>返回</span>
        </div>
      </div>
      <div class="setting-btn">
        <div class="setting-item">
          <div class="icon-wrapper" @click="openChapters">
            <i class="icon-directory"></i>
          </div>
          <span class="title">设置</span>
        </div>
        <div class="setting-item" @click="changeMode">
          <i :class="modeCls"></i>
          <span class="title" v-text="modeText"></span>
        </div>
        <div class="setting-item" @click="openSetting">
          <i class="icon-setting"></i>
          <span class="title">设置</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      showFlag: {
        type: Boolean,
        default: false
      },
      isNight: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      modeCls () {
        return this.isNight ? 'icon-brightness' : 'icon-night'
      },
      modeText () {
        return this.isNight ? '白天' : '夜间'
      }
    },
    methods: {
      back () {
        this.$emit('back')
      },
      openChapters () {
        this.$emit('openChapters')
      },
      changeMode () {
        this.$emit('changeMode')
      },
      openSetting () {
        this.$emit('openSetting')
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  .setting-btn
    position fixed
    bottom 0
    left 0
    width 100%
    height 3.125rem
    background rgba(0,0,0, 0.85)
    display flex
    color $font-color-ll
    .setting-item
      flex 1
      text-align center
      display flex
      flex-direction column
      justify-content center
      font-size $font-size-medium
      .title
        font-size $font-size-small-s
        margin-top 0.375rem
  .back-group
      position fixed
      top 0
      left 0
      z-index 990
      width 100%
      height 2.75rem
      background rgba(0,0,0, 0.85)
      font-size 0.875rem
      line-height 2.75rem
      color #fff
      .back-content
        padding-left 1rem
        width 3.75rem
        .icon-arrow
          display inline-block
          transform rotate(180deg)
          margin-right 0.25rem
  .setting-enter-active, .setting-leave-active
    transition all 0.4s
    .back-group, .setting-btn
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  .setting-enter, .setting-leave-to
    opacity: 0
    .back-group
      transform translate3d(0, -100%, 0)
    .setting-btn
      transform translate3d(0, 100%, 0)
</style>

