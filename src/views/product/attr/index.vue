<template>
    <div>
        <Category></Category>
        <el-card style="margin: 30px 10px">
            <el-button
                type="primary"
                size="default"
                icon="plus"
                :disabled="categoryStore.c3Id ? false : true"
            >
                添加属性
            </el-button>
            <el-table border style="margin: 10px 0px" :data="attrArr">
                <el-table-column
                    label="序号"
                    type="index"
                    align="center"
                    width="80px"
                ></el-table-column>
                <el-table-column
                    label="属性名称"
                    width="120px"
                    prop="attrName"
                ></el-table-column>
                <el-table-column label="属性值名称" prop="attrValue">
                    <template #="{ row, $index }">
                        <el-tag
                            v-for="(item, index) in row.attrValueList"
                            :key="item.id"
                            style="margin: 0 10px"
                            type="success"
                            size="small"
                        >
                            {{ item.valueName }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80px">
                    <template #="{ row, $index }">
                        <el-button
                            type="primary"
                            size="small"
                            icon="Edit"
                        ></el-button>
                        <el-button
                            type="primary"
                            size="small"
                            icon="Delete"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import useCategoryStore from '@/store/modules/category'
import { watch, ref } from 'vue'

import { reqAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'

let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])
watch(
    () => categoryStore.c3Id,
    () => {
        attrArr.value = []
        if (!categoryStore.c3Id) return
        getAttr()
    },
)
const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
    if (result.code == 200) {
        attrArr.value = result.data
    }
}
</script>

<style lang="scss" scoped></style>
