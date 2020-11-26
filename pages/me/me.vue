<template>
  <view id="me">
	    <view>
			<view class="user">
				<view class="user_img">
					<img src="https://upload.mrlou.com/upload/2019-05-28/4570cf241c74c14f4b2cb69465d140b0.jpg_100-100" />
				</view>
				<view class="user_name">
					<text class="user_name_1">小世界</text>
					<text class="user_name_2">人生最遗憾的，莫过于，轻易地放弃了不该放弃的，固执地坚持了不该坚持的。</text>
				</view>
			</view>
			<view class="my_data">
				<text>我的数据</text>
				<view>
					<view @click="user_list">
						<text>25</text>
						<text>已获关注</text>
					</view>
					<view @click="user_list">
						<text>25</text>
						<text>已获拥抱</text>
					</view>
					<view @click="user_list">
						<text>25</text>
						<text>我的访客</text>
					</view>
				</view>
				<view class="clear"></view>
			</view>
			<view class="my_service">
				<text>我的服务</text>
				<view class="clear">
					<view @click="my_con_list">
						<text class="iconfont icon-zuijinliulan1"></text>
						<text>浏览</text>
					</view>
					<view>
						<text class="iconfont icon-wodeshoucang"></text>
						<text>关注</text>
					</view>
					<view>
						<text class="iconfont icon-xiangmu"></text>
						<text>心事</text>
					</view>
					<view>
						<text class="iconfont icon-loushuguanli"></text>
						<text>回复</text>
					</view>
				</view>
				<view class="clear"></view>
			</view>
			<view class="customer">
				<view class="customer_view">
					<text>客服微信</text>
					<text>qingchun19970228</text>
					<text class="iconfont icon-sanjiaojiantoutriangular-copy-copy"></text>
				</view>
				<view @click="toOpinion" class="customer_view">
					<text>意见反馈</text>
					<text></text>
					<text class="iconfont icon-sanjiaojiantoutriangular-copy-copy"></text>
				</view>
				<view class="customer_view">
					<text>关于我们</text>
					<text></text>
					<text class="iconfont icon-sanjiaojiantoutriangular-copy-copy"></text>
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
	  },
	  user_list:function(){
		  uni.navigateTo({
		  	url:'/pages/user_list/user_list'
		  });
	  },
	  my_con_list:function(){
		  uni.navigateTo({
		  	url:'/pages/my_con_list/my_con_list'
		  })
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
	.user{width:90%;height:120upx;padding:20upx 5%;position: relative;}
	.user>view{height:100%;}
	.user_img{width: 20%;text-align: center;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}
	.user_img img{height:120upx;width:120upx;align-items: center;margin:0 auto;border-radius: 20upx;}
	.user_name{width: 80%;flex-direction: column;}
	.user_name text{width: 80%;height:60upx; padding-left:4%;   overflow: hidden;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;}
	
  	.user_name_1{font-weight: bold;line-height: 80upx;font-size: 40upx;}
  	.user_name_2{color:#ccc;line-height: 60upx;font-size: 24upx;}
  	.my_data{width:90%;padding: 40upx 5%;border-bottom: 3upx solid #eeeeee;flex-direction: column;position: relative;}
  	.my_data>text{display: inline-block;font-size: 40upx;font-weight: bold;padding-bottom: 40upx;}
  	.my_data>view{width: 100%;}
  	.my_data>view>view{float: left;width: 33.3333333%;text-align: center;flex-direction: column;}
  	.my_data>view>view>text{display: inline-block;padding: 10upx 0;font-size: 28upx;width: 100%;}
  	.my_data>view>view>text:first-child{color:#000;font-weight: bold;}
  	.my_data>view>view>text:nth-child(2){color:#000;}
  	.my_service{width:90%;padding: 40upx 5%;border-bottom: 6upx solid #eeeeee;flex-direction: column;position: relative;}
  	.my_service>text{display: inline-block;font-size: 40upx;font-weight: bold;padding-bottom: 40upx;}
  	.my_service>view{width: 100%;}
  	.my_service>view>view{float: left;width: 25%;text-align: center;flex-direction: column;}
  	.my_service>view>view>text{display: inline-block;padding: 10upx 0;font-size: 28upx;width: 100%;}
	.my_service>view>view>text:first-child{font-size:56upx;}
  	.my_service>view>view:first-child{color:#8bce8c;}
  	.my_service>view>view:nth-child(2){color:#fe8622;}
  	.my_service>view>view:nth-child(3){color:#8bce8c;}
  	.my_service>view>view:nth-child(4){color:#417cf9;}
  	.clear{clear:both;}
	.customer{width: 90%; padding: 0 5% ;flex-direction: column;}
	.customer .customer_view{height:100upx;width:100%;border-bottom: 4upx solid #eee;line-height: 100upx;flex-direction: row;-webkit-box-pack: justify;
    -webkit-justify-content: space-between;}
	.customer .customer_view>text:first-child{font-size: 32upx;}
	.customer .customer_view>text:nth-child(2){float: right;font-size: 32upx;}
</style>
