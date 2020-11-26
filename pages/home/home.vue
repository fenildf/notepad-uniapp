<template>
  <view id="home">
    <view class="home_head">
    	<view class="home_head_row">
	    	<view v-for="(item,index) in head" v-on:click="menu(index)">
	    		<text v-bind:class="{text_selection:index==current}">{{item.name}}</text>
	    	</view>
	    </view>
    </view>
	<view></view>
	<con-list></con-list>
  </view>
</template>

<script>
import conList from '@/pages/con_list/con_list';
export default {
  name: 'home',
  components: {
  	conList
  },
  data () {
    return {
    	current:0,//隐藏和显示0印象2不隐藏
      	head: [
	      	{
	      		name:"推荐",
	      	},{
	      		name:"最新",
	      	},{
	      		name:"最热",
	      	}
	      ]
    }
  },
  methods:{
  	menu:function(index){
  		this.current=index;
  	},
  	
  }
}
</script>
<style>
	body{width:750upx;}
	#home{width:750upx;}
	#home>view:nth-child(2){height: 80upx;width:750upx;;}
	#home .home_head{width:750upx;height:80upx;background-color: #aedcae;position: fixed;z-index: 1;;}
	#home .home_head_row{width: 750upx;height:80upx;padding: 0upx;margin: 0upx;align-items: center;justify-content: center;
		    line-height: 80upx;font-size: 20upx; background-color: #aedcae;color: #fff;}
	#home .home_head_row view{width: 33.33333%; margin: 0upx;padding: 0upx;float: left;font-family: unset;font-size:28upx;align-items: center;justify-content: center;}
	#home .home_head_row text{display: inline-block;padding:0 10upx;margin: 0 auto;}
	#home .text_selection{border-bottom: 4upx solid #6c946d;}
</style>
