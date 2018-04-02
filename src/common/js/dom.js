
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

