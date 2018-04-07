import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const BookShelf = () => import('components/book-shelf/book-shelf')
const Classify = () => import('components/classify/classify')
const Handpick = () => import('components/handpick/handpick')
const Search = () => import('components/search/search')
const Mine = () => import('components/mine/mine')
const RankList = () => import('components/rank-list/rank-list')
const BookDetail = () => import('components/book-detail/book-detail')


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/handpick/'
    },
    {
      path: '/bookshelf',
      component: BookShelf
    },
    {
      path: '/handpick/',
      component: Handpick,
      children: [
        {
          path: ':rank/',
          component: RankList,
        },
        {
          path: 'book/:id',
          component: BookDetail
        }
      ]
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
