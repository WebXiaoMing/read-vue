import Vue from 'vue'

export function getClassify () {
  return Vue.http.get('/cats/lv2/statistics')
}

export function getCategory () {
  return Vue.http.get('/cats/lv2')
}

export function getBookList (gender, type, major, minor='',start=0,limit=20) {
  return Vue.http.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`)
}
