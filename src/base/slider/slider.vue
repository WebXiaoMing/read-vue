<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <div>
        <img class="image" src="../../common/image/banner/0.jpg"/>
      </div>
      <div>
        <img class="image" src="../../common/image/banner/1.jpg"/>
      </div>
      <div>
        <img class="image" src="../../common/image/banner/2.jpg"/>
      </div>
      <div>
        <img class="image" src="../../common/image/banner/3.jpg"/>
      </div>
    </div>
    <div class="dots">
      <span v-for="(item, index) in dots" class="dot" :class="{'active': currentIndex === index}"></span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll'
  export default {
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data () {
      return {
        currentIndex: 0,
        dots: []
      }
    },
    mounted () {
      setTimeout(() => {
        this._initSliderWidth()
        this._initDots()
        this._initScroll()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => {
        if (!this.scroll || !this.scroll.enable) {
          return
        }
        clearTimeout(this.resizeTime)
        this.resizeTime = setTimeout(() => {
          if (this.scroll.isInTransition) {
            this._onScrollEnd()
          } else {
            this._play()
          }
          this.refresh()
        }, 60)
      })
    },
    activated () {
      if (!this.scroll) {
        return
      }
      this.scroll.enable()
      let pageIndex = this.scroll.getCurrentPage().pageX
      this.scroll.goToPage(pageIndex, 0, 0)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated () {
      this.scroll.disable()
      clearTimeout(this.timer)
    },
    beforeDestroy () {
      this.scroll.disable()
      clearTimeout(this.timer)
    },
    methods: {
      refresh () {
        this._initSliderWidth(true)
        this.scroll.refresh()
      },
      _initSliderWidth (isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth

        for (let i = 0; i < this.children.length; i ++) {
          let child = this.children[i]
          child.classList.add('slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }

        if (this.loop && !isResize) {
          width += sliderWidth * 2
        }

        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initDots () {
        this.dots = new Array(this.children.length)
      },
      _initScroll () {
        this.scroll = new Bscroll(this.$refs.slider, {
          scrollY: false,
          scrollX: true,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
        })

        this.scroll.on('scrollEnd', this._onScrollEnd)

        this.scroll.on('touchend', () => {
          if (this.autoPlay) {
            this._play()
          }
        })
        this.scroll.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
      },
      _onScrollEnd () {
        let pageIndex = this.scroll.getCurrentPage().pageX
        this.currentIndex = pageIndex
        if (this.autoPlay) {
          this._play()
        }
      },
      _play () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.scroll.next()
        }, this.interval)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .slider
    height 100%
    min-height: 1px
    .slider-group
      position relative
      overflow hidden
      .slider-item
        float left
        box-sizing border-box
        height 100%
        overflow hidden
        .image
          width 100%
          height 100%
    .dots
      position absolute
      left 0
      right 0
      bottom 0.75rem
      text-align center
      .dot
        width 0.5rem
        height 0.5rem
        margin 0 0.25rem
        display inline-block
        border-radius 0.25rem
        background #fff
        opacity 0.5
        &.active
          width 1.25rem
</style>
