import storage from 'good-storage'

const BOOK_KEY = '__book__'

const READING_KEY = '__reading__'

const READ_STYLE_KEY = '__style__'

const SEARCH_HISTORY_KEY = '__search__'

function insertArray(arr, obj, compare) {
  const index = arr.findIndex(compare)
  if (index < -1) {
    return
  }
  if (index >= 0) {
    arr.splice(index, 1)
  }
  arr.unshift(obj)
}

// 将收藏的书籍添加到本地
export const saveStorage = function (obj) {
  let storages = storage.get(BOOK_KEY, [])
  insertArray(storages, obj, (item) => {
    return item.bookInfo.id === obj.bookInfo.id
  })

  storage.set(BOOK_KEY, storages)

  return storages
}
// 读取本地已经添加的书
export const loadStorage = function () {
  return storage.get(BOOK_KEY, [])
}

export const deleteStorage = function (obj) {
  let storages = storage.get(BOOK_KEY, [])
  let index = storages.findIndex(item => {
    return item.bookInfo.id === obj.bookInfo.id
  })
  if (index >= 0) {
    storages.splice(index, 1)
  }
  storage.set(BOOK_KEY, storages)

  return storages
}

// 把正在阅读的书添加到本地存储
export const saveReading = function (obj) {
  storage.set(READING_KEY, obj)
  return obj
}
// 从本地读取最近阅读的书籍
export const loadReading = function () {
  return storage.get(READING_KEY, {})
}

export function setReadStyle (obj) {
  storage.set(READ_STYLE_KEY, obj)
  return obj
}

export const loadReadStyle = function () {
  return storage.get(READ_STYLE_KEY, {color: '#f6f6f6', fontSize: 14, currentIndex: 0})
}

export const setSearchHistory = function (query) {
  let storages = storage.get(SEARCH_HISTORY_KEY, [])
  insertArray(storages, query, (item) => {
    return item === query
  })
  if (storages.length > 10) {
    storages.pop()
  }
  storage.set(SEARCH_HISTORY_KEY, storages)

  return storages
}

export const deleteOneSearch = function (query) {
  let storages = storage.get(SEARCH_HISTORY_KEY, [])
  let index = storages.findIndex(item => {
    return item === query
  })
  if (index > -1) {
    storages.splice(index, 1)
  }
  storage.set(SEARCH_HISTORY_KEY, storages)

  return storages
}

export const deleteAllSearch = function () {
  storage.remove(SEARCH_HISTORY_KEY)
  return []
}

export const loadSearchHistory = function () {
  return storage.get(SEARCH_HISTORY_KEY, [])
}


