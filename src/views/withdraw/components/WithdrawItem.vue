<template>
    <div :class="['withdraw-item', { actived }]">
        <h2 class="money">{{ moneyAmount }}</h2>
        <p
            v-if="type === 'coin'"
            class="intro"
        >{{ coinAmount }}</p>
    </div>
</template>

<script>
    export default {
        name: "WithdrawItem",
        props: {
            // 兑换类型
            type: {
                required: true,
                type: String,
                validator: function(value) {
                    return ['coin', 'money'].indexOf(value) !== -1
                }
            },
            // 选中状态
            actived: {
                type: Boolean,
                default: false
            },
            // 现金
            money: {
                type: [String, Number],
                required: true
            },
            // 金币
            coin: [String, Number],
        },
        computed: {
            moneyAmount() {
                return `${parseFloat(this.money) / 100}元`
            },
            coinAmount() {
                return `需${this.coin}金币`
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";
    .withdraw-item {
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: calc(31%);
        height: .7rem;
        margin-right: 3.5%;
        margin-bottom: 3.5%;
        color: #9b9b9b;
        background-color: #f6f6f6;
        border-radius: .08rem;
        &:nth-child(3n) {
            margin-right: 0;
        }

        &.actived {
            color: $white;
            background-color: #ff6868;
        }

        .money {
            font-size: .2rem;
            margin-bottom: .03rem;
            font-weight: 500;
        }
        .intro {
            font-size: .14rem;
        }
    }
</style>
