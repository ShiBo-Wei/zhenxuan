import { defineStore } from 'pinia'

import {
    LoginFormData,
    LoginResponseData,
    UserInfoResponseData,
} from '@/api/user/type'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'

import type { UserState } from './types/type'

import { SET_TOKEN } from '@/utils/tokens'
import { GET_TOKEN } from '@/utils/tokens'
import { REMOVE_TOKEN } from '@/utils/tokens'

import { constantRoutes } from '@/router/router'

let useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoutes,
            username: '',
            avatar: '',
        }
    },
    actions: {
        async userLogin(data: LoginFormData) {
            let result: LoginResponseData = await reqLogin(data)

            if (result.code === 200) {
                this.token = result.data as string
                console.log(this.token)

                SET_TOKEN(result.data as string)

                return '登录成功'
            } else {
                console.log(result.data)
                return Promise.reject(result.data)
            }
        },
        async userInfo() {
            let result: UserInfoResponseData = await reqUserInfo()
            if (result.code === 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                return 'ok'
                console.log(this.username, this.avatar)
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        async useLogout() {
            let res = await reqLogout()
            if (res.code === 200) {
                this.token = ''
                this.username = ''
                this.avatar = ''
                REMOVE_TOKEN()
            } else {
                return Promise.reject(res.message)
            }
        },
    },
    getters: {},
})

export default useUserStore
