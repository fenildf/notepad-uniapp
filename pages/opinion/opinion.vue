<template>
  <view id="pinion">
		<view>
			<text>如果不便留下联系方式您可以你选择不填</text>
		</view>
	    <view>
			<view class="user_name">
				<input class="uni-input" placeholder="请输入您的姓名" />
			</view>
			<view class="user_phone">
				<input class="uni-input" placeholder="请输入您的姓名" />
			</view>
			<view class="user_qq">
				<input class="uni-input" placeholder="请输入您的QQ" />
			</view>
			<view class="user_weixin">
				<input class="uni-input" placeholder="请输入您的微信" />
			</view>
		</view>
		<view class="user_content">
			<textarea placeholder="请描述您的问题尽量详细好让我们知道问题在哪里"></textarea>
		</view>
		<view class="user_button">
			<button>提交反馈</button>
		</view>
  </view>
</template>

<script>
export default {
  name: 'pinion',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
	  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	body{width:100%;}
	#pinion{
		width:100%;
		background-color: #fff;
		margin:0 auto;
		flex-direction: column;
		
	}
	#pinion>view:first-child{color: red; width: 100%; text-align: center;flex-direction: column;height: 160upx; line-height:160upx;font-size: 28upx;;}
	#pinion>view:first-child>text{width: 100%; align-items: center;display: inline-block;}
	#pinion>view:nth-child(2){flex-direction: column;width:100%;color: #CCCCCC;}
	#pinion>view:nth-child(2)>view{height: 100upx;color: #CCCCCC;line-height: 100upx;width: 90%;margin: 20upx 5%; border: 2px solid #eee;border-radius: 4px;;}
	#pinion>view:nth-child(2)>view input{width: 100%;height: 100upx;line-height: 100upx;margin:auto 0;padding-left: 20upx;;}
	#pinion>view:nth-child(3){color: #CCCCCC;width: 90%;margin: 20upx 5% 160upx 5%;border: 2px solid #eee;border-radius: 4px;}
	#pinion>view:nth-child(3)>textarea{padding: 20upx;}
	#pinion>view:nth-child(4){position:fixed;bottom: 40upx;width: 80%;margin: 0 10%;border-radius: 4px;}
	#pinion>view:nth-child(4)>button{background-color: #8bce8c;color: #fff;}
	
</style>
