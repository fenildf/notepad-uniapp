<template>
	<view>
		<view class="share-catalog">
			<k-scroll-view ref="k-scroll-view" :refreshType="scroll.refreshType" :refreshTip="scroll.refreshTip" :loadTip="scroll.loadTip"
			 :loadingTip="scroll.loadingTip" :emptyTip="scroll.emptyTip" :touchHeight="scroll.touchHeight" :height="scroll.height"
			 :bottom="scroll.bottom" :autoPullUp="scroll.autoPullUp" :stopPullDown="scroll.stopPullDown" @onPullDown="handlePullDown"
			 @onPullUp="handleLoadMore">
				<mark-slide-list :list="list" :border="true" @click="clickMethod"></mark-slide-list>
			</k-scroll-view>
		</view>
	</view>
</template>

<script>
	import markSlideList from "@/components/mark-slide-list/mark-slide-list.vue"
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {
		dateFormat
	} from '@/common/common.js'

	export default {
		data() {
			return {
				list: [],
				page: {
					records: [],
					current: 1,
					size: 10
				},
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
					stopPullDown: true,
				}
			}
		},
		components: {
			markSlideList,
			kScrollView
		},
		mounted() {
			this.getNoteBookPageShare(1)
		},
		methods: {
			getNoteBookPageShare(pageNo) {
				this.$api.getNoteBookPageShare(pageNo).then(res => {
					res.records.forEach(item => {
						item.title = item.name;
						item.rightDetail = dateFormat("YYYY-mm-dd", new Date(item.createTime));
						item.detail = item.userName + "的共享";
					});
					this.page = res
					this.list = pageNo === 1 ? this.page.records : this.list.concat(this.page.records);
				});
			},
			// 跳转笔记本笔记列表
			gotoContent(notebookId, notebookName) {
				uni.navigateTo({
					url: '/pages/note/content/content?notebookId=' + notebookId + "&notebookName=" + notebookName + "&disabled=" + true
				});
			},
			clickMethod(data) {
				this.gotoContent(data.id, data.name)
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.getNoteBookPageShare(1)
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			handleLoadMore(stopLoad) {
				if (this.page.current < this.page.pages) {
					this.getNoteBookPageShare(++this.page.current)
					stopLoad ? stopLoad() : '';
				} else {
					stopLoad ? stopLoad({
						isEnd: true
					}) : '';
				}
			}
		}
	}
</script>

<style>
	.share-catalog {
		margin-top: 80upx;
		display: inline-block;
	}
</style>
