<template>
<transition name="book-text">
  <div>
    <div class="book-text-wrapper" v-show="reading" ref="wrapper">
      <div class="back-group" :class="show">
        <div class="back-content" @click.stop="back">
          <i class="icon-arrow"></i>
          <span>返回</span>
        </div>
      </div>
      <h1 class="title">{{title}}</h1>
      <scroll :data="chapterList" class="group" ref="scroll"
              :pullup="pullup"
              @scrollToEnd="scrollToEnd"
              :listenScroll="listenScroll"
              @scroll="scroll"
              :probeType="probeType"
              >
        <div class="text-content" ref="textGroup" @click="showSettingBtn">
          <div class="text-item" v-for="item in chapterList" ref="textWrapper">
            <h1 class="text-title" :class="{'isNight': isNight}">{{item.title}}</h1>
            <p class="text" v-for="text in item.textContent">{{text}}。</p>
          </div>
        </div>
      </scroll>
      <div class="more" v-show="loading">
        <img src="../../common/image/loading/timg.gif" width="30" height="30">
        <p>正在加载下一章节...</p>
      </div>
      <div class="loading-wrapper" v-show="!chapterList.length">
        <loading></loading>
      </div>
      <setting-btn :showFlag="setting"
                  :isNight="isNight"
                  @openChapters="openChapters"
                  @changeMode="changeMode"
      />
      <book-chapters :title="currentBook.title"
                    :author="currentBook.author"
                    :chapters="chapters"
                    ref="chapters"
                    @select="select"
      />
    </div>
    <confirm ref="confirmBox" @selectConfirm="selectConfirm"
                              @selectCancel="selectCancel"
    />
  </div>
