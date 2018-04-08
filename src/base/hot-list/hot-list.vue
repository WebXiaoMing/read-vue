<template>
  <div class="hot-list" v-if="hotList.length">
    <div class="hot-title-wrapper">
      <div class="hot-title">
        <span class="line-icon"></span>
        <span class="hot-name">{{title}}</span>
      </div>
      <div class="hot-more" @click="selectMore">
        <span class="more-text">查看更多</span>
        <i class="icon-arrow"></i>
      </div>
    </div>
    <div class="hot-book-list" v-for="item in hotList">
      <div class="hot-top-book" @click="selectBook(item)">
        <div class="top-book-left">
          <img class="book-image" :src="item.image" />
        </div>
        <div class="top-book-right">
          <h1 class="top-book-name">{{item.title}}</h1>
          <p class="top-book-short">{{item.shortInfo}}</p>
          <div class="top-book-info">
            <div class="book-author">
              <i class="icon-author"></i>
              <span class="author-name">{{item.author}}</span>
            </div>
            <div class="book-info">
              <span class="book-genre">{{item.classifi}}</span>
              <span class="book-genre">{{item.minClass.substr(0, 2)}}</span>
              <span class="book-pop">{{item.star}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getRankList} from 'api/handpick'
  import {createBooks} from 'common/js/books'
  import {mapMutations} from 'vuex'

  export default {
    props: {
      list: {
        type: Array,
        defaule: [],
        required: true
      }
    },
    data () {
      return {
        hotList: [],
        title: '热门追更'
      }
    },
    methods: {
      selectMore () {
        this.$emit('hotRank')
        this.setCurrentRank(this.list[4])
      },
      selectBook (item) {
        this.$emit('selectBook', item)
      },
      ...mapMutations({
        setCurrentRank: 'SET_CURRENT_RANK'
      })
    },
    watch: {
      list (newVal) {
        let id = newVal[4]._id
        getRankList(id).then(res => {
          this.hotList = res.data.ranking.books.map(item => createBooks(item)).slice(0, 3)
        })
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  .hot-title-wrapper
    width 100%
    height 3.125rem
    line-height 3.125rem
    vertical-align middle
    color $font-color-d
    .hot-title
      float left
      .line-icon
        display inline-block
        height 1.125rem
        width 0.1875rem
        background $theme-color
        vertical-align middle
      .hot-name
        font-size $font-size-medium-x
    .hot-more
      float right
      font-size $font-size-medium
  .hot-book-list
    border-bottom 1px solid $border-color
    .hot-top-book
      width 100%
      height 7.8125rem
      padding 0.75rem 0
      display flex
      &.middle
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
</style>

