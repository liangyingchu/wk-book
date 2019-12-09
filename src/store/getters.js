const getters = {
    token: state => state.user.token,
    name: state => state.user.name,
    avatar: state => state.user.avatar,
    mobile: state => state.user.mobile,
    isApp: state => state.app.isApp,
    history: state => state.app.history,
    transitionName: state => state.app.transitionName
}

export default getters