</transition>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import SettingBtn from 'base/setting-btn/setting-btn'
  import BookChapters from 'base/book-chapters/book-chapters'
  import Confirm from 'base/confirm/confirm'

  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {getChapterText} from 'api/handpick'
  import {getChapter} from 'common/js/chapter'

  export default {
    data () {
      return {
        pullup: true,
        currentBookChap: [],
        chapterList: [],
        index: 0,
        title: '',
        setting: false,
        listenScroll: true,
        probeType: 3,
        groupHeight: 0,
        loading: false,
        isNight: false,
        bgColor: '#c6ebc9'
      }
    },
    computed: {
      show () {
        return this.setting ? 'show' : ''
      },
      ...mapGetters([
        'reading',
        'chapters',
        'currentChapter',
        'currentBook',
        'collectList',
        'currentId'
      ])
    },
    mounted () {
      this.currentBookChap = this.chapters
    },
    methods: {
      back () {
        if (this.collected) {
          this._saveStorage()
          this._reset()
        } else {
          this.$refs.confirmBox.show()
        }
      },
      _reset () {
        this.setting = false
        this.title = ''
        this.chapterList = []
        this.index = 0
        this.refreshRead()
        this.$router.back()
      },
      _saveStorage () {
        let list = this.collectList.slice()
        let book = null

        for (let i = 0; i < list.length; i ++) {
          if (list[i].bookInfo.id === this.currentBook.id) {
            book = Object.assign({}, list[i])
            book.index = this.index - 1
            book.lastChapter = this.title
          }
        }
        this.saveStorageList(book)
        this.saveLastReading(book)
      },
      selectConfirm () {
        let saveObj = {
          bookInfo: this.currentBook,
          id: this.currentId,
          index: this.index - 1,
          lastChapter: this.title
        }
        this.saveStorageList(saveObj)
        this.saveLastReading(saveObj)
        this._reset()
      },
      selectCancel () {
        this._reset()
      },
      filterStorage () {
        if (!this.collectList.length || !this.currentBook.id) {
          this.collected = false
          return
        }
        this.collected = this.collectList.some(item => item.bookInfo.id === this.currentBook.id)
      },
      openChapters () {
        this.$refs.chapters.show()
      },
      changeMode () {
        this.isNight = !this.isNight
      },
      showSettingBtn () {
        this.setting = !this.setting
      },
      select (item, index) {
        this.chapterList = []
        this.selectRead({
          list: this.chapters,
          index: index
        })
        this.$refs.chapters.hide()
      },
      _getChapterText (index) {
        if (!this.chapters || typeof this.chapters[index].link === 'undefined') {
          return
        }
        const url = this.chapters[index].link
        getChapterText(url).then(res => {
          let item = getChapter(res.data.chapter)
          this.chapterList.push(item)
          this.title = item.title
        }).catch(() => {
          console.log('无法请求')
        })
      },
      scroll () {
        this.groupHeight = this.$refs.textGroup.clientHeight
      },
      scrollToEnd () {
        if (this.currentChapter >= this.chapters.length - 1) {
          return
        }
        // 如果正在加载...
        if (this.loading) {
          return
        }
        // 加载下一章数据
        this.loading = true
        this.offsetHeight = this.$refs.textGroup.clientHeight
        this._getChapterText(this.index)
      },
      ...mapMutations({
        setReadingState: 'SET_READING_STATE',
        setCurrentChapter: 'SET_CURRENT_CHAPTER'
      }),
      ...mapActions([
        'selectRead',
        'refreshRead',
        'saveStorageList',
        'saveLastReading'
      ])
    },
    watch: {
      chapters (newI, oldI) {
        if (!this.chapters || !this.chapters.length) {
          return
        }
        if (newI && newI !== oldI) {
          this.index = this.currentChapter
          this._getChapterText(this.index)
        }
      },
      currentBook () {
        this.filterStorage()
      },
      currentChapter (newC, oldC) {
        if (!newC || newC === oldC) {
          return
        }
        this._getChapterText(this.currentChapter)
      },
      chapterList (newL, oldL) {
        if (!newL.length) {
          return
        }
        // 当 chapterList 发生改变,将正在加载设置为 false
        this.loading = false
        this.index ++
      },
      isNight () {
        if (this.isNight) {
          this.$refs.wrapper.style.background = '#1b1b1b'
          this.$refs.wrapper.style.color = '#6e6e6e'
        } else {
          this.$refs.wrapper.style.background = this.bgColor
          this.$refs.wrapper.style.color = '#101010'
        }
      }
    },
    components: {
      Scroll,
      Loading,
      SettingBtn,
      BookChapters,
      Confirm
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'

  .book-text-wrapper
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 998
    background #c6ebc9
    padding 32px 16px 0 16px
    color $font-color-dd
    .title
      font-size 14px
      color $font-color
      line-height 32px
      position absolute
      top 0
      left 16px
    .group
      width 100%
      height 100%
      box-sizing border-box
      overflow hidden
      .text-content
        .text-item
          padding-bottom 10px
          .text-title
            width 100%
            font-size 24px
            line-height 48px
            color $font-color-dd
            padding-top 32px
            font-weight 600
            &.isNight
              color #6e6e6e
          .text
            margin-top 8px
            font-size 19px
            width 100%
            line-height 32px
            text-indent 32px
    .more
      position fixed
      left 50%
      top 50%
      transform translate(-50%, -50%)
      width 10rem
      padding 1.25rem 0
      background #4a4a4a
      margin-top 0.375rem
      text-align center
      font-size 0.875rem
      color $font-color-ll
      border-radius 0.5rem
      img
        margin-bottom 0.5rem
    .loading-wrapper
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
    .back-group
      position fixed
      top 0
      left 0
      z-index 998
      width 100%
      height 2.75rem
      background rgba(0,0,0, 0.85)
      font-size 0.875rem
      line-height 2.75rem
      color #fff
      transform translate3d(0, -100%, 0)
      transition all 0.3s
      &.show
        transform translate3d(0, 0, 0)
        transition all 0.2s
      .back-content
        padding-left 1rem
        width 3.75rem
        .icon-arrow
          display inline-block
          transform rotate(180deg)
          margin-right 0.25rem
    .chapters-group
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      z-index 999

  .book-text-enter-active, .book-text-leave-active
    transition all 0.3s
  .book-text-enter, .book-text-leave-to
    transform translate3d(100%, 0, 0)
    opacity 0
</style>

