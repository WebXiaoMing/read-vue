<template>
  <transition name="showLoad">
    <div class="wrapper">
      <img width="40" height="40" class="image" src="./upload.gif">
    </div>
  </transition>
</template>
<style lang="stylus" scoped>
  .wrapper
    width 100%
    text-align center
  .showLoad-enter-active,.showLoad-leave-active
    transition all 0.3
  .showLoad-enter,.showLoad-leave-to
    transform translate3d(0, -100%, 0)
</style>

