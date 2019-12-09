<template>
    <layout>
        <div
            slot="right"
            class="more"
            @click="handleClick"
        >提现记录</div>

        <section class="app-container">
            <div class="title">
                <h2>提现金额：{{ amount | moneyFilter }}元</h2>
            </div>

            <div class="platform">
                <div class="illustrate">选择提现账户</div>
                <section class="list">
                    <div class="list-item">
                        <my-radio
                            class="radio"
                            v-model="platform"
                            :value="1"
                            label="微信"
                        >
                            <svg-icon
                                slot="symbol"
                                class-name="wechat"
                                icon-class="wechat"
                            />
                        </my-radio>
                        <mt-button
                            v-if="bind_wechat == 0"
                            plain
                            type="danger"
                            size="small"
                            @click.native="bindWechat"
                        >立即绑定</mt-button>
                    </div>
                </section>
            </div>

            <div class="confirm">
                <mt-button
                    type="danger"
                    @click="handleTransact"
                >确认提现</mt-button>
            </div>

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
    import { Toast } from 'mint-ui'
    import Layout from '@/components/Layout'
    import MyRadio from '@/components/MyRadio'
    import { fetchConfig, transact } from '@/api/withdraw'
    import { bindWechat, setTitle, setRigntBtn } from '@/jsapi'

    export default {
        name: "WithdrawTransact",
        props: ['uuid', 'session_id', 'chnid', 'type', 'amount'],
        filters: {
            moneyFilter(val) {
                return parseFloat(val) / 100
            }
        },
        components: { Layout, MyRadio },
        created() {
            this.$store.getters.isApp && setRigntBtn('提现记录', `http://op.phone180.com/#/withdrawRecord`)

            fetchConfig({
                uuid: this.uuid,
                session_id: this.session_id,
                chnid: this.chnid
            }).then(res => {
                this.bind_wechat = res.data.bind_wechat
            })
        },
        data() {
            return {
                platformMap: new Map([
                    [1, '微信'],
                    [2, '支付宝']
                ]),
                platform: 1,
                bind_wechat: 0, // 是否绑定微信账号：1(是)、0(否)
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
            },
            handleTransact() {
                if(this.bind_wechat == 0) {
                    return Toast({
                        message: '未绑定微信账号',
                        iconClass: 'mint-toast-icon mintui mintui-field-warning'
                    })
                }

                transact({
                    uuid: this.uuid,
                    session_id: this.session_id,
                    chnid: this.chnid,
                    amount: parseInt(this.amount), // 单位：分
                    type: this.type == 'coin' ? 1 : 2,
                    platform: this.platform
                }).then(res => {
                    this.$router.push({
                        name: 'WithdrawSuccess',
                        query: {
                            chnid: this.chnid,
                            session_id: this.session_id,
                            uuid: this.uuid
                        }
                    })
                }).catch(err => console.log(err))
            },
            bindWechat() {
                this.$store.getters.isApp && bindWechat()
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

    .wechat {
        $size: .2rem;
        margin-left: .1rem;
        width: $size !important;
        height: $size !important;
    }

    .title {
        height: .5rem;
        line-height: .5rem;
        padding-left: $horizontalPadding;
        padding-right: $horizontalPadding;
        border-bottom: 1px solid $grey;

        h2 {
            display: inline-block;
            font-size: .16rem;
            font-weight: 600;
            color: $black;
        }

        span {
            display: inline-block;
            font-size: .13rem;
            color: #9b9b9b;
        }
    }

    .platform {
        padding: .2rem $horizontalPadding;

        .illustrate {
            color: $black;
            font-size: .16rem;
            font-weight: 500;
            margin-bottom: .2rem;
        }

        .list {
            &-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid $grey;
                padding: .12rem 0;

                .radio {
                    flex-grow: 1;
                }
            }
        }
    }

    .confirm {
        height: 3rem;
        padding-top: .4rem;
        text-align: center;
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
