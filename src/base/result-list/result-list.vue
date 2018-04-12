<template>
  <scroll class="result-list-wrapper" :data="result">
    <ul class="result-list">
      <li class="result-item" v-for="item in result" @click="selectBook(item)">
        <i class="icon-search"></i>
        <span class="result-text">{{item.title}}</span>
      </li>
    </ul>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import {getSearchList} from 'api/search'
  import {createBooks} from 'common/js/books'

  import Scroll from 'base/scroll/scroll'

  export default {
    props: {
      query: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        result: []
      }
    },
    methods: {
      selectBook (item) {
        this.$emit('selectBook', item)
      },
      _search (query) {
        getSearchList(query).then(res => {
          this.result = res.data.books.map(item => createBooks(item))
        })
      },
    },
    watch: {
      query (newQuery) {
        if (!newQuery) {
          return
        }
        this._search(newQuery)
      }
    },
    components: {
      Scroll
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'

  .result-list-wrapper
    width 100%
    height 100%
    overflow hidden
    padding 0 0.5rem
    background $background-color
    .result-list
      .result-item
        width 100%
        line-height 3rem
        font-size $font-size-medium-x
        color $font-color-dd
        border-bottom 1px solid $border-color
        .icon-search
          color $theme-color
</style>

