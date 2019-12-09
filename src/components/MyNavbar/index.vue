<template>
    <mt-header
        fixed
        :title="title"
        class="my-navbar"
    >
        <div
            v-if="showBack"
            slot="left"
            class="back"
            @click="$router.go(-1)"
        >
            <svg-icon icon-class="back" />
        </div>

        <slot name="right" slot="right" />
    </mt-header>
</template>

<script>
    export default {
        name: "MyNavbar",
        computed: {
            title() {
                return Object.keys(this.$route.meta).length > 0 ? this.$route.meta.title : ''
            },
            showBack() {
                if(this.$route.meta && this.$route.meta.showBack) {
                    return this.$route.meta.showBack
                }
                return true
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import '@/styles/variables.scss';
    .mint-header-title { color: $black; }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .my-navbar {
        background-color: white;
    }
</style>
