<template>
  <div class="handpick-wrapper">
    <div class="top-title">
      <div class="switch-wrapper">
        <span class="man-title">{{genderText}}</span>
        <span class="arrow-btn"><i class="icon-arrow"></i></span>
      </div>
      <div class="title">精选</div>
    </div>
<<<<<<< HEAD
    <scroll class="container" :data="rankList">
      <div>
        <div class="slider-wrapper">
            <div class="slider-content">
              <slider></slider>
            </div>
          </div>
        <div class="book-list-wrapper recommend">
          <recommend-list :rankList="rankList"></recommend-list>
        </div>
        <div class="book-list-wrapper hot">
          <hot-list :list="rankList" title="热门追更"></hot-list>
        </div>
        <div class="book-list-wrapper finish">
          <hot-list :list="rankList" title="完结经典"></hot-list>
=======
    <scroll class="container" :data="list">
      <div>
        <div class="slider-wrapper">
            <div class="slider-content">
              <slider>
              </slider>
            </div>
          </div>
        <div class="book-list-wrapper recommend">
          <recommend-list></recommend-list>
          <recommend-list></recommend-list>
>>>>>>> 33f8be6e677a77d98181c71c89997c924ee026ae
        </div>
        <div class="book-list-wrapper hot"></div>
        <div class="book-list-wrapper finish"></div>
      </div>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import RecommendList from 'base/recommend-list/recommend-list'
  import HotList from 'base/hot-list/hot-list'

  import {getRankType} from 'api/handpick'

  export default {
    data () {
      return {
<<<<<<< HEAD
        rankList: [],
        gender: 'male'
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
        return this.gender === 'male' ? '男生' : '女生'
=======
        list: []
>>>>>>> 33f8be6e677a77d98181c71c89997c924ee026ae
      }
    },
    created () {
      this._getRankType()
    },
    methods: {
      _getRankType () {
        getRankType().then(res => {
          this.rankList = res.data[this.gender]
          console.log(this.rankList)
        })
      }
    },
    components: {
      Slider,
      RecommendList,
<<<<<<< HEAD
      HotList,
=======
>>>>>>> 33f8be6e677a77d98181c71c89997c924ee026ae
      Scroll
    }
  }
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  .handpick-wrapper
    position fixed
<<<<<<< HEAD
    top 3.125rem
    left 0
    right 0
    bottom 3.125rem
=======
    top 0
    left 0
    right 0
    bottom 3.125rem
    height 100%
>>>>>>> 33f8be6e677a77d98181c71c89997c924ee026ae
    background $background-color-d
    .top-title
      position fixed
      top 0
      left 0
      z-index 998
      width 100%
      height: 3.125rem
      background $theme-color
      color $font-color-ll
      line-height 3.125rem
      .switch-wrapper
        line-height 3.125rem
        padding-left 1rem
        font-size 1rem
        .arrow-btn
          position absolute
          margin-left 0.625rem
          font-size 0.875rem
      .title
        position absolute
        width 70%
        left 15%
        top 0
        text-align center
        font-size $font-size-large
    .container
<<<<<<< HEAD
=======
      position relative
      left 0
      bottom 3.125rem
      top 3.125rem
      right 0
      width 100%
>>>>>>> 33f8be6e677a77d98181c71c89997c924ee026ae
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
