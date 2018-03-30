<template>
  <div class="recommend" v-if="recommendList.length">
    <div class="recommend-title-wrapper">
      <div class="recommend-title">
        <span class="line-icon"></span>
        <span class="recommend-name">主编力荐</span>
      </div>
      <div class="recommend-more">
        <span class="more-text">查看更多</span>
        <i class="icon-arrow"></i>
      </div>
    </div>
    <div class="recommend-book-list">
      <div class="recommend-top-book">
        <div class="top-book-left">
<<<<<<< HEAD
          <img class="book-image" :src="recommendList[0].image" />
        </div>
        <div class="top-book-right">
          <h1 class="top-book-name">{{recommendList[0].title}}</h1>
          <p class="top-book-short">{{recommendList[0].shortInfo}}</p>
          <div class="top-book-info">
            <div class="book-author">
              <i class="icon-author"></i>
              <span class="author-name">{{recommendList[0].author}}</span>
            </div>
            <div class="book-info">
              <span class="book-genre">{{recommendList[0].classifi}}</span>
              <span class="book-genre">{{recommendList[0].minClass}}</span>
              <span class="book-pop">{{recommendList[0].star}}人气</span>
=======
          <img class="book-image" src="./图层 6.png" />
        </div>
        <div class="top-book-right">
          <h1 class="top-book-name">神医凤后：傲娇暴君，强势回归啊哈哈哈</h1>
          <p class="top-book-short">大墟的祖训说，天黑，别出门。大墟残老村的老弱病残们从江边捡到了一个婴儿，取名秦牧，含辛茹苦将他养大。这一天夜......</p>
          <div class="top-book-info">
            <div class="book-author">
              <i class="icon-author"></i>
              <span class="author-name">苏小暖</span>
            </div>
            <div class="book-info">
              <span class="book-genre">玄幻</span>
              <span class="book-pop">1000人气</span>
>>>>>>> 33f8be6e677a77d98181c71c89997c924ee026ae
            </div>
          </div>
        </div>
      </div>
      <div class="book-list">
        <div class="book-item">
<<<<<<< HEAD
          <img class="book-item-image" :src="recommendList[1].image" />
          <p class="book-item-name">{{recommendList[1].title}}</p>
          <p class="book-item-author">{{recommendList[1].author}}</p>
        </div>
        <div class="book-item">
          <img class="book-item-image" :src="recommendList[2].image" />
          <p class="book-item-name">{{recommendList[2].title}}</p>
          <p class="book-item-author">{{recommendList[2].author}}</p>
        </div>
        <div class="book-item">
          <img class="book-item-image" :src="recommendList[3].image" />
          <p class="book-item-name">{{recommendList[3].title}}</p>
          <p class="book-item-author">{{recommendList[3].author}}</p>
=======
          <img class="book-item-image" src="./图层 6.png" />
          <p class="book-item-name">凡人修仙之仙界篇</p>
          <p class="book-item-author">忘语</p>
        </div>
        <div class="book-item">
          <img class="book-item-image" src="./图层 6.png" />
          <p class="book-item-name">凡人修仙之仙界篇</p>
          <p class="book-item-author">大叫好啊</p>
        </div>
        <div class="book-item">
          <img class="book-item-image" src="./图层 6.png" />
          <p class="book-item-name">凡人修仙之仙界篇</p>
          <p class="book-item-author">忘语大家好</p>
>>>>>>> 33f8be6e677a77d98181c71c89997c924ee026ae
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
<<<<<<< HEAD
  import {getRankList} from 'api/handpick'
  import {book} from 'common/js/books'

  export default {
    props: {
      rankList: {
        type: Array,
        default: null,
        required: true
      }
    },
    data () {
      return {
        recommendList: []
      }
    },
    methods: {

    },
    watch: {
      rankList (newVal) {
        getRankList(newVal[0]._id).then(res => {
          this.recommendList = res.data.ranking.books.map(item => book(item))
        })
      }
    }
  }
=======

>>>>>>> 33f8be6e677a77d98181c71c89997c924ee026ae
</script>
<style scoped lang="stylus">
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  .recommend-title-wrapper
    width 100%
    height 3.125rem
    line-height 3.125rem
    vertical-align middle
    color $font-color-d
    .recommend-title
      float left
      .line-icon
        display inline-block
        height 1.125rem
        width 0.1875rem
        background $theme-color
        vertical-align middle
      .recommend-name
        font-size $font-size-medium-x
    .recommend-more
      float right
      font-size $font-size-medium
  .recommend-book-list
    .recommend-top-book
      width 100%
      height 7.8125rem
      padding 0.75rem 0
      border-bottom 1px solid $border-color
      display flex
      .top-book-left
        width 5.625rem
        margin-right 1rem
        height 100%
        .book-image
          width 100%
          height 100%
          border-radius 0.25rem
          border 1px solid $border-color
      .top-book-right
        flex 1
        display flex
        height 100%
        flex-direction column
        .top-book-name
          font-size $font-size-medium-x
          color $font-color-dd
          height 2rem
          line-height 2rem
          no-wrap(1)
        .top-book-short
          font-size $font-size-medium
          text-indent 1.5em
          color $font-color
          line-height 1.25rem
          no-wrap(3)
        .top-book-info
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
            color $font-color
            span
              display inline-block
              height 0.75rem
              line-height 0.75rem
              padding 0 0.125rem
              border 1px solid $font-color
    .book-list
      display flex
      justify-content space-between
      padding 0.75rem 0
      height 11.375rem
      width 100%
      .book-item
        width 5.625rem
        height 100%
        display flex
        flex-direction column
        .book-item-image
          width 100%
          height 7.8125rem
          border-radius 0.25rem
        .book-item-name
          font-size $font-size-medium
          color $font-color-d
          padding 0.625rem 0
          no-wrap(2)
        .book-item-author
          height 1rem
          font-size $font-size-small
          color $font-color
</style>
