import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
            title: '绑定邀请码',
            showBack: false
        },
        props: route => ({
            uuid: route.query.uuid,
            session_id: route.query.session_id,
            chnid: route.query.chnid
        })
    },
    {
        path: '/invite',
        component: () => import('@/views/invite/index'),
        name: 'Invite',
        meta: {
            title: '邀请好友赚钱',
            showBack: true
        },
        props: route => ({
            uuid: route.query.uuid,
            session_id: route.query.session_id,
            chnid: route.query.chnid
        })
    },
    
    
    /** 提现模块 **/
    {
        path: '/withdraw',
        component: () => import('@/views/withdraw/index'),
        name: 'Withdraw',
        meta: {
            title: '我要提现',
            showBack: true
        },
        props: route => ({
            uuid: route.query.uuid,
            session_id: route.query.session_id,
            chnid: route.query.chnid
        })
    },
    {
        path: '/withdrawRecord',
        component: () => import('@/views/withdraw/record'),
        name: 'WithdrawRecord',
        meta: {
            title: '提现记录',
            showBack: true
        },
        props: route => ({
            uuid: route.query.uuid,
            session_id: route.query.session_id,
            chnid: route.query.chnid
        })
    },
    {
        path: '/withdrawTransact/:type/:amount',
        component: () => import('@/views/withdraw/transact'),
        name: 'WithdrawTransact',
        meta: {
            title: '选择账户',
            showBack: true
        },
        props: route => ({
            uuid: route.query.uuid,
            session_id: route.query.session_id,
            chnid: route.query.chnid,
            type: route.params.type,
            amount: route.params.amount
        })
    },
    {
        path: '/withdrawSuccess',
        component: () => import('@/views/withdraw/success'),
        name: 'WithdrawSuccess',
        meta: {
            title: '订单提交成功',
            showBack: true
        },
        props: route => ({
            uuid: route.query.uuid,
            session_id: route.query.session_id,
            chnid: route.query.chnid
        })
    },
    /** 提现模块 **/
    
    
    /** 福利模块 **/
    {
        path: '/welfare',
        component: () => import('@/views/welfare/index'),
        name: 'Welfare',
        meta: {
            title: '福利中心',
            showBack: true
        },
        props: route => ({
            uuid: route.query.uuid,
            session_id: route.query.session_id,
            chnid: route.query.chnid
        })
    },
    {
        path: '/welfareRecord',
        component: () => import('@/views/welfare/record'),
        name: 'WelfareRecord',
        meta: {
            title: '收入明细',
            showBack: true
        },
        props: route => ({
            uuid: route.query.uuid,
            session_id: route.query.session_id,
            chnid: route.query.chnid
        })
    },
    /** 福利模块 **/
    
    
    {
        path: '/strategy',
        component: () => import('@/views/strategy/index'),
        name: 'Strategy',
        meta: {
            title: '活动攻略',
            showBack: true
        }
    }
]

export default new Router({
    //mode: 'history', // 后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = []
