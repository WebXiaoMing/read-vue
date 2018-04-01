
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
      if (this.pullingDown) {
        this.timer = setTimeout(() => {
          this.$refs.scroll.finishPullDown()
        }, 500)
        return
      }
      this.pullingDown = true
      requestFunc()
      this.timer = setTimeout(() => {
        this.$refs.scroll.finishPullDown()
      }, 500)
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
