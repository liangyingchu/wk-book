<template>
    <layout>
        <section class="app-container">
            <div class="invitation">
                <div class="input-wrapper">
                    <my-input
                        v-model="invite_code"
                        class="vd-input"
                        placeholder="请输入邀请码"
                    />
                </div>

            </div>
            <div
                class="fetch-packet"
                :style="isApp ? { minHeight: 'calc(100vh - 3.2rem)'} : {}"
            >
                <div class="btn-wrapper">
                    <my-button
                        title="领取现金红包"
                        @click.native="fetchReward()"
                    />
                </div>

                <div class="tips">
                    <h2 class="title">温馨提示：</h2>
                    <ul>
                        <li class="tip">
                            <span class="order">1</span>
                            <p>邀请码可向好友索要，绑定后获得随机现金红包</p>
                        </li>
                        <li class="tip">
                            <span class="order">2</span>
                            <p>绑定邀请码红包奖励自注册登录后72小时内绑定可以
                                获得，超过72小时后则无法获得</p>
                        </li>
                        <li class="tip">
                            <span class="order">3</span>
                            <p>同一用户只能填写一次，同一手机，同一手机号都视为同一账户</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </layout>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Layout from '@/components/Layout'
    import MyInput from '@/components/MyInput'
    import MyButton from '@/components/MyButton'
    import { fetchReward } from '@/api/dashboard'

    export default {
        name: 'Dashboard',
        props: ['uuid', 'session_id', 'chnid'],
        components: { Layout, MyInput, MyButton },
        data() {
            return {
                invite_code: '', // 验证码
            }
        },
        computed: {
            ...mapGetters(['isApp']),
        },
        methods: {
            fetchReward() {
                fetchReward({
                    uuid: this.uuid,
                    session_id: this.session_id,
                    chnid: this.chnid,
                    invite_code: this.invite_code
                }).then(res => console.log(res)).catch(err => console.log(err))
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    @import '@/styles/mixin.scss';
    @import "@/styles/variables.scss";

    .app-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
    }

    .invitation {
        @include backdrop('../../assets/images/bg-top.png')
        height: 3.2rem;
        position: relative;

        .input-wrapper {
            position: absolute;
            text-align: center;
            width: 100%;
            bottom: 1rem;
        }
    }

    .fetch-packet {
        @include backdrop('../../assets/images/bg-bottom.png')
        min-height: calc(100vh - 3.2rem - #{$navbar-height});
        padding-top: .1rem;

        .btn-wrapper {
            text-align: center;
            margin-bottom: .2rem;
        }

        .tips {
            padding: 0 20px;
            .title {
                color: $claret;
                font-size: .2rem;
                margin-bottom: .15rem;
            }
            .tip {
                color: $claret;
                font-size: .16rem;
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
                margin-bottom: .1rem;

                .order {
                    $size: .18rem;
                    flex-shrink: 0;
                    display: block;
                    width: $size;
                    height: $size;
                    line-height: $size;
                    text-align: center;
                    background-color: #f59a0b;
                    border-radius: 100%;
                    margin-right: .05rem;
                    color: white;
                    font-size: .14rem;
                }

                p { line-height: 1.3; }
            }
        }
    }
</style>
