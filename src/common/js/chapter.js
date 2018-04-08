

export default class Chapter {
  constructor ({title, textContent, isVip, id}) {
    this.title = title
    this.textContent = textContent
    this.isVip = isVip
    this.id = id
  }
}

function trimStr (str) {
  return typeof str === 'string' && str.split(/\u3002+\s+/).map(str => str.trim())
}
export function getChapter (chapter) {
  return new Chapter({
    title: chapter.title,
    textContent: chapter.cpContent ? trimStr(chapter.cpContent) : chapter.body ? trimStr(chapter.body) : [],
    isVip: chapter.isVip,
    id: chapter.id
  })
}
