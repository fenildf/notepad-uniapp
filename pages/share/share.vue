<template>
	<view class="index">
		<view class="shares">
			<block v-for="value in data" :key="value.id">
				<view class="share" @tap="goList(value)">
					<view class="count-span">
						<span class="share-text">成员：99</span>
						<br>
						<span class="share-text">笔记：88</span>
					</view>
					<text class="share-text">{{ value.type }}</text>
				</view>
			</block>
			<view class="share">
				<view class="count-span add-count-span">
					<uni-icons type="plusempty" size="40" color="#ffffff"></uni-icons>
				</view>
				<text class="share-text">新增共享组</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"

	let index = 0;
	export default {
		data() {
			return {
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
			uniIcons
		},
		methods: {
			goList(value) {
				console.log("121122121")
				uni.navigateTo({
					url: '/pages/share/detail/detail?id=' + 2
				});
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

		.share {
			display: block;
			width: 180upx;
			height: 270upx;
			padding: 24upx;
			line-height: 60upx;
			box-sizing: border-box;
			text-align: center;
		}

		.count-span {
			background-color: #b7b5b5;
			display: inline-block;
			border-radius: 75rpx;
			height: 150rpx;
			width: 150rpx;
			line-height: 65rpx;
		}

		.add-count-span {
			line-height: 150rpx;
		}

		.share-text {
			font-size: 28upx;
			color: #555555;
		}
	}
</style>
