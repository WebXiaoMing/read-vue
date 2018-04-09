import {getSearchList} from 'api/search'

export default class Book {
  constructor ({id, title, author, shortInfo, longInfo, star, classifi, minClass, image, ratingCount, ratingScore, words, update, lastChapter, isSerial, chaptersCount}) {
    this.id = id
    this.title = title
    this.author = author
    this.shortInfo = shortInfo
    this.longInfo = longInfo
    this.star = star
    this.classifi = classifi
    this.minClass = minClass
    this.image = image
    this.ratingCount = ratingCount
    this.ratingScore = ratingScore
    this.words = words
    this.update = update
    this.lastChapter = lastChapter
    this.chaptersCount = chaptersCount
    this.isSerial = isSerial
  }
}

function filterNum (str) {
  if (typeof str !== 'number') {
    return
  }
  let len = str.toString().length
  if (len > 4) {
    return (str / 10000).toFixed(1) + '万'
  }
  return str
}

function getUpdateTime (date) {
  const currentTime = new Date(),
			 	updateTime = new Date(date),
			 	fullYear = currentTime.getFullYear() - updateTime.getFullYear(),
			 	month = currentTime.getMonth() - updateTime.getMonth(),
			 	day = currentTime.getDate() - updateTime.getDate(),
		    hover = currentTime.getHours() - updateTime.getHours(),
		    minutes = currentTime.getMinutes() - updateTime.getMinutes()

	let ret = ''

  switch (true) {
    case !!fullYear:
      ret = fullYear + '年前'
      break
    case !!month:
      ret = month + '个月前'
      break
    case !!day:
      ret = day + '天前'
      break
    case !!hover:
      ret = hover + '个小时前'
      break
    case !!minutes:
      ret = minutes + '分钟前'
      break
    default:
      ret = '刚才'
  }

	return ret
}

function toNumber (str) {
  if (!str) {
    return
  }
  let maps = str.split('')
  let a = []
  a = maps.filter(s => !isNaN(parseInt(s)))
  return a.join('')
}

export function createBooks (bookItem) {
  return new Book({
    id: bookItem._id, // 书本id
    title: bookItem.title, // 书名
    author: bookItem.author, // 作者
    shortInfo: bookItem.shortIntro, // 短介
    longInfo: bookItem.longIntro, // 详介
    star: filterNum(bookItem.latelyFollower), // 读者
    classifi: bookItem.cat || bookItem.majorCate, // 书类（大分类）
    minClass: bookItem.minorCate, // 书类（小分类）
    image: `http://statics.zhuishushenqi.com${bookItem.cover}`, // 书本图片
    ratingCount: bookItem.rating && filterNum(bookItem.rating.count), // 评分人数
    ratingScore: bookItem.rating && typeof bookItem.rating.score === 'number' && bookItem.rating.score.toFixed(1), // 评分
    words: filterNum(bookItem.wordCount), // 总字数
    update: getUpdateTime(bookItem.updated), // 最近更新时间
    lastChapter: toNumber(bookItem.lastChapter), // 最新章节
    chaptersCount: bookItem.chaptersCount, // 总章节数
    isSerial: bookItem.isSerial ? '连载中' : '已完结'
  })
}
