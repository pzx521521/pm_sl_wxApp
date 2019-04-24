var BaseUrl = 'https://parapeng.ngrok.xiaomiqiu.cn'

function getBaseUrl() {
  return BaseUrl
}

function get(path, parameter, success, failed) {
  let url = BaseUrl + path
  wx.request({
    url: url,
    data: parameter,
    method: 'GET',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function(res) {
      if (res.statusCode === 200) {
        let data = res.data
        if (data) {
          if (success) {
            success(data)
          }
        } else {
          if (failed) failed(data)
        }
      } else {
        if (failed) failed(response)
      }
    }.bind(this)
  })
}

// sb接口，URL部分参数，body部分参数
function post1(path, body, success, failed) {
  let url = BaseUrl + path
  // options.body = JSON.stringify(body)
  // options.headers = { 'Content-Type': 'application/json' }
  // options.body = JSON.stringify(parameter)
  // for (let k in parameter) {
  //   options.body += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(parameter[k])
  // }
  wx.request({
    url: url,
    data: body,
    method: 'POST',
    success: function(res) {
      if (res.statusCode === 200) {
        let data = res.data
        if (data && data.httpCode === 200) {
          if (success) {
            success(data)
          }
        } else {
          if (failed) failed(data)
        }
        success(res)
      } else {
        if (failed) failed(res)
      }
    }.bind(this)
  })
}

function post(path, parameter, success, failed) {
  let url = BaseUrl + path
  for (let k in parameter) {
    url += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(parameter[k])
  }
  wx.request({
    url: url,
    data: {},
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function(res) {
      if (res.statusCode === 200) {
        let data = res.data
        if (data && data.httpCode === 200) {
          if (success) {
            success(data)
          }
        } else {
          if (failed) failed(data)
        }
      } else {
        if (failed) failed(response)
      }
    }.bind(this)
  })
}

module.exports = {
  get: get,
  post: post,
  post1: post1
}