// 判断是否为空对象
function isEmptyObject (obj) {
  for (var key in obj) {
    return false
  }
  return true
}
/**
 * 秒数转化成时间格式（y-m-d h:min:s）
 * 参数, Number： 1520400484 （10位，到秒）
 * 返回, String： 2018-03-07 13:27:16
 */
function getLocalTime (second) {
  var date = new Date(parseInt(second) * 1000) // 时间戳为10位(到秒)需*1000，时间戳为13位（到毫秒）的话不需乘1000
  var d =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    '-' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  return d
}
// string: 2018-03-18 (string)
// return : date (Date)
function stringToDate (string) {
  let arr = string.split('-')

  let y = arr[0] * 1
  let m = arr[1] * 1 - 1
  let d = arr[2] * 1

  return new Date(y, m, d)
}

// date: date
// return : 2018-03-09 (string)
function dateToString (date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()

  if (m < 10) {
    m = '0' + m
  }
  if (d < 10) {
    d = '0' + d
  }
  return y + '-' + m + '-' + d
}
// 去掉对象中值为‘’的对象
function filterNullObj (obj) {
  let stuffObj = {}
  for (var i in obj) {
    if (obj[i] !== '') {
      stuffObj[i] = obj[i]
    }
  }
  return stuffObj
}
//获取matchid
function getMatchid () {
  return sessionStorage.getItem('matchid') * 1 || ''
}
export {
  isEmptyObject,
  getLocalTime,
  stringToDate,
  dateToString,
  filterNullObj,
  getMatchid
}
