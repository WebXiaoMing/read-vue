<template>
  <transition name="setting">
    <div v-show="showFlag">
      <div class="back-group">
        <div class="back-content" @click.stop="back">
          <i class="icon-arrow"></i>
          <span>返回</span>
        </div>
      </div>
      <div class="setting-wrapper" v-show="showFlag && setting">
        <div class="setting-color">
          <div class="color-item" v-for="(item, index) in color">
            <span class="item" :style="{'background': item}"
                              :class="{'active': index === currentIndex}"
                              @click="changeColor(item, index)"
            >
              <i class="icon-tick" v-show="index === currentIndex"></i>
            </span>
          </div>
        </div>
        <div class="setting-font">
          <div class="font-item" @click="minusFontSize">
            <span class="font-btn">A-</span>
          </div>
          <div class="font-item" @click="addFontSize">
            <span class="font-btn">A+</span>
          </div>
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
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        setting: false,
        color: ['#f6f6f6', '#e1d4b2', '#bed8ab', '#efc1c1', '#dcc49e', '#d9e8ff']
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
        this.setting = !this.setting
        this.$emit('openSetting')
      },
      changeColor (item, index) {
        this.$emit('changeColor', item, index)
      },
      minusFontSize () {
        this.$emit('minusFontSize')
      },
      addFontSize () {
        this.$emit('addFontSize')
      }
    },
    watch: {
      showFlag (newS) {
        if (newS === false) {
          this.setting = false
        }
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
      .icon-wrapper
        font-size 0.875rem
      .title
        font-size $font-size-small-s
        line-height 22px
  .back-group
      position fixed
      top 0
      left 0
      z-index 10
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
  .setting-wrapper
    position fixed
    left 0
    right 0
    bottom 3.125rem
    background rgba(0,0,0, 0.85)
    .setting-color, .setting-font
      padding 0.875rem
      box-sizing border-box
      border-bottom 1px solid $border-color-dd
      width 100%
      display flex
      justify-content space-between
      .item
        display inline-block
        width 2rem
        height 2rem
        text-align center
        line-height 2rem
        border-radius 50%
        box-sizing border-box
        background #ccc
        &.active
          color #ff4444
          border 1px solid #ff4444
          &.icon-tick
            font-size $font-size-medium
            color #ff4444
      .font-btn
        display inline-block
        width 9rem
        height 2.4rem
        text-align center
        line-height 2.4rem
        border 1px solid $border-color-d
        border-radius 1.2rem
        color $font-color-l
        font-size $font-size-large-x
        box-sizing border-box



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

