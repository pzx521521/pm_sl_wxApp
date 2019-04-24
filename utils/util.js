const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function courseTypeString (type) {
  if (type == 1) return '线上'
  if (type == 2) return '线下'
  if (type == 3) return '专栏'
}

module.exports = {
  formatTime: formatTime,
  courseTypeString: courseTypeString,
}