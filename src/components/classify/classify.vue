<template>
  <div class="classify-wrapper">
    <div class="classify-top">
      <h1 class="top-title">分类</h1>
    </div>
    <div class="classify-group">
      <scroll class="classify-content" :data="male.concat(female)" :bounce="bounce">
        <div>
          <div class="classify">
            <div class="title">
              <span class="male line-icon"></span>
              <span class="name">男生频道</span>
            </div>
            <div class="classify-list">
              <div class="classify-item" v-for="(item, index) in male" :class="dark(index)" @click="selectItem(item)">
                <img class="item-image" :src="image + item.bookCover[0]" />
                <div class="item-content">
                  <h1 class="classify-text">{{item.name}}</h1>
                  <p class="classify-count">{{item.bookCount}}本</p>
                </div>
              </div>
            </div>
          </div>
          <div class="classify">
            <div class="title">
              <span class="female line-icon"></span>
              <span class="name">女生频道</span>
            </div>
            <div class="classify-list">
              <div class="classify-item" v-for="(item, index) in female" :class="dark(index)">
                <img class="item-image" :src="image + item.bookCover[0]" />
                <div class="item-content">
                  <h1 class="classify-text">{{item.name}}</h1>
                  <p class="classify-count">{{item.bookCount}}本</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getClassify} from 'api/classify'

  import Scroll from 'base/scroll/scroll'

  export default {
    data () {
      return {
        male: [],
        female: [],
        bounce: false,
        image: 'http://statics.zhuishushenqi.com',
        darkIndex: [0, 1, 4, 5, 8, 9, 12, 13]
      }
    },
    fliters: {
    },
    created () {
      this._getClassify()
    },
    methods: {
      selectItem (item) {
        this.$router.push({
          path: `/category/${item.name}`
        })
      },
      dark (index) {
        let matches = this.darkIndex.some(item => item === index)
        if (matches) {
          return 'dark'
        }
      },
      _getClassify () {
        getClassify().then(res => {
          if (res.data.ok) {
            this.male = res.data.male
            this.female = res.data.female
          }
        })
      }
    },
    components: {
      Scroll
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  .classify-wrapper
    position fixed
    top 0
    left 0
    right 0
    bottom 3.125rem
    .classify-top
      position fixed
      top 0
      left 0
      right 0
      height 2.75rem
      background $theme-color
      font-size $font-size-large
      color $font-color-ll
      text-align center
      line-height 2.75rem
    .classify-group
      position fixed
      top 2.75rem
      width 100%
      bottom 3.125rem
      .classify-content
        width 100%
        height 100%
        overflow hidden
        .classify
          padding 0 1rem 1rem 1rem
          .title
            height 2.875rem
            line-height 2.875rem
            color $font-color-dd
            .line-icon
              display inline-block
              height 1.125rem
              width 0.1875rem
              background #44a6fe
              vertical-align middle
              margin-right 0.25rem
              &.female
                background #f7666a
          .classify-list
            display flex
            width 100%
            flex-flow row wrap
            .classify-item
              width 50%
              padding 0.5rem 0
              height 3.375rem
              display flex
              &.dark
                background $background-color-mm
              .item-image
                height 3.375rem
                width 2.5rem
                margin-right 0.875rem
              .item-content
                flex 1
                .classify-text
                  font-size $font-size-large
                  color $font-color-d
                  line-height 2.125rem
                .classify-count
                  font-size $font-size-medium
                  color $font-color
</style>

