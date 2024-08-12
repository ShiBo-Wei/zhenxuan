<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Breadcrumb />
        </div>
        <div class="tabbar_right">
            <Setting />
        </div>
    </div>
</template>
<script setup lang="ts">
import Breadcrumb from './Breadcrumb/index.vue'
import Setting from './Setting/index.vue'
</script>
<script lang="ts">
export default {
    name: 'Tabbar',
}
</script>
<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(
        to right,
        rgb(23, 111, 170),
        rgb(13, 185, 142),
        rgb(16, 177, 89)
    );
    .tabbar_left {
        display: flex;
        margin-left: 20px;
        align-items: center;
    }
    .tabbar_right {
        display: flex;
        align-items: center;
    }
}
</style>
