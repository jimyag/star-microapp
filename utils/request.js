const request = (url, data, method = "GET", header = {"content-type": "application/json"}) => {
     return new Promise((resolve, reject) => {
        wx.request({
            url, data, method, header,
            success: resolve,
            fail: reject
        })
    })
}


module.exports = {
    request
}