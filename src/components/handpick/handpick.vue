<template>
  <div class="handpick-wrapper" @click="hideSwitch">
    <div class="top-title">
      <div class="switch-wrapper" @click.stop="showSwitchBox">
        <span class="man-title">{{genderText}}</span>
        <span class="arrow-btn" :class="{'active': open}"><i class="icon-arrow"></i></span>
        <div class="switch-box-content">
          <switch-box :currentIndex="currentIndex"
                      :title="title"
                      @checkSwitch="checkSwitch"
                      ref="switch"
          />
        </div>
      </div>
      <div class="title">精选</div>
    </div>
    <div class="upload-wrapper" v-show="pullingDown">
      <upload></upload>
    </div>
    <scroll class="container" :data="rankList"
                              :pulldown="pulldown"
                              @onPullingDown="onPullingDown(_getRankType)"
                              :pullDownRefresh="pullDownRefresh"
                              ref="scroll"
    >
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider></slider>
          </div>
        </div>
        <div class="book-list-wrapper recommend">
          <recommend-list @recommendRank="getRecommendRank('recommend')"
                          :rankList="rankList"
                          @selectBook="selectBook"
                          />
        </div>
        <div class="book-list-wrapper hot">
          <hot-list @hotRank="getRecommendRank('hot')" :list="rankList"></hot-list>
        </div>
        <div class="book-list-wrapper finish">
          <finish-list @finishRank="getRecommendRank('finish')" :list="rankList"></finish-list>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import RecommendList from 'base/recommend-list/recommend-list'
  import HotList from 'base/hot-list/hot-list'
  import FinishList from 'base/finish-list/finish-list'
  import Upload from 'base/upload/upload'
  import SwitchBox from 'base/switch-box/switch-box'

  import {getRankType} from 'api/handpick'
  import {setPullDownRefresh} from 'common/js/mixin'

  export default {
    mixins: [setPullDownRefresh],
    data () {
      return {
        gender: 'male',
        title: ['男神', '女神'],
        currentIndex: 0,
        open: false
      }
    },
    filters: {
      getSortRank (arr, sort) {
        if (!arr.length) {
          return
        }
        return arr.filter((item) => item.shortTitle === sort)
      }
    },
    computed: {
      genderText () {
        return this.gender === 'male' ? '男神' : '女神'
      }
    },
    created () {
      this._getRankType()
    },
    methods: {
      _getRankType () {
        getRankType().then(res => {
          this.rankList = res.data[this.gender]
        })
      },
      getRecommendRank (rank) {
        this.$router.push({
          path: `/handpick/${rank}`
        })
      },
      selectBook (item) {
        console.log(item)
        this.$router.push({
          path: `/handpick/book/${item.id}`
        })
      },
      showSwitchBox () {
        this.$refs.switch.show()
        this.open = true
      },
      hideSwitch () {
        this.$refs.switch.hide()
        this.open = false
      },
      checkSwitch (index) {
        if (this.currentIndex === index) {
          return
        }
        this.open = false
        this.currentIndex = index
        this.currentIndex === 0 ? this.gender = 'male' : this.gender = 'female'
      }
    },
    watch: {
        gender (newVal, oldVal) {
          if (newVal && newVal !== oldVal) {
            this._getRankType()
          }
        }
    },
    components: {
      Slider,
      RecommendList,
      HotList,
      Scroll,
      FinishList,
      Upload,
      SwitchBox
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .handpick-wrapper
    position fixed
    top 2.75rem
    left 0
    right 0
    bottom 3.125rem
    z-index 100
    background $background-color-d
    .top-title
      position fixed
      top 0
      left 0
      z-index 998
      width 100%
      height: 2.75rem
      background $theme-color
      color $font-color-ll
      line-height 2.75rem
      .switch-wrapper
        line-height 2.75rem
        padding-left 1rem
        font-size $font-size-medium
        width 3.75rem
        .arrow-btn
          position absolute
          margin-left 0.625rem
          font-size 0.875rem
          transform rotate(-90deg)
          transition all 0.3s
          &.active
            transform rotate(90deg)
      .title
        position absolute
        width 70%
        left 15%
        top 0
        text-align center
        font-size $font-size-large
    .upload-wrapper
      position absolute
      top 0
      left 0
      width 100%
    .container
      width 100%
      height 100%
      overflow hidden
      .slider-wrapper
        position relative
        left 0
        width 100%
        height 0
        padding-top 40%
        overflow hidden
        .slider-content
          position absolute
          top 0
          left 0
          width 100%
          height 100%
      .book-list-wrapper
        margin-top 0.625rem
        padding 0 1rem
        background $background-color
</style>
