import Vue from 'vue'

// 获取各类排行榜
export function getRankType () {
  return Vue.http.get('/ranking/gender')
}

// 获取排行榜数据
export function getRankList (id) {
  return Vue.http.get('/ranking/' + id)
}