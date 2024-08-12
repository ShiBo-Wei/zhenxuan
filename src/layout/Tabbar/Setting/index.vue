<template>
    <el-button circle icon="Refresh" @click="refresh"></el-button>
    <el-button
        type="primary"
        circle
        icon="FullScreen"
        @click="fullScreen"
    ></el-button>
    <el-button type="success" circle icon="Setting"></el-button>
    <img
        :src="userStore.avatar"
        style="
            height: 40px;
            width: 40px;
            margin-left: 20px;
            margin-right: 20px;
            border-radius: 50%;
        "
    />
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'

let $route = useRoute()
let $router = useRouter()
let userStore = useUserStore()
let LayOutSettingStore = useLayOutSettingStore()

let refresh = () => {
    LayOutSettingStore.rfs = !LayOutSettingStore.rfs
    console.log(LayOutSettingStore.rfs)
}

const exitLogin = async () => {
    await userStore.useLogout()
    $router.push({ path: '/login', query: { redirect: $route.path } })
}

const fullScreen = () => {
    let full = document.fullscreenElement
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
</script>
<script lang="ts">
export default {
    name: 'Setting',
}
</script>
<style lang="scss" scoped></style>
