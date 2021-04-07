import { throttle } from './other'

export function isInViewport(node, offset = 0, x = true) {
  const { top, right, bottom, left, width, height } = node.getBoundingClientRect()
  const { clientWidth, clientHeight } = document.documentElement
  // width > 0 || height > 0 is to fix "display: none"
  return (width > 0 || height > 0) && bottom >= -offset && top < (clientHeight + offset) &&
    (!x || (right >= -offset && left < (clientWidth + offset)))
}

/**
 * px: 750 视觉稿下单位
 * PX: 页面实际渲染 CSS 像素（兼容页面缩放）
 * rem: rem 值
 * dp: native 单位，相当于未缩放下的 CSS 像素值
 */

// rem-PX
export function rem2PX(rem) {
  const rootStyle = window.getComputedStyle(document.documentElement)
  const fontSize = parseFloat(rootStyle.fontSize)
  return rem * fontSize
}

// px-rem-PX
export function px2PX(px, baseFontSize = 100) {
  return rem2PX(px / baseFontSize)
}

// dp-PX
export function dp2PX(dp) {
  const scale = +document.documentElement.getAttribute('data-scale') || 1
  return dp / scale
}

// PX-dp
export function PX2dp(PX) {
  const scale = +document.documentElement.getAttribute('data-scale') || 1
  return PX * scale
}

export function passiveSupported() {
  let supported = false
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supported = true
        return supported
      },
    })
    document.addEventListener('test', null, opts)
  } catch (e) {} // eslint-disable-line no-empty
  return supported
}

export function featureSupport(property, value, noPrefixes = false) {
  // Thanks Modernizr! https://github.com/phistuck/Modernizr/commit/3fb7217f5f8274e2f11fe6cfeda7cfaf9948a1f5
  const prop = `${property}:`
  const el = document.createElement('test')
  const mStyle = el.style

  if (!noPrefixes) {
    const prefixes = ['-webkit-', ''].join(`${value};${prop}`)
    mStyle.cssText = `${prop}${prefixes}${value};`
  } else {
    mStyle.cssText = `${prop}${value}`
  }
  return mStyle[property].indexOf(value) !== -1
}

/**
 * t: current time（当前时间）
 * b: beginning value（初始值）
 * c: change in value（变化量）
 * d: milliseconds（持续时间, ms）
 */
export function easeOut(t, b, c, d) {
  const t1 = (t / d) - 1
  return Math.round((c * ((t1 * t1 * t1) + 1)) + b)
}

export function safelySetScrollTop(el, scrollTop) {
  if (el === document.body || el === document.documentElement) {
    document.body.scrollTop = scrollTop
    document.documentElement.scrollTop = scrollTop
  } else {
    // eslint-disable-next-line no-param-reassign
    el.scrollTop = scrollTop
  }
}

const scrollArr = []
export function scrollBy(container, x, y, milliseconds, cb) {
  let scrollObj = scrollArr.filter(({ el }) => el === container)[0]
  if (!scrollObj) {
    scrollObj = {
      el: container, // 当前 scrollBy 的 Element/window
      done: true, // 当前 scrollBy 动画是否完成
    }
    scrollArr.push(scrollObj)
  }
  scrollObj.t = 1 // 当前帧
  scrollObj.d = Math.ceil((milliseconds / 1000) * 60) // 结束帧
  scrollObj.originX = (container === window || container === document.body)
    ? window.scrollX
    : container.scrollLeft // 当前 x 值
  scrollObj.offsetX = x // x 方向偏移量
  scrollObj.originY = (container === window || container === document.body)
    ? window.scrollY
    : container.scrollTop // 当前 y 值
  scrollObj.offsetY = y // y 方向偏移量
  if (!scrollObj.done) return

  const step = () => {
    const { t, d, originX, originY, offsetX, offsetY, el } = scrollObj
    if (t < d) {
      // 每一帧动画
      const toX = easeOut(t, originX, offsetX, d)
      const toY = easeOut(t, originY, offsetY, d)
      scrollObj.t += 1
      if (scrollObj.el === window) {
        window.scrollTo(toX, toY)
      } else {
        scrollObj.el.scrollLeft = toX // eslint-disable-line
        safelySetScrollTop(scrollObj.el, toY)
      }
      requestAnimationFrame(step)
    } else {
      // 最后一帧
      scrollObj.done = true
      if (el === window) {
        window.scrollTo(originX + offsetX, originY + offsetY)
      } else {
        scrollObj.el.scrollLeft = originX + offsetX // eslint-disable-line
        safelySetScrollTop(scrollObj.el, originY + offsetY)
      }
      if (cb) requestAnimationFrame(cb)
    }
  }

  scrollObj.done = false
  step()
}

// 自适应屏幕 + 高清方案
export function adaptive({ baseFontSize = 100, isScale = true, viewportFit = 'cover', pcAdapter = false }) {
  const docEl = document.documentElement
  const ua = navigator.userAgent
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i)
  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i)
  const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80
  const isIOS = navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
  let scale = 1
  if (isScale) {
    let dpr = window.devicePixelRatio || 1
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    if (!isIOS && !(matches && matches[1] > 534) && !isUCHd) dpr = 1
    scale = 1 / dpr
    if (scale < 1) {
      docEl.setAttribute('data-scale', scale)
    } else {
      docEl.removeAttribute('data-scale')
    }
    window.dpr = dpr
  } else {
    docEl.removeAttribute('data-scale')
  }

  // set meta
  let metaEl = document.querySelector('meta[name="viewport"]')
  if (!metaEl) {
    metaEl = document.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    document.head.appendChild(metaEl)
  }
  metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},viewport-fit=${viewportFit}`)

  const refreshRem = () => {
    let { width } = docEl.getBoundingClientRect()
    if (pcAdapter && !isMobile && width > 750) width = 750
    const rootRem = (width / 750) * baseFontSize
    docEl.style.fontSize = `${rootRem}px`
  }
  // window.addEventListener('orientationchange', throttle(refreshRem, 100))
  window.addEventListener('resize', throttle(refreshRem, 100))
  refreshRem()
}

/**
 * createEvent与CustomEvent的兼容函数
 * @param  {String} event  事件名称
 * @param  {Object} params CustomEvent接受的参数
 * @return {Event}         CustomEvent返回的的Event实例
 */
export function createEvent(event, params) {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/CustomEvent#Polyfill
  try {
    // a : While a window.CustomEvent object exists, it cannot be called as a constructor.
    // b : There is no window.CustomEvent object
    // eslint-disable-next-line no-new
    new window.CustomEvent('T')
  } catch (e) {
    const CustomEvent = function (ev, p) {
      const options = p || { bubbles: false, cancelable: false, detail: undefined }
      const evt = document.createEvent('CustomEvent')
      evt.initCustomEvent(ev, options.bubbles, options.cancelable, options.detail)
      return evt
    }
    CustomEvent.prototype = window.Event.prototype
    window.CustomEvent = CustomEvent
  }
  return new window.CustomEvent(event, params)
}
