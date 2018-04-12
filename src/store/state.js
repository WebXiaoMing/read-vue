import {loadStorage, loadReading, loadReadStyle} from 'common/js/storage'

const state = {
  currentRank: {}, // 当前的rank榜
  currentBook: {}, // 当前阅读的书籍
  currentId: '',
  chapters: null, // 当前书籍的章节列表
  currentChapter: 0, // 当前阅读的章节
  collectList: loadStorage(), // 收藏的书籍列表
  lastReading: loadReading(), // 最后一次阅读的书籍
  readStyle: loadReadStyle()
}

export default state
