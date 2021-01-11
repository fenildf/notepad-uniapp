<template>
	<view id="me">
		<view>
			<view class="user">
				<view class="user_img">
					<img :src="imgSrc"/>
				</view>
				<view class="user_info">
					<text class="user_name">{{mineData.userName}}</text>
					<view class="user_desc">
						<text class="vip">{{mineData.vipName}}</text>
						<text class="user_uid">点滴UID：{{mineData.uid}}</text>
					</view>
				</view>
			</view>
			<view class="my_service">
				<view class="clear">
					<view>
						<Icon type="fa-birthday-cake" size="50" class="icon-icon"></Icon>
						<text class="num-text">{{mineData.registerDays}}天</text>
					</view>
					<view>
						<Icon type="fa-book" size="50" class="icon-icon"></Icon>
						<text class="num-text">{{mineData.notebookNum}}本</text>
					</view>
					<view>
						<Icon type="fa-modx" size="50" class="icon-icon"></Icon>
						<text class="num-text">{{mineData.noteNum}}篇</text>
					</view>
					<view>
						<Icon type="fa-heart" size="50" class="icon-icon"></Icon>
						<text class="num-text">{{mineData.moodTimes}}次</text>
					</view>
				</view>
				<view class="clear"></view>
			</view>
			<view class="customer">
				<view @click="toSuggest()" class="customer_view">
					<text>意见反馈</text>
					<Icon type="fa-angle-right" size="50" class="icon-icon"></Icon>
				</view>
				<view class="customer_view" @click="toAbout()">
					<text>关于我们</text>
					<Icon type="fa-angle-right" size="50" class="icon-icon"></Icon>
				</view>
				<view class="customer_view" @click="toFollow()" v-if="mineData.vipGrade > 1">
					<text>开发者微信</text>
					<Icon type="fa-angle-right" size="50" class="icon-icon"></Icon>
				</view>
				<view class="customer_view" @click="toUsers()" v-if="mineData.vipGrade === 99">
					<text>用户管理</text>
					<Icon type="fa-angle-right" size="50" class="icon-icon"></Icon>
				</view>
				<view class="customer_view" @click="toNotebooks()" v-if="mineData.vipGrade === 99">
					<text>笔记本管理</text>
					<Icon type="fa-angle-right" size="50" class="icon-icon"></Icon>
				</view>
				<view class="customer_view" @click="toLogout()">
					<text>退出当前账号</text>
					<Icon type="fa-angle-right" size="50" class="icon-icon"></Icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Icon from '@/components/atom-awesome-icon/Icon.vue'
	import { toast } from '@/common/common.js'
	import { mapActions } from 'vuex'
	
	export default {
		name: 'me',
		data() {
			return {
				imgSrc: '../../static/me/head.png',
				mineData: {}
			}
		},
		components: {
			Icon
		},
		onLoad() {},
		mounted() {
			this.getMineData()
		},
		methods: {
			...mapActions('user', ['logout']),
			getMineData() {
				this.$api.getMineData().then(res => {
					this.mineData = res;
					if (this.mineData.avatarUrl) {
						this.imgSrc = this.mineData.avatarUrl
					}
				})
			},
			toSuggest() {
				uni.navigateTo({
					url: '/pages/me/suggest/suggest'
				});
			},
			toAbout() {
				uni.navigateTo({
					url: '/pages/me/about/about'
				});
				// uni.navigateTo({
				// 	url: '/pages/login/login'
				// });
			},
			toFollow() {
				uni.navigateTo({
					url: '/pages/me/follow/follow'
				});
			},
			toUsers() {
				uni.navigateTo({
					url: '/pages/me/user/user'
				});
			},
			toNotebooks() {
				uni.navigateTo({
					url: '/pages/me/notebook/notebook'
				});
			},
			toLogout() {
				this.logout().then(res => {
					uni.removeStorage({
						key: 'notepad-token',
						success() {
							toast('当前账号已退出')
							setTimeout(function() {
								uni.reLaunch({
									url: '/pages/login/login'
								})
							}, 1000);
						}
					})
				})
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.getMineData();
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			}
		}
	}
</script>

<style scoped lang="scss">
	body {
		width: 100%;
	}

	#me {
		width: 100%;
		background-color: #fff;
		margin: 0 auto;
	}

	#me>view {
		width: 100%;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.user {
		width: 90%;
		height: 120upx;
		padding: 20upx 5%;
		position: relative;
		display: flex;
		border-bottom: 10rpx solid #eeeeee;
	}

	.user>view {
		height: 100%;
	}

	.user_img {
		width: 20%;
		text-align: center;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.user_img img {
		height: 120upx;
		width: 120upx;
		align-items: center;
		margin: 0 auto;
		border-radius: 20upx;
	}

	.user_desc {
		line-height: 35rpx;
	}

	.user_info {
		width: 80%;
		flex-direction: column;
	}

	.user_info text {
		width: 80%;
		height: 60upx;
		padding-left: 4%;
		overflow: hidden;
		white-space: nowrap;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
	}

	.user_name {
		font-weight: bold;
		line-height: 80upx;
		font-size: 40upx;
	}

	.vip {
		font-size: 28upx;
		color: #ff8011;
		margin-right: 30rpx;
	}

	.user_uid {
		color: #ccc;
		font-size: 24upx;
		display: inline;
	}

	.my_service {
		width: 90%;
		padding: 40upx 5%;
		border-bottom: 10upx solid #eeeeee;
		flex-direction: column;
		position: relative;
	}

	.my_service>text {
		display: inline-block;
		font-size: 40upx;
		font-weight: bold;
		padding-bottom: 40upx;
	}

	.my_service>view {
		width: 100%;
	}

	.my_service>view>view {
		float: left;
		width: 25%;
		text-align: center;
		flex-direction: column;
	}

	.my_service>view>view>text {
		display: inline-block;
		padding: 10upx 0;
		width: 100%;
	}

	.my_service>view>view:first-child {
		color: #8bce8c;
	}

	.my_service>view>view:nth-child(2) {
		color: #00aaff;
	}

	.my_service>view>view:nth-child(3) {
		color: #f5bb1a;
	}

	.my_service>view>view:nth-child(4) {
		color: #e60000;
	}

	.num-text {
		font-size: 30rpx;
	}

	.clear {
		clear: both;
	}

	.customer {
		width: 90%;
		padding: 0 5%;
		flex-direction: column;
	}

	.customer .customer_view {
		height: 100upx;
		width: 100%;
		border-bottom: 4upx solid #eee;
		line-height: 100upx;
		flex-direction: row;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
	}

	.customer .icon-icon {
		position: fixed;
		right: 30upx;
		margin-top: 18rpx;
	}

	.customer .customer_view>text:first-child {
		font-size: 32upx;
	}
</style>
