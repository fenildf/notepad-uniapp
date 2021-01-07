<template>
	<view>
		<view class="text">
			<rich-text v-html="note.content"></rich-text>
		</view>

		<view class="add-wrap" hover-class="plus-hover" v-if="!options.disabled">
			<uni-icons type="compose" size="30" color="#4a4a4a" @click="gotoEdit"></uni-icons>
		</view>

	</view>

</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				note: {
					content: '内容记载中...'
				},
				options: {}
			}
		},
		components: {
			uniIcons
		},
		onLoad(options) {
			this.options = options
			uni.setNavigationBarTitle({
				title: options.noteName
			});
			this.getNote()
		},
		mounted() {},
		methods: {
			// 编辑
			gotoEdit() {
				uni.navigateTo({
					url: '/pages/note/edit/edit?noteId=' + this.options.noteId
				})
			},
			getNote() {
				this.$api.getNote(this.options.noteId).then(res => {
					this.note = res;
				})
			}
		}
	}
</script>

<style scoped>
	.text {
		min-height: 100vh;
		padding: 20rpx 30rpx;
		background: #e4cba3;
		font-size: 32rpx;
		line-height: 60rpx;
		white-space: pre;
	}

	.add-wrap {
		position: fixed;
		bottom: 120upx;
		display: flex;
		width: 100%;
		left: 80%;
	}
</style>
