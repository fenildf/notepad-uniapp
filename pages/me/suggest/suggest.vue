<template>
	<view id="pinion">
		<view>
			<text>个人信息如有不便，您可以选择不填</text>
		</view>
		<view>
			<view class="user_name">
				<input class="uni-input" placeholder="请输入您的姓名" />
			</view>
			<view class="user_phone">
				<input class="uni-input" placeholder="请输入您的手机号" />
			</view>
			<view class="user_weixin">
				<input class="uni-input" placeholder="请输入您的微信号" />
			</view>
		</view>
		<view class="user_content">
			<textarea placeholder="请描述您的详细问题，我们会尽快改正。"></textarea>
		</view>
		<view class="user_button">
			<button>提交反馈</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	body {
		width: 100%;
	}

	#pinion {
		width: 100%;
		background-color: #fff;
		margin: 0 auto;
		flex-direction: column;
		height: 1020rpx;
	}

	#pinion>view:first-child {
		color: red;
		width: 100%;
		text-align: center;
		flex-direction: column;
		height: 60rpx;
		line-height: 80rpx;
		font-size: 28upx;
		;
	}

	#pinion>view:first-child>text {
		width: 100%;
		align-items: center;
		display: inline-block;
	}

	#pinion>view:nth-child(2) {
		flex-direction: column;
		width: 100%;
		color: #232323;
	}

	#pinion>view:nth-child(2)>view {
		height: 60upx;
		color: #232323;
		line-height: 100upx;
		width: 90%;
		margin: 20upx 5%;
		border: 2px solid #eee;
		border-radius: 4px;
	}

	#pinion>view:nth-child(2)>view input {
		width: 100%;
		height: 60upx;
		line-height: 100upx;
		margin: auto 0;
		padding-left: 20upx;
		font-size: 32rpx;
	}

	.user_content {
		color: #232323;
		width: 90%;
		margin-left: 5%;
		border: 2px solid #eee;
		border-radius: 4px;
	}

	.user_content textarea {
		padding: 20upx;
		width: 90%;
		height: 600rpx;
		font-size: 32rpx;
		line-height: 60rpx;
	}

	.user_button {
		position: fixed;
		bottom: 40upx;
		border-radius: 4px;
		background-color: aliceblue;
	}
</style>
