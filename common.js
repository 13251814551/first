/**
 * @author: sky
 * @date: 2020-11-5 15:35
 * @description：公用js组件库
 */

import {MessageBox, Notification} from 'element-ui'
import Vue from 'vue'
import router from '@/router'

/**
 * 全局变量
 * @type {number}
 */
let logStatus = 2 //调试信息打印 1、发布  2、debug

/**
 * table表头样式
 * */
function rowClass() {
  return {backgroundColor: '#EFEFEF', color: '#000', borderColor: '#FFF', textAlign: 'center'};
}

/**
 * table单元格样式
 * */
function cellClass() {
  return {'text-align': 'center'};
}

function cellClassNoEdit() {
  // return 'text-align:center;padding-bottom: 7px;padding-top: 7px;'
  // return {paddingBottom: '7px', paddingTop: '7px'}
}

/**
 * 是否为NaN
 * @param obj
 * @returns {boolean}
 */
function isNaN(obj) {
  return Object.prototype.toString.call(obj) === '[object Number]' && obj !== +obj
}


/**
 * 是否为null
 * @param obj
 * @returns {boolean}
 */
function isNull(obj) {
  return (obj === null) || (obj == 'null')
}


/**
 * 是否为undefined
 * @param obj
 * @returns {boolean}
 */
function isUndefined(obj) {
  return obj === void 0
}

/**
 * 判断是否为空/未定义/NaN/""包含空字符串
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
  if (isNaN(obj) || isNull(obj) || isUndefined(obj) || ((Object.prototype.toString.call(obj) === '[object String]') && obj === '')) {
    return true
  } else {
    return false
  }
}

// Is a given variable an object?
function isObject(obj) {
  var type = typeof obj
  return type === 'function' || type === 'object' && !!obj
}


/**
 * 空对象{} [] 字符串类型
 * @param obj
 * @returns {boolean}
 */
function isEmptyObj(obj) {
  if (Object.keys(obj)) {
    return true
  } else {
    return false
  }
}

/**
 * 打印日志
 * @param msg 日志描述
 * @param obj 日志信息
 */
function log(msg, obj) {
  if (logStatus == 2) {
    try {
      if (!msg) {
        msg = ''
      }
      // console.log('[Debug Log]==> ', msg, '  ', obj)
      console.log(`%c ${msg}`,
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', obj
      )
    } catch (e) {

    }
  }
}

/**
 * 弹出提示框
 * @param msg 提示框内容
 * @param title 提示框标题
 * @param type 提示框样式 0:成功,1:警告,2:信息,3:失败
 * */
