<template>
	<view class="index">
		<view class="shares">
			<block v-for="value in data" :key="value.id">
				<view class="share" @tap="goList(value)">
					<view class="count-span">
						<br style="height: 22rpx;">
						<span class="share-text">成员：9</span>
						<br>
						<span class="share-text">笔记：88</span>
					</view>
					<text class="share-text">{{ value.type }}</text>
				</view>
			</block>
			<view class="share" @click="addShareView">
				<view class="count-span add-count-span">
					<uni-icons type="plusempty" size="40" color="#ffffff"></uni-icons>
				</view>
				<text class="share-text">新增共享组</text>
			</view>

			<s-popup position="center" v-model="visible">
				<view class="popup-view">
					<label class="popup-label">添加共享组</label>
					<input class="uni-input" focus :value="popupVal" placeholder="添加共享组名称"></input>
					<button>确认</button>
				</view>
			</s-popup>

		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import sPopup from '@/components/s-popup/index.vue';

	let index = 0;
	export default {
		data() {
			return {
				visible: false,
				popupVal: '',
				data: [{
						type: '动物',
						id: index++,
						types: 1,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '风景',
						id: index++,
						types: 2,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '建筑',
						id: index++,
						types: 3,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '美女',
						id: index++,
						types: 4,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '汽车',
						id: index++,
						types: 5,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '运动',
						id: index++,
						types: 6,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '动物',
						id: index++,
						types: 1,
						icon: 'http://placehold.it/150x150'
					},
					{
						type: '风景',
						id: index++,
						types: 2,
						icon: 'http://placehold.it/150x150'
					}
				]
			};
		},
		components: {
			uniIcons,
			sPopup
		},
		methods: {
			goList(value) {
				uni.navigateTo({
					url: '/pages/share/detail/detail?id=' + 2
				});
			},
			addShareView() {
				this.visible = true;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.shares {
		background: #fff;
		flex: 1;
		width: 740upx;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-content: flex-start;
		display: flex;

		.share {
			display: block;
			width: 180upx;
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
