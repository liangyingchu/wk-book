<template>
    <section class="withdraw-block">
        <div class="header">
            <h2>{{ title }}</h2>
            <span v-if="type === 'coin'" class="sub">（可提现 {{ exchange }} 元）</span>
        </div>
        <div class="content">
            <div class="illustrate">
                {{ tip }}
                <span v-if="type === 'money'" class="sub">提现秒到账！</span>
            </div>
            <div class="clearfix">
                <withdraw-item
                    v-for="(item, index) in list"
                    :key="index"
                    :actived="activedIndex === index"
                    :type="type"
                    :money="item.amount"
                    :coin="type === 'coin' ? item.currency_amount : ''"
                    @click.native="handleWithdraw(index, item.amount)"
                />
            </div>
        </div>
    </section>
</template>

<script>
    import { Toast } from 'mint-ui'
    import WithdrawItem from './WithdrawItem'
    import { setTitle } from '@/jsapi'

    export default {
        name: "WithdrawBlock",
        components: { WithdrawItem },
        props: {
            // 兑换类型
            type: {
                required: true,
                type: String,
                validator: function(value) {
                    return ['coin', 'money'].indexOf(value) !== -1
                }
            },
            // 余额
            remainder: {
                required: true,
                type: Number
            },
            // 可兑换金额
            exchange: [Number, String],
            // 提现列表
            list: {
                required: true,
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                coinMap: new Map([
                    ['title', '金币余额'],
                    ['tip', '选择金币提现']
                ]),
                moneyMap: new Map([
                    ['title', '现金余额'],
                    ['tip', '选择提现金额']
                ]),
                activedIndex: 0
            }
        },
        computed: {
            title() {
                if(this.type === 'coin') {
                    return `${this.coinMap.get('title')}：${this.remainder}`
                } else {
                    return `${this.moneyMap.get('title')}：${this.remainder / 100}元`
                }
            },
            tip() {
                return this.type === 'coin' ? this.coinMap.get('tip') : this.moneyMap.get('tip')
            }
        },
        methods: {
            handleWithdraw(index, amount) {
                if((this.type == 'coin' && (this.remainder / 10000) < (parseFloat(amount) / 100)) ||
                    (this.type == 'money' && (this.remainder / 100) < (parseFloat(amount) / 100))) {
                    return Toast({
                        message: '余额不足',
                        iconClass: 'mint-toast-icon mintui mintui-field-warning'
                    })
                }

                const { chnid, session_id, uuid } = this.$route.query
                this.activedIndex = index
                this.$store.getters.isApp && setTitle('选择账户')
                this.$router.push({
                    name: 'WithdrawTransact',
                    query: { chnid, session_id, uuid },
                    params: { amount, type: this.type}
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";

    .withdraw-block {
        &:first-child {
            margin-bottom: .1rem;
        }
        background-color: #fff;

        .header {
            height: .5rem;
            line-height: .5rem;
            padding-left: $horizontalPadding;
            padding-right: $horizontalPadding;
            border-bottom: 1px solid $grey;

            h2 {
                display: inline-block;
                font-size: .18rem;
                font-weight: 500;
                color: $black;
            }

            .sub {
                display: inline-block;
                font-size: .14rem;
            }
        }

        .content {
            padding: .2rem $horizontalPadding;

            .illustrate {
                color: $black;
                font-size: .17rem;
                font-weight: 500;
                margin-bottom: .2rem;

                .sub {
                    color: #ff7d14;
                    font-size: .13rem;
                }
            }
        }
    }
</style>
