<template>
    <layout>
        <div
            slot="right"
            class="more"
            @click="handleClick"
        >提现记录</div>

        <section
            class="app-container"
            style="background-color: #ededed;"
        >
            <withdraw-block
                type="coin"
                :remainder="gold_coin"
                :exchange="exchange"
                :list="gold_coin_list"
            />
            <withdraw-block
                type="money"
                :remainder="money"
                :list="money_list"
            />

            <div class="tips">
                <h4>温馨提示</h4>
                <p>1、用户提现前需要绑定您的微信账号，暂时只支持微信提现，一经绑定，无法修改，请谨慎绑定；</p>
                <p>2、每个用户当天提现次数限制为1次；</p>
                <p>3、提现申请将在3个工作日内审批到账，您可以在提现记录中查看您的提现进度。如遇节假日请您耐心等候。</p>
                <p>4、提现申请仅在工作日进行审批处理，工作日时间：周一至周五  9：00 - 18：00，如不在工作时间内，请耐心等候。</p>
                <p>5、如有问题请拨打客服电话：0755-29637465</p>
            </div>
        </section>
    </layout>
</template>

<script>
    import Layout from '@/components/Layout'
    import WithdrawBlock from './components/WithdrawBlock'
    import { fetchList } from '@/api/withdraw'
    import { setTitle, setRigntBtn } from '@/jsapi'

    export default {
        name: "Withdraw",
        props: ['uuid', 'session_id', 'chnid'],
        components: { Layout, WithdrawBlock },
        created() {
            this.$store.getters.isApp && setRigntBtn('提现记录', `http://op.phone180.com/#/withdrawRecord`)

            fetchList({
                uuid: this.uuid,
                session_id: this.session_id,
                chnid: this.chnid
            }).then(res => {
                const { gold_coin, money, gold_coin_list, money_list } = res.data
                this.gold_coin = parseInt(gold_coin)
                this.money = parseInt(money)
                this.gold_coin_list = gold_coin_list
                this.money_list = money_list
            })
        },
        data() {
            return {
                gold_coin: 0, // 金币余额
                money: 0, // 现金余额
                gold_coin_list: [], // 金币提现列表
                money_list: [], // 现金提现列表
            }
        },
        computed: {
            exchange() {
                const exchange = parseFloat(this.gold_coin) / 10000
                return exchange.toFixed(2)
            }
        },
        methods: {
            handleClick() {
                this.$store.getters.isApp && setTitle('提现记录')
                this.$router.push({
                    name: 'WithdrawRecord',
                    query: {
                        chnid: this.chnid,
                        session_id: this.session_id,
                        uuid: this.uuid
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";

    .more {
        color: #9b9b9b;
        font-size: .13rem;
    }

    .tips {
        background-color: #fff;
        padding-left: $horizontalPadding;
        padding-right: $horizontalPadding;
        padding-bottom: .2rem;

        h4 {
            color: #ef4f4f;
            font-size: .17rem;
            font-weight: 500;
            margin-bottom: .08rem;
        }
        p {
            color: #9b9b9b;
            font-size: .14rem;
            line-height: 1.7;
        }
    }
</style>
