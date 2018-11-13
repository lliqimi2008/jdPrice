// 查询数组对应的下标位置
Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === val) return i
  }
  return -1
}

// 删除数组中的某个元素
Array.prototype.remove = function(val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
  return this
}

// 数组去重
Array.prototype.unique = function() {
  this.sort()
  var re = [this[0]]
  for (var i = 1; i < this.length; i++) {
    if (this[i] !== re[re.length - 1]) {
      re.push(this[i])
    }
  }
  return re
}

export const arrRemove = function(arr, r) {
  return arr.remove(r)
}
// 金额格式化
export function formatCurrency (s) {
  if (!/^(-?\d+)(\.\d*)?$/.test(s)) {
    return 'invalid value'
  }

  let sign = ''
  s = Number(s)
  if (s < 0) {
    sign = '-'
  } else {
    sign = ''
  }
  s = Math.abs(s)
  if (/^\d+$/.test(s)) {
    return sign + (s + '').replace(/\B(?=(\d{3})+$)/g, ',') + '.00'
  }
  if (/^(\d+)\.(\d+)$/.test(s)) {
    s = s + '0'
    var v = s.split('.')
    var f = (v[0] + '').replace(/\B(?=(\d{3})+$)/g, ',')
    var h = v[1].substring(0, 2)
    return sign + f + '.' + h
  }
}

