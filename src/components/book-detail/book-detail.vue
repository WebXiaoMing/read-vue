<template>
<transition name="bookDetail">
  <div class="book-detail" @click.stop="hideSwitch">
    <div class="top-title">
      <i class="icon-back" @click="back"></i>
      <p class="top-book-name" v-show="showTopTitle">{{topTitle}}</p>
      <div class="source-wrapper" @click.stop="showSwitch">
        <span class="text">换源</span>
        <source-box ref="switch" :data="source"
                                 :currentIndex="currentIndex"
                                 @checkSwitch="changeSource"
        />
      </div>
      <div class="top-title-layer" v-show="upMove" ref="topTitle"></div>
    </div>
    <div class="bg-layer" ref="bgLayer"></div>
    <div class="book-detail-content" ref="detailContent">
      <scroll class="content" :data="sameAuthor.concat(sameGenre)"
                              :probe-type="probeType"
                              :listen-scroll="listenScroll"
                              @scroll="scroll"
                              ref="content"
      >
        <div>
          <div class="book-info-wrapper" ref="bookInfo">
            <div class="book-image">
              <img :src="bookInfo.image">
            </div>
            <div class="book-info">
              <h1 class="book-name">{{bookInfo.title}}</h1>
              <p class="book-author">{{bookInfo.author}}</p>
              <div class="rating-wrapper">
                <div class="rating-star">
                  <span v-for="item in starClass">
                    <i :class="item"></i>
                  </span>
                </div>
                <p class="rating-info">{{bookInfo.ratingScore}}分 ({{bookInfo.ratingCount}}人评)</p>
              </div>
              <p class="category">{{bookInfo.classifi}} | {{bookInfo.minClass}}</p>
              <p class="words">{{bookInfo.words}}字 | 连载</p>
            </div>
          </div>
          <div class="book-content" v-show="bookInfo.id">
            <h1 class="short-title">简介</h1>
            <p class="short-info">{{bookInfo.longInfo}}</p>
            <div class="catalog-wrapper" @click="showChapters">
              <span class="catalog-title">目录</span>
              <span class="catalog-info">连载至 {{bookInfo.chaptersCount}} 章 更新于{{bookInfo.update}}<i class="icon-arrow"></i></span>
            </div>
          </div>
          <div class="book-class-wrapper">
            <book-class title="作者其他作品" @selectBook="selectBook" :data="sameAuthor"></book-class>
          </div>
          <div class="book-class-wrapper">
            <book-class title="同类作品推荐" @selectBook="selectBook" :data="sameGenre"></book-class>
          </div>
        </div>
      </scroll>
    </div>
    <div class="book-detail-btn">
      <div class="item addbook" :class="hasCollect"><i class="icon-addbook" @click="addToBookShelf"></i>{{collectText}}</div>
      <div class="item reading"><i class="icon-read" @click="starReading"></i>立即阅读</div>
      <div class="item download"><i class="icon-download"></i>下载</div>
    </div>
    <div class="loadding-wrapper" v-show="!bookInfo.id">
      <loading></loading>
    </div>
    <div class="book-chapters-wrapper">
      <book-chapters :chapters="chapters"
                      ref="chapters"
                      :title="bookInfo.title"
                      :author="bookInfo.author"
                      @select="select"
      />
    </div>
    <p class="add-text" :class="{'active': showAdd}">加入书架成功</p>
  </div>
