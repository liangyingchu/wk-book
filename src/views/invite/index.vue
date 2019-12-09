<template>
    <layout>
        <div
            class="app-container"
            :style="{ minHeight: isApp ? '100vh' : 'calc(100vh - 40px)'}"
        >
            <img
                :src="require('@/assets/images/invite.png')"
                style="width: 100%;"
            />

            <div class="invitation">
                <my-button
                    title="立即邀请赚钱"
                    @click.native="handleInvite"
                />
                <div class="plain">
                    <div class="item">
                        <h2>{{ total_count }}<span>位</span></h2>
                        <p>累积邀请好友</p>
                    </div>
                    <div class="item">
                        <h2>{{ total_money / 100 }}<span>元</span></h2>
                        <p>获得奖励</p>
                    </div>
                </div>

                <div class="tab-table">
                    <div class="tab">
                        <div
                            v-for="item in tabs"
                            :key="item.key"
                            class="tab-item"
                            :class="{ actived: item.key === activedTab }"
                            @click="activedTab = item.key"
                        >
                            <span>{{ item.name }}</span>
                        </div>
                    </div>

                    <div class="table">
                        <keep-alive>
                            <component
                                v-if="list_group"
                                :is="activedTab"
                                :list="currentList"
                            />
                        </keep-alive>
                    </div>

                </div>

                <p class="interpret">本活动最终解释权为书城所有</p>
            </div>

            <div class="strategy" @click="$router.push({ name: 'Strategy' })">
                <span>活动</span>
                <span>攻略</span>
            </div>
        </div>
    </layout>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Layout from '@/components/Layout'
    import MyButton from '@/components/MyButton'
    import MyInvite from './components/MyInvite'
    import FriInvite from './components/FriInvite'
    import { fetchList } from '@/api/invite'
    import { shareUrl } from '@/jsapi'

    export default {
        name: "Invite",
        props: ['uuid', 'session_id', 'chnid'],
        components: { Layout, MyButton, MyInvite, FriInvite },
        created() {
            fetchList({
                uuid: this.uuid,
                session_id: this.session_id,
                chnid: this.chnid
            }).then(res => {
                const { total_money, total_count, friend_invite_list, invite_list } = res.data
                this.total_money = total_money
                this.total_count = total_count
                this.list_group = { friend_invite_list, invite_list }
            })
        },
        data() {
            return {
                activedTab: 'MyInvite',
                tabs: [
                    {
                        key: 'MyInvite',
                        name: '我邀请的好友'
                    },
                    {
                        key: 'FriInvite',
                        name: '好友邀请的好友'
                    }
                ],
                total_money: 0, // 获得奖励
                total_count: 0, // 累积邀请好友
                list_group: undefined
            }
        },
        computed: {
            ...mapGetters(['isApp']),
            currentList() {
                return this.activedTab === 'MyInvite' ? this.list_group['invite_list'] : this.list_group['friend_invite_list']
            }
        },
        methods: {
            chainFormat(str) {
                return str.replace(/\B[A-Z]\B/g, match => {
                    const lowercase = match.toLowerCase()
                    return `-${lowercase}`
                }).toLowerCase()
            },
            handleInvite() {
                shareUrl("http://qizhiread.com/d/wkread_free.html","邀请好友赚2元", "您的好友邀请您和他一起赚钱！不仅免费看书，还能赚钱哦~", "http://td-files.oss-cn-hangzhou.aliyuncs.com/file/256.png")
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '@/styles/mixin.scss';
    @import "@/styles/variables.scss";

    .app-container {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .invitation {
        @include backdrop('../../assets/images/bg-bottom.png')
        flex-grow: 1;
        margin-top: -.05rem;
        padding-top: .15rem;
        padding-bottom: .15rem;
        text-align: center;

        .plain {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: .2rem;
            margin-bottom: .2rem;

            .item {
                flex-grow: 1;

                h2 {
                    color: #f63333;
                    font-size: .26rem;
                    margin-bottom: .08rem;

                    span {
                        display: inline-block;
                        margin-left: .03rem;
                        font-size: .18rem;
                        font-weight: 400;
                    }
                }

                p {
                    color: $claret;
                    font-size: .18rem;
                }
            }
        }

        .tab-table {
            padding: 0 20px 20px;

            .tab {
                border: 1px solid $claret;
                display: flex;
                justify-content: space-between;
                align-items: center;

                &-item {
                    flex-grow: 1;
                    text-align: center;
                    height: .4rem;
                    line-height: .4rem;
                    color: $claret;

                    &.actived {
                        color: #fff;
                        background-color: #f59a0b;
                    }

                    &:not(:first-child) {
                        border-left: 1px solid $claret;
                    }
                }
            }

            .table {
                border: 1px solid $claret;
                border-top: transparent;
                padding: .1rem;
            }
        }

        .interpret {
            color: $claret;
            font-size: .14rem;
            text-align: center;
        }
    }

    .strategy {
        $size: .6rem;
        position: fixed;
        top: $navbar-height + 10px;
        right: .1rem;
        z-index: 9;
        color: #fff;
        background-color: #fa640c;
        width: $size;
        height: $size;
        border-radius: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 1px;

        span {
            display: block;
            font-size: .16rem;
        }
    }
</style>
