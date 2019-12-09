<template>
    <div class="app-wrapper">
        <my-navbar v-if="!isApp">
            <slot name="right" slot="right" />
        </my-navbar>

        <div
            class="main-container"
            :style="styleObject"
        >
            <slot/>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import MyNavbar from '@/components/MyNavbar'

    export default {
        name: "Layout",
        components: { MyNavbar },
        computed: {
            ...mapGetters(['isApp']),
            styleObject() {
                return this.isApp ? {
                    paddingTop: '0px'
                } : {}
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";

    .app-wrapper {
        width: 100%;
        min-height: 100%;
    }
    .main-container {
        padding-top: $navbar-height;
        min-height: 100vh;
    }
</style>
