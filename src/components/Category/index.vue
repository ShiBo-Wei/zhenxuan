<template>
    <el-card>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="一级分类" style="width: 300px">
                <el-select
                    clearable
                    v-model="categoryStore.c1Id"
                    @change="handle1"
                >
                    <el-option
                        v-for="(c1, index) in categoryStore.c1Arr"
                        :key="c1.id"
                        :label="c1.name"
                        :value="c1.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" style="width: 300px">
                <el-select
                    clearable
                    v-model="categoryStore.c2Id"
                    @change="handle2"
                >
                    <el-option
                        v-for="(c2, index) in categoryStore.c2Arr"
                        :key="c2.id"
                        :label="c2.name"
                        :value="c2.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类" style="width: 300px">
                <el-select clearable v-model="categoryStore.c3Id">
                    <el-option
                        v-for="(c3, index) in categoryStore.c3Arr"
                        :key="c3.id"
                        :label="c3.name"
                        :value="c3.id"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

import { onMounted, ref } from 'vue'

const handle1 = () => {
    categoryStore.c2Id = ''
    categoryStore.c3Id = ''
    categoryStore.c2Arr = []
    categoryStore.getc2(categoryStore.c1Id)
}
const handle2 = () => {
    categoryStore.c3Id = ''
    categoryStore.c3Arr = []
    categoryStore.getc3(categoryStore.c2Id)
}
onMounted(() => {
    categoryStore.getC1()
})
</script>

<style lang="scss" scoped></style>
