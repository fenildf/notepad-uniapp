<template>
	<view>
		<view class="text-view">
			<text>如果喜欢，或者有什么建议(Bug)，可以添加开发者微信</text>
		</view>
		<image class="image" src="../../../static/me/me_wx.jpg"></image>
		<view class="icon-view">
			<Icon type="fa-heart" size="60" class="icon-icon"></Icon>
			<Icon type="fa-heart" size="60" class="icon-icon"></Icon>
			<Icon type="fa-heart" size="60" class="icon-icon"></Icon>
			<Icon type="fa-heart" size="60" class="icon-icon"></Icon>
			<Icon type="fa-heart" size="60" class="icon-icon"></Icon>
		</view>
	</view>
</template>

<script>
	import Icon from '@/components/atom-awesome-icon/Icon.vue'
	export default {
		data() {
			return {

			}
		},
		components: {
			Icon
		},
		methods: {

		}
	}
</script>

<style scoped>
	.text-view {
		text-align: center;
		margin-top: 100rpx;
		margin-bottom: 100rpx;
		font-size: 30rpx;
	}

	.image {
		width: 600upx;
		margin-left: 75upx;
		height: 600upx;
	}

	.icon-view {
		margin-top: 100rpx;
		color: #f90d0d;
		text-align: center;
	}

	.icon-icon {
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
</style>
