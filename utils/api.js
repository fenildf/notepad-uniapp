import request from './request'

const baseURL = `https://imyanger.com/api/notepad`
// const baseURL = 'http://192.168.8.118:10086'
// const baseURL = 'http://192.168.164.1:10086'

request.config.baseURL = baseURL

const api = {
	// 登录
	login: (data) => request.post('/login', data),
	// 微信授权登录
	wxLogin: (data) => request.post('/wxLogin', data),
	// 微信app登录
	wxAppLogin: (data) => request.post('/wxAppLogin', data),
	// 注册
	register: (data) => request.post('/register', data),

	// 获取我的笔记本
	getNoteBookPageSelf: (pageNo) => request.get(`/notebook/page/self?pageNo=${pageNo}&pageSize=20`),
	// 获取共享笔记本
	getNoteBookPageShare: (pageNo) => request.get(`/notebook/page/share?pageNo=${pageNo}&pageSize=20`),
	// 新增笔记本
	saveNotebook: (data) => request.post('/notebook', data),
	// 重命名笔记本
	updateNotebook: (id, name) => request.put(`/notebook/rename?id=${id}&name=${name}`),
	// 删除笔记本
	delNotebook: (id) => request.delete(`/notebook/${id}`),
	// 获取笔记本里的笔记
	getNotePage: (notebookId, pageNo) => request.get(`/note/page?notebookId=${notebookId}&pageNo=${pageNo}&pageSize=20`),
	// 获取笔记详情
	getNote: (id) => request.get(`/note/${id}`),
	// 保存笔记
	saveNote: (data) => request.post('/note', data),
	// 更新笔记
	updateNote: (data) => request.put('/note', data),

	// 获取共享组
	getShareList: () => request.get('/share/list'),
	// 新增共享组
	saveShare: (data) => request.post('/share', data),
	// 获取共享组详情
	getShare: (id) => request.get(`/share/${id}`),
	// 移除共享组成员
	delShareMember: (shareId, userId) => request.delete(`/share/${shareId}/member/${userId}`),
	// 移除共享组笔记本
	delShareNotebook: (shareId, notebookId) => request.delete(`/share/${shareId}/notebook/${notebookId}`),
	// 移除共享组全部成员
	delShareMembers: (shareId) => request.delete(`/share/${shareId}/members`),
	// 移除共享组全部笔记本
	delShareNotebooks: (shareId) => request.delete(`/share/${shareId}/notebooks`),
	// 移除共享组
	delShare: (shareId) => request.delete(`/share/${shareId}`),
	// 共享组绑定成员
	bindShareMember: (shareId, uid) => request.put(`/share/${shareId}/member/${uid}`),
	// 共享组绑定笔记本
	bindShareNotebook: (shareId, notebookId) => request.put(`/share/${shareId}/notebook/${notebookId}`),
	// 获取我的所有笔记本
	getNoteBookList: (shareId) => request.get(`/notebook/list?shareId=${shareId}`),

	// 获取心情数据
	getMoodData: () => request.get('/mood'),
	// 保存心情
	saveMood: (data) => request.post('/mood', data),

	// 我的信息
	getMineData: () => request.get('/mine'),
	// 提交建议
	addSuggest: (data) => request.post('/suggest', data),
	// 用户列表
	getUsers: (pageNo) => request.get(`/noteUser/page?pageNo=${pageNo}&pageSize=20`),
	// 提升vip
	upVip: (id) => request.put(`/noteUser/upVip/${id}`),
	// 降低vip
	downVip: (id) => request.put(`/noteUser/downVip/${id}`),
	// 笔记本列表(管理员)
	getAdminNotePage: (pageNo) => request.get(`/notebook/page/admin?pageNo=${pageNo}&pageSize=20`),

}

export default api
