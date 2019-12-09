import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getToken } from './utils/auth'

router.beforeEach((to, from, next) => {
    NProgress.start()
    store.dispatch('TriggerNavigate', to.path).then(() => {
        next()
        NProgress.done()
    })
})
