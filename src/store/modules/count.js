
const mutations = {
  SET_COUNT: (state, count) => {
    state.count = count
  }
}
const actions = {
  add ({ commit, state }) {
    let { count } = state
    count++
    setTimeout(() => {
      commit('SET_COUNT', count)
    }, 1000)
  }
}
const state = {
  count: 0
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
