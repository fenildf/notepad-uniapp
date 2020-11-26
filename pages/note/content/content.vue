<template>
	<view class="content">
		<view class="content-line" @click="gotoText()">
			<text>我的小秘密</text>
		</view>
		<view class="content-line">
			<text>各环节的收购价款是</text>
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
			gotoText:function(){
				uni.navigateTo({
					url:'/pages/note/text/text'
				});
			}
		}
	}
</script>

<style>
body{width:750upx;}
	.content{
		display: inline-block;
	}
	.content-line{
		position: relative;
		overflow: hidden;
		width:710upx;
		padding: 20upx 20upx 20upx 20upx;
		border-bottom: 3upx solid #f7f7f7;
	}	
	.content-line-img{
		height: 55upx;
		width: 60upx;
		margin-right: 30upx;
	}
</style>
