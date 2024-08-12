<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <template v-if="!item.children">
            <el-menu-item
                :index="item.path"
                v-if="!item.meta.hidden"
                @click="goRouter(item.path)"
            >
                <el-icon>
                    <component
                        :is="item.meta.icon"
                        style="height: 20px; width: 20px"
                    ></component>
                </el-icon>
                <template #title>
                    <span style="margin-left: 10px">{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item
                v-if="!item.children[0].meta.hidden"
                :index="item.children[0].path"
                @click="goRouter(item.children[0].path)"
            >
                <el-icon>
                    <component
                        :is="item.children[0].meta.icon"
                        style="height: 20px; width: 20px"
                    ></component>
                </el-icon>
                <template #title>
                    <span style="margin-left: 10px">
                        {{ item.children[0].meta.title }}
                    </span>
                </template>
            </el-menu-item>
        </template>
        <el-sub-menu
            v-if="item.children && item.children.length > 1"
            :index="item.path"
        >
            <template #title>
                <el-icon>
                    <component
                        :is="item.meta.icon"
                        style="height: 20px; width: 20px"
                    ></component>
                </el-icon>
                <span style="margin-left: 10px">{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
let $router = useRouter()

const goRouter = (vc) => {
    $router.push(vc)
}

defineProps(['menuList'])
</script>
<script lang="ts">
export default {
    name: 'Menu',
}
</script>

<style lang="scss" scoped></style>
