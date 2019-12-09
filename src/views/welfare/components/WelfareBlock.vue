<template>
    <section class="welfare-block">
        <h2 class="title">{{ title }}</h2>
        <div class="list">
            <div
                v-if="bind_invite"
                class="list-item"
            >
                <div class="symbol">
                    <img :src="src"/>
                </div>
                <div class="detail">
                    <span class="demand">绑定邀请码送现金红包，</span>
                    <span class="reward">最高可得 5 元</span>
                </div>
                <mt-button
                    plain
                    type="danger"
                    size="small"
                    class="btn"
                    @click.native="handleBind"
                >立即绑定</mt-button>
            </div>

            <div
                v-else
                class="list-item"
                v-for="item in list"
                :key="item.item_id"
            >
                <div class="symbol">
                    <img :src="src"/>
                </div>
                <div class="detail">
                    <span class="demand">{{ item.title }}</span>
                    <span class="reward">+{{ item.coin }}金币</span>
                </div>

                <mt-button
                    v-if="item.item_status == 0"
                    plain
                    type="danger"
                    size="small"
                    class="btn"
                    @click.native="handleRead"
                >立即阅读</mt-button>
                <template v-else>
                    <mt-button
                        v-if="item.received_status == 0"
                        type="danger"
                        size="small"
                        class="btn"
                        @click.native="handleReceive(item.item_id)"
                    >领取奖励</mt-button>
                    <mt-button
                        v-else
                        disabled
                        type="danger"
                        size="small"
                        class="btn"
                    >已领取</mt-button>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
    import { Toast } from 'mint-ui'
    import { clickClient } from '@/jsapi'
    import { receive } from '@/api/welfare'

    export default {
        name: "WelfareBlock",
        props: {
            bind_invite: {
                type: Boolean,
                default: false
            },
            title: {
                required: true,
                type: String
            },
            src: {
                type: String,
                required: true
            },
            list: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            handleBind() {
                const { chnid, session_id, uuid } = this.$route.query
                this.$router.push({
                    name: 'Invite',
                    query: { chnid, session_id, uuid }
                })
            },
            handleRead() {
                // 跳转到书架
                this.$store.getters.isApp && clickClient(6, 0)
            },
            handleReceive(item_id) {
                const { chnid, session_id, uuid } = this.$route.query
                receive({ uuid, session_id, chnid, item_id }).then(res => {
                    Toast(res.msg)
                    onRefresh()
                }).catch(err => console.log(err))
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";

    .welfare-block {
        background-color: $white;
        padding-top: $horizontalPadding;

        .title {
            display: block;
            padding-left: $horizontalPadding;
            padding-right: $horizontalPadding;
            font-size: .18rem;
            color: $black;
        }
    }

    .list {
        &-item {
            height: .6rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: $horizontalPadding;
            padding-right: $horizontalPadding;
            border-bottom: 1px solid $grey;

            .symbol {
                width: .27rem;
                margin-right: .15rem;
                img { width: 100%; }
            }
            .detail {
                flex-grow: 1;
                color: $black;
                font-size: .15rem;
                font-weight: 500;

                .demand {
                    display: inline-block;
                    margin-right: .05rem;
                }
                .reward { color: #ff6868; }
            }
            .btn { flex-shrink: 0; }
        }
    }
</style>
