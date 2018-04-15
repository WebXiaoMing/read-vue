import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const BookShelf  = () => import('components/book-shelf/book-shelf')
const Classify  = () => import('components/classify/classify')
const Handpick  = () => import('components/handpick/handpick')
const Search  = () => import('components/search/search')
const Mine  = () => import('components/mine/mine')
const RankList  = () => import('components/rank-list/rank-list')
const BookDetail  = () => import('components/book-detail/book-detail')
const Category  = () => import('components/category/category')
const BookText  = () => import('components/book-text/book-text')


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/handpick/',
      meta: { keepAlive: true }
    },
    {
      path: '/bookshelf',
      component: BookShelf,
      meta: { keepAlive: true }
    },
    {
      path: '/handpick/',
      component: Handpick,
      meta: { keepAlive: true },
      children: [
        {
          path: ':rank/',
          component: RankList,
        }
      ]
    },
    {
      path: '/classify',
      component: Classify,
      meta: { keepAlive: true }
    },
    {
      path: '/search',
      meta: { keepAlive: true },
      component: Search
    },
    {
      path: '/mine',
      meta: { keepAlive: true },
      component: Mine
    },
    {
      path: '/book/:id',
      name: 'book',
      component: BookDetail,
      meta: { keepAlive: false }
    },
    {
      path: '/category/:gender/:name',
      meta: { keepAlive: false },
      component: Category,
      props: true
    },
    {
      path: '/booktext/:id',
      meta: {keepAlive: false},
      component: BookText
    }
  ]
})
