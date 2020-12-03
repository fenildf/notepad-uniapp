<template>
	<view>
		<view class="mood">
			<tale-calendar name="calendar" :defaultTime="time" :extraData="extraData"></tale-calendar>
		</view>
		<view class="collapse-view">
			<uni-collapse accordion="true">
				<uni-collapse-item title="今日份小心情" thumb="../../static/mood/stxy.png">
					<view class="item-view">
						<view class="item-text">
							今日还未添加心情，点击添加。
						</view>
						<view class="icon-view">
							<uni-icons type="plus" size="25" color="#4ea8f1"></uni-icons>
						</view>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="这一天的记事本" thumb="../../static/mood/rhyl.png">
					<view class="item-view">
						折叠内容主体，可自定义内容及样式
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	import taleCalendar from "@/components/tale-calendar/tale-calendar.vue"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				time: {},
				extraData: [{
						date: '2020-12-1',
						value: '心情',
						dot: true,
						active: true
					},
					{
						date: '2020-12-2',
						value: '记事本',
						dot: true,
						active: false
					},
					{
						date: '2020-12-3',
						value: '心情\r\n记事本',
						dot: true,
						active: true
					}
				]
			}
		},
		components: {
			taleCalendar,
			uniCollapse,
			uniCollapseItem,
			uniIcons
		},
		created() {
			let now = new Date();
			this.time = {
				year: now.getFullYear(),
				month: now.getMonth()
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	body {
		width: 750upx;
	}

	.mood {
		width: 750upx;
	}

	.collapse-view {
		.item-view {
			margin-bottom: 10px;
		}

		.icon-view {
			position: fixed;
			right: 30rpx;
			bottom: 16rpx;
		}

		.item-text {
			margin-left: 20rpx;
			font-size: 30rpx;
			margin-top: 10rpx;
		}
	}
</style>
