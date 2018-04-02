<template>
<transition name="bookDetail">
  <div class="book-detail">
    <div class="top-title">
      <i class="icon-back" @click="back"></i>
      <p class="top-book-name">{{showTopTitle}}</p>
      <div class="top-title-layer" v-show="upMove" ref="topTitle"></div>
    </div>
    <div class="bg-layer" ref="bgLayer"></div>
    <div class="book-detail-content" ref="detailContent">
      <scroll class="content" :data="sameAuthor"
                              :probe-type="probeType"
                              :listen-scroll="listenScroll"
                              @scroll="scroll"
      >
        <div>
          <div class="book-info-wrapper" ref="bookInfo">
            <div class="book-image">
              <img src="./image.png">
            </div>
            <div class="book-info">
              <h1 class="book-name">完美人生</h1>
              <p class="book-author">刀一耕</p>
              <div class="rating-wrapper">
                <div class="rating-star">
                  <i class="icon-star-solid"></i><i class="icon-star-solid"></i><i class="icon-star-solid"></i><i class="icon-star-half"></i><i class="icon-star-dashed"></i>
                </div>
                <p class="rating-info">7.1分 (1.4万人评)</p>
              </div>
              <p class="category">都市 | 都市生活</p>
              <p class="words">461.0万字 | 连载</p>
            </div>
          </div>
          <div class="book-content">
            <h1 class="short-title">简介</h1>
            <p class="short-info">李谦重生了。另外一个时空的1995年。在这里，他当然比普通人更容易获得成功。但成功是什么？钱么？或者，名气？地位？荣耀？都是，但不全是。
            有了那回眸的浅浅一笑，那牵手的刹那温暖，那入怀的淡淡体香；这人生，才称得上完美。【全订群】：74640518【普通群】：450609038【微信公众号】：刀一耕</p>
            <div class="catalog-wrapper">
              <span class="catalog-title">目录</span>
              <span class="catalog-info">连载至 1070 章 更新于38分钟前<i class="icon-arrow"></i></span>
            </div>
          </div>
          <div class="book-class-wrapper">
            <book-class title="作者其他作品" :data="sameAuthor"></book-class>
          </div>
          <div class="book-class-wrapper">
            <book-class title="同类作品推荐" :data="sameAuthor"></book-class>
          </div>
        </div>
      </scroll>
    </div>
    <div class="book-detail-btn">
      <div class="item addbook"><i class="icon-addbook"></i>加入书架</div>
      <div class="item reading"><i class="icon-read"></i>立即阅读</div>
      <div class="item download"><i class="icon-download"></i>下载</div>
    </div>
  </div>
</transition>
</template>
<script type="text/ecmascript-6">
  import BookClass from 'base/book-class/book-class'
  import Scroll from 'base/scroll/scroll'

  import {prefixStyle} from 'common/js/dom'

  const backdrop = prefixStyle('backdrop-filter')
  const transform = prefixStyle('transform')

  export default {
    data () {
      return {
        sameAuthor: [],
        sameGenre: [],
        showTopTitle: '',
        scrollY: 0,
        upMove: false
      }
    },
    created () {
      this.listenScroll = true
      this.probeType = 3
    },
    mounted () {
      this.minHeight = -this.$refs.topTitle.clientHeight
      this.maxHeight = -this.$refs.bookInfo.clientHeight
    },
    methods: {
      scroll (pos) {
        this.scrollY = pos.y
      },
      back () {
        this.$router.back()
      }
    },
    watch: {
      scrollY (newY) {
        let precent = Math.abs(newY / this.maxHeight)
        let scale = 1
        let top = 0
        let blur = 20
        // 当滚动距离超过title高度时候，把书名显示在title上
        if (newY < this.minHeight) {
          this.showTopTitle = '完美人生'
        } else {
          this.showTopTitle = ''
        }
        // 向上滚动的时候 实时改变背景图片的position 使其有向上滑动的特效
        if (newY < 0) {
          this.upMove = true
          this.$refs.topTitle.style.backgroundPosition = `0 ${newY}px`
          this.$refs.bgLayer.style.backgroundPosition = `0 ${newY + this.minHeight}px`
        }

        if (newY <= this.maxHeight) {
          this.$refs.topTitle.style.backgroundPosition = `0 ${this.maxHeight}px`
          this.$refs.topTitle.style[backdrop] = `blur(${blur}px)`
        }

        if (newY >= 0) {
          this.upMove = false
          scale = 1 + precent
          this.$refs.bgLayer.style.backgroundPosition = `0 0`
          this.$refs.bgLayer.style[transform] = `scale(${scale})`
        }
      }
    },
    components: {
      BookClass,
      Scroll
    }
  }

