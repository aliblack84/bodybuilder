import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import { testAuth } from '../modules/authentication';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: "/profileDialog",
                    name: "profileDialog",
                    component: () => import('@/views/profileDialog.vue')
                },
                {
                    path: '/premium',
                    name: 'premium',
                    component: () => import('@/views/premium.vue')
                },
                {
                    path: '/message',
                    name: 'message',
                    component: () => import('@/views/message.vue')

                },
                {
                    path: '/chart',
                    name: 'chart',
                    component: () => import('@/views/chart.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/Animations.vue')
                },
                {
                    path: '/file',
                    name: 'upload',
                    component: () => import('@/views/upload.vue')
                },


                {
                    path: '/users',
                    name: 'table',
                    component: () => import('@/views/Table.vue')
                },
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

router.afterEach(async (to, from) => {
    if (to.path === '/auth/login') {
        return true
    } else {
        const result = await testAuth();
        if (result.status === 401 || result.status === 403) {
            router.push('/auth/login')
        } else {
            return true;
        }
    }
})

export default router;
