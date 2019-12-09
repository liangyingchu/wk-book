<template>
    <layout>
        <section class="app-container">
            <table
                v-if="list.length > 0"
                class="withdraw-table"
            >
                <thead>
                    <tr>
                        <th
                            v-for="(item, index) in titles"
                            :key="index"
                        >{{ item }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in list"
                        :key="index"
                    >
                        <td v-for="key in keys" :key="key">
                            {{ tdFormat(key, item[key]) }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else class="nodata">暂无记录</div>
        </section>
    </layout>
</template>

<script>
    import Layout from '@/components/Layout'
    import { fetchRecord } from '@/api/withdraw'
    import Utils from '@/utils/index'

    export default {
        name: "WithdrawRecord",
        props: ['uuid', 'session_id', 'chnid'],
        components: { Layout },
        created() {
            fetchRecord({
                uuid: this.uuid,
                session_id: this.session_id,
                chnid: this.chnid
            }).then(res => {
                this.list = res.data
            })
        },
        data() {
            return {
                thead: new Map([
                    ['start_time', '日期'],
                    ['amount', '提现金额'],
                    ['receive_type', '提现账户'],
                    ['order_status', '状态']
                ]),
                list: []
            }
        },
        computed: {
            titles() {
                const arr = new Array()
                for(let value of this.thead.values()) {
                    arr.push(value)
                }
                return arr
            },
            keys() {
                const arr = new Array()
                for(let value of this.thead.keys()) {
                    arr.push(value)
                }
                return arr
            }
        },
        methods: {
            tdFormat(key, value) {
                switch (key) {
                    case 'start_time':
                        return Utils.parseTime(
                            new Date(value).getTime(),
                            '{y}-{m}-{d}'
                        )
                    case 'amount':
                        return `${parseFloat(value) / 100}元`
                    case 'receive_type':
                        return value == 1 ? '微信' : '支付宝'
                    case 'order_status':
                        if(value == 1) {
                            return '成功'
                        } else if (value == 2) {
                            return '平台正在审核'
                        } else if (value == 3) {
                            return '审核未通过'
                        } else {
                            return '转账失败'
                        }
                    default:
                        return value
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";

    .withdraw-table {
        width: 100%;
        text-align: center;
        color: $black;

        th {
            border-bottom: 1px solid $grey;
            padding: .1rem .05rem;
            font-weight: 600;
        }
        td {
            padding: .08rem;
            font-size: .14rem;
        }
    }

    .nodata {
        text-align: center;
    }
</style>
