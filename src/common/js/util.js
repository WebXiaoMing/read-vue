export function getStarScore (score) {
  let ret = []
  
  if (typeof score === 'undefind') {
    return
  }
  let percent = (Number(score).toFixed(0) / 10) * 5

  if (percent === 0 || percent > 5) {
    return
  }

  for (let i = 0; i < 5; i ++) {
    ret.push('icon-star-dashed')
  }

  for (let i = 0; i < parseInt(percent); i ++) {
    ret[i] = 'icon-star-solid'
  }

  if (parseFloat(percent) !== parseInt(percent)) {
    ret[Math.floor(percent)] = 'icon-star-half'
  }

  return ret
}
