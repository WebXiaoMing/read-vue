<template>
  <div class="book-class-content">
    <h1 class="class-title"><span class="title-solid"></span>{{title}}</h1>
    <div class="class-book-list">
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
          <p class="reader">12万人读过</p>
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
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    mounted () {
      setTimeout(() => {
        this._setScrollWidth()
      }, 2000)
    },
    methods: {
      _setScrollWidth () {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let item = document.querySelectorAll('.class-book-list .list-wrapper .item')[0]
        console.log(item.style)
        let itemWidth = parseInt(item.clientWidth) + parseInt(item.style.marginRight)

        for (let i = 0; i < this.children.length; i ++) {
          width += itemWidth
        }
        console.log(width)
        this.$refs.sliderGroup.style.width = width + 'px'
      }
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'

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
        .item
          float left
          width 5.625rem
          height 100%
          margin-right 2rem
          .image
            width 100% 
</style>

