<template>
	<view class="catalog">
		<view class="catalog-line">
			<image src="../../../static/icon_study@2x.png" class="catalog-line-img"></image>
			<text>测试测试</text>
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
	body{width:750upx;}
	.catalog{
		margin-top: 80upx;
	}
	.catalog-line{
		position: relative;
		overflow: hidden;
		width:710upx;
		padding: 20upx 20upx 0 20upx;
		border-bottom: 3upx solid #f7f7f7;
	}	
	.catalog-line-img{
		height: 50upx;
		width: 50upx;
	}
</style>