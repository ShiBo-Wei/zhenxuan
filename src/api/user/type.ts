// 定义

export interface LoginFormData {
    username: string
    password: string
}

// 定义全部返回数据都有的ts类型

export interface ResponseData {
    code: number
    message: string
    ok: boolean
}

export interface LoginResponseData extends ResponseData {
    data: string
}

export interface UserInfoResponseData extends ResponseData {
    data: {
        routes: string[]
        buttons: string[]
        roles: string[]
        name: string
        avatar: string
    }
}
