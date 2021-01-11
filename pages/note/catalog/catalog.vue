<template>
	<view class="catalog">
		<k-scroll-view ref="k-scroll-view" :refreshType="scroll.refreshType" :refreshTip="scroll.refreshTip" :loadTip="scroll.loadTip"
		 :loadingTip="scroll.loadingTip" :emptyTip="scroll.emptyTip" :touchHeight="scroll.touchHeight" :height="scroll.height"
		 :bottom="scroll.bottom" :autoPullUp="scroll.autoPullUp" :stopPullDown="scroll.stopPullDown" @onPullDown="handlePullDown"
		 @onPullUp="handleLoadMore">
			<simple-slide-list :list="list" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod"></simple-slide-list>
		</k-scroll-view>

		<view class="add-wrap" hover-class="plus-hover">
			<uni-icons type="plus" size="45" color="#6ad8d8" @click="showCatalogDialog"></uni-icons>
		</view>

		<s-popup position="center" v-model="visible">
			<view class="catalog-popup">
				<label class="catalog-label">添加记事本</label>
				<input class="uni-input" focus v-model="notebook.name" placeholder="请输入记事本名称" maxlength="8"></input>
				<button @click="addNotebook">确认</button>
			</view>
		</s-popup>

	</view>
</template>

<script>
	import simpleSlideList from "@/components/simple-slide-list/simple-slide-list.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import sPopup from '@/components/s-popup/index.vue';
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import { toast } from '@/common/common.js'

	export default {
		data() {
			return {
				visible: false,
				notebook: {},
				list: [],
				page: {
					records: [],
					current: 1,
					size: 10
				},
				buttonList: [{
						title: '重命名',
						background: '#78efa8'
					},
					{
						title: '删除',
						background: '#ff3b32'
					}
				],
				scroll: {
					refreshType: 'custom',
					refreshTip: '正在下拉',
					loadTip: '获取更多数据',
					loadingTip: '正在加载中...',
					emptyTip: '--我是有底线的--',
					touchHeight: 50,
					height: 0,
					bottom: 50,
					autoPullUp: true,
					stopPullDown: true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
				}
			}
		},
		components: {
			simpleSlideList,
			uniIcons,
			sPopup,
			kScrollView
		},
		mounted() {
			this.getNoteBookPageSelf(1)
		},
		methods: {
			// 加载数据
			getNoteBookPageSelf(pageNo) {
				this.$api.getNoteBookPageSelf(pageNo).then(res => {
					this.page = res
					this.list = pageNo === 1 ? this.page.records : this.list.concat(this.page.records);
				});
			},
			// 跳转笔记本笔记列表
			gotoContent(notebookId, notebookName) {
				uni.navigateTo({
					url: '/pages/note/content/content?notebookId=' + notebookId + "&notebookName=" + notebookName + "&edit=edit"
				});
			},
			// 新增笔记本弹框
			showCatalogDialog() {
				this.viewNamePopup()
			},
			// 新增笔记本提交
			addNotebook() {
				if (this.notebook.name && this.notebook.name.trim()) {
					if (this.notebook.id) {
						this.$api.updateNotebook(this.notebook.id, this.notebook.name).then(res => {
							this.notebook = {};
							this.visible = false;
							this.getNoteBookPageSelf(1)
						});
					} else {
						this.$api.saveNotebook(this.notebook).then(res => {
							this.notebook = {};
							this.visible = false;
							this.getNoteBookPageSelf(1)
						});
					}
				} else {
					toast("请输入记事本名称")
				}
			},
			// 加载笔记本数据
			viewNamePopup(data) {
				this.notebook = data || {}
				this.visible = true;
			},
			changeMethod(data, button, index) {
				if (button.title === "重命名") {
					this.viewNamePopup(data)
				} else if (button.title === "删除") {
					this.$api.delNotebook(data.id).then(res => {
						this.getNoteBookPageSelf(1)
					})
				}
			},
			// 点击行
			clickMethod(data) {
				this.gotoContent(data.id, data.name)
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.getNoteBookPageSelf(1)
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			handleLoadMore(stopLoad) {
				if (this.page.current < this.page.pages) {
					this.getNoteBookPageSelf(++this.page.current)
					stopLoad ? stopLoad() : '';
				} else {
					stopLoad ? stopLoad({ isEnd: true }) : '';
				}
			},
			// 回到顶部
			handleGoTop() {
				this.$refs['k-scroll-view'].goTop();
			}
		}
	}
</script>

<style lang="scss" scoped>
	body {
		width: 750upx;
	}

	.catalog {
		margin-top: 80upx;
		display: inline-block;
	}

	.add-wrap {
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		justify-content: center;
	}

	.catalog-popup {
		width: 100%;
		height: 300upx;
		display: inline-block;
		text-align: center;
		line-height: 70upx;

		.catalog-label {
			font-weight: 500;
			color: #55b735;
		}

		input {
			margin-top: 50upx;
			margin-bottom: 50upx;
			font-size: 35upx;
			width: 80%;
			margin-left: 10%;
		}
	}
</style>
