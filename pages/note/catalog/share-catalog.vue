<template>
	<view>
		<view class="share-catalog">
			<mark-slide-list :list="page.records" :border="true" @click="clickMethod"></mark-slide-list>
		</view>
	</view>
</template>

<script>
	import markSlideList from "@/components/mark-slide-list/mark-slide-list.vue"
	export default {
		data() {
			return {
				page: {
					records: [],
					current: 1,
					size: 10
				}
			}
		},
		components: {
			markSlideList
		},
		mounted() {
			this.getNoteBookPageShare()
		},
		methods: {
			getNoteBookPageShare() {
				this.$api.getNoteBookPageShare().then(res =>{
					res.records.forEach(item => {
						item.title = item.name,
						item.rightDetail = item.createTime
						item.detail = "来自xx的分享"
					});
					this.page.records = res.records
					/* {
						id: 4,
						icon: 'fa-clone',
						title: '规划京津冀',
						rightDetail: '2019-03-17',
						detail: '来都很好SDK计划书',
						slide_x: 0
					} */
				});
			},
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
