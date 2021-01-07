import request from './request'

// const baseURL = `https://petrify.cc`
const baseURL = 'http://192.168.8.118:7080'

request.config.baseURL = baseURL

const api = {
	// 登录
	login: (data) => request.post('/login', data),
	// 注册
	register: (data) => request.post('/register', data),
	// 获取我的笔记本
	getNoteBookPageSelf: (pageNo) => request.get(`/notebook/page/self?pageNo=${pageNo}`),
	// 获取共享笔记本
	getNoteBookPageShare: (pageNo) => request.get(`/notebook/page/share?pageNo=${pageNo}`),
	// 新增笔记本
	saveNotebook: (data) => request.post('/notebook', data),
	// 重命名笔记本
	updateNotebook: (id, name) => request.put(`/notebook/rename?id=${id}&name=${name}`),
	// 删除笔记本
	delNotebook: (id) => request.delete(`/notebook/${id}`),
	// 获取笔记本里的笔记
	getNotePage: (notebookId, pageNo) => request.get(`/note/page?notebookId=${notebookId}&pageNo=${pageNo}`),
	// 获取笔记详情
	getNote: (id) => request.get(`/note/${id}`),
	// 保存笔记
	saveNote: (data) => request.post('/note', data),
	// 更新笔记
	updateNote: (data) => request.put('/note', data),
}

export default api
