import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
/*import Index from '@/views/Index'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Log from '@/views/Log'
import MessageBoard from '@/views/MessageBoard'
import BlogWrite from '@/views/blog/BlogWrite'
import BlogView from '@/views/blog/BlogView'
import BlogAllCategoryTag from '@/views/blog/BlogAllCategoryTag'
import BlogCategoryTag from '@/views/blog/BlogCategoryTag'*/

import { Message } from 'element-ui';


import store from '@/store'

import { getToken } from '@/request/token'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/write/:id?',
      component: r => require.ensure([], () => r(require('@/views/blog/BlogWrite')), 'blogwrite'),
      meta: {
        requireLogin: true
      },
    },
    {
      path: '',
      // name: 'Home',
      component: Home,
      children: [
        {
          // base component
          path: '/',
          component: r => require.ensure([], () => r(require('@/views/Index')), 'index')
        },
        {
          path: '/myBlog',
          component: r => require.ensure([], () => r(require('@/views/MyBlog')), 'myBlog'),
          meta: {
            requireLogin: true
          }
        },
        {
          path: '/searchResultByTitle/:keyword',
          component: r => require.ensure([], () => r(require('@/views/SearchResult')), 'searchResult'),
          meta: {
            title: '搜索页面'
          }
        },
        {
          path: '/archives/:year?/:month?',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogArchive')), 'archives')
        },
        {
          path: '/view/:id',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogView')), 'blogview')
        },

        // :type can only be `tag`, not supporting other types currently
        {
          path: '/:type/all',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogAllCategoryTag')), 'blogallcategorytag')
        },
        // :type can only be `tag`, not supporting other types currently
        {
          path: '/:type/:id',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogCategoryTag')), 'blogcategorytag')
        },
        // {
        //   path: '/search',
        //   component: r => require.ensure([], () => r(require('@/views/Search')), 'search')
        // },
        // {
        //   path: '/follows',
        //   component: r => require.ensure([], () => r(require('@/views/Follows')), 'follows')
        // },
        // {
        //   path: '/log',
        //   component: r => require.ensure([], () => r(require('@/views/Log')), 'log')
        // },
        // {
        //   path: '/messageBoard',
        //   component: r => require.ensure([], () => r(require('@/views/MessageBoard')), 'messageboard')
        // }
      ]
    },
    {
      path: '/login',
      component: r => require.ensure([], () => r(require('@/views/Login')), 'login')
    },
    {
      path: '/register',
      component: r => require.ensure([], () => r(require('@/views/Register')), 'register')
    },
    {
      path: '*',
      component: r => require.ensure([], () => r(require('@/views/page404')), 'page404')
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {

  // if already logged in
  if (getToken()) {

    // and want to go to login page
    if (to.path === '/login') {

      // then jump to home page instead
      next({ path: '/' })
    }

    // and want to go to other page rather than /login
    else {
      // if not have state info loaded, load it
      if (store.state.account.length === 0) {
        store.dispatch('getUserInfo').then(data => {
          next()
        }).catch(() => {
          next({ path: '/' })
        })
      }
      // otherwise go directly
      else {
        next()
      }
    }
  }

  // if not logged in
  else {
    // check if destination page need privilege
    if (to.matched.some(r => r.meta.requireLogin)) {
      Message({
        type: 'warning',
        showClose: true,
        message: '请先登录哦'
      })
    }
    else {
      next();
    }
  }
})


export default router
