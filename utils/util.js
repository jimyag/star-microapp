
const timezero2hs = (date1, date2) => {
  var time1 = new Date(date1).getTime()
  var time2 = new Date(date2).getTime()
  var times = Math.abs(time1 - time2)
  var h = Math.floor(times / 1000 / 60 / 60)
  var m = Math.floor((times - h * 60 * 60 * 1000) / 1000 / 60)
  return h+"h"+m+"min"
}



module.exports = {
  timezero2hs
}
