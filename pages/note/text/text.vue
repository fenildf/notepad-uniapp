<template>
	<view>
		<view class="text">
			<rich-text>亲爱的小伙伴，非常歉意。该书版权到期，不再提供在线阅读服务。我们会竭尽全力继续与版权方协商，感谢您一直以来的支持。
			</rich-text>
		</view>
		<!-- <button @click="gotoEdit()">编辑</button> -->
		<suspend-menu></suspend-menu>
	</view>

</template>

<script>
	import suspendMenu from '@/components/suspend-menu/suspend-menu.vue'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			suspendMenu
		},
		mounted() {
			uni.setNavigationBarTitle({
				title: "title"
			});
		},
		methods: {
			gotoEdit:function(){
				uni.navigateTo({
					url:'/pages/note/edit/edit'
				})
			}
		}
	}
</script>

<style scoped>
	.text{
		min-height: 100vh;
		padding: 20rpx 30rpx;
		background: #e4cba3;
		font-size: 32rpx;
		line-height: 60rpx;
	}
	button{
		width: 160rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 38rpx;
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
	}
</style>
