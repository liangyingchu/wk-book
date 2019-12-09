
const transitionMap = {
    forward: 'enter-slide',
    back: 'leave-slide'
}

/**
 * 通过当前路由历史列表 history 判断即将前往的路径是否为 back
 * @param history - 当前路由历史列表
 * @param path - 即将前往的路径
 * @return Boolean
 * */
function isBack(history, path) {
    const prevPath = history[history.length - 2]
    return path == prevPath
}

const app = {
    state: {
        // isApp: !!window.WebViewJavascriptBridge,
        isApp: process.env.NODE_ENV === 'production' ? true : false,
        history: [], // 路由历史列表
        transitionName: transitionMap['forward'] // 页面切换效果
    },
    mutations: {
        SET_HISTORY: (state, history) => {
            state.history = history
        },
        SET_TRANSITION_NAME: (state, transitionName) => {
            state.transitionName = transitionName
        }
    },
    actions: {
        // 触发导航
        TriggerNavigate({ commit, state }, toPath) {
            return new Promise(resolve => {
                let currHistory = state.history
                
                if(currHistory.length < 2) {
                    currHistory.push(toPath)
                    commit('SET_TRANSITION_NAME', transitionMap['forward'])
                    commit('SET_HISTORY', currHistory)
                    return resolve()
                }
    
                if(isBack(currHistory, toPath)) {
                    // 回退
                    currHistory.pop()
                    commit('SET_TRANSITION_NAME', transitionMap['back'])
                    commit('SET_HISTORY', currHistory)
                } else {
                    // 前进
                    currHistory.push(toPath)
                    commit('SET_TRANSITION_NAME', transitionMap['forward'])
                    commit('SET_HISTORY', currHistory)
                }
                resolve()
            })
        }
    }
}

export default app
