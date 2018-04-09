import * as types from './mutation-types'

const mutations = {
  [types.SET_CURRENT_RANK] (state, rank) {
    state.currentRank = rank
  },
  [types.SET_CURRENT_BOOK] (state, book) {
    state.currentBook = book
  },
  [types.SET_CHAPTERS_LIST] (state, list) {
    state.chapters = list
  },
  [types.SET_CURRENT_CHAPTER] (state, index) {
    state.currentChapter = index
  },
  [types.SET_COLLECT_LIST] (state, list) {
    state.collectList = list
  },
  [types.SET_LAST_READING] (state, obj) {
    state.lastReading = obj
  },
  [types.SET_CURRENT_ID] (state, str) {
    state.currentId = str
  },
}

export default mutations
