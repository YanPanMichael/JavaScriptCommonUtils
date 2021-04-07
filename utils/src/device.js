import { dp2PX } from './dom'

function version2Float(version) {
  const versionArr = version.split('.')
  const major = parseInt(versionArr[0] || 0, 10)
  let minor = parseInt(versionArr[1] || 0, 10)
  let patch = parseInt(versionArr[2] || 0, 10)
  if (minor < 10) minor = `0${minor}`
  if (patch < 10) patch = `0${patch}`
  return parseFloat(`${major}.${minor}${patch}`)
}

export function deviceDetection() {
  const ua = navigator.userAgent
  let osVersion = ''
  let device = ''
  try {
    if (/android/i.test(ua)) {
      device = 'android'
      osVersion = ua.match(/Android\s+([\d.]+)/i)[0].replace('Android ', '')
    } else if (/ipad|iphone|ipod/i.test(ua)) {
      device = 'ios'
      osVersion = ua.match(/OS\s+([\d_]+)/i)[0].replace(/_/g, '.').replace('OS ', '')
    }
  } catch (err) {
    /* istanbul ignore next line */
    console.error(err)
  }
  return { osVersion, device }
}

// https://lark.alipay.com/velocity_cross-end-web/docs/wiki_app-ua
export function isApp(app, ignorePad = true) {
  const ua = navigator.userAgent
  const reg = ignorePad ? new RegExp(`aliapp\\(${app}(-pd)?/`, 'i') : new RegExp(`aliapp\\(${app}/`, 'i')
  return reg.test(ua)
}

export function getApp(ignorePad = true) {
  const ua = navigator.userAgent
  let app = ''
  const res = /aliapp\((.+?)\//i.exec(ua)
  if (res && res[1]) app = res[1].toLowerCase()
  const i = app.indexOf('-pd')
  if (ignorePad && i >= 0) app = app.slice(0, i)
  return app
}

// 获取 ua 中原始的 alipayclient version
export function getApVersion() {
  const ua = navigator.userAgent
  const execResult = /alipayclient\/([\d.]+)?/i.exec(ua)
  return execResult && execResult[1] ? execResult[1] : ''
}

// 获取ua中原始的 aliapp version
export function getVersion() {
  const ua = navigator.userAgent
  const execResult = /aliapp\([\w-]+\/([\d.]+)\)/i.exec(ua)
  return execResult && execResult[1] ? execResult[1] : ''
}

/**
  @ 钱包浮点版本号，个位补零
  @ 10.0.1  -> 10.0001
*/
export function getApFloatVersion() {
  return version2Float(getApVersion())
}

// 获取 app float version
export function getFloatVersion() {
  return version2Float(getVersion())
}

/**
 * app 版本比较
 * @param  string   version 比较的版本号
 * @return number   -1: currentVersion < comparVersion  0: currentVersion === comparVersion
 * 1: currentVersion > comparVersion
 */
export function versionCompare(comparVersion, useKbVersion = false) {
  let current = getFloatVersion()
  const compare = version2Float(comparVersion)
  if (isApp('kb') && !useKbVersion) current = getApFloatVersion()

  if (current < compare) {
    return -1
  } else if (current > compare) {
    return 1
  }
  return 0
}

// 判断是否刘海屏
export function isFringe() {
  const { device } = deviceDetection()
  const { screen } = global
  return device === 'ios' && ((screen.width === 375 && screen.height === 812) || (screen.width === 414 && screen.height === 896))
}

// 支持同步获取和异步校准透明头时置顶高度
export function getTransparentTop(callback) {
  const ua = navigator.userAgent
  const { device } = deviceDetection()
  let transparentTop = 0
  if (isApp('kb') || isApp('ap')) {
    if (device === 'ios') {
      transparentTop = 64
      if (isFringe()) transparentTop = 88
    } else {
      transparentTop = 68
      // 设备标题栏不透明
      if (ua.indexOf('useStatusBar/true') === -1) transparentTop = 48
    }
  }

  if (callback) {
    if (window.AlipayJSBridge) {
      AlipayJSBridge.call('getTitleAndStatusbarHeight', ({ titleBarHeight, statusBarHeight }) => {
        if (titleBarHeight && statusBarHeight) {
          transparentTop = titleBarHeight + statusBarHeight
          // 设备标题栏不透明
          if (device === 'android' && ua.indexOf('useStatusBar/true') === -1) transparentTop = titleBarHeight
        }
        callback(dp2PX(transparentTop))
      })
    } else {
      callback(dp2PX(transparentTop))
    }
  }

  return dp2PX(transparentTop)
}
