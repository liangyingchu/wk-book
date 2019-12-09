<template>
    <label class="my-checkbox">
        <input
            class="my-checkbox-input"
            type="checkbox"
            :checked="shouldBeChecked"
            :value="value"
            @change="updateInput"
        />
        <span class="my-checkbox-core"/>
        <slot name="symbol" />
        <span class="my-checkbox-label">{{ label }}</span>
    </label>
</template>

<script>
    export default {
        name: "MyCheckbox",
        model: {
            prop: 'modelValue',
            event: 'change'
        },
        props: {
            value: String,
            modelValue: {
                default: false
            },
            label: {
                required: true,
                type: String
            },
            trueValue: {
                default: true
            },
            falseValue: {
                default: false
            }
        },
        computed: {
            shouldBeChecked() {
                if(this.modelValue instanceof Array) {
                    // 多选
                    return this.modelValue.includes(this.value)
                }
                // 开关
                return this.modelValue === this.trueValue
            }
        },
        methods: {
            updateInput(event) {
                let isChecked = event.target.checked

                if(this.modelValue instanceof Array) {
                    let newValue = [...this.modelValue]
                    if(isChecked) {
                        newValue.push(this.value)
                    } else {
                        newValue.splice(newValue.indexOf(this.value), 1)
                    }
                    this.$emit('change', newValue)
                } else {
                    this.$emit('change', isChecked ? this.trueValue : this.falseValue)
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";

    .my-checkbox {
        &-input {
            display: none;

            /*选中样式*/
            &:checked+.my-checkbox-core {
                background-color: #26a2ff;
                border-color: #26a2ff;
            }
            &:checked+.my-checkbox-core::after {
                border-color: $white;
                transform: rotate(45deg) scale(1);
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
                border: 2px solid transparent;
                border-left: 0;
                border-top: 0;
                position: absolute;
                top: 3px;
                left: 6px;
                width: 4px;
                height: 8px;
                box-sizing: content-box;
                transform: rotate(45deg) scale(0);
                transition: transform .2s;
            }
        }

        &-label {

        }

    }
</style>
