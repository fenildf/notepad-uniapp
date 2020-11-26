<template>
	<view class="catalog">
		<view class="catalog-line" @click="gotoContent()">
			<image src="../../../static/icon_study@2x.png" class="catalog-line-img"></image>
			<text>测试测试</text>
		</view>
		<view class="catalog-line">
			<image src="../../../static/icon_study@2x.png" class="catalog-line-img"></image>
			<text>你猜不是一个女同学</text>
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
			gotoContent:function(){
				console.log("查看详情")
				uni.navigateTo({
					url:'/pages/note/content/content'
				});
			}
		}
	}
</script>

<style scoped>
	body{width:750upx;}
	.catalog{
		margin-top: 80upx;
		display: inline-block;
	}
	.catalog-line{
		position: relative;
		overflow: hidden;
		width:710upx;
		padding: 20upx 20upx 20upx 20upx;
		border-bottom: 3upx solid #f7f7f7;
	}	
	.catalog-line-img{
		height: 55upx;
		width: 60upx;
		margin-right: 30upx;
	}
</style>