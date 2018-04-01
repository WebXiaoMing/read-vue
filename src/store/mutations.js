import * as types from './mutation-types'

const mutations = {
  [types.SET_CURRENT_RANK] (state, rank) {
    state.currentRank = rank
  }
}

export default mutations
