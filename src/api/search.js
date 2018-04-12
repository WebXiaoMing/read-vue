import Vue from 'vue'

export function getSearchList (query) {
  return Vue.http.get(`/book/fuzzy-search?query=${query}`)
}

export function getSearchHot () {
  return Vue.http.get(`/book/search-hotwords`)
}
