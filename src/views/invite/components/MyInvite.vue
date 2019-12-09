<template>
    <section class="my-invite">
        <table
            v-if="list.length > 0"
            class="invite-table"
        >
            <tr>
                <th>好友昵称</th>
                <th>是否有效</th>
                <th>获得奖励</th>
            </tr>
            <tr
                v-for="(row, index) in orderList"
                :key="index"
            >
                <td v-for="col in row">{{ col }}</td>
            </tr>
        </table>

        <section v-else class="data-empty">
            <img :src="require('@/assets/images/empty.png')" />
            <p>暂无好友邀请，快去邀请吧</p>
        </section>
    </section>
</template>

<script>

    export default {
        name: "MyInvite",
        props: {
            list: {
                type: Array,
                required: true
            }
        },
        data() {
            return {}
        },
        computed: {
            orderList() {
                const orderKey = ['invited_nickname', 'invite_status', 'amount']
                let orderResult = []
                orderKey.map(item => this.list.map((it, index) => {
                    let valFormat = ''
                    switch(item) {
                        case 'invite_status':
                            if(parseInt(it[item] === 1)) {
                                valFormat = '成功'
                            } else if (parseInt(it[item] === 2)) {
                                valFormat = '未激活'
                            } else {
                                valFormat = '无效'
                            }
                            break
                        case 'amount':
                            valFormat = parseInt(it[item]) / 100 + '元'
                            break
                        default:
                            valFormat = it[item]
                    }
                    (orderResult[index] || (orderResult[index] = [])).push(valFormat)
                }))
                return orderResult
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";

    .invite-table {
        width: 100%;
        text-align: center;
        color: $claret;
        border-spacing: 0 .07rem;

        td { font-size:  .14rem; }
    }

    .data-empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: .3rem;

        img {
            width: 2rem;
        }
        p {
            color: #d3be8e;
            font-size: .16rem;
        }
    }
</style>
