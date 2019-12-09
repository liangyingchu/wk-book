<template>
    <div id="app">
        <transition
            appear
            appear-active-class="appear-enter-active"
            :name="transitionName"
        >
            <router-view class="router-view" />
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'App',
        computed: {
            ...mapGetters([
                'history',
                'transitionName'
            ])
        }
    }
</script>

<style scoped>
    .router-view {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
</style>


