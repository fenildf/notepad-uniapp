<template>
	<view id="detail">
		<view class="detail_head">
			<view class="detail_head_row">
				<view v-for="(item,index) in head" v-on:click="menu(index)">
					<text v-bind:class="{text_selection:index==current}">{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="detail-content">
			<simple-slide-list v-show="current == 0" :list="members" :button="buttonList" :border="true" @click="memberClick"
			 @change="memberChange"></simple-slide-list>
			<simple-slide-list v-show="current == 1" :list="catalogs" :button="buttonList" :border="true" @click="catalogClick"
			 @change="catalogChange"></simple-slide-list>
		</view>
	</view>
</template>

<script>
	import simpleSlideList from "@/components/simple-slide-list/simple-slide-list.vue"
	export default {
		name: '',
		components: {
			simpleSlideList
		},
		data() {
			return {
				current: 0,
				head: [{
					name: "组员",
				}, {
					name: "记事本",
				}, {
					name: "设置",
				}],
				buttonList: [{
					title: '删除',
					background: '#ff3b32'
				}],
				members: [{
						id: 1,
						image: '../../static/share/member.png',
						name: '的撒个娇汇顶科技'
					},
					{
						id: 2,
						image: '../../static/share/member.png',
						name: '家是件好事'
					},
					{
						id: 3,
						image: '../../static/share/member.png',
						name: '啊大大搭都是非常'
					}
				],
				catalogs: [{
						id: 1,
						image: '../../static/share/daily.png',
						name: '的撒个娇汇顶科技'
					},
					{
						id: 2,
						image: '../../static/share/daily.png',
						name: '家是件好事'
					},
					{
						id: 3,
						image: '../../static/share/daily.png',
						name: '啊大大搭都是非常'
					}
				],
			}
		},
		onLoad(data) {
			console.log('获取到id:' + data.id);
		},
		methods: {
			menu(index) {
				this.current = index;
				console.log(index)
			},
			memberChange(data, button, index) {
				console.log('滑动按钮回调', data)
				console.log('滑动按钮回调', button)
				this.visible = true
			},
			memberClick(data) {
				console.log('点击行回调', data)
				this.gotoContent()
			},
			catalogChange(data, button, index) {
				console.log('滑动按钮回调', data)
				console.log('滑动按钮回调', button)
				this.visible = true
			},
			catalogClick(data) {
				console.log('点击行回调', data)
				this.gotoContent()
			}
		}
	}
</script>
<style scoped>
	body {
		width: 750upx;
	}

	#detail {
		width: 750upx;
	}

	#detail .detail_head {
		width: 750upx;
		height: 80upx;
		background-color: #aedcae;
		position: fixed;
		z-index: 1;
	}

	#detail .detail_head_row {
		width: 750upx;
		height: 80upx;
		padding: 0upx;
		margin: 0upx;
		align-items: center;
		justify-content: center;
		line-height: 80upx;
		font-size: 20upx;
		background-color: #aedcae;
		color: #fff;
	}

	#detail .detail_head_row view {
		width: 33.33%;
		margin: 0upx;
		padding: 0upx;
		float: left;
		font-family: unset;
		font-size: 28upx;
		align-items: center;
		justify-content: center;
	}

	#detail .detail_head_row text {
		display: inline-block;
		padding: 0 10upx;
		margin: 0 auto;
	}

	#detail .text_selection {
		border-bottom: 4upx solid #6c946d;
	}

	.detail-content {
		margin-top: 80upx;
		display: inline-block;
	}
</style>
