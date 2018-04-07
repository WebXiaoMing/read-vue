<template>
  <transition name="switch-box">
    <div class="switch-box-wrapper" v-show="showFlag">
      <div class="tip"></div>
      <scroll class="switch-content" ref="switchContent" :data="data">
        <div>
          <div class="switch-item" v-for="(item, index) in data"
                                  @click.stop="checkSwitch(item, index)"
                                  ref="item"
          ><span class="text">{{item.name}}</span><i class="icon-ok" v-show="index === currentIndex"></i></div>
        </div>
      </scroll>
    </div>
   </transition>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  export default {
    props: {
      data: {
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
      checkSwitch (item, index) {
        this.hide()
        this.$emit('checkSwitch', item, index)
      }
    },
    components: {
      Scroll
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  .switch-box-wrapper
    position fixed
    right 0.5rem
    .tip
      position absolute
      top 0
      right 0.875rem
      border 0.5rem solid
      border-color transparent transparent #4a4a4a transparent
      transform translate(0, -100%)
    .switch-content
      padding 0 1rem
      box-sizing border-box
      background #4a4a4a
      overflow hidden
      border-radius 0.5rem
      height 11.375rem
      .switch-item
        height 2.75rem
        line-height 2.75rem
        border-bottom 2px solid #595959
        &:last-child
          border none
        .text
          margin-right 0.5rem
        .icon-ok
          color $theme-color
  .switch-box-enter-active, .switch-box-leave-active
    transform-origin 100% 0%
    transition all 0.3s
  .switch-box-enter, .switch-box-leave-to
    transform rotate(60deg)
    opacity 0
</style>
