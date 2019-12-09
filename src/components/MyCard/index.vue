<template>
    <div :class="['my-card', shadowClass]">
        <div
            v-if="hasHeader"
            class="my-card__header"
        >
            <slot name="header" />
        </div>
        <div class="my-card__body" :style="bodyStyle">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyCard",
        props: {
            bodyStyle: {
                type: Object,
                default: () => ({ padding: '20px' })
            },
            shadow: {
                type: String,
                default: 'always' // 可选值 always / hover / never
            }
        },
        computed: {
            hasHeader() {
                return this.$slots.header
            },
            shadowClass() {
                return `is-${this.shadow}-shadow`
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '@/styles/variables.scss';
    .my-card {
        border-radius: 4px;
        border: 1px solid $grey;
        background-color: $white;
        overflow: hidden;
        color: #303133;
        transition: .3s;

        &.is-always-shadow,
        &.is-hover-shadow:focus,
        &.is-hover-shadow:hover {
            box-shadow: 0 2px 12px 0 $shadow;
        }

        &__header {
            padding: 18px 20px;
            border-bottom: 1px solid $grey;
            box-sizing: border-box;
        }
        &__body {
            padding: 20px;
        }
    }
</style>
