<template>
    <layout>
        <div class="app-container" style="padding: 20px;">
            <section class="section">
                <h2 class="section-title">活动流程</h2>
                <ul class="section-content">
                    <li class="item">第一步：点击立即邀请将链接分享给好友；</li>
                    <li class="item">第二步：好友打开链接下载安装我们的小说APP；</li>
                    <li class="item">第三步：注册登录成功后在我的页面点击绑定邀请码；</li>
                    <li class="item">第四步：输入好友的邀请码，点击领取现金红包。</li>
                </ul>
            </section>

            <section class="section">
                <h2 class="section-title">活动规则</h2>
                <ul class="section-content">
                    <li class="item">1、活动时间：2019年3月1日至2019年12月31日止；</li>
                    <li class="item">2、邀请奖励：每成功邀请一位好友，可获得2元现金奖励，邀
                        请的好友
                        再邀请好友，可再次获得0.5元现金奖励，奖励在
                        系统判定邀请用户为有效用户后进行发放；</li>
                    <li class="item">
                        3、有效用户：绑定好友邀请码后72小时内，阅读时长>=180分钟
                        为有效用户。</li>
                    <li class="item">4、邀请对象：要求为从未注册过我们小说APP的新用户，同一
                        手机，同一手机号均视为同一用户；</li>
                    <li class="item">5、邀请对象奖励：被邀请的用户，自注册登录后72小时内绑定
                        邀请码可以获得现金红包奖励。</li>
                    <li class="item">6、郑重声明：为保证广大用户的收益不受影响，对于存在违规
                        邀请好友行为的用户，书城会扣除
                        其所有奖励，并且将其账
                        号封停，请遵守规则邀请好友。</li>
                </ul>
            </section>

            <section class="section">
                <h2 class="section-title">活动说明</h2>
                <ul class="section-content">
                    <li class="item">Q：我是老用户，如何获得邀请好友现金奖励？</li>
                    <li class="item">A：完成活动流程四步操作即可获得奖励。</li>
                    <li class="item">Q：奖励什么时候发放？</li>
                    <li class="item">A：奖励在系统判定邀请用户为有效用户后进行发放。</li>
                    <li class="item">Q：被邀请的用户如何获得现金奖励？</li>
                    <li class="item">A：注册登录后72小时内绑定好友邀请码即可获得奖励。</li>
                    <li class="item">Q：被邀请的用户能获得邀请好友现金奖励？</li>
                    <li class="item">A：可以，本次活动适用所有用户。</li>
                    <li class="item">Q：同一手机，同一手机号视为同一用户是什么意思？</li>
                    <li class="item">A：为保证活动正常运营，书城所设定的防作弊规则。</li>
                </ul>
            </section>
        </div>
    </layout>
</template>

<script>
    import Layout from '@/components/Layout'

    export default {
        name: "Strategy",
        components: { Layout }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";

    .section {
        margin-bottom: .2rem;
        &-title {
            color: $claret;
            font-size: .18rem;
            font-weight: 400;
            margin-bottom: .1rem;
        }
        &-content {
            color: $black;
            font-size: .14rem;
            .item {
                margin-bottom: .1rem;
                line-height: .2rem;
            }
        }
    }
</style>
