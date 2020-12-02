<template>
	<view class="catalog">
		<simple-slide-list :list="list" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod"></simple-slide-list>

		<view class="add-wrap" hover-class="plus-hover">
			<uni-icons type="plus" size="45" color="#79ffeb" @click="addCatalog"></uni-icons>
		</view>

		<s-popup position="center" v-model="visible">
			<view class="catalog-popup">
				<label class="catalog-label">笔记本名称</label>
				<input value="你才不是一个没有故事的女同学"></input>
				<button>确认</button>
			</view>
		</s-popup>

	</view>
</template>

<script>
	import simpleSlideList from "@/components/simple-slide-list/simple-slide-list.vue"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import sPopup from '@/components/s-popup/index.vue';

	export default {
		data() {
			return {
				visible: false,
				list: [{
						id: 1,
						image: '../../static/note/note.png',
						name: '的撒个娇汇顶科技'
					},
					{
						id: 2,
						image: '../../static/note/note.png',
						name: '家是件好事'
					},
					{
						id: 3,
						image: '../../static/note/note.png',
						name: '啊大大搭都是非常'
					}
				],
				buttonList: [{
						title: '重命名',
						background: '#78efa8'
					},
					{
						title: '删除',
						background: '#ff3b32'
					}
				]
			}
		},
		components: {
			simpleSlideList,
			uniIcons,
			sPopup
		},
		methods: {
			// 跳转笔记本笔记列表
			gotoContent() {
				console.log("跳转笔记本笔记列表")
				uni.navigateTo({
					url: '/pages/note/content/content'
				});
			},
			// 新增笔记本
			addCatalog() {
				console.log("新增笔记本")
			},
			changeMethod(data, button, index) {
				console.log('滑动按钮回调', data)
				console.log('滑动按钮回调', button)
				this.visible = true
			},
			clickMethod(data) {
				console.log('点击行回调', data)
				this.gotoContent()
			}
		}
	}
</script>

<style lang="scss" scoped>
	body {
		width: 750upx;
	}

	.catalog {
		margin-top: 80upx;
		display: inline-block;
	}

	.catalog-line {
		position: relative;
		overflow: hidden;
		width: 710upx;
		padding: 20upx 20upx 20upx 20upx;
		border-bottom: 3upx solid #f7f7f7;
	}

	.catalog-line-img {
		height: 55upx;
		width: 60upx;
		margin-right: 30upx;
	}

	.add-wrap {
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		justify-content: center;
	}

	.catalog-popup {
		width: 100%;
		height: 300upx;
		display: inline-block;
		text-align: center;
		line-height: 70upx;

		.catalog-label {
			font-weight: 500;
			color: #55b735;
		}

		input {
			margin-top: 50upx;
			margin-bottom: 50upx;
			font-size: 35upx;
		}
	}
</style>