</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'

  .book-detail
    position fixed
    z-index 998
    top 0
    left 0
    right 0
    bottom 0
    height 100%
    background $background-color-d
    .book-detail-btn
      position fixed
      left 0
      right 0
      bottom 0
      height 3.25rem
      display flex
      box-sizing border-box
      background $background-color-d
      border-top 1px solid $border-color
      .item
        display flex
        flex-direction column
        justify-content center
        text-align center
        font-size $font-size-small-s
        i
          font-size $font-size-large-xx
          margin-bottom 0.25rem
        &.reading
          width 48%
          background $theme-color
          color $background-color
        &.download, &.addbook
          width 26%
    .top-title
      position fixed
      top 0
      width 100%
      height 2.75rem
      line-height 2.75rem
      color $background-color
      .top-title-layer
        position absolute
        top 0
        width 100%
        height 100%
        background url(../../common/image/loading/book-image2.jpg) no-repeat
        background-size cover
        transform-origin top
        z-index -1
      .icon-back
        display inline-block
        width 2rem
        height 100%
        font-size 1.25rem
        text-align center
      .top-book-name
        position absolute
        top 0
        left 15%
        width 70%
        text-align center
        no-wrap(1)
    .bg-layer
      position absolute
      top 0
      width 100%
      height 11.5rem
      left 0
      background url(../../common/image/loading/book-image2.jpg) no-repeat
      background-size cover
      transform-origin top
      z-index -998
    .book-detail-content
      position absolute
      top 2.75rem
      bottom 3.25rem
      width 100%
      .content
        width 100%
        height 100%
        overflow hidden
        .book-info-wrapper
          height 8.75rem
          box-sizing border-box
          padding 0.875rem 1rem
          display flex
          .book-image
            height 100%
            width 5.3125rem
            margin-right 1.625rem
            img
              width 100%
              height 100%
          .book-info
            color $background-color
            flex 1
            display flex
            flex-direction column
            font-size $font-size-medium
            .book-name
              font-size $font-size-medium-x
              width 100%
              height 1.625rem
              no-wrap(1)
            .book-author
              height 1.5rem
            .rating-wrapper
              width 100%
              height 1.5rem
              height 1.5rem
              display flex
              .rating-star
                color #ebc44d
                margin-right 0.25rem
            .category
              height 1.5rem
              width 100%
        .book-content
          padding 0 1rem
          background $background-color
          margin-bottom $margin-bottom
          .short-title
            font-size $font-size-medium-x
            color $font-color-dd
            line-height 2.5rem
          .short-info
            font-size $font-size-medium
            line-height 1.25rem
            margin-bottom 1.25rem
            color $font-color-d
          .catalog-wrapper
            border-top 1px solid $border-color
            height 2.5rem
            line-height 2.5rem
            position relative
            .catalog-title
              font-size $font-size-medium-x
              color $font-color-dd
            .catalog-info
              position absolute
              font-size $font-size-medium
              right 0
              .icon-arrow
                margin-left 0.625rem
        .book-class-wrapper
          margin-bottom $margin-bottom

  .bookDetail-enter-active, .bookDetail-leave-active
    transition all 0.3s
  .bookDetail-enter, .bookDetail-leave-to
    transform translate3d(100%, 0, 0)
</style>

