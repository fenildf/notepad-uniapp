<template>
	<view>
		<view class="text">
			<rich-text>亲爱的小伙伴，非常歉意。该书版权到期，不再提供在线阅读服务。我们会竭尽全力继续与版权方协商，感谢您一直以来的支持。
			</rich-text>
		</view>

		<view class="add-wrap" hover-class="plus-hover">
			<uni-icons type="compose" size="30" color="#4a4a4a" @click="gotoEdit"></uni-icons>
		</view>

	</view>

</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {}
		},
		components: {
			uniIcons
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: "title"
			});
		},
		methods: {
			gotoEdit() {
				uni.navigateTo({
					url: '/pages/note/edit/edit'
				})
			}
		}
	}
</script>

<style scoped>
	.text {
		min-height: 100vh;
		padding: 20rpx 30rpx;
		background: #e4cba3;
		font-size: 32rpx;
		line-height: 60rpx;
	}

	.add-wrap {
		position: fixed;
		bottom: 120upx;
		display: flex;
		width: 100%;
		left: 80%;
	}
</style>
