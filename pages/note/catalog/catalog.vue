<template>
	<view class="catalog">
		<catalog-slide-list :list="list" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod"></catalog-slide-list>
	</view>
</template>

<script>
	import catalogSlideList from './catalog-slide-list.vue'

	export default {
		data() {
			return {
				list: [{
						id: 1,
						image: '../../../static/icon_study@2x.png',
						name: '的撒个娇汇顶科技'
					},
					{
						id: 2,
						image: '../../../static/icon_study@2x.png',
						name: '家是件好事'
					},
					{
						id: 3,
						image: '../../../static/icon_study@2x.png',
						name: '啊大大搭都是非常'
					}
				],
				buttonList: [{
						title: '修改',
						background: '#99ffe9'
					},
					{
						title: '删除',
						background: '#ff3b32'
					}
				]
			}
		},
		components: {
			catalogSlideList
		},
		methods: {
			gotoContent: function() {
				console.log("查看详情")
				uni.navigateTo({
					url: '/pages/note/content/content'
				});
			},
			changeMethod(data, button, index) {
				console.log('滑动按钮回调', data)
				console.log('滑动按钮回调', button)
			},
			clickMethod(data) {
				console.log('点击行回调', data)
				this.gotoContent()
			}
		}
	}
</script>

<style scoped>
	body {
		width: 750upx;
	}

	.catalog {
		margin-top: 80upx;
		display: inline-block;
	}

	.catalog-line {
		position: relative;
		overflow: hidden;
		width: 710upx;
		padding: 20upx 20upx 20upx 20upx;
		border-bottom: 3upx solid #f7f7f7;
	}

	.catalog-line-img {
		height: 55upx;
		width: 60upx;
		margin-right: 30upx;
	}
</style>
