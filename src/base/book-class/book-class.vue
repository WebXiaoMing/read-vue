<template>
  <div class="book-class-content">
    <h1 class="class-title"><span class="title-solid"></span>{{title}}</h1>
    <div class="class-book-list" ref="slider">
      <div class="list-wrapper" ref="sliderGroup">
        <div class="item">
          <img class="image" src="./image.png">
          <p class="book-name">完美人生</p>
          <p class="reader">12万人读过</p>
        </div>
        <div class="item">
          <img class="image" src="./image.png">
          <p class="book-name">完美人生</p>
          <p class="reader">12万人读过</p>
        </div>
        <div class="item">
          <img class="image" src="./image.png">
          <p class="book-name">完美人生</p>
          <p class="reader">128.9万人读过</p>
        </div>
        <div class="item">
          <img class="image" src="./image.png">
          <p class="book-name">完美人生</p>
          <p class="reader">12万人读过</p>
        </div>
      </div>
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
        default: 20
      },
    },
    created () {
      setTimeout(() => {
        this._setScrollWidth()
        this._initScroll()
      }, this.refreshDelay)
    },
    methods: {
      _setScrollWidth () {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let itemWidth = this.children[0].clientWidth

        for (let i = 0; i < this.children.length; i ++) {
          width += itemWidth
        }

        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initScroll () {
        this.scroll = new Bscroll(this.$refs.slider, {
          scrollY: false,
          scrollX: true,
          click: false,
          bounce: false
        })
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      }
    },
    watch: {
      data () {
        setTimeout (() => {
          this.refresh()
        }, this.refreshDelay)
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

