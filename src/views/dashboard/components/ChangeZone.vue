<template>
    <my-section
        class="change-zone"
        title="零钱专区"
        sub="支持微信/支付宝 提现"
    >
        <div class="two-column-layout hottest">
            <div
                class="item try"
                @click="$router.push({ name: 'Try' })"
            >
                <h4>试玩赚钱</h4>
                <p>每个1~3元 无需审核</p>
            </div>
            <div
                class="item apprentice"
                @click="$router.push({ name: 'Apprentice' })"
            >
                <h4>收徒赚钱</h4>
                <p>100%徒弟收益提成</p>
            </div>
        </div>

        <div class="two-column-layout entry-list">
            <div
                v-for="(item, index) in list"
                :key="index"
                class="item"
                :style="{backgroundImage: `url(${require('@/assets/images/'+ item.imgName +'.png')})`}"
                @click="item.route && navigate(item.route)"
            >
                <h4>{{ item.title }}</h4>
                <p>{{ item.content }}</p>
            </div>
        </div>

    </my-section>
</template>

<script>
    import MySection from '@/components/MySection'

    export default {
        name: "ChangeZone",
        components: { MySection },
        data() {
            return {
                list: [
                    {
                        imgName: 'registry',
                        title: '注册赚钱',
                        content: '每个3~30元 审核3天内',
                        route: 'RegProfit'
                    },
                    {
                        imgName: 'card',
                        title: '办卡赚钱',
                        content: '迎春节大放利 单卡100元'
                    },
                    {
                        imgName: 'sale',
                        title: '卖货赚钱',
                        content: '支持淘宝全网商品'
                    },
                    {
                        imgName: 'thunder',
                        title: '闪电借钱',
                        content: '额度大 下款快'
                    }
                ]
            }
        },
        methods: {
            navigate(name) {
                name && this.$router.push({ name: name })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '@/styles/mixin.scss';
    @import '@/styles/variables.scss';

    @mixin item-title {
        margin: 0;
        margin-bottom: .05rem;
        font-size: .14rem;
        font-weight: 600;
        color: $white;
    }
    @mixin item-content {
        margin: 0;
        margin-bottom: .1rem;
        font-size: .12rem;
        font-weight: 600;
        color: $white;
    }

    .change-zone {
        $item-side-padding: .12rem;
        $item-margin: .1rem;
        margin-top: .3rem;

        .hottest {
            .item {
                height: 1.35rem;
                margin-bottom: $item-margin;
                padding-left: $item-side-padding;
                padding-right: $item-side-padding;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                background-size: 100% 100% !important;

                &.try {
                    @include backdrop('../../../assets/images/try.png')
                }
                &.apprentice {
                    @include backdrop('../../../assets/images/apprentice.png')
                }

                h4 { @include item-title }
                p { @include item-content }
            }
        }

        .entry-list {
            flex-wrap: wrap;

            .item {
                background-repeat: no-repeat;
                background-size: 100% 100%;
                height: .64rem;
                padding-top: .15rem;
                padding-left: $item-side-padding;
                padding-right: $item-side-padding;
                margin-bottom: $item-margin;

                h4 { @include item-title }
                p { @include item-content }
            }
        }
    }
</style>
