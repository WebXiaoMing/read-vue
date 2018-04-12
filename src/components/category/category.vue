<template>
<transition name="category">
  <div class="category-wrapper">
    <div class="top-title">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="title">{{name}}</h1>
    </div>
    <div class="tab-wrapper">
      <div class="type-classify-content">
        <span class="min-item" v-for="(item, index) in type"
                                v-text="typeText(item)"
                                :class="{'active': index === typeIndex}"
                                @click="typeIndex=index"
        >
        </span>
      </div>
      <div class="min-classify-content">
        <span class="min-item" v-for="(item, index) in category.slice(0, 5)"
                               :class="{'active': index === minorIndex}"
                               @click="minorIndex=index"
        >{{item}}</span>
      </div>
    </div>
    <div class="book-list-wrapper" v-show="bookList.length">
      <book-list :bookList="bookList"></book-list>
    </div>
  </div>
</transition>
</template>
<script type="text/ecmascript-6">
  import {getCategory, getBookList} from 'api/classify'
  import {createBooks} from 'common/js/books'

  import BookList from 'base/book-list/book-list'

  export default {
    props: {
      name: {
        type: String,
        default: ''
      },
      gender: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        type: [
          'hot', 'new', 'reputation', 'over', 'monthly'
        ],
        category: [],
        bookList: [],
        typeIndex: 0,
        minorIndex: 0,
        start: 0,
        limit: 20
      }
    },
    created () {
      setTimeout(() => {
        this._getCategory()
        this._getBookList(this.gender, this.type[this.typeIndex], this.name)
      }, 60)
    },
    methods: {
      typeText (item) {
        return item === 'hot' ? '热门' : item === 'new' ?
        '新书' : item === 'reputation' ? '好评' : item === 'over' ?
        '完结' : item === 'monthly' ? '包月' : ''
      },
      _getCategory () {
        getCategory().then(res => {
          let data = res.data[this.gender]
          let category = data.filter(item => item.major === this.name)[0]
          this.category = category.mins
          this.category.unshift('全部')
        })
      },
      _getBookList (gender, type, major, minor, start, limit) {
        getBookList(gender, type, major, minor, start, limit).then(res => {
          if (!res.data.books || !res.data.books.length) {
            this.bookList = []
            return
          }
          this.bookList = res.data.books.map(item => createBooks(item))
        })
      },
      back () {
        this.$router.back()
      }
    },
    watch: {
      typeIndex (newI, oldI) {
        if (newI === oldI) {
          return
        }
        let category = this.category[this.minorIndex] === '全部' ? '' : this.category[this.minorIndex]
        this._getBookList(this.gender, this.type[newI], this.name, category, this.start, this.limit)
      },
      minorIndex (newM, oldM) {
        if (newM === oldM) {
          return
        }
        let category = this.category[newM] === '全部' ? '' : this.category[newM]
        this._getBookList(this.gender, this.type[this.typeIndex], this.name, category,this.start, this.limit)
      },
    },
    components: {
      BookList
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  .category-wrapper
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background $background-color-d
    z-index 998
    .top-title
      position fixed
      top 0
      left 0
      right 0
      height 2.75rem
      line-height 2.75rem
      color $font-color-ll
      background $theme-color
      .back
        width 2rem
        font-size $font-size-large-x
        text-align center
      .title
        position absolute
        top 0
        left 15%
        width 70%
        font-size $font-size-large
        text-align center
    .tab-wrapper
      position fixed
      top 2.75rem
      left 0
      right 0
      font-size $font-size-medium
      color $font-color-d
      padding 1rem
      background $background-color
      margin-bottom 0.5rem
      .min-classify-content
        padding-top 0.5rem
        border-top 1px solid $border-color-m
        .min-item, .all
          display inline-block
          padding 0.25rem 0.375rem
          box-sizing border-box
          &.active
            border 1px solid $theme-color
            border-radius 0.8125rem
            color $theme-color
      .type-classify-content
        padding-bottom 0.5rem
        .min-item
          display inline-block
          padding 0.25rem 0.625rem
          box-sizing border-box
          &.active
            border 1px solid $theme-color
            border-radius 0.8125rem
            color $theme-color
    .book-list-wrapper
      position fixed
      top 8.75rem
      left 0
      right 0
      bottom 0

  .category-enter-active, .category-leave-active
    transition all 0.3s
  .category-enter, .category-leave-to
    opacity 0
    transform translate3d(100%, 0, 0)
</style>

