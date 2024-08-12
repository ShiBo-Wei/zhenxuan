// 关于Layout的组件配置
import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false,
            rfs: true,
        }
    },
})

export default useLayOutSettingStore
