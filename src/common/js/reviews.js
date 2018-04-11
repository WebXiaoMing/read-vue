import {getUpdateTime} from 'common/js/dom'

export default class Reviews {
  constructor ({author, avatar, comments, content, praise, title, updated}) {
    this.author = author
    this.avatar = avatar
    this.comments = comments
    this.content = content
    this.praise = praise
    this.title = title
    this.updated = updated
  }
}

export function createReviews (reviews) {
  return new Reviews({
    author: reviews.author.nickname,
    avatar: `http://statics.zhuishushenqi.com${reviews.author.avatar}`,
    comments: reviews.commentCount,
    content: reviews.content,
    praise: reviews.likeCount,
    title: reviews.title,
    updated: getUpdateTime(reviews.updated)
  })
}