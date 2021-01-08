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
			<simple-slide-list v-show="current === 0" :list="shareDetail.members" :button="buttonList" :border="true" @change="memberChange"></simple-slide-list>
			<simple-slide-list v-show="current === 1" :list="shareDetail.notebooks" :button="buttonList" :border="true" @click="catalogClick"
			 @change="catalogChange"></simple-slide-list>
			<setting ref="setting" v-show="current === 2" :shareId="options.shareId" @flush="getShare"></setting>
		</view>

	</view>
</template>

<script>
	import simpleSlideList from "@/components/simple-slide-list/simple-slide-list.vue"
	import setting from "./setting.vue"

	export default {
		components: {
			simpleSlideList,
			setting
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
					title: '移除',
					background: '#ff3b32'
				}],
				options: {},
				shareDetail: {
					share: {},
					members: [],
					notebooks: []
				}
			}
		},
		onLoad(options) {
			this.options = options;
			this.getShare();
		},
		methods: {
			menu(index) {
				this.current = index;
			},
			// 获取共享组详情
			getShare() {
				this.$api.getShare(this.options.shareId).then(res => {
					this.shareDetail = res
					this.shareDetail.members.forEach(item => {
						item.image = '../../static/share/member.png';
						item.name = item.userName + "（" + item.uid + "）";
					});
				})
			},
			// 移除成员
			memberChange(data, button, index) {
				this.$api.delShareMember(this.options.shareId, data.id).then(res => {
					this.getShare();
				})
			},
			// 移除笔记本
			catalogChange(data, button, index) {
				this.$api.delShareNotebook(this.options.shareId, data.id).then(res => {
					this.getShare();
					this.$refs.setting.getAllNotebook();
				})
			},
			// 笔记本详情
			catalogClick(data) {
				uni.navigateTo({
					url: '/pages/note/content/content?notebookId=' + data.id + "&notebookName=" + data.name
				});
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.getShare();
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
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
		text-align: center;
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
