<template>
    <div>
        <el-card>
            <el-button
                type="primary"
                size="default"
                icon="plus"
                @click="addTrademark"
            >
                添加品牌
            </el-button>
            <el-table border style="margin: 10px, 0" :data="trademarkarr">
                <el-table-column
                    label="序号"
                    width="80px"
                    type="index"
                ></el-table-column>
                <el-table-column label="品牌名称">
                    <template #="{ row, $index }">
                        <pre style="color: aqua">{{ row.tmName }}</pre>
                    </template>
                </el-table-column>
                <el-table-column label="品牌LOGO">
                    <template #="{ row, $index }">
                        <img
                            :src="row.logoURL"
                            style="width: 100px; height: 100px"
                        />
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #="{ row, $index }">
                        <el-button
                            type="primary"
                            size="small"
                            icon="Edit"
                            @click="UpdataTradeMark"
                        ></el-button>

                        <el-popconfirm
                            width="220"
                            icon-color="#626AEF"
                            icon="Delete"
                            :title="`您确定要删除${row.tmName}吗？`"
                            @confirm="removeTrademark(row.id)"
                        >
                            <template #reference>
                                <el-button
                                    type="primary"
                                    size="small"
                                    icon="Delete"
                                ></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>

            <div class="demo-pagination-block" style="margin-top: 5px">
                <div class="demonstration"></div>
                <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[3, 5, 7, 9]"
                    :background="true"
                    layout=" prev, pager, next, jumper, ->, total, sizes"
                    :total="total"
                    @current-change="getHasTrademark"
                    @page-size-change="getHasTrademark"
                />
            </div>
        </el-card>
        <el-dialog
            v-model="dialogFormVisible"
            :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
            width="500"
        >
            <el-form
                style="width: 80%"
                :model="trademarkParams"
                :rules="rules"
                ref="formRef"
            >
                <el-form-item label="品牌名称" label-width="80px">
                    <el-input placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="添加图片" label-width="80px">
                    <el-upload
                        class="avatar-uploader"
                        action="api/product/trademark/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img
                            v-if="trademarkParams.logoURL"
                            :src="trademarkParams.logoURL"
                            class="avatar"
                        />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" size="default" @click="cancel">
                    取消
                </el-button>
                <el-button type="primary" size="default" @click="confirm">
                    确认
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { ref, onMounted, nextTick } from 'vue'
import {
    reqHasTrademark,
    reqADDOrUpdateTrademark,
    reqDeleteTrademark,
} from '@/api/product/trademark'
import type {
    Records,
    TradeMarkResponseData,
    Trademark,
} from '@/api/product/trademark/type'

let currentPage = ref(1)
let pageSize = ref(3)

let total = ref(0)
let trademarkarr = ref<Records>([])
let dialogFormVisible = ref(false)
let trademarkParams = ref<Trademark>({
    tmName: '',
    logoURL: '',
})

const formRef = ref()

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (
        rawFile.type == 'image/jpeg' ||
        rawFile.type == 'image/gif' ||
        rawFile.type == 'image/png'
    ) {
        if (rawFile.size / 1024 / 1024 > 4) {
            ElMessage.error('Avatar picture size can not exceed 4MB!')
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}

const UpdataTradeMark = (row: Trademark) => {
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoURL')
    })

    dialogFormVisible.value = true

    Object.assign(row, trademarkParams)
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    trademarkParams.value.logoURL = response.data

    formRef.value.clearValidate('logoURL')
}

const getHasTrademark = async (pager = 1) => {
    currentPage.value = pager
    let result: TradeMarkResponseData = await reqHasTrademark(
        currentPage.value,
        currentPage.value,
    )
    if (result.code == 200) {
        total.value = result.data.total
        trademarkarr.value = result.data.records
    }
}

const addTrademark = () => {
    dialogFormVisible.value = true

    trademarkParams.value.id = 0
    trademarkParams.value.tmName = ''
    trademarkParams.value.logoURL = ''
    // 第一种写法
    // formRef.value?.clearValidate('tmName')
    // formRef.value?.clearValidate('logoURL')
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoURL')
    })
}

const cancel = () => {
    dialogFormVisible.value = false
}

const confirm = async () => {
    await formRef.value.validate()

    let result = await reqADDOrUpdateTrademark(trademarkParams.value)
    if (result.code == 200) {
        dialogFormVisible.value = false
        ElMessage({
            type: 'success',
            message: trademarkParams.value.id ? '添加成功' : '修改成功',
        })
        getHasTrademark()
    } else {
        dialogFormVisible.value = false
        ElMessage({
            type: 'error',
            message: trademarkParams.value.id ? '添加失败' : '修改失败',
        })
    }
}

const removeTrademark = async (id: number) => {
    let result = await reqDeleteTrademark(id)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
        getHasTrademark(
            trademarkarr.value.length > 1
                ? currentPage.value
                : currentPage.value - 1,
        )
    }
}

onMounted(() => {
    getHasTrademark(trademarkParams.value.id ? currentPage.value : 1)
})
const validatorTmName = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 2) {
        callback()
    } else {
        callback(new Error('品牌名称应大于两位数'))
    }
}
const validatorLogoURL = (rule: any, value: any, callback: any) => {
    if (value) {
        callback()
    } else {
        callback(new Error('务必上传图片'))
    }
}
const rules = {
    tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
    logoURL: [
        {
            required: true,
            validator: validatorLogoURL,
        },
    ],
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
