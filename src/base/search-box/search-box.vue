<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-delete"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      placeholder: {
        type: String,
        default: '请输入书名或作者名'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear () {
        this.query = ''
      },
      setQuery (query) {
        this.query = query
      },
      blur () {
        this.$refs.query.blur()
      }
    },
    created () {
      this.$watch('query', (newQuery) => {
        this.$emit('query', newQuery)
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .search-box
    display flex
    align-items center
    background #f0f0f2
    box-sizing border-box
    width 100%
    padding 0 0.625rem
    height 2.25rem
    border-radius 0.5rem
    .icon-search
      font-size $font-size-medium-x
      color $font-color-d
    .box
      flex 1
      margin 0 5px
      line-height 18px
      background #f0f0f2
      color $font-color-dd
      font-size $font-size-medium-x
      outline 0
      &::placeholder
        color $font-color-l
    .icon-delete
      font-size $font-size-medium-x
      color $font-color
</style>
