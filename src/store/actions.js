import * as types from './mutation-types'
import {saveStorage, saveReading, deleteStorage} from 'common/js/storage'

export const selectRead = function ({commit, state}, {list, id, index}) {
  commit(types.SET_CURRENT_ID, id)
  commit(types.SET_CHAPTERS_LIST, list)
  commit(types.SET_CURRENT_CHAPTER, index)
}

export const saveStorageList = function ({commit, state}, item) {
  commit(types.SET_COLLECT_LIST, saveStorage(item))
}

export const deleteBook = function ({commit, state}, item) {
  commit(types.SET_COLLECT_LIST, deleteStorage(item))
}

export const saveLastReading = function ({commit, state}, item) {
  commit(types.SET_LAST_READING, saveReading(item))
}
