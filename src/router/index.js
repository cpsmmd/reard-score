import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      component: resolve =>
        require(['@/components/login'], resolve)
    },
    {
      path: '/login',
      component: resolve =>
        require(['@/components/login'], resolve)
    },
    {
      path: '/pre',
      component: resolve =>
        require(['@/page/preview/pre'], resolve)
    },
    {
      path: '/menu',
      name: 'menu',
      component: resolve => require(['@/components/menu'], resolve),
      redirect: '/menu/works',
      children: [
        {
          path: 'customer',
          component: resolve =>
            require(['@/page/customer/customer'], resolve)
        },
        {
          path: 'works',
          component: resolve =>
            require(['@/page/works/List'], resolve)
        },
        {
          path: 'editWork',
          component: resolve =>
            require(['@/page/works/work'], resolve)
        },
        {
          path: 'account',
          component: resolve =>
            require(['@/page/account/account'], resolve)
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
export default router
