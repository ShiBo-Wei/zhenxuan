<template>
    <div>
        <router-view />
    </div>
</template>

<script lang="ts" setup>
import { reqLogin } from '@/api/user/index'
import { onMounted } from 'vue'

onMounted(() => {
    reqLogin({
        username: 'admin',
        password: '111611',
    })
})
</script>

<style lang="scss" scoped></style>
