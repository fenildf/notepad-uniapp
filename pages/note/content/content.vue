<template>
	<view class="content">
		<view class="content-line" @click="gotoText()">
			<text>我的小秘密</text>
			<uni-icons type="arrowright" size="18" color="#282d2c" class="content-uni-icons"></uni-icons>
		</view>
		<view class="content-line">
			<text>各环节的收购价款是</text>
		</view>

		<view class="add-wrap" hover-class="plus-hover">
			<uni-icons type="plus" size="45" color="#6ad8d8" @click="addContent"></uni-icons>
		</view>

	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {

			}
		},
		components: {
			uniIcons
		},
		methods: {
			gotoText() {
				uni.navigateTo({
					url: '/pages/note/text/text'
				});
			},
			addContent() {
				console.log("新增笔记")
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
