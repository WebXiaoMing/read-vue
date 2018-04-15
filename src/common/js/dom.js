
const elStyle = document.createElement('div').style
const vendor = (() => {
  const transformName = {
    webkit: 'webkitTransform',
    moz: 'mozTransform',
    ms: 'msTransform',
    o: 'oTransform',
    standard: 'transform'
  }

  for (const key in transformName) {
    if (typeof elStyle[transformName[key]] !== 'undefined') {
      return key
    }
  }

  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export function getUpdateTime (date) {
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
      ret = hover + '小时前'
      break
    case !!minutes:
      ret = minutes + '分钟前'
      break
    default:
      ret = '刚才'
  }

	return ret
}
