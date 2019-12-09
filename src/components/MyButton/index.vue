<template>
    <button
        class="my-button"
        :style="{ backgroundColor: backgroundColor }"
    >{{ title }}</button>
</template>

<script>
    export default {
        name: "MyButton",
        props: {
            title: {
                type: String,
                default: ''
            },
            backgroundColor: {
                type: String,
                default: '#fa640c'
            }
        }
    }
</script>

<style scoped>
    .my-button {
        display: inline-block;
        color: white;
        font-weight: 400;
        font-size: .24rem;
        border-color: transparent;
        border-radius: 1rem;
        padding: .08rem .25rem;
        box-shadow: 1px 4px 3px rgba(250, 100, 12, .2);
    }
</style>
