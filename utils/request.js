import Fly from 'flyio/dist/npm/wx'

const request = new Fly()

const errorPrompt = (err) => {
	wx.showToast({
		title: '服务器异常',
		icon: 'none'
	})
}

request.interceptors.request.use((request) => {
	wx.showNavigationBarLoading()
	request.headers["yanger-general-backend-token"] = uni.getStorageSync('notepad-token');
	return request
})

request.interceptors.response.use((response, promise) => {
	wx.hideNavigationBarLoading()
	if (!(response && response.data)) {
	  errorPrompt(response)
	}
	// 错误请求：0-异常，-1-token不正确，-2-token过期
	if(response.data.status <= 0) {
		uni.showToast({
			icon:'none',
			title: response.data.msg
		});
		return promise.reject(response.data.msg)
	}
	let token = response.headers["yanger-general-backend-token"]
	if (token && token[0]) {
		uni.setStorage({
			key: 'notepad-token',
			data: token[0],
			success: function () {
				uni.getStorage({
					key: 'notepad-token',
					success: function (res) {
						console.log(res.data);
					}
				});
			}
		});
	}
	return promise.resolve(response.data.data)
}, (err, promise) => {
	wx.hideNavigationBarLoading()
	errorPrompt(err)
	return promise.reject(err)
})

export default request