function confirmMsg(msg, title, type) {
  switch (type) {
    case 0: {
      type = 'success'
      break
    }
    case 1: {
      type = 'warning'
      break
    }
    case 2: {
      type = 'info'
      break
    }
    case 3: {
      type = 'error'
      break
    }
  }
  !type ? type = 'success' : type = type
  return new Promise((resolve, reject) => {
    MessageBox.confirm(msg, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: type
    }).then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}

/**
 * 日期格式化
 * @param date 日期
 * @param pattern 格式
 * @returns {string}
 */
function dateToString(date = new Date(), pattern = 'yyyy-MM-dd') {
  let year = date.getFullYear()//年
  let month = date.getMonth() + 1//月
  let day = date.getDate()//日
  let hours = date.getHours()//时
  let min = date.getMinutes()//分
  let second = date.getSeconds()//秒

  if (pattern === 'yyyy-MM-dd HH:mm:ss') {
    let m = month.toString().length === 1 ? '0' + month : month
    let d = day.toString().length === 1 ? '0' + day : day
    let hh = hours === 0 ? '00' : hours.toString()
    let mm = min === 0 ? '00' : min.toString()
    let ss = second === 0 ? '00' : second.toString()
    return year + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  } else {
    let m = month.toString().length === 1 ? '0' + month : month
    let d = day.toString().length === 1 ? '0' + day : day

    return year + '-' + m + '-' + d
  }

}

/**
 * 消息提示框
 * @param title 提示框标题
 * @param msg 提示框内容
 * @param seat 提示框显示位置 0:右上角,1:右下角,2:左下角,3:左上角
 * @param type 提示框样式 0:成功,1:警告,2:信息,3:失败
 * @param time 提示框关闭时间,默认4500s
 * */
function alertMsg(title, msg, seat, type, time) {
  switch (seat) {
    case 0: {
      seat = 'top-right'
      break
    }
    case 1: {
      seat = 'bottom-right'
      break
    }
    case 2: {
      seat = 'bottom-left'
      break
    }
    case 3: {
      seat = 'top-left'
      break
    }
  }
  switch (type) {
    case 0: {
      type = 'success'
      break
    }
    case 1: {
      type = 'warning'
      break
    }
    case 2: {
      type = 'info'
      break
    }
    case 3: {
      type = 'error'
      break
    }
  }
  !time ? time = 4500 : time = time
  !seat ? seat = 'bottom-right' : seat = seat
  !type ? type = 'success' : type = type
  Notification({
    dangerouslyUseHTMLString: true,//解析html标签
    title: title,
    message: msg,
    position: seat,
    type: type,
    duration: time
  })
}

/**
 * 数组去重
 * @param array 数组
 * */
function unrepet(array) {
  var n = {}, r = [], val, type
  for (var i = 0; i < array.length; i++) {
    val = array[i]
    type = typeof val
    if (!n[val]) {
      n[val] = [type]
      r.push(val)
    } else if (n[val].indexOf(type) < 0) {
      n[val].push(type)
      r.push(val)
    }
  }
  return r
}

/**
 * select组件获取label
 * @param val 组件value
 * @param datalist 组件data
 * @param field  下拉框value/label结构
 * */
function setlabel(val, datalist,field) {
  if (!field)
    field = ["value", "label"];
  if (val) {
    let r = ''
    r = datalist.find((item) => {
      return item[field][0] === val
    })
    return r[field][1]
  } else {
    return false
  }
}

/**
 * 获取时间
 * fortime(nowtime(0))  现在的时间
 * fortime(nowtime(1))  半小时前
 * fortime(nowtime(2))  一小时前
 * fortime(nowtime(3))  一个半小时前
 * fordate 年月日
 * forhour 时分
 **/

function add(m) {
  return m < 10 ? '0' + m : m
}

//将时间戳转为普通格式
function fortime(shijianchuo) {
  var time = shijianchuo;
  if (!(shijianchuo instanceof Date))
    time = new Date(shijianchuo)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var mm = time.getMinutes()
  var s = time.getSeconds()
  return y + '-' + add(m) + '-' + add(d) + ' ' + add(h) + ':' + add(mm) + ':' + add(s)
}

function fordate(shijianchuo) {
  var time = shijianchuo;
  if (!(shijianchuo instanceof Date))
    time = new Date(shijianchuo)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  return y + '-' + add(m) + '-' + add(d)
}

function forhour(shijianchuo) {
  var time = shijianchuo;
  if (!(shijianchuo instanceof Date))
    time = new Date(shijianchuo)
  var h = time.getHours()
  var mm = time.getMinutes()
  return add(h) + ':' + add(mm)
}

function nowtime(n) {
  var sc_now = n;
  if (!(n instanceof Date))
    sc_now = new Date(n)
  // var sc_now = timer.getTime()  //现在时间戳
  var timer1 = new Date(1800000 * n)  //半小时时间戳   用现在的时间戳减去半个小时前的时间戳得到了半个小时时间戳
  var sc_now1 = timer1.getTime()
  return sc_now - sc_now1  //半小时前的时间戳
}

function parseDate(date) {
  var t = Date.parse(date);
  if (!isNaN(t)) {
    return new Date(Date.parse(date.replace(/-/g, "/")));
  } else {
    return new Date();
  }
}

/**
 *获取本周日期
 *
 * **/
function getthisweekdate() {
  const dateOfToday = Date.now()
  const dayOfToday = (new Date().getDay() + 7 - 1) % 7
  const daysOfThisWeek = Array.from(new Array(7))
    .map((_, i) => {
      const date = new Date(dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24)
      return date.getFullYear() +
        '-' +
        String(date.getMonth() + 1).padStart(2, '0') +
        '-' +
        String(date.getDate()).padStart(2, '0')
    })
  return daysOfThisWeek
}

/**
 *获取本月日期
 *
 * **/
function getthismonthdate() {

  var now = new Date(); //当前日期
  var nowMonth = now.getMonth(); //当前月
  var nowYear = now.getFullYear(); //当前年
  var monthStartDate = new Date(nowYear, nowMonth, 1);

  //获得本月的结束日期
  var days = (new Date(nowYear, nowMonth, 1) - new Date(nowYear, nowMonth, 1)) / (1000 * 60 * 60 * 24);
  var monthEndDate = new Date(nowYear, nowMonth + 1, days);

  return [monthStartDate, monthEndDate]; //返回当月时间
}

/**
 * 删除数组某个值
 * @param arr 数组
 * @param attr 属性
 * @param value 属性值
 *
 * **/
function removeByValue(arr, attr, value) {
  var index = 0
  for (var i in arr) {
    if (arr[i][attr] == value) {
      index = i
      break
    }
  }
  arr.splice(index, 1)
}

/**
 * 获取今天往后七天日期
 * @param type number 1 => 年月日 , 2 => 月日 , 3 => 日
 *
 * **/
function getOverWeeksList(type) {
  const dateList = [...Array(7).keys()].map(days => {
    let t = new Date(Date.now() - 86400000 * days);
    let str
    if (type == 1) {
      str = `${t.getFullYear()}年${t.getMonth() + 1}月${t.getDate()}日`;
    } else if (type == 2) {
      str = `${t.getMonth() + 1}月${t.getDate()}日`;
    } else if (type == 3) {
      str = `${t.getDate()}日`;
    }
    return str;
  })
  return dateList;
}


/**
 * 获取今天往后七天周
 * @param days number 天数
 *
 * **/
function getWeeksList(days) {
  let obj = [], Days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], curreDate = new Date(),
    t = new Date(Date.now() - 86400000 * days);
  for (let i = 0; i < days; i++) {
    let dd = curreDate;
    dd.setDate(dd.getDate() + i);//获取days天后的日期
    obj.push({d: t.getMonth() + 1 + '月' + t.getDate() + '日', w: Days[dd.getDay()]})
  }
  return obj
}

