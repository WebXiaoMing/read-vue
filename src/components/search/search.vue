<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="hot-search-wrapper" v-show="!query">
      <div class="hot-content">
        <div class="hot-title">
          <span class="line-icon"></span>
          <h1 class="title-text">热门搜索</h1>
          <p class="change" @click="changeWords">换一换</p>
        </div>
        <div class="hot-list">
          <span class="hot-item" v-for="item in hots" @click="setQuery(item.word)">{{item.word}}</span>
        </div>
      </div>
      <div class="search-history-wrapper" v-show="searchHistory.length">
        <div class="history-title">
          <span class="line-icon"></span>
          <h1 class="title-text">搜索历史</h1>
          <p class="change" @click="showConfirm"><i class="icon-trash"></i></p>
        </div>
        <ul class="history-list">
          <li class="history-item" v-for="query in searchHistory" @click="setQuery(query)">
            <p class="search-icon"><i class="icon-search"></i></p>
            <p class="history-text">{{query}}</p>
            <p class="delete-icon"><i class="icon-clear" @click.stop="deleteOne(query)"></i></p>
          </li>
        </ul>
      </div>
    </div>
    <div class="result-wrapper" v-show="query">
      <result-list :query="query" @selectBook="selectBook"></result-list>
    </div>
    <div class="confirm-box-wrapper">
      <confirm ref="confirm"
              maxTitle="清空历史"
              minTitle="是否清空所有搜索历史？"
              cancel="清空"
              @selectConfirm="selectConfirm"
      />
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getSearchHot} from 'api/search'
  import {mapMutations, mapActions, mapGetters} from 'vuex'

  import SearchBox from 'base/search-box/search-box'
  import ResultList from 'base/result-list/result-list'
  import Confirm from 'base/confirm/confirm'

  export default {
    data () {
      return {
        hotWords: [],
        hotstar: 0,
        hotend: 10,
        query: ''
      }
    },
    computed: {
      hots () {
        return this.hotWords.slice(this.hotstar, this.hotend)
      },
      ...mapGetters([
        'searchHistory'
      ])
    },
    created () {
      this._getSearchHot()
    },
    methods: {
      showConfirm () {
        this.$refs.confirm.show()
      },
      selectConfirm () {
        this.deleteAll()
      },
      deleteOne (query) {
        this.deleteSearch(query)
      },
      selectBook (item) {
        this.setCurrentBook(item)
        this.$router.push({
          path: `/book/${item.id}`
        })
        this.saveSearchHistory(this.query)
        this.$refs.searchBox.clear()
      },
      onQueryChange (query) {
        this.query = query
      },
      _getSearchHot () {
        getSearchHot().then(res => {
          this.hotWords = res.data.searchHotWords
        })
      },
      changeWords () {
        let len = this.hotWords.length
        this.hotstar = this.hotend
        this.hotend = this.hotend + 10
        if (this.hotend > len) {
          this.hotstar = 0
          this.hotend = 10
          return
        }
      },
      setQuery (query) {
        this.$refs.searchBox.setQuery(query)
      },
      ...mapMutations({
        setCurrentBook: 'SET_CURRENT_BOOK'
      }),
      ...mapActions([
        'saveSearchHistory',
        'deleteSearch',
        'deleteAll'
      ])
    },
    components: {
      SearchBox,
      ResultList,
      Confirm
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  .search-box-wrapper
    position fixed
    top 0
    width 100%
    box-sizing border-box
    padding 0.625rem 1rem
    border-bottom 1px solid $border-color
  .hot-search-wrapper
    position fixed
    top 60px
    width 100%
    box-sizing border-box
    padding 0 1rem
    .hot-content
      margin-bottom 2rem
    .hot-content, .search-history-wrapper
      .hot-title, .history-title
        height 2.5rem
        line-height 2.5rem
        display flex
        width 100%
        border-bottom 1px solid $border-color
        color $font-color-dd
        .line-icon
          display inline-block
          width 3px
          height 1.125rem
          margin auto 0
          margin-right 0.5rem
          background $theme-color
        .title-text
          flex 1
        .change
          font-size $font-size-medium
    .hot-list
      .hot-item
        display inline-block
        height 1.5rem
        line-height 1.5rem
        padding 0 0.625rem
        margin 0.5rem 0.25rem 0.125rem 0
        font-size $font-size-medium
        color $font-color-d
        border 1px solid $border-color-m
        border-radius 0.75rem
    .history-list
      .history-item
        height 2.5rem
        line-height 2.5rem
        display flex
        width 100%
        border-bottom 1px solid $border-color
        color $font-color-dd
        .history-text
          flex 1
          padding-left 0.5rem
        .search-icon
          color $theme-color
  .result-wrapper
    position fixed
    top 3.5625rem
    padding 0 1rem
    left 0
    right 0
    bottom 0
</style>
