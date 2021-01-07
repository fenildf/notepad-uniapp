<template>
	<view class="content">
		<k-scroll-view ref="k-scroll-view" :refreshType="scroll.refreshType" :refreshTip="scroll.refreshTip" :loadTip="scroll.loadTip"
		 :loadingTip="scroll.loadingTip" :emptyTip="scroll.emptyTip" :touchHeight="scroll.touchHeight" :height="scroll.height"
		 :bottom="scroll.bottom" :autoPullUp="scroll.autoPullUp" :stopPullDown="scroll.stopPullDown" @onPullDown="handlePullDown"
		 @onPullUp="handleLoadMore">
			<view class="content-line" @click="gotoText(item.id, item.name)" v-for="(item, index) in list" :key="index">
				<text>{{item.name}}</text>
				<uni-icons type="arrowright" size="18" color="#282d2c" class="content-uni-icons"></uni-icons>
			</view>
		</k-scroll-view>

		<view class="add-wrap" hover-class="plus-hover" v-if="!options.disabled">
			<uni-icons type="plus" size="45" color="#6ad8d8" @click="addContent"></uni-icons>
		</view>

	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';

	export default {
		data() {
			return {
				options: {},
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
			uniIcons,
			kScrollView
		},
		onLoad(options) {
			this.options = options
			uni.setNavigationBarTitle({
				title: options.notebookName
			});
			this.getNotePage(1)
		},
		mounted() {},
		methods: {
			getNotePage(pageNo) {
				this.$api.getNotePage(this.options.notebookId, pageNo).then(res => {
					this.page = res
					this.list = pageNo === 1 ? this.page.records : this.list.concat(this.page.records);
				})
			},
			// 查看详情
			gotoText(noteId, noteName) {
				uni.navigateTo({
					url: '/pages/note/text/text?noteId=' + noteId + '&noteName=' + noteName + "&disabled=" + true
				});
			},
			// 跳转新增笔记
			addContent() {
				uni.navigateTo({
					url: '/pages/note/edit/edit?notebookId=' + this.options.notebookId
				})
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.getNotePage(1)
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			handleLoadMore(stopLoad) {
				if (this.page.current < this.page.pages) {
					this.getNotePage(++this.page.current)
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

<style scoped>
	body {
		width: 750upx;
	}

	.content {
		display: inline-block;
	}

	.content-line {
		position: relative;
		overflow: hidden;
		width: 710upx;
		padding: 20upx 20upx 20upx 20upx;
		border-bottom: 3upx solid #f7f7f7;
	}

	.content-line-img {
		height: 55upx;
		width: 60upx;
		margin-right: 30upx;
	}

	.content-uni-icons {
		position: fixed;
		right: 10rpx;
	}

	.add-wrap {
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		justify-content: center;
	}
</style>
