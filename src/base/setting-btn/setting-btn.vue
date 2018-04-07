<template>
  <transition name="setting">
    <div class="setting-btn" v-show="showFlag">
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
  .setting-enter-active, .setting-leave-active
    transition all 0.3s
  .setting-enter, .setting-leave-to
    transform translate3d(0, 100%, 0)
</style>

