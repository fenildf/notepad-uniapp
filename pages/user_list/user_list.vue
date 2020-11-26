<template>
  <view id="me">
	    <view>
			<view class="user">
				<view class="user_img">
					<img src="https://upload.mrlou.com/upload/2019-05-28/4570cf241c74c14f4b2cb69465d140b0.jpg_100-100" />
				</view>
				<view class="user_name">
					<view>
						<text class="user_name_1">小世界</text>
						<text class="iconfont icon-woman">24岁</text>
						<text class="">2分钟前</text>
					</view>
					<text class="user_name_2">人生最遗憾的，莫过于，轻易地放弃了不该放弃的，固执地坚持了不该坚持的。</text>
				</view>
			</view>
			<view class="user">
				<view class="user_img">
					<img src="https://upload.mrlou.com/upload/2019-05-28/4570cf241c74c14f4b2cb69465d140b0.jpg_100-100" />
				</view>
				<view class="user_name">
					<view>
						<text class="user_name_1">小世界</text>
						<text class="iconfont icon-woman">24岁</text>
						<text class="">2分钟前</text>
					</view>
					<text class="user_name_2">人生最遗憾的，莫过于，轻易地放弃了不该放弃的，固执地坚持了不该坚持的。</text>
				</view>
			</view>
			<view class="user">
				<view class="user_img">
					<img src="https://upload.mrlou.com/upload/2019-05-28/4570cf241c74c14f4b2cb69465d140b0.jpg_100-100" />
				</view>
				<view class="user_name">
					<view>
						<text class="user_name_1">小世界</text>
						<text class="iconfont icon-woman">24岁</text>
						<text class="">2分钟前</text>
					</view>
					<text class="user_name_2">人生最遗憾的，莫过于，轻易地放弃了不该放弃的，固执地坚持了不该坚持的。</text>
				</view>
			</view>
			<view class="user">
				<view class="user_img">
					<img src="https://upload.mrlou.com/upload/2019-05-28/4570cf241c74c14f4b2cb69465d140b0.jpg_100-100" />
				</view>
				<view class="user_name">
					<view>
						<text class="user_name_1">小世界</text>
						<text class="iconfont icon-woman">24岁</text>
						<text class="">2分钟前</text>
					</view>
					<text class="user_name_2">人生最遗憾的，莫过于，轻易地放弃了不该放弃的，固执地坚持了不该坚持的。</text>
				</view>
			</view>
		</view>
  </view>
</template>

<script>
export default {
  name: 'me',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
	  toOpinion:function(){
		  uni.navigateTo({
		  	url: '/pages/opinion/opinion'
		  });
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	body{width:100%;}
	#me{
		width:100%;
		background-color: #fff;
		margin:0 auto;
	}
	#me>view{width:100%;flex-direction: column;align-items: center;position: relative;}
	.user{width:90%;height:120upx;margin:0 5%;position: relative;border-bottom: 2px solid #EEEEEE;padding: 20upx 0;}
	.user>view{height:100%;}
	.user_img{width: 20%;text-align: center;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}
	.user_img img{height:120upx;width:120upx;align-items: center;margin:0 auto;border-radius: 20upx;}
	.user_name{width: 80%;flex-direction: column;}
	.user_name>text{width: 80%;height:60upx; padding-left:4%;   overflow: hidden;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;}
  	.user_name_1{font-weight: bold;line-height: 80upx;font-size: 40upx;}
	.user_name>view{padding-left: 4%;flex-direction: row;}
	.user_name>view>text:nth-child(2){line-height: 14px;    background-color: #ec8fcf;
    border-radius: 2px;
    font-size: 0.5rem;
    height: 14px;
    margin: auto auto auto 0;color: #fff;}
	.user_name>view>text:nth-child(3){display: inline-block;line-height: 14px;color: #ccc;height: 14px;margin: auto 0;font-size:12px;}
  	.user_name_2{color:#ccc;line-height: 60upx;font-size: 24upx;}
</style>
