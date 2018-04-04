<template>
  <div class="book-class-content" v-if="data.length">
    <h1 class="class-title"><span class="title-solid"></span>{{title}}</h1>
    <div class="class-book-list" ref="slider">
      <ul class="list-wrapper" ref="sliderGroup">
        <li class="item" v-for="book in data" @click="selectBook(book)">
          <img class="image" v-lazy="book.image">
          <p class="book-name">{{book.title}}</p>
          <p class="reader">{{book.star}}人读过</p>
        </li>
      </ul>
    </div>
    <div class="book-item"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll'
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: []
      },
      refreshDelay: {
        type: Number,
        default: 2000
      },
    },
    mounted () {
      setTimeout(() => {
        this._setScrollWidth()
        this._initScroll()
      }, this.refreshDelay)
    },
    methods: {
      selectBook (item) {
        this.$emit('selectBook', item)
      },
      _setScrollWidth () {
        if (!this.data.length) {
          return
        }
        let children = this.$refs.sliderGroup.children
        let width = 0
        let itemWidth = children[0].clientWidth

        for (let i = 0; i < children.length; i ++) {
          width += itemWidth
        }

        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initScroll () {
        if (!this.data.length) {
          return
        }
        this.scroll = new Bscroll(this.$refs.slider, {
          scrollY: false,
          scrollX: true,
          click: true,
          bounce: false
        })
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this._setScrollWidth()
          this.refresh()
        }, 20)
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  .book-class-content
    width 100%
    background $background-color
    padding 0 1rem
    box-sizing border-box
    .class-title
      padding 1rem 0
      height 1.5rem
      line-height 1.5rem
      font-size $font-size-medium-x
      color $font-color-dd
      .title-solid
        display inline-block
        width 3px
        height 1.125rem
        vertical-align middle
        margin-right 0.5rem
        background $theme-color
    .class-book-list
      width 100%
      overflow hidden
      .list-wrapper
        padding-bottom 0.75rem
        height 100%
        display flex
        flex-flow row nowrap
        .item
          height 100%
          box-sizing border-box
          padding-right 1.6rem
          .image
            width 5.625rem
            height 7.3125rem
          .book-name
            font-size $font-size-medium
            color $font-color-dd
            line-height 2rem
            width 5.625rem
            no-wrap(1)
          .reader
            font-size $font-size-small
            width 5.625rem
            line-height 1rem
            no-wrap(1)
</style>

