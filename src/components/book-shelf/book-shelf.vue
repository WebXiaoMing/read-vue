<template>
  <div class="book-shelf-wrapper">
    <div class="top-bar"></div>
    <scroll :bounce="bounce" class="book-shelf-content" :data="bookList" ref="scroll">
      <div>
        <div class="recent-box">
          <h1 class="recent-title" v-show="!readingBook.id">心有猛虎 细嗅蔷薇</h1>
          <div class="recent-book-wrapper" v-if="readingBook.id">
            <div class="image">
              <img :src="readingBook.bookInfo.image"/>
            </div>
            <div class="book-info">
              <h1 class="book-name">{{readingBook.bookInfo.title}}</h1>
              <h2 class="book-author">{{readingBook.bookInfo.author}}</h2>
              <p class="recent-read">{{readingBook.lastChapter}}</p>
              <div class="continue-read" @click="recentRead">继续阅读</div>
            </div>
          </div>
        </div>
        <div class="library">
          <div class="library-item" v-for="item in bookList"
                                    @click="selectBook(item)"
                                    @touchstart="onTouchstart(item)"
                                    @touchmove="onTouchmove"
                                    @touchend="onTouchend"
          >
            <div class="library-item-wrapper">
              <div class="library-image">
                <img :src="item.bookInfo.image" alt="">
              </div>
              <div class="library-name">
                <p class="name">{{item.bookInfo.title}}</p>
              </div>
            </div>
          </div>
          <div class="library-item" @click="gotoAddBook">
            <div class="library-item-wrapper add-wrapper">
              <i class="icon-add"></i>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <confirm ref="confirm"
             maxTitle="删除书籍"
             minTitle="你确定要删除该书籍吗？"
             @selectConfirm="selectConfirm"
    />
  </div>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Confirm from 'base/confirm/confirm'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import {getChapters} from 'api/handpick'

  export default {
    data () {
      return {
        bounce: false,
        bookList: [],
        readingBook: {},
        currentItem: {}
      }
    },
    created () {
      this.bookList = this.collectList
      this.readingBook = this.lastReading
    },
    methods: {
      gotoAddBook () {
        this.$router.push({
          path: '/handpick/'
        })
      },
      onTouchstart (item) {
        this.currentItem = item
        this.timer = setTimeout(() => {
          this.$refs.confirm.show()
        }, 800)
      },
      onTouchmove () {
        clearTimeout(this.timer)
      },
      onTouchend () {
        clearTimeout(this.timer)
      },
      selectConfirm () {
        this.deleteBook(this.currentItem)
      },
      recentRead () {
        this.refreshRead(this.readingBook)
      },
      selectBook (item) {
        this.refreshRead(item)
      },
      refreshRead (item) {
        this.setReadingState(true)
        this.setCurrentBook(item.bookInfo)
        getChapters(item.id).then(res => {
          if (res.statusText === 'OK') {
            this.selectRead({
              id: item.bookInfo.id,
              list: res.data.chapters,
              index: item.index
            })
          }
        })
      },
      ...mapActions([
        'selectRead',
        'deleteBook'
      ]),
      ...mapMutations({
        setReadingState: 'SET_READING_STATE',
        setCurrentBook: 'SET_CURRENT_BOOK'
      })
    },
    computed: {
      ...mapGetters([
        'collectList',
        'lastReading'
      ])
    },
    watch: {
      collectList () {
        this.bookList = this.collectList
      },
      lastReading () {
        this.readingBook = this.lastReading
      }
    },
    components: {
      Scroll,
      Confirm
    }
  }
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.book-shelf-wrapper
  position fixed
  top 0
  left 0
  right 0
  top 0
  bottom 3.125rem
  overflow hidden
  .top-bar
    width 100%
    height 2.75rem
    background $theme-color
    position fixed
    top 0
    z-index 998
  .book-shelf-content
    width 100%
    height 100%
    overflow hidden
    .recent-box
      width 100%
      height 16.125rem
      position relative
      background $theme-color
      .recent-title
        position absolute
        top 50%
        width 70%
        left 15%
        text-align center
        font-size $font-size-large-x
        transform translate(0, -50%)
        color #fff
      .recent-book-wrapper
        width 70%
        margin 0 auto
        padding-top 5.25rem
        display flex
        .image
          width 6.375rem
          height 8.75rem
          img
            width 100%
            height 100%
            border-radius 0.5rem
        .book-info
          flex 1
          text-align left
          width 152px
          margin-left 0.5rem
          color $font-color-ll
          line-height 1.75rem
          font-size $font-size-medium
          .book-name
            font-size $font-size-medium-x
            no-wrap(1)
          .recent-read,.book-name
            no-wrap(1)
          .continue-read
            width 5.0625rem
            height 1.75rem
            margin-top 0.25rem
            border 1px solid #fff
            border-radius 0.25rem
            text-align center
    .library
      background #fff
      display flex
      flex-flow row wrap
      justify-content space-between
      padding 1.25rem 1rem
      .library-item
        height 10.4375rem
        width 5.6875rem
        margin-bottom 0.625rem
        .library-item-wrapper
          width 100%
          height 100%
          margin 0 auto
          .library-image
            width 100%
            height 7.8125rem
            background #ccc
            border 1px solid $border-color
            border-radius 0.25rem
            img
              width 100%
              height 100%
              border 1px solid $border-color
              border-radius 0.25rem
          .library-name
            vertical-align bottom
            width 100%
            height 2.625rem
            box-sizing border-box
            padding-top 0.625rem
            font-size $font-size-small
            color $font-color-d
            text-align left
            no-wrap(2)
            .name
              line-height 1rem
          &.add-wrapper
            height 7.8125rem
            line-height 7.8125rem
            font-size 2rem
            color $font-color-l
            background $background-color-d
            border 1px solid $border-color
            border-radius 0.25rem
            text-align center
</style>