// 获取url参数
export function getParams (name) {
  let match = RegExp('[?&]' + name + '=([^&|#?]*)').exec(window.location.href)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

// 获得当前地址栏传递参数
export function getUrlString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

// 获得当前地址栏全部参数字符串
export function getAllUrlParams (url) {
  let urlvalue = url || window.location.href
  let params =
    urlvalue.indexOf('#') > -1
      ? urlvalue.substring(urlvalue.indexOf('?'), urlvalue.indexOf('#'))
      : urlvalue.substring(urlvalue.indexOf('?'))
  return params
}

// 操作 sessionstorage
export function setSessionItem (name, obj) {
  let str = JSON.stringify(obj)
  sessionStorage[name] = str
}
export function getSessionItem (name) {
  if (sessionStorage[name]) {
    return JSON.parse(sessionStorage[name])
  } else {
    return false
  }
}

// 操作localStorage
export function setLocalItem (key, value) {
  return localStorage.setItem(
    key,
    encodeURIComponent(
      typeof value === 'object' ? JSON.stringify(value) : String(value)
    )
  )
}
export function getLocalItem (key) {
  if (decodeURIComponent(localStorage.getItem(key)).match(/\{/)) {
    return JSON.parse(decodeURIComponent(localStorage.getItem(key)))
  }
  return decodeURIComponent(localStorage.getItem(key))
}
export function removeLocalItem (key) {
  if (!localStorage.getItem(key)) {
    return false
  }
  return !localStorage.removeItem(key)
}

// 表单验证正则
export function validator (type, value) {
  let validRules = {
    name: {
      reg: /^[\u4E00-\u9FA5A-Za-z]+$/,
      str: '姓名不可以输入数字和特殊字符'
    },
    number: {
      reg: /^[0-9]+$/,
      str: '必须为数字'
    },
    number_letter: {
      reg: /^\w{3,20}$/,
      str: '只允许输入英文字母、数字、_'
    },
    email: {
      reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      str: 'Email格式不正确'
    },
    chinese: {
      reg: /[\u4E00-\u9FA5\uf900-\ufa2d]/gi,
      str: '必须含有中文'
    },
    url: {
      reg: /^[a-zA-z]+:\/\/[^s]*/,
      str: 'URL格式不正确'
    },
    phone: {
      reg: /^\d{7,8}$/,
      str: '电话号码格式不正确'
    },
    mobile: {
      reg: /^1[34578]\d{9}$/,
      str: '手机号格式不正确'
    },
    qq: {
      reg: /[1-9][0-9]{4,}/,
      str: 'QQ账号不正确'
    },
    idcard: {
      reg: /^(\d{6})(18|19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X|x)?$/, /// (^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      str: '身份证号码不正确'
    },
    licenseCode: {
      reg: /^[0-9a-zA-Z]{15,30}$/, /// ^(\d{15})?$/,
      str: '营业执照代码不正确'
    },
    bankCard: {
      reg: /^\d{16,19}$/,
      str: '银行卡号不正确'
    }
  }

  if (validRules[type]) {
    var val = validRules[type]['reg']
    if (!val.test(value)) {
      return validRules[type]['str']
    }
    return true
  } else {
    return '找不到该表单验证正则项'
  }
}

// 仅限数字 并且首位不为0
export function onlyPositiveNumber (input) {
  var val = input.val()
  var _val = ''

  if (val.replace(/^[1-9]\d*$/, '') !== '') {
    var matchVal = val.match(/\d{1,}\.{0,1}\d{0,2}/)
    if (matchVal == null || matchVal === 0) {
      _val = ''
    } else {
      _val = matchVal
    }

    input.val(_val)
  }
}

// 仅限数字
export function onlyNumber (input) {
  var val = input.val()
  var _val = ''

  if (val.replace(/^[0-9]\d*$/, '') !== '') {
    var matchVal = val.match(/\d{1,}\.{0,1}\d{0,2}/)

    if (matchVal == null) {
      _val = ''
    } else {
      _val = matchVal
    }

    input.val(_val)
  }
}

// 获取今日前几天的日期
export function getBeforeDate (n) {
  var ns = n
  var d = new Date()
  var year = d.getFullYear()
  var mon = d.getMonth() + 1
  var day = d.getDate()
  if (day <= ns) {
    if (mon > 1) {
      mon = mon - 1
    } else {
      year = year - 1
      mon = 12
    }
  }
  d.setDate(d.getDate() - ns)
  year = d.getFullYear()
  mon = d.getMonth() + 1
  day = d.getDate()
  var s =
    year +
    '-' +
    (mon < 10 ? '0' + mon : mon) +
    '-' +
    (day < 10 ? '0' + day : day)
  return s
}

// 格式化日期
export function formatDate (format, time) {
  var t = time !== undefined ? new Date(time) : new Date()
  var tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function (a) {
    switch (a) {
      case 'YYYY':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'DD':
        return tf(t.getDate())
      case 'hh':
        return tf(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
    }
  })
}

// 操作类名
export function getClass (ele) {
  return ele.className.replace(/\s+/, ' ').split(' ')
}
export function hasClass (ele, cls) {
  return (' ' + ele.className + ' ').indexOf(' ' + cls + ' ') > -1
}
export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) {
    ele.className += ' ' + cls
  }
}
export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', 'gi')
    ele.className = ele.className.replace(reg, ' ')
  }
}
export function toggleClass (ele, cls) {
  if (hasClass(ele, cls)) {
    removeClass(ele, cls)
  } else {
    addClass(ele, cls)
  }
}

// 倒计时
export function TimerEnd (elm, iNum) {
  this.init(elm, iNum)
}
TimerEnd.prototype = {
  init: function (obj, iNum) {
    setTimeout(() => {
      this.oSecond = document.getElementById(obj)
      removeClass(this.oSecond, 'btn-red')
      this.oSecond.innerText = '60秒后重发'
      this.timer = null
      this.iSecond = 60
      if (!this.oSecond) return
      this.interval(iNum)
    }, 0)
    return this
  },
  interval: function (iNum) {
    var isec = iNum || this.iSecond
    addClass(this.oSecond, 'disabled')
    this.timer = setInterval(() => {
      this.oSecond.innerText =
        isec <= 10 ? '0' + --isec + '秒后重发' : --isec + '秒后重发'
      if (isec <= 0) {
        clearInterval(this.timer)
        removeClass(this.oSecond, 'disabled')
        addClass(this.oSecond, 'btn-red')
        this.oSecond.innerText = '重新获取'
      }
    }, 1000)
  },
  clearTimer: function () {
    this.timer && clearInterval(this.timer)
  }
}
