import { login } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        mobile: ''
    },
    
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_MOBILE: (state, mobile) => {
            state.mobile = mobile
        }
    },
    
    actions: {
        // 登录
        Login({ commit }, userInfo) {
        
        }
    }
}

export default user
