<template>
  <div class="confirm-wrapper" v-show="showFlag">
    <div class="confirm-box">
      <div class="top-title">
        <h1 class="max-title">加入书架</h1>
        <h2 class="min-title">喜欢这本书就加入书架吧？</h2>
      </div>
      <div class="item cancel" @click="selectCancel">取消</div>
      <div class="item confirm" @click="selectConfirm">确定</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      maxTitle: {
        type: String,
        default: '加入书架'
      },
      minTitle: {
        type: String,
        default: '喜欢这本书就加入书架吧？'
      },
      cancel: {
        type: String,
        default: '确认'
      },
      confirm: {
        type: String,
        default: '取消'
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
      selectCancel () {
        this.$emit('selectCancel')
        this.hide()
      },
      selectConfirm () {
        this.$emit('selectConfirm')
        this.hide()
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'

  .confirm-wrapper
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 998
    background rgba(0, 0, 0, 0.5)
    .confirm-box
      position absolute
      top 50%
      left 50%
      margin -3.90625rem 0 0 -8.4375rem
      width 16.875rem
      height 7.8125rem
      background $confirm-color
      border-radius 1rem
      .top-title
        height 3.75rem
        padding-top 1.25rem
        border-bottom 1px solid #ccc
        text-align center
        .max-title
          font-size $font-size-large-x
          color $font-color-dd
          font-weight 600
        .min-title
          font-size $font-size-medium-x
          color $font-color-dd
          line-height 2rem
      .item
        width 50%
        height 2.75rem
        float left
        line-height 2.75rem
        font-size $font-size-large-x
        color $theme-color
        text-align center
        box-sizing border-box
        border-right 1px solid #ccc
        &.confirm
          border none
</style>

