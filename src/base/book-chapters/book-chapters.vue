<template>
<transition name="fade">
  <div class="chapters" v-show="showFlag">
    <div class="chapters-title">
      <i class="icon-back" @click="hide"></i>
      <div class="book-title-info">
        <h1 class="book-name">{{title}}</h1>
        <p class="book-author">{{author}}</p>
      </div>
    </div>
    <div class="chapters-group">
      <scroll class="chapters-content" :data="chapters">
        <div class="chapters-list">
          <p class="item" v-for="(item, index) in chapters" @click.stop.prevent="selectChapter(item, index)">{{item.title}}</p>
        </div>
        <div class="loading-wrapper" v-show="!chapters || !chapters.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
  </div>
</transition>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'

  export default {
    props: {
      chapters: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: ''
      },
      author: {
        type: String,
        default: ''
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
      selectChapter (item, index) {
        this.$emit('select', item, index)
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>
<style lang="stylus">
  @import '~common/stylus/variable.styl'
  .chapters
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 10
    width 100%
    height 100%
    background $background-color
    color $font-color
    .chapters-title
      height 2.75rem
      position relative
      background $background-color-d
      .icon-back
        display inline-block
        width 2rem
        line-height 2.75rem
        text-align center
        font-size $font-size-large-x
        color $theme-color
      .book-title-info
        width 70%
        position absolute
        height 100%
        top 0
        left 15%
        text-align center
        .book-name
          font-size $font-size-medium-x
          line-height 1.5rem
          color $font-color-dd
        .book-author
          font-size $font-size-medium
    .chapters-group
      position fixed
      top 2.75rem
      left 0
      right 0
      bottom 0
      background $background-color-m
      .chapters-content
        overflow hidden
        height 100%
        width 100%
        .chapters-list
          .item
            line-height 3.125rem
            box-sizing border-box
            border-top 1px solid #fff
            border-bottom 1px solid $border-color
            font-size $font-size-medium
            text-indent 1rem
  .fade-enter-active, .fade-leave-active
    transition all 0.3s
  .fade-enter, .fade-leave-to
    transform translate3d(100%, 0, 0)
    opacity 0
</style>

