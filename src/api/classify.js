import Vue from 'vue'

export function getClassify () {
  return Vue.http.get('/cats/lv2/statistics')
}
