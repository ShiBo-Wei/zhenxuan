<template>
    <div class="logo" v-if="setting.Show">
        <img :src="setting.logo" alt="" />
        <p v-if="!LayOutSettingStore.fold">{{ setting.title }}</p>
    </div>
</template>

<script lang="ts" setup>
import setting from './../../setting'
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore = useLayOutSettingStore()
</script>
<script lang="ts">
export default {
    name: 'Logo',
}
</script>

<style lang="scss" scoped>
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    color: aquamarine;
    img {
        width: 40px;
        height: 40px;
        margin-left: 10px;
    }
    p {
        margin-left: 20px;
        font-size: $base-menu-logo-text-size;
    }
}
</style>
