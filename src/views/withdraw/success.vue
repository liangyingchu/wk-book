<template>
    <layout>
        <section class="app-container" style="margin-top: 40px;">
            <div class="success">
                <img :src="require('@/assets/images/success.png')" />
            </div>
            <div class="callback">工作人员正在处理，预计三天内到账</div>
            <div class="btn-group">
                <mt-button
                    plain
                    type="default"
                    size="small"
                    @click.native="backToIndex"
                >返回首页</mt-button>
                <mt-button
                    plain
                    type="default"
                    size="small"
                    @click.native="goToRecord"
                >查看订单</mt-button>
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
    import Layout from '@/components/Layout'
    import { clickClient } from '@/jsapi'

    export default {
        name: "WithdrawSuccess",
        props: ['uuid', 'session_id', 'chnid'],
        components: { Layout },
        methods: {
            backToIndex() {
                this.$store.getters.isApp && clickClient(6, 3)
            },
            goToRecord() {
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

    .success {
        text-align: center;

        img {
            width: 2rem;
        }
    }

    .callback {
        color: #9b9b9b;
        font-size: .14rem;
        text-align: center;
        margin-top: .2rem;
    }

    .btn-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .8rem;
        margin-top: .3rem;
    }

    .tips {
        margin-top: 1.5rem;
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
