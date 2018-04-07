import Vue from 'vue'

// 获取各类排行榜
export function getRankType () {
  return Vue.http.get('/ranking/gender')
}

// 获取排行榜数据
export function getRankList (id) {
  return Vue.http.get('/ranking/' + id)
}

// 获取书本信息
export function getBookInfo (id) {
  return Vue.http.get('/book/'+ id)
}

// 获取小说源
export function getMixinSource (id) {
  return Vue.http.get('/atoc?view=summary&book=' + id)
}

// 获取章节信息
export function getChapters (id) {
  return Vue.http.get(`/atoc/${id}?view=chapters`)
}

// 获取小说章节内容
export function getChapterText (chapterUrl) {
  return Vue.http.get(`/getChapter?chapterUrl=${chapterUrl}`)
}
