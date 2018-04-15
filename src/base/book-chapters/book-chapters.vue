<template>
<transition name="fade">
  <div class="chapters" v-show="showFlag">
    <div class="chapters-title">
      <i class="icon-back" @click="hide"></i>
      <div class="book-title-info">
        <h1 class="book-name">{{title}}</h1>
        <p class="book-author">{{author}}</p>
      </div>
      <p class="reverse" @click="reverseChapters">倒序</p>
    </div>
    <div class="chapters-group">
      <scroll class="chapters-content" :data="chapters" ref="chapterList">
        <div class="chapters-list">
          <p class="item" v-for="(item, index) in chaptersList"
                          @click.stop.prevent="selectChapter(item, index)"
                          :class="{'isVip': item.isVip}"
                          >
            <span class="item-text">{{item.title}}</span><i v-show="item.isVip" class="icon-lock"></i>
          </p>
        </div>
        <div class="loading-wrapper" v-show="!chaptersList || !chaptersList.length">
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
        showFlag: false,
        chaptersList: [],
        isReverse: false
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
        if (item.isVip) {
          return
        }
        let currentIndex = this.isReverse ? this.chaptersList.length - 1 - index : index
        this.$emit('select', item, currentIndex)
      },
      refresh () {
        this.$refs.chapterList && this.$refs.chapterList.refresh()
      },
      reverseChapters () {
        this.chaptersList.reverse()
        this.isReverse = !this.isReverse
      }
    },
    watch: {
      chapters () {
        this.chaptersList = this.chapters.slice()
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
      display flex
      flex-direction row
      background $background-color-d
      .icon-back
        display inline-block
        width 2rem
        line-height 2.75rem
        text-align center
        font-size $font-size-large-x
        color $theme-color
      .reverse
        padding-right 1rem
        line-height 2.75rem
        font-size $font-size-medium
      .book-title-info
        height 2.75rem
        flex 1
        text-align center
        display flex
        flex-direction column
        .book-name
          line-height 1.5rem
          font-size $font-size-medium-x
          color $font-color-dd
        .book-author
          flex 1
          font-size $font-size-medium
          line-height 1.25rem
    .chapters-group
      position fixed
      top 2.75rem
      left 0
      right 0
      bottom 0
      background $background-color-m
      .chapters-content
        width 100%
        height 100%
        overflow hidden
        .chapters-list
          .item
            line-height 3.125rem
            box-sizing border-box
            border-top 1px solid #fff
            border-bottom 1px solid $border-color
            font-size $font-size-medium
            padding 0 1rem
            box-sizing border-box
            display flex
            &.isVip
              color $font-color-l
            .item-text
              flex 1
            .icon-lock
              line-height 3.125rem
  .fade-enter-active, .fade-leave-active
    transition all 0.3s
  .fade-enter, .fade-leave-to
    transform translate3d(100%, 0, 0)
    opacity 0
</style>