</transition>
</template>
<script type="text/ecmascript-6">
  import BookClass from 'base/book-class/book-class'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import BookChapters from 'base/book-chapters/book-chapters'
  import SourceBox from 'base/source-box/source-box'

  import {prefixStyle} from 'common/js/dom'
  import {getBookInfo, getMixinSource, getChapters} from 'api/handpick'
  import {getSearchList} from 'api/search'
  import {createBooks} from 'common/js/books'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {getStarScore} from 'common/js/util'

  const backdrop = prefixStyle('backdrop-filter')
  const transform = prefixStyle('transform')

  export default {
    data () {
      return {
        sameAuthor: [],
        sameGenre: [],
        bookInfo: {},
        currentIndex: 0,
        source: [],
        bookId: '',
        chapters: [],
        topTitle: '',
        showTopTitle: false,
        scrollY: 0,
        upMove: false,
        starClass: [],
        collected: false,
        showAdd: false
      }
    },
    created () {
      this.listenScroll = true
      this.probeType = 3
      setTimeout(() => {
        this._getBookInfo()
        this._getMixinSource()
      }, 20)
    },
    computed: {
      hasCollect () {
        return this.collected ? 'collected' : ''
      },
      collectText () {
        return this.collected ? '已在书架' : '加入书架'
      },
      ...mapGetters([
        'currentBook',
        'collectList'
      ])
    },
    mounted () {
      this.minHeight = -this.$refs.topTitle.clientHeight
      this.maxHeight = -this.$refs.bookInfo.clientHeight
    },
    methods: {
      addToBookShelf () {
        if (this.collected) {
          return
        }
        this.collected = true
        this.showAdd = true
        this.saveStorageList({
          bookInfo: this.bookInfo,
          index: 0,
          id: this.bookId
        })
        setTimeout(() => {
          this.showAdd = false
        }, 1000)
      },
      filterStorage () {
        if (!this.collectList.length || !this.bookInfo.id) {
          this.collected = false
          return
        }
        this.collected = this.collectList.some(item => item.bookInfo.id === this.bookInfo.id)
      },
      select (item, index) {
        this.selectRead({
          id: this.bookId,
          list: this.chapters,
          index: index
        })
        this.$refs.chapters.hide()
      },
      starReading () {
        this.selectRead({
          id: this.bookId,
          list: this.chapters,
          index: 0
        })
      },
      showSwitch () {
        this.$refs.switch.show()
      },
      hideSwitch () {
        this.$refs.switch.hide()
      },
      changeSource (item, index) {
        if (this.currentIndex === index) {
          return
        }
        this.currentIndex = index
        this.bookId = item._id
      },
      showChapters () {
        this.$refs.chapters.show()
      },
      _getChapters () {
        getChapters(this.bookId).then(res => {
          if (res.statusText === 'OK') {
            this.chapters = res.data.chapters
          }
        })
      },
      _getMixinSource () {
        if (!this.currentBook.id) {
          this.back()
          return
        }
        getMixinSource(this.currentBook.id).then(res => {
          if (res.statusText !== 'OK') {
            return
          }
          this.source = res.data
          this.bookId = res.data[0]._id
        })
      },
      selectBook (item) {
        this.setCurrentBook(item)
        this._getBookInfo()
        this.topTitle = this.bookInfo.title
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      back () {
        this.bookInfo = {}
        this.sameAuthor = []
        this.sameGenre = []
        this.$router.back()
      },
      _getBookInfo () {
        if (!this.currentBook.id) {
          this.back()
          return
        }
        getBookInfo(this.currentBook.id).then(res => {
          this.bookInfo = createBooks(res.data)
        })

        getSearchList(this.currentBook.author).then(res => {
          let list = res.data.books.filter(item => item.author === this.currentBook.author)
          this.sameAuthor = list.map(item => createBooks(item))
        })

        getSearchList(this.currentBook.classifi).then(res => {
          let list = res.data.books.filter(item => item.cat === this.currentBook.classifi)
          this.sameGenre = list.map(item => createBooks(item)).slice(0, 8)
        })
      },
      ...mapMutations({
        setCurrentBook: 'SET_CURRENT_BOOK'
      }),
      ...mapActions([
        'selectRead',
        'saveStorageList'
      ])
    },
    watch: {
      scrollY (newY) {
        let precent = Math.abs(newY / this.maxHeight)
        let scale = 1
        let top = 0
        let blur = 20
        // 当滚动距离超过title高度时候，把书名显示在title上
        if (newY < this.minHeight) {
          this.showTopTitle = true
        } else {
          this.showTopTitle = false
        }
        // 向上滚动的时候 实时改变背景图片的position 使其有向上滑动的特效
        if (newY < 0) {
          this.upMove = true
          this.$refs.topTitle.style.backgroundPosition = `0 ${newY}px`
          this.$refs.bgLayer.style.backgroundPosition = `0 ${newY + this.minHeight}px`
        }

        if (newY <= this.maxHeight) {
          this.$refs.topTitle.style.backgroundPosition = `0 ${this.maxHeight}px`
          this.$refs.topTitle.style[backdrop] = `blur(${blur}px)`
        }

        if (newY >= 0) {
          this.upMove = false
          scale = 1 + precent
          this.$refs.bgLayer.style.backgroundPosition = `0 0`
          this.$refs.bgLayer.style[transform] = `scale(${scale})`
        }
      },
      bookInfo () {
        setTimeout(() => {
          this.topTitle = this.bookInfo.title
          this.starClass = getStarScore(this.bookInfo.ratingScore)
          this._getMixinSource()
          this._getChapters()
          this.filterStorage()
        }, 20)
      },
      bookId (newId, oldId) {
        if (newId !== oldId) {
          this._getChapters()
        }
      }
    },
    components: {
      BookClass,
      Scroll,
      Loading,
      BookChapters,
      SourceBox
    }
  }

</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  .book-detail
    position fixed
    z-index 998
    top 0
    left 0
    right 0
    bottom 0
    height 100%
    background $background-color-d
    .add-text
      position absolute
      top 50%
      left 50%
      height 3rem
      width 12rem
      margin -1.5rem 0 0 -6rem
      text-align center
      line-height 3rem
      border-radius 0.25rem
      color #fff
      background rgba(0,0,0,0.9)
      tansition all 0.3s
      opacity 0
      &.active
        transition all 0.3s
        opacity 1
    .book-detail-btn
      position fixed
      left 0
      right 0
      bottom 0
      height 3.25rem
      display flex
      box-sizing border-box
      background $background-color-d
      border-top 1px solid $border-color-m
      .item
        display flex
        flex-direction column
        justify-content center
        text-align center
        font-size $font-size-small-s
        color $theme-color
        &.collected
          color $font-color-l
          background $background-color
        i
          font-size $font-size-large-xx
          margin-bottom 0.25rem
        &.reading
          width 48%
          background $theme-color
          color $background-color
        &.download, &.addbook
          width 26%
    .top-title
      position fixed
      top 0
      z-index 1
      width 100%
      height 2.75rem
      line-height 2.75rem
      color $background-color
      .source-wrapper
        position absolute
        right 1rem
        top 0
        font-size $font-size-medium
        .icon-arrow
          display inline-block
          margin-left 0.5rem
          transform rotate(-90deg)
          transition all 0.3s
          &.active
            transform rotate(0deg)
            transition all 0.3s
      .top-title-layer
        position absolute
        top 0
        width 100%
        height 100%
        background url(../../common/image/loading/book-image2.jpg) no-repeat
        background-size cover
        transform-origin top
        z-index -1
      .icon-back
        display inline-block
        width 2rem
        height 100%
        font-size 1.25rem
        text-align center
      .top-book-name
        position absolute
        top 0
        left 15%
        width 70%
        text-align center
        no-wrap(1)
    .bg-layer
      position absolute
      top 0
      width 100%
      height 11.5rem
      left 0
      background url(../../common/image/loading/book-image2.jpg) no-repeat
      background-size cover
      transform-origin top
      z-index -998
    .book-detail-content
      position absolute
      top 2.75rem
      bottom 3.25rem
      width 100%
      .content
        width 100%
        height 100%
        overflow hidden
        .book-info-wrapper
          height 8.75rem
          box-sizing border-box
          padding 0.875rem 1rem
          display flex
          .book-image
            height 100%
            width 5.3125rem
            margin-right 1.625rem
            img
              width 100%
              height 100%
          .book-info
            color $background-color
            flex 1
            display flex
            flex-direction column
            font-size $font-size-medium
            .book-name
              font-size $font-size-medium-x
              width 100%
              height 1.625rem
              no-wrap(1)
            .book-author
              height 1.5rem
            .rating-wrapper
              width 100%
              height 1.5rem
              height 1.5rem
              display flex
              .rating-star
                color #ebc44d
                margin-right 0.25rem
            .category
              height 1.5rem
              width 100%
        .book-content
          padding 0 1rem
          background $background-color
          margin-bottom $margin-bottom
          .short-title
            font-size $font-size-medium-x
            color $font-color-dd
            line-height 2.5rem
          .short-info
            font-size $font-size-medium
            line-height 1.25rem
            margin-bottom 1.25rem
            color $font-color-d
          .catalog-wrapper
            border-top 1px solid $border-color
            height 2.5rem
            line-height 2.5rem
            position relative
            .catalog-title
              font-size $font-size-medium-x
              color $font-color-dd
            .catalog-info
              position absolute
              font-size $font-size-medium
              right 0
              .icon-arrow
                margin-left 0.625rem
        .book-class-wrapper
          margin-bottom $margin-bottom
    .loadding-wrapper
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      z-index 998
      background rgba(0,0,0, 0.8)
    .book-chapters-wrapper
      width 100%
      height 100%

  .bookDetail-enter-active, .bookDetail-leave-active
    transition all 0.3s
  .bookDetail-enter, .bookDetail-leave-to
    transform translate3d(100%, 0, 0)
</style>

