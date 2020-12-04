<template>
	<view>
		<view class="share-catalog">
			<mark-slide-list :list="shares" :border="true" @click="clickMethod"></mark-slide-list>
		</view>
	</view>
</template>

<script>
	import markSlideList from "@/components/mark-slide-list/mark-slide-list.vue"
	export default {
		data() {
			return {
				shares: [{
						id: 1,
						image: '../../static/note/share.png',
						title: '大海说呢过',
						rightDetail: '2019-03-18',
						detail: '来自傻傻的分享',
						slide_x: 0
					},
					{
						id: 2,
						image: '../../static/note/share.png',
						title: '规划京津冀',
						rightDetail: '2019-03-17',
						detail: '来都很好SDK计划书',
						slide_x: 0
					},
					{
						id: 3,
						surname: '老杨',
						title: '规划京津冀',
						rightDetail: '2019-03-17',
						detail: '来都很好SDK计划书',
						slide_x: 0
					},
					{
						id: 4,
						icon: 'fa-clone',
						title: '规划京津冀',
						rightDetail: '2019-03-17',
						detail: '来都很好SDK计划书',
						slide_x: 0
					}
				]
			}
		},
		components: {
			markSlideList
		},
		methods: {
			// 跳转笔记本笔记列表
			gotoContent() {
				console.log("跳转笔记本笔记列表")
				uni.navigateTo({
					url: '/pages/note/content/content'
				});
			},
			clickMethod(data) {
				console.log('点击行回调', data)
				this.gotoContent()
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
