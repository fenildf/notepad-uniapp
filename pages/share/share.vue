<template>
	<view class="index">
		<view class="shares">
			<block v-for="item in shares" :key="item.id">
				<view class="share" @tap="viewDetail(item.id)">
					<view class="count-span">
						<br style="height: 22rpx;">
						<span class="share-text">成员 {{item.memberNum}}</span>
						<br>
						<span class="share-text">笔记本 {{item.notebookNum}}</span>
					</view>
					<text class="share-text share-name">{{ item.name }}</text>
				</view>
			</block>

			<view class="share" @click="addShareView">
				<view class="count-span add-count-span">
					<uni-icons type="plusempty" size="40" color="#ffffff"></uni-icons>
				</view>
				<text class="share-text">新增共享组</text>
			</view>

			<s-popup position="center" v-model="visible">
				<view class="popup-view" v-if="visible">
					<label class="popup-label">添加共享组</label>
					<input class="uni-input" focus v-model="share.name" placeholder="请输入共享组名称" maxlength="8"></input>
					<button @click="addShare">确认</button>
				</view>
			</s-popup>

		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import sPopup from '@/components/s-popup/index.vue';
	import { toast } from '@/common/common.js'

	let index = 0;
	export default {
		data() {
			return {
				visible: false,
				popupVal: '',
				shares: [],
				share: {}
			};
		},
		components: {
			uniIcons,
			sPopup
		},
		onLoad() {
			this.getShareList();
		},
		methods: {
			// 获取共享组
			getShareList() {
				this.$api.getShareList().then(res => {
					this.shares = res;
				})
			},
			// 查看共享组详情
			viewDetail(shareId) {
				uni.navigateTo({
					url: '/pages/share/detail/detail?shareId=' + shareId
				});
			},
			// 新增共享组弹框
			addShareView() {
				this.visible = true;
			},
			// 新增共享组
			addShare() {
				if (!this.share.name) {
					toast("请输入共享组名称")
					return;
				}
				this.$api.saveShare(this.share).then(res => {
					this.visible = false;
					this.share = {}
					this.getShareList();
				})
			},
			// 下拉刷新
			onPullDownRefresh() {
				this.getShareList();
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.shares {
		background: #fff;
		flex: 1;
		width: 750upx;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-content: flex-start;
		display: flex;

		.share {
			display: block;
			width: 186upx;
			height: 270upx;
			padding: 24upx;
			box-sizing: border-box;
			text-align: center;
		}

		.count-span {
			background-color: #b7b5b5;
			display: inline-block;
			border-radius: 75rpx;
			height: 150rpx;
			width: 150rpx;
		}

		.add-count-span {
			line-height: 150rpx;
		}

		.share-text {
			font-size: 28upx;
			color: #555555;
		}

		.share-name {
			color: #0897fd;
			display: inline-flex;
		}

		.popup-view {
			width: 100%;
			height: 300upx;
			display: inline-block;
			text-align: center;
			line-height: 70upx;

			.popup-label {
				font-weight: 500;
				color: #55b735;
			}

			input {
				margin-top: 50upx;
				margin-bottom: 50upx;
				font-size: 35upx;
				width: 80%;
				margin-left: 10%;
			}
		}
	}
</style>
