<template>
<transition name="book-text">
  <div>
    <div class="book-text-wrapper" ref="wrapper">
      <h1 class="title">{{title}}</h1>
      <scroll :data="chapterList" class="group" ref="scroll"
              :pullup="pullup"
              @scrollToEnd="scrollToEnd"
              :listenScroll="listenScroll"
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
                  @back="back"
                  ref="settingBtn"
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
        'chapters',
        'currentChapter',
        'currentBook',
        'collectList',
        'currentId'
      ])
    },
    created () {
      setTimeout(() => {
        this.index = this.currentChapter
        this._getChapterText(this.currentChapter)
        this._filterStorage()
      }, 600)
    },
    methods: {
      back () {
        if (this.collected) {
          this._saveStorage()
          this.setting = false
          this._reset()
          this.$router.back()
        } else {
          this.$refs.confirmBox.show()
        }
      },
      _reset () {
        this.chapterList = []
        this.title = []
        this.index = 0
        this.setting = false
      },
      _saveStorage () {
        if (!this.collectList.length) {
          return
        }
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
        this.$router.back()
      },
      selectCancel () {
        this._reset()
        this.$router.back()
      },
      _filterStorage () {
        if (!this.collectList.length || !this.currentBook.id) {
          this.collected = false
          return
        }
        this.collected = this.collectList.some(item => item.bookInfo.id === this.currentBook.id)
        console.log(this.collected)
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
          id: this.currentId,
          index: index
        })
        this.$refs.chapters.hide()
      },
      _getChapterText (index) {
        if (!this.chapters || typeof this.chapters[index].id === 'undefined') {
          return
        }
        const id = this.chapters[index].id
        getChapterText(id).then(res => {
          let item = getChapter(res.data.chapter)
          this.chapterList.push(item)
          this.title = item.title
        }).catch(() => {
          console.log('无法请求')
        })
      },
      scrollToEnd () {
        if (typeof this.chapters === 'undefined' || this.currentChapter >= this.chapters.length - 1) {
          return
        }
        // 如果正在加载...
        if (this.loading) {
          return
        }
        // 加载下一章数据
        this.loading = true
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
      currentChapter () {
        console.log(this.currentChapter)
        this.index = this.currentChapter
        this._getChapterText(this.currentChapter)
      },
      chapterList (newL, oldL) {
        if (!newL.length) {
          return
        }
        // 当 chapterList 发生改变,将正在加载设置为 false
        this.index ++
        let timer
        clearTimeout(timer)
        timer = setTimeout(() => {
          this.loading = false
        }, 500)
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
    left 0
    right 0
    top 0
    bottom 0
    z-index 150
    background #c6ebc9
    color $font-color-dd
    .title
      font-size 14px
      color $font-color
      line-height 32px
      margin-left 1rem
      background #c6ebc9
    .group
      width 100%
      height 100%
      padding 0 1rem 0 1rem
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
      height 100vh
    .chapters-group
      position fixed
      top 0
      left 0
      right 0
      bottom 0

  .book-text-enter-active, .book-text-leave-active
    transition all 0.4s
  .book-text-enter, .book-text-leave-to
    transform translate3d(100%, 0, 0)
    opacity 0
</style>

