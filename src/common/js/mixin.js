
export const setPullDownRefresh = {
  data () {
    return {
      rankList: [],
      pulldown: true,
      pullingDown: false,
      pullDownRefresh: {
        threshold: 50,
        stop: 40
      }
    }
  },
  methods: {
    onPullingDown (requestFunc) {
      clearTimeout(this.timer)
      this.pullingDown = true
      setTimeout(() => {
        requestFunc()
        if (!this.pullingDown) {
          console.log('hello')
          this.$refs.scroll.finishPullDown()
        } else {
          this.pullingDown = false
          this.$refs.scroll.finishPullDown()
        }
      }, 1000)
    }
  },
  watch: {
    rankList (newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.pullingDown = false
      }
    }
  }
}
