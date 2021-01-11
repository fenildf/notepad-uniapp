<template>
	<view class="container">
		<view>
			<view class="title">笔记标题：</view>
			<input class="uni-input" focus placeholder="请输入笔记标题" v-model="note.name" maxlength="12" />
		</view>
		<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady" @input="inputChange"></editor>
		<suspend-menu :micon1="micon1" :micon2="micon2" :micon3="micon3" @click="iconClick"></suspend-menu>
	</view>
</template>

<script>
	import suspendMenu from '@/components/suspend-menu/suspend-menu.vue'
	import { toast } from '@/common/common.js'

	export default {
		data() {
			return {
				placeholder: '开始输入...',
				micon1: {
					show: true,
					type: 'checkbox-filled'
				},
				micon2: {
					show: true,
					type: 'undo-filled'
				},
				micon3: {
					show: true,
					type: 'clear'
				},
				options: {},
				note: {}
			}
		},
		components: {
			suspendMenu
		},
		onLoad(options) {
			this.options = options
			uni.setNavigationBarTitle({
				title: options.noteId ? "编辑笔记" : "新增笔记"
			});
			this.getNote()
		},
		mounted() {},
		methods: {
			getNote() {
				if (this.options.noteId) {
					this.$api.getNote(this.options.noteId).then(res => {
						this.note = res;
					})
				}
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
					if (this.note.content) {
						this.editorCtx.setContents({
							html: this.note.content
						})
					}
				}).exec()
			},
			// 输入变化
			inputChange(e) {
				this.note.content = e.detail.html;
			},
			// 回退
			undo() {
				this.editorCtx.undo()
			},
			iconClick(index) {
				if (index === 0) { // 保存
					this.saveOrUpdateNote()
				} else if (index === 1) { //回退
					this.undo();
				} else if (index === 2) { // 返回
					uni.navigateBack()
				}

			},
			saveOrUpdateNote() {
				if (!this.note.name) {
					toast('请输入笔记标题')
					return;
				}
				if (!this.note.content) {
					toast('请输入笔记内容')
					return;
				}
				if (this.note.id) {
					this.$api.updateNote(this.note).then(res => {
						toast('修改成功')
						this.beforePage()
					})
				} else {
					this.note.notebookId = this.options.notebookId;
					this.$api.saveNote(this.note).then(res => {
						toast('新增成功')
						this.beforePage()
					})
				}
			},
			// 返回上一页面
			beforePage() {
				let $this = this
				var pages = getCurrentPages(); // 当前页面
				var beforePage = pages[pages.length - 2]; // 前一个页面
				wx.navigateBack({
					success: function() {
						beforePage.onLoad({noteId: $this.note.id, noteName: $this.note.name, notebookId: $this.options.notebookId, edit: 'edit'});
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		padding: 10px;

		.uni-input {
			margin-top: 10rpx;
			margin-bottom: 30rpx;
			font-size: 32rpx;
		}
	}

	#editor {
		width: 700upx;
		height: 1000rpx;
		background-color: #CCCCCC;
		font-size: 32rpx;
		border-radius: 10rpx;
		padding: 30rpx;
		line-height: 50rpx;
	}
</style>
