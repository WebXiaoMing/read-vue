<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll'

  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      pullDownRefresh: {
        type: Object,
        default: null
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      direction: {
        type: String,
        default: DIRECTION_V
      },
      bounce: {
        type: Boolean,
        default: true
      },
      pulldown: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
        this.scroll.refresh()
      }, 200)
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }

        this.scroll = new Bscroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          bounce: this.bounce,
          eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V,
          pullDownRefresh: this.pullDownRefresh
        })

         if (this.pulldown) {
          this.scroll.on('pullingDown', () => {
            this.$emit('onPullingDown')
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      finishPullDown () {
        this.scroll && this.scroll.finishPullDown()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
