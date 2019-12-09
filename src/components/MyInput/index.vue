<template>
    <input
        class="my-input"
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"
    />
</template>

<script>
    export default {
        name: "MyInput",
        model: {
            prop: 'value',
            event: 'input'
        },
        props: {
            value: String,
            placeholder: {
                type: String,
                default: ''
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";

    .my-input {
        height: .4rem;
        line-height: .4rem;
        width: 2.4rem;
        text-align: center;
        color: $black;
        border-color: transparent;
        border-radius: 5px;
        box-shadow: 1px 3px 3px $shadow;
    }
</style>
