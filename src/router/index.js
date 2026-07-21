import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/',
    redirect: '/comprehensive'
  },
  {
    path: '/comprehensive',
    name: 'Comprehensive',
    component: () => import('@/views/comprehensive/index.vue'),
    meta: { title: '综合看板' }
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: () => import('@/views/maintenance/index.vue'),
    meta: { title: '养护一张图' }
  },
  {
    path: '/inspection',
    name: 'Inspection',
    component: () => import('@/views/inspection/index.vue'),
    meta: { title: '巡检一张图' }
  },
  {
    path: '/bridge',
    name: 'Bridge',
    component: () => import('@/views/comprehensive/index.vue'),
    meta: { title: '桥梁' }
  },
  {
    path: '/road',
    name: 'Road',
    component: () => import('@/views/road/index.vue'),
    meta: { title: '路面' }
  },
  {
    path: '/slope',
    name: 'Slope',
    component: () => import('@/views/comprehensive/index.vue'),
    meta: { title: '边坡' }
  },
  {
    path: '/tunnel',
    name: 'Tunnel',
    component: () => import('@/views/tunnel/index.vue'),
    meta: { title: '隧道' }
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue')
  },
  { path: '*', redirect: '/404' }
]

const router = new Router({
  routes: constantRoutes,
  scrollBehavior: () => ({ y: 0 })
})

export default router
