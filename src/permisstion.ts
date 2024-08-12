import router from '@/router'
import nprogress from 'nprogress'
import setting from './setting'

import 'nprogress/nprogress.css'
import pinia from './store'
import useUserStore from './store/modules/user'
import { GET_TOKEN } from './utils/tokens'

let userStore = useUserStore(pinia)
let token = userStore.token
let username = userStore.username

router.beforeEach(async (to, from, next) => {
    document.title = `${setting.title} - ${to.meta.title}`
    nprogress.start()
    if (token && token == GET_TOKEN()) {
        if (to.path === '/login') {
            // 如果用户已登录并且试图访问登录页，重定向到首页或其他页面

            next('/')
        } else {
            if (username) {
                next()
            } else {
                try {
                    await userStore.userInfo()
                    next()
                } catch (error) {
                    await userStore.useLogout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        // 如果用户未登录但试图访问非登录页面，重定向到登录页

        if (to.path == '/login') {
            next()
        } else {
            // 如果用户未登录并且试图访问登录页，直接允许访问

            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})

router.afterEach(() => {
    nprogress.done()
})
