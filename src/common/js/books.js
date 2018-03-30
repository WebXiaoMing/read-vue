
class Book {
  constructor ({id, title, author, shortInfo, star, classifi, minClass, image}) {
    this.id = id,
    this.title = title,
    this.author = author,
    this.shortInfo = shortInfo,
    this.star = star,
    this.classifi = classifi,
    this.minClass = minClass,
    this.image = image
  }
}

function filterStar (str) {
  let len = str.toString().length
  if (len > 4) {
    return (str / 10000).toFixed(1) + '万'
  }
  return str
}

export function book (bookItem) {
  return new Book({
    id: bookItem._id,
    title: bookItem.title,
    author: bookItem.author,
    shortInfo: bookItem.shortIntro,
    star: filterStar(bookItem.latelyFollower),
    classifi: bookItem.majorCate,
    minClass: bookItem.minorCate,
    image: `http://statics.zhuishushenqi.com${bookItem.cover}`
  })
}