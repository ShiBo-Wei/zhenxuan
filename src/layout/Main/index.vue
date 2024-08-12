<template>
    <div v-if="relv">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
import useLayOutSettingStor from '@/store/modules/setting'
import { watch, ref, nextTick } from 'vue'

let LayOutSettingStore = useLayOutSettingStor()
let relv = ref(true)
watch(
    () => LayOutSettingStore.rfs,
    () => {
        relv.value = false
        nextTick(() => {
            relv.value = true
        })
    },
)
</script>
<script lang="ts">
export default {
    name: 'Main',
}
</script>

<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;
}
.fade-enter-active {
    transition: all 1s;
}
.fade-enter-to {
    opacity: 1;
}
</style>
