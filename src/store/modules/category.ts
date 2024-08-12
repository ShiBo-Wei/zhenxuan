import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'

let useCategoryStore = defineStore('CategoryStore', {
    state: (): CategoryState => {
        return {
            c1Arr: [],
            c2Arr: [],
            c3Arr: [],
            c1Id: '',
            c2Id: '',
            c3Id: '',
        }
    },
    actions: {
        async getC1() {
            let result: CategoryResponseData = await reqC1()
            if (result.code == 200) {
                this.c1Arr = result.data
            }
        },
        async getc2(id) {
            let result: CategoryResponseData = await reqC2(id)
            if (result.code == 200) {
                this.c2Arr = result.data
            }
        },
        async getc3(id) {
            let result: CategoryResponseData = await reqC3(id)
            if (result.code == 200) {
                this.c3Arr = result.data
            }
        },
    },
    getters: {},
})

export default useCategoryStore
