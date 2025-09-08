import {createRouter, createWebHistory} from 'vue-router'
import {unauthorized} from "@/net/index.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: () => import('@/views/WelcomeView.vue'),
            children: [
                {
                    path: '',
                    name: 'welcome-login',
                    component: () => import('@/views/welcome/LoginPage.vue')
                }, {
                    path: 'forget',
                    name: 'welcome-forget',
                    component: () => import('@/views/welcome/ForgetPage.vue')
                }
            ]
        }, {
            path: '/index',
            name: 'index',
            component: () => import('@/views/IndexView.vue'),
            children: [
                {
                    path: '',
                    name: 'manage',
                    component: () => import('@/views/main/Manage.vue')
                }, {
                    path: 'security',
                    name: 'security',
                    component: () => import('@/views/main/Security.vue')
                }
            ]
        }
    ]
})

// 在路由跳转之前进行拦截处理
// 调用 unauthorized() 函数判断当前用户是否未授权
// 如果目标路由的名称以 'welcome-' 开头且用户未授权
// 重定向到 '/index' 路由
router.beforeEach((to, from, next) => {
    const isUnauthorized = unauthorized()
    if (to.name.startsWith('welcome-') && !isUnauthorized) {
        next('/index')
    } else if (to.fullPath.startsWith('/index') && isUnauthorized) {
        next('/')
    } else {
        next()
    }
})

export default router