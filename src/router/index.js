import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'hello',
            component: () => import('@/components/HelloWorld')
        }
    ],
    mode: 'history'
})
