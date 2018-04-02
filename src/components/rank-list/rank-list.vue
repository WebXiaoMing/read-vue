<template>
  <transition name="fade">
    <div class="rank">
      <div class="rank-wrapper">
        <div class="rank-title">
          <div class="top-title">
            <div class="back" @click="back">
              <i class="icon-back"></i>
            </div>
            <div class="title">{{currentRank.shortTitle}}</div>
          </div>
          <div class="rank-tab">
            <div class="tab-item" v-for="(item, index) in rankType"
                                  @click="changeRank(index)"
            >
              <span class="tab-text" :class="{'active': index === currentType}">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="rank-content-wrapper">
          <upload v-show="pullingDown"></upload>
          <book-list  :bookList="rankList"
                      :pulldown="pulldown"
                      @onPullingDown="onPullingDown(_getRankList)"
                      :pullDownRefresh="pullDownRefresh"
                      ref="scroll"
                      @selectBook="selectBook"
          ></book-list>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import {rankType} from 'common/js/config'
  import {book} from 'common/js/books'
  import {mapGetters} from 'vuex'
  import {getRankList} from 'api/handpick'
  import {setPullDownRefresh} from 'common/js/mixin'

  import BookList from 'base/book-list/book-list'
  import Upload from 'base/upload/upload'

  export default {
    mixins: [setPullDownRefresh],
    data () {
      return {
        currentType: 0,
        rankType: [
          '周榜', '月榜', '总榜'
        ]
      }
    },
    computed: {
      typeText () {
      },
      ...mapGetters([
        'currentRank'
      ])
    },
    created () {
      this._getRankList()
    },
    methods: {
      back () {
        this.$router.back()
      },
      selectBook (item) {
        this.$router.push({
          path: `/handpick/book/${item.id}`
        })
      },
      changeRank (index) {
        this.currentType = index
        this.rankList = []
        this._getRankList()
      },
      _getRankList () {
        let id = this.currentType === rankType.weekRank ? this.currentRank._id :
                   this.currentType === rankType.monthRank ? this.currentRank.monthRank :
                   this.currentRank.totalRank
        if (typeof id === 'undefined') {
          this.back()
          return
        }
        getRankList(id).then(res => {
          this.rankList = res.data && res.data.ranking.books.map(item => book(item))
        })
      }
    },
    components: {
      BookList,
      Upload
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .rank
    position fixed
    z-index 996
    top 0
    left 0
    right 0
    bottom 0
    background $background-color-d
    .rank-wrapper
      position fixed
      top 5.25rem
      left 0
      right 0
      bottom 0
      width 100%
      .rank-title
        position fixed
        top 0
        left 0
        width 100%
        .top-title
          height: 2.75rem
          background $theme-color
          color $font-color-ll
          line-height 2.75rem
          .back
            width 2rem
            height 100%
            font-size $font-size-large-x
            text-align center
          .title
            position absolute
            width 70%
            top 0
            left 15%
            font-size $font-size-large
            text-align center
        .rank-tab
          display flex
          width 100%
          .tab-item
            flex 1
            text-align center
            height 2rem
            line-height 2rem
            .tab-text
              display inline-block
              box-sizing border-box
              color $font-color-dd
              &.active
                color $theme-color
                border-bottom 4px solid $theme-color
      .rank-content-wrapper
        width 100%
        height 100%
        overflow hidden
  .fade-enter-active, .fade-leave-active
    transition all 0.3s
  .fade-enter, .fade-leave-to
    transform translate3d(100%, 0, 0)
    opacity 0
</style>


