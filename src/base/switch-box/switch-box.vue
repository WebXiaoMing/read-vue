<template>
  <transition name="switch-box">
    <div class="switch-box-wrapper" v-show="showFlag">
      <div class="tip"></div>
      <div class="switch-content">
        <div class="switch-item" v-for="(item, index) in title"
                                @click.stop="checkSwitch(index)"
        >{{item}}<i class="icon-ok" v-show="index === currentIndex"></i></div>
      </div>
    </div>
   </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      checkSwitch (index) {
        this.hide()
        this.$emit('checkSwitch', index)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  .switch-box-wrapper
    position relative
    .tip
      position absolute
      top 0
      left 0.875rem
      border 0.5rem solid
      border-color transparent transparent #4a4a4a transparent
      transform translate(0, -100%)
    .switch-content
      width 6.875rem
      padding 0 1rem
      box-sizing border-box
      background #4a4a4a
      overflow hidden
      border-radius 0.5rem
      .switch-item
        height 2.75rem
        line-height 2.75rem
        border-bottom 2px solid #595959
        &:last-child
          border none
        .icon-ok
          margin-left 2rem
          color $theme-color
  .switch-box-enter-active, .switch-box-leave-active
    transform-origin 20% 0%
    transition all 0.3s
  .switch-box-enter, .switch-box-leave-to
    transform rotate(-60deg)
    opacity 0
</style>

