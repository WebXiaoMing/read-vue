<template>
  <scroll class="reviews-list" :data="data">
    <ul>
      <li class="reviews-item" v-for="item in data">
        <div class="avatar-content">
          <img class="avatar-image" :src="item.avatar"/>
        </div>
        <div class="reviews-content">
          <h1 class="author-name">{{item.author}}</h1>
          <p class="updated">{{item.updated}}</p>
          <h2 class="text-title">{{item.title}}</h2>
          <p class="text-content">{{item.content}}</p>
          <div class="comment-content">
            <span class="comments-num">回复 {{item.comments}}</span>
            <span class="praise-num">赞 {{item.praise}}</span>
          </div>
        </div>
      </li>
    </ul>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    components: {
      Scroll
    }
  }
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/variable.styl'
  @import '~common/stylus/mixin.styl'
  .reviews-list
    width 100%
    height 100%
    padding 0 1rem
    box-sizing border-box
    overflow hidden
    background $font-color-ll
    .reviews-item
      background $font-color-ll
      display flex
      flex-direction row
      padding 0.625rem 0
      border-bottom 1px solid $border-color
      &:last-child
        border-bottom none
      .avatar-content
        width 2rem
        height 100%
        margin-right 0.5rem
        .avatar-image
          width 2rem
          height 2rem
          border-radius 50%
      .reviews-content
        flex 1
        .author-name
          height 1.125rem
          font-size $font-size-medium
          color $theme-color
        .updated
          height 1.125rem
          font-size $font-size-small
          color $font-color
        .text-title
          line-height 1.875rem
          no-wrap(1)
          color $font-color-dd
        .text-content
          font-size $font-size-medium
          line-height 1.25rem
          color $font-color-d
          height 3.6875rem
          no-wrap(3)
        .comment-content
          margin-top 0.375rem
          font-size $font-size-small-s
          .comments-num
            margin-right 0.5rem
</style>

