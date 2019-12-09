<template>
    <layout>
        <section class="app-container">
            <div class="check-in">
                <div
                    class="check-btn"
                    @click="handleCheck"
                >
                    <img v-if="is_checkin == 1" :src="require('@/assets/images/check.png')" />
                    <img v-else :src="require('@/assets/images/uncheck.png')" />
                </div>
            </div>

            <div class="content">
                <welfare-block
                    v-if="show_bind_invite == 1"
                    :bind_invite="true"
                    title="新手福利"
                    :src="require('@/assets/images/yuedu_02.png')"
                    style="border-bottom: 5px solid #ededed;"
                />
                <welfare-block
                    title="日常福利"
                    :src="require('@/assets/images/yuedu_01.png')"
                    :list="list"
                />
            </div>
        </section>
    </layout>
</template>

<script>
    import Layout from '@/components/Layout'
    import WelfareBlock from './components/WelfareBlock'
    import { fetchList } from '@/api/welfare'
    import { clickClient } from '@/jsapi'

    export default {
        name: "Welfare",
        props: ['uuid', 'session_id', 'chnid'],
        components: { Layout, WelfareBlock },
        created() {
            fetchList({
                uuid: this.uuid,
                session_id: this.session_id,
                chnid: this.chnid
            }).then(res => {
                const {is_checkin, show_bind_invite, list} = res.data
                this.is_checkin = is_checkin
                this.show_bind_invite = show_bind_invite
                this.list = list
            })
        },
        data() {
            return {
                is_checkin: undefined, // 签到状态  1-签到  0-未签到
                show_bind_invite: undefined, // 新手显示状态  1-显示  0-隐藏
                list: [] // 福利列表
            }
        },
        methods: {
            handleCheck() {
                if(this.is_checkin == 1) return
                this.$store.getters.isApp && clickClient(12, '')
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/mixin.scss";

    .check-in {
        position: relative;
        width: 100%;
        height: 2rem;
        @include backdrop('../../assets/images/check-in.png')

        .check-btn {
            position: absolute;
            left: 50%;
            top: .25rem;
            transform: translateX(-50%);
            width: 1rem;
            img { width: 100%; }
        }

    }
</style>
