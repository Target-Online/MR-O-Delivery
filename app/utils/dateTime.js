

const months = [
  'January', 'February',
  'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October',
  'November', 'December'
]
let date = new Date().getDate() //Current Date
let month =  months[new Date().getMonth()]
let year = new Date().getFullYear() //Current Year
let hours = new Date().getHours()
let minutes = new Date().getMinutes()
let paddedMin =  ('' + minutes).length < 2 ? ('0' + minutes) : minutes
let time = `${hours}:${paddedMin}`


const convertDate = function (numFormat){ 
  // 2018-06-10
  let dateArray = numFormat.split('-')
  let monthNo = Number(dateArray[1])
  return (`${dateArray[2]} ${months[monthNo - 1].slice(0,3)} '${dateArray[0].slice(-2,4)}`)
}
//Last uodated   2019-06-11

const dateString = (strFormat) => {
  
  let dateArray = strFormat.split('-') || []
  let day = Number(dateArray[2])
  let month = Number(dateArray[1])
  let year = Number(dateArray[0])
  return `${day} ${months[month - 1]} ${year}`
}
const firstOrMid = (numFormat) => {
  let dateArray = numFormat.split('-')
  let day = Number(dateArray[2])
  return (day === 1 || day === 15)
}
export {
  dateString,
  convertDate,
  firstOrMid,
  months
}