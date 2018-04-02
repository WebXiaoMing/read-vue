import * as types from './mutation-types'

const mutations = {
  [types.SET_CURRENT_RANK] (state, rank) {
    state.currentRank = rank
  },
  [types.SET_CURRENT_BOOK] (state, book) {
    state.currentBook = book
  }
}

export default mutations
