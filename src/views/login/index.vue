<template>
    <div class="loginContiner">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form
                    class="login_form"
                    :model="loginForm"
                    :rules="rules"
                    ref="loginForms"
                >
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input
                            size="large"
                            :prefix-icon="User"
                            placeholder="请输入用户名"
                            v-model="loginForm.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                            size="large"
                            :prefix-icon="Lock"
                            show-password
                            type="password"
                            placeholder="请输入密码"
                            v-model="loginForm.password"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            :loading="loading"
                            class="login_btn"
                            type="primary"
                            round
                            @click="login"
                        >
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/times'

let $router = useRouter()
let $route = useRoute()
let useStore = useUserStore()
let loginForm = reactive({
    username: 'admin',
    password: '111111',
})
let loginForms = ref()
let loading = ref(false)
const rules = {
    username: [
        {
            required: true,
            min: 4,
            max: 10,
            message: '长度在4-10个字符',
            trigger: 'change',
        },
    ],
    password: [
        {
            required: true,
            min: 6,
            max: 15,
            message: '长度在6-15个字符',
            trigger: 'change',
        },
    ],
}

const login = async () => {
    await loginForms.value.validate()
    loading.value = true

    try {
        await useStore.userLogin(loginForm)
        let redirect = $route.query.redirect
        $router.push({ path: (redirect as string) || '/' })
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `Hi, ${getTime()}`,
        })
        loading.value = false
    } catch (error) {
        console.log(error)
        ElNotification({
            type: 'error',
            message: error as string,
        })
        loading.value = false
    }
}
</script>

<style scoped>
.loginContiner {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat center center
        fixed;
    background-size: cover;
}
.login_form {
    width: 50%;
    top: 30vh;
    position: relative;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
        color: aliceblue;
        font-size: 40px;
    }
    h2 {
        color: aliceblue;
        font-size: 30px;
        margin: 5px;
    }

    .login_btn {
        width: 100%;
    }
}
</style>
