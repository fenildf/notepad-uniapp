<template>
	<view class="index">
		<view class="tags">
			<block v-for="value in data" :key="value.id">
				<view class="tag" @tap="goList(value)">
					<image class="tag-img" :src="value.icon"></image>
					<text class="tag-text">{{ value.type }}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
let index = 0;
export default {
	data() {
		return {
			data: [
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
	methods: {
		goList(value) {
			uni.navigateTo({
				url: '../list/list?type=' + value.type + '&id=' + value.types
			});
		}
	}
};
</script>

<style></style>
