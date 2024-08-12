<template>
    <div class="layout_continer">
        <div
            class="layout_slider"
            :class="{ fold: LayOutSettingStore.fold ? true : false }"
        >
            <Logo />
            <el-scrollbar class="scrollbar">
                <el-menu
                    :collapse="LayOutSettingStore.fold"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#409eff"
                    :default-active="$route.path"
                    class="el-menu-vertical-demo"
                >
                    <Menu :menuList="userStore.menuRoutes" />
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar">
            <Tabbar />
        </div>
        <div class="layout_main">
            <Main></Main>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Logo from './Logo/index.vue'
import Menu from './Menu/index.vue'
import Main from './Main/index.vue'
import Tabbar from './Tabbar/index.vue'
import { useRoute } from 'vue-router'
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
let LayOutSettingStore = useLayOutSettingStore()

let userStore = useUserStore()

let $route = useRoute()
</script>
<script lang="ts">
export default {
    name: 'Layout',
}
</script>

<style lang="scss" scoped>
.layout_continer {
    width: 100%;
    height: 100vh;
    transition: width 0.3s;
    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-bg;
        transition: width 0.3s;
        .scrollbar {
            width: 100%;
            height: calc(100% - $base-tabbar-height);

            .el-menu {
                border-right: none;
            }
        }
        &.fold {
            width: 64px;
        }
    }
    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background-color: $base-tabbar-bg;
        top: 0;
        left: $base-menu-width;
        transition: left 0.3s;
    }
    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        top: $base-tabbar-height;
        left: $base-menu-width;
        padding: 20px;
        overflow: auto;
        transition:
            left 0.3s,
            width 0.3s;
    }
    .fold ~ .layout_tabbar,
    .fold ~ .layout_main {
        left: 64px;
        width: calc(100% - 64px);
    }
}
</style>
