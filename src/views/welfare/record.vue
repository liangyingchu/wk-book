<template>
    <layout>
        <section class="app-container">
            <mt-navbar v-model="selected">
                <mt-tab-item id="coin">金币明细</mt-tab-item>
                <mt-tab-item id="money">现金明细</mt-tab-item>
            </mt-navbar>

            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="coin">
                    <template v-if="coin_list.length > 0">
                        <record-item
                            v-for="item in coin_list"
                            :key="item.thetime"
                            platform="coin"
                            :amount="item.amount"
                            :thetime="item.thetime"
                            :type="item.type"
                        />
                    </template>
                    <div v-else class="nodata">
                        <img :src="require('@/assets/images/nodata.png')"/>
                        <p>暂无收支明细，快去赚钱吧~</p>
                    </div>
                </mt-tab-container-item>

                <mt-tab-container-item id="money">
                    <template v-if="money_list.length > 0">
                        <record-item
                            v-for="item in money_list"
                            :key="item.thetime"
                            platform="money"
                            :amount="item.amount"
                            :thetime="item.thetime"
                            :type="item.type"
                        />
                    </template>
                    <div v-else class="nodata">
                        <img :src="require('@/assets/images/nodata.png')"/>
                        <p>暂无收支明细，快去赚钱吧~</p>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </section>
    </layout>
</template>

<script>
    import Layout from '@/components/Layout'
    import RecordItem from './components/RecordItem'
    import { fetchRecord } from '@/api/welfare'

    export default {
        name: "WelfareRecord",
        props: ['uuid', 'session_id', 'chnid'],
        components: { Layout, RecordItem },
        created() {
            fetchRecord({
                uuid: this.uuid,
                session_id: this.session_id,
                chnid: this.chnid
            }).then(res => {
                const { coin_list, money_list } = res.data
                this.coin_list = coin_list
                this.money_list = money_list
            })
        },
        data() {
            return {
                selected: 'coin',
                coin_list: [],
                money_list: []
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";


    .mint-navbar .mint-tab-item.is-selected {
        border-color: #ff6868;
        color: #ff6868;
    }

    .nodata {
        margin-top: .6rem;
        text-align: center;
        img {
            width: 1.5rem;
            margin-bottom: .1rem;
        }
        p {
            color: #9b9b9b;
            font-size: .14rem;
        }
    }

</style>
