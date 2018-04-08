import Vue from 'vue'
import axios from 'axios'

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
  return Vue.http.get('/btoc?view=summary&book=' + id)
}

// 获取章节信息
export function getChapters (id) {
  return Vue.http.get(`/btoc/${id}?view=chapters&channel=mweb`)
}

// 获取小说章节内容
export function getChapterText (id) {
  return axios.get(`/chapterapi/chapter/${id}?cv=1495097622174`)
}
