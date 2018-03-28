import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const BookShelf = () => import('components/book-shelf/book-shelf')
const Classify = () => import('components/classify/classify')
const Handpick = () => import('components/handpick/handpick')
const Search = () => import('components/search/search')
const Mine = () => import('components/mine/mine')


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/bookshelf'
    },
    {
      path: '/bookshelf',
      component: BookShelf
    },
    {
      path: '/handpick',
      component: Handpick
    },
    {
      path: '/classify',
      component: Classify
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/mine',
      component: Mine
    }
  ]
})