/**
 * 表格高度
 * **/
function getWinHeight() {
  var winHeight
  if (window.innerHeight) {
    winHeight = window.innerHeight
  } else if ((document.body) && (document.body.clientHeight)) {
    winHeight = document.body.clientHeight
  }
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winHeight = document.documentElement.clientHeight
  }
  return winHeight
}

/**
 * 全局变量映射
 * **/
const Constants = {
  DICT: {
    PAGE: 1,
    LIMIT: 10,
    TOTAL: null,
  },
  SETLOG: {
    ISLOGIN: false
  }
}
const First = {
  DICT: {
    PAGE: 1,
    LIMIT: 5,
    TOTAL: null,
  },
  SETLOG: {
    ISLOGIN: false
  }
}

/**
 * 获取用户token
 *@return {token:value}
 * **/
function getUserToken() {
  return {token: Vue.cookie.get('token')}
}

/**
 * 获取服务器地址
 * **/
function getServerUrl(url) {
  let server = window.SITE_CONFIG.baseUrl
  if (url == null) {
    return server
  } else {
    return server + url
  }

}


/**
 * 三级联动反推选中
 * @param data 三级联动数据
 * @param ids  选中项id/value
 * @param field  三级联动value/label结构
 * @return {*}
 * **/
function getCascadeData(data, ids, field) {
  if (!data || !ids)
    return [];
  if (!field)
    field = ["code", "name"];
  ids = ids.toString()
  let idList = ids.split(",");
  let rtnData = [];
  // data.forEach((item, index, arr) => {
  getCascadeNode(rtnData, data, [], idList, field);
  // });
  return rtnData;
}

function getCascadeNode(rtnData, data, cascade, ids, field) {
  if (!data || !ids)
    return;
  data.forEach((item, index) => {
    ids.forEach(function (v, k) {
      if (item[field[0]] == v)
        rtnData.push(cascade.concat(Number(v)));
    });
    if (item["children"] && item["children"].length > 0) {
      getCascadeNode(rtnData, item["children"], cascade.concat(item[field[0]]), ids, field);
    }
  });
  return rtnData;
}

export default {
  rowClass,
  cellClass,
  cellClassNoEdit,
  isNaN,
  isNull,
  isUndefined,
  isEmpty,
  isObject,
  isEmptyObj,
  log,
  confirmMsg,
  alertMsg,
  unrepet,
  add,
  fortime,
  fordate,
  forhour,
  nowtime,
  parseDate,
  getthisweekdate,
  getthismonthdate,
  setlabel,
  dateToString,
  removeByValue,
  getOverWeeksList,
  getWeeksList,
  getWinHeight,
  Constants: Constants,
  First:First,
  getUserToken,
  getServerUrl,
  getCascadeData
}
