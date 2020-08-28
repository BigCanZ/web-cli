import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/Layout'
/**
 * 正对3.0以上版本路由跳转返回promise,捕获异常处理控制台不报错
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}
Vue.use(VueRouter)

export const constRoutes = [
  {
    path: '/default',
    component: () => import('@/views/default'),
    hidden: true
  },
  {
    path: '/',
    component: Layout, // 应⽤用布局
    redirect: '/home',
    meta: {
      title: '主页'
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/Home.vue'),
        name: 'home',
        meta: {
          title: 'Home'
        }
      }
    ]
  }
]

// 权限⻚页⾯面
export const asyncRoutes = [{
  path: '/about',
  component: Layout,
  redirect: '/about/index',
  children: [{
    path: 'index',
    component: () => import('@/views/About.vue'),
    name: 'about',
    meta: {
      title: 'About'
    }
  }]
}]

const router = new VueRouter({
  routes: [...asyncRoutes, ...constRoutes]
})

export default router
