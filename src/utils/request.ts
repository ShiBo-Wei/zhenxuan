// 二次封装，使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'

import useUserStore from '@/store/modules/user'

let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000,
})
// request实例添加请求与响应拦截器

request.interceptors.request.use((config) => {
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    return config
})

request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        let message = ''
        let status = error.response.status
        switch (status) {
            case 401:
                message = '未授权，请登录'
                break
            case 403:
                message = '拒绝访问'
                break
            case 404:
                message = `请求地址出错`
                break
            case 500:
                message = '服务器内部错误'
                break
            default:
                message = '网络出现问题'
                break
        }

        ElMessage({
            type: 'error',
            message,
        })
        return Promise.reject(error)
    },
)

export default request
