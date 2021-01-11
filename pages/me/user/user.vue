<template>
	<view class="catalog">
		
		<k-scroll-view ref="k-scroll-view" :refreshType="scroll.refreshType" :refreshTip="scroll.refreshTip" :loadTip="scroll.loadTip"
		 :loadingTip="scroll.loadingTip" :emptyTip="scroll.emptyTip" :touchHeight="scroll.touchHeight" :height="scroll.height"
		 :bottom="scroll.bottom" :autoPullUp="scroll.autoPullUp" :stopPullDown="scroll.stopPullDown" @onPullDown="handlePullDown"
		 @onPullUp="handleLoadMore">
			<simple-slide-list :list="list" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod"></simple-slide-list>
		</k-scroll-view>
		
		<s-popup position="center" v-model="visible">
			<view class="catalog-popup">
				<label class="catalog-label">用户信息</label>
				<view class="user-info">
					<span class="">用户名：{{user.userName}}</span>
					<span class="">点滴UID：{{user.uid}}</span>
					<span class="">会员等级：{{user.vipGrade}}</span>
					<span class="">手机号：{{user.phone}}</span>
					<span class="">登录账号：{{user.userCode}}</span>
				</view>
			</view>
		</s-popup>
		
	</view>
</template>

<script>
	import simpleSlideList from "@/components/simple-slide-list/simple-slide-list.vue"
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import sPopup from '@/components/s-popup/index.vue';
	import { toast } from '@/common/common.js'

	export default {
		data() {
			return {
				visible: false,
				user: {},
				list: [],
				page: {
					records: [],
					current: 1,
					size: 10
				},
				buttonList: [
					{
						title: '降低Vip',
						background: '#0fef43'
					},
					{
						title: '提升Vip',
						background: '#ff3b32'
					}
				],
				scroll: {
					refreshType: 'custom',
					refreshTip: '正在下拉',
					loadTip: '获取更多数据',
					loadingTip: '正在加载中...',
					emptyTip: '--我是有底线的--',
					touchHeight: 50,
					height: 0,
					bottom: 50,
					autoPullUp: true,
					stopPullDown: true,
				}
			}
		},
		components: {
			simpleSlideList,
			kScrollView,
			sPopup
		},
		mounted() {
			this.getUsers(1)
		},
		methods: {
			// 加载数据
			getUsers(pageNo) {
				this.$api.getUsers(pageNo).then(res => {
					this.page = res
					this.page.records.forEach(item => {
						item.image = '../../static/share/member.png';
						item.name = item.userName + "（" + item.uid + "）";
						item.num = item.vipGrade;
					});
					this.list = pageNo === 1 ? this.page.records : this.list.concat(this.page.records);
				});
			},
			changeMethod(data, button, index) {
				if (button.title === "降低Vip") {
					this.$api.downVip(data.id).then(res => {
						toast('降低Vip成功')
						this.getUsers(1)
					})
				} else if (button.title === "提升Vip") {
					this.$api.upVip(data.id).then(res => {
						toast('提升Vip成功')
						this.getUsers(1)
					})
				}
			},
			// 点击行
			clickMethod(data) {
				this.visible = true
				this.user = data
			},
			// 下拉刷新
			handlePullDown(stopLoad) {
				this.getUsers(1)
				stopLoad ? stopLoad() : '';
			},
			// 上拉加载
			handleLoadMore(stopLoad) {
				if (this.page.current < this.page.pages) {
					this.getUsers(++this.page.current)
					stopLoad ? stopLoad() : '';
				} else {
					stopLoad ? stopLoad({ isEnd: true }) : '';
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	body {
		width: 750upx;
	}

	.catalog {
		display: inline-block;
	}
	
	.catalog-popup {
		width: 100%;
		height: 430upx;
		display: inline-block;
		text-align: center;
		line-height: 70upx;
	
		.catalog-label {
			font-weight: 500;
			color: #55b735;
		}
		
		.user-info {
			display: grid;
			width: 700upx;
			font-size: 30upx;
		}
	}
</style>
