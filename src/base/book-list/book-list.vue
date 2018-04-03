<template>
  <scroll class="book-content"  :data="bookList"
                                :pulldown="pulldown"
                                @onPullingDown="onPullingDown"
                                :pullDownRefresh="pullDownRefresh"
                                ref="scroll"
  >
    <ul class="book-list-wrapper" v-show="bookList.length">
      <li class="book-item" v-for="book in bookList" @click="selectBook(book)">
        <div class="item-left">
          <img v-lazy="book.image" />
        </div>
        <div class="item-right">
          <h1 class="item-book-title">{{book.title}}</h1>
          <p class="item-book-short">{{book.shortInfo}}</p>
          <div class="item-book-info">
            <div class="book-author">
              <i class="icon-author"></i>
              <span class="author-name">{{book.author}}</span>
            </div>
            <div class="book-info">
              <span class="book-genre">{{book.classifi}}</span>
              <span class="book-genre">{{book.minClass}}</span>
              <span class="book-pop">{{book.star}}人气</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <loading v-show="!bookList.length"></loading>
  </scroll>
</template>
<script type="text/ecmascript-6">

  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'

  import {mapMutations} from 'vuex'

  export default {
    props: {
      bookList: {
        type: Array,
        default: [],
        required: true
      },
      pulldown: {
        type: Boolean,
        default: false
      },
      pullDownRefresh: {
        type: Object,
        default: null
      }
    },
    methods: {
      onPullingDown () {
        this.$emit('onPullingDown')
      },
      finishPullDown () {
        this.$refs.scroll.finishPullDown()
      },
      selectBook (item) {
        this.$emit('selectBook', item)
      }
    },
    components: {
      Scroll,
      Loading
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  .book-content
    width 100%
    height 100%
    overflow hidden
    .book-list-wrapper
      .book-item
        width 100%
        height 7.4375rem
        background $background-color
        margin-bottom 0.5rem
        padding 1rem
        box-sizing border-box
        display flex
        .item-left
          width 4rem
          height 100%
          margin-right 0.75rem
          img
            width 4rem
            height 100%
        .item-right
          flex 1
          width 100%
          overflow hidden
          display flex
          flex-direction column
          .item-book-title
            height 1.375rem
            line-height 1.375rem
            width 100%
            font-size $font-size-medium-x
            color $font-color-dd
          .item-book-short
            font-size $font-size-medium
            text-indent 1.5em
            color $font-color
            line-height 1.25rem
            no-wrap(2)
          .item-book-info
            flex 1
            position relative
            width 100%
            vertical-align bottom
            .book-author
              position absolute
              left 0
              bottom 0
              font-size $font-size-small
              color $font-color
            .book-info
              position absolute
              right 0
              bottom 0
              font-size $font-size-small-s
              color $theme-color
              span
                display inline-block
                height 0.75rem
                line-height 0.75rem
                padding 0 0.125rem
                border 1px solid $theme-color
</style>

