<template>
    <!-- 只能有一层template，不能有其他div，要不然样式上不去 -->
    <el-icon :size="20" @click="changeIcon">
        <component
            :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"
        ></component>
    </el-icon>
    <el-breadcrumb
        :separator-icon="ArrowRight"
        class=""
        style="margin-left: 20px"
    >
        <el-breadcrumb-item
            v-for="(item, index) in $route.matched"
            :key="index"
            v-show="item.meta.title"
            :to="item.path"
        >
            <el-icon style="margin: 0, 4px; vertical-align: top">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts" setup>
import useLayOutSettingStore from '@/store/modules/setting'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

let LayOutSettingStore = useLayOutSettingStore()
let changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold
}

let $route = useRoute()
</script>
<script lang="ts">
export default {
    name: 'Breadcrumb',
}
</script>

<style lang="scss" scoped></style>
