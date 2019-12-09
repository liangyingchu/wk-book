<template>
    <section class="record-item">
        <div class="symbol">
            <img :src="icon"/>
        </div>
        <div class="detail">
            <h4 class="title">{{ title }}</h4>
            <time>{{ thetime }}</time>
        </div>
        <div class="reward">+{{ income }}{{ unit }}</div>
    </section>
</template>

<script>
    import wechat from '@/assets/images/weixin.png'
    import qiandao from '@/assets/images/qiandao.png'
    import bind from '@/assets/images/yuedu_02.png'
    import read from '@/assets/images/yuedu_01.png'

    export default {
        name: "RecordItem",
        props: {
            platform: {
                type: String,
                default: 'coin',
                validator: function(value) {
                    return ['coin', 'money'].indexOf(value) !== -1
                }
            },
            amount: {
                type: String,
                required: true
            },
            thetime: {
                type: String,
                required: true
            },
            type: {
                type: [Number, String],
                required: true
            }
        },
        computed: {
            unit() {
                return this.platform == 'coin' ? '金币' : '元'
            },
            income() {
                return this.platform == 'coin' ? this.amount : parseInt(this.amount / 100)
            },
            title() {
                const coinMap = new Map([
                    [1, '签到'],
                    [2, '阅读奖励'],
                    [3, '绑定微信'],
                    [4, '绑定支付宝'],
                    [5, '注册福利']
                ])
                const moneyMap = new Map([
                    [1, '邀请好友'],
                    [2, '二级邀请好友'],
                    [3, '绑定邀请码']
                ])
                const map = this.platform == 'coin' ? coinMap : moneyMap
                return map.get(parseInt(this.type))
            },
            icon() {
                return read
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";


    .record-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid $grey;
        height: .6rem;
        padding-left: $horizontalPadding;
        padding-right: $horizontalPadding;

        .symbol {
            width: .25rem;
            margin-right: .15rem;
            img { width: 100%; }
        }

        .detail {
            flex-grow: 1;

            .title {
                color: $black;
                font-size: .14rem;
                font-weight: 500;
            }
            time {
                color: #9b9b9b;
                font-size: .12rem;
            }
        }

        .reward {
            color: $black;
            font-size: .18rem;
        }
    }
</style>
