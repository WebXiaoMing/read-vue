import storage from 'good-storage'

const BOOK_KEY = '__book__'

const READING_KEY = '__reading__'

function insertArray(arr, obj, compare) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
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
  if (index > 0) {
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
