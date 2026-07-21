import dayjs from 'dayjs'

const WATERMARK_ID = '1.23452384164.123412415'

const createWatermark = (str1, str2) => {
  if (document.getElementById(WATERMARK_ID) !== null) {
    document.body.removeChild(document.getElementById(WATERMARK_ID))
  }

  const can = document.createElement('canvas')
  can.width = 200
  can.height = 200

  const cans = can.getContext('2d')
  cans.rotate((-20 * Math.PI) / 180)
  cans.font = '14px Vedana'
  cans.fillStyle = 'rgba(255,255,255,.15)'
  cans.textAlign = 'left'
  cans.fillText(str1, 0, can.height - 22)
  cans.fillText(str2, 0, can.height)

  const div = document.createElement('div')
  div.id = WATERMARK_ID
  div.style.pointerEvents = 'none'
  div.style.top = '-100px'
  div.style.left = '0px'
  div.style.position = 'fixed'
  div.style.zIndex = '100000'
  div.style.width = document.documentElement.clientWidth + 100 + 'px'
  div.style.height = document.documentElement.clientHeight + 300 + 'px'
  div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.body.appendChild(div)
  return WATERMARK_ID
}

export const setWaterMark = () => {
  const date = dayjs(new Date()).format('YYMMDD')
  createWatermark('缙智畅养护中心', date)
}

export const removeWaterMark = () => {
  if (document.getElementById(WATERMARK_ID) !== null) {
    document.body.removeChild(document.getElementById(WATERMARK_ID))
  }
}
