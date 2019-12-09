<template>
    <label class="my-radio">
        <input
            class="my-radio-input"
            type="radio"
            :checked="shouldBeChecked"
            :value="value"
            @change="updateInput"
        />
        <span class="my-radio-core"/>
        <slot name="symbol" />
        <span class="my-radio-label">{{ label }}</span>
    </label>
</template>

<script>
    export default {
        name: "MyRadio",
        model: {
            prop: 'modelValue',
            event: 'change'
        },
        props: {
            value: [String, Number],
            modelValue: {
                default: ''
            },
            label: {
                required: true,
                type: String
            }
        },
        computed: {
            shouldBeChecked() {
                return this.modelValue == this.value
            }
        },
        methods: {
            updateInput() {
                this.$emit('change', this.value)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";

    .my-radio {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &-input {
            display: none;

            /*选中样式*/
            &:checked+.my-radio-core {
                background-color: #ff6868;
                border-color: #ff6868;
            }
            &:checked+.my-radio-core::after {
                background-color: $white;
                transform: scale(1);
            }
        }

        &-core {
            position: relative;
            display: inline-block;
            background-color: $white;
            border-radius: 100%;
            border: 1px solid #ccc;
            width: .2rem;
            height: .2rem;
            vertical-align: middle;

            &::after {
                content: '';
                position: absolute;
                border-radius: 100%;
                top: 5px;
                left: 5px;
                width: 8px;
                height: 8px;
                transform: scale(0);
                transition: transform .2s;
            }
        }

        &-label {
            margin-left: .06rem;
            font-size: .14rem;
            color: $black;
            font-weight: 500;
        }
    }
</style>
