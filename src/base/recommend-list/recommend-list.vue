<template>
  <div class="recommend" v-if="recommendList.length">
    <div class="recommend-title-wrapper">
      <div class="recommend-title">
        <span class="line-icon"></span>
        <span class="recommend-name">主编力荐</span>
      </div>
      <div class="recommend-more" @click="selectMore">
        <span class="more-text">查看更多</span>
        <i class="icon-arrow"></i>
      </div>
    </div>
    <div class="recommend-book-list">
      <div class="recommend-top-book" @click="selectBook(recommendList[0])">
        <div class="top-book-left">
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
              <span class="book-genre">{{recommendList[0].minClass.substr(0, 2)}}</span>
              <span class="book-pop">{{recommendList[0].star}}人气</span>
            </div>
          </div>
        </div>
      </div>
      <div class="book-list">
        <div class="book-item" @click="selectBook(recommendList[1])">
          <img class="book-item-image" :src="recommendList[1].image" />
          <p class="book-item-name">{{recommendList[1].title}}</p>
          <p class="book-item-author">{{recommendList[1].author}}</p>
        </div>
        <div class="book-item" @click="selectBook(recommendList[2])">
          <img class="book-item-image" :src="recommendList[2].image" />
          <p class="book-item-name">{{recommendList[2].title}}</p>
          <p class="book-item-author">{{recommendList[2].author}}</p>
        </div>
        <div class="book-item" @click="selectBook(recommendList[3])">
          <img class="book-item-image" :src="recommendList[3].image" />
          <p class="book-item-name">{{recommendList[3].title}}</p>
          <p class="book-item-author">{{recommendList[3].author}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="loading-wrapper" v-else>
    <loading></loading>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getRankList} from 'api/handpick'
  import {createBooks} from 'common/js/books'
  import Loading from 'base/loading/loading'

  import {mapMutations} from 'vuex'

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
        recommendList: [],
        ranks: null
      }
    },
    methods: {
      selectMore () {
        this.$emit('recommendRank')
        this.setCurrentRank(this.rankList[0])
      },
      selectBook (item) {
        this.$emit('selectBook', item)
      },
      ...mapMutations({
        setCurrentRank: 'SET_CURRENT_RANK'
      })
    },
    watch: {
      rankList (newVal) {
        this.ranks = newVal[0]
        getRankList(newVal[0]._id).then(res => {
          this.recommendList = res.data.ranking.books.map(item => createBooks(item))
        })
      }
    },
    components: {
      Loading
    }
  }
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
          height 3.6875rem
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
      height 11.875rem
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
          margin 0.625rem 0
          no-wrap(2)
        .book-item-author
          height 1rem
          font-size $font-size-small
          color $font-color
  .loading-wrapper
    position fixed
    width 100%
    top 200%
    z-index 998
    margin-left -4%
</style>
