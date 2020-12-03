<template>
	<view class="container">
		<view>
			<view class="title">笔记名称：</view>
			<input class="uni-input" focus placeholder="请输入笔记名称" />
		</view>
		<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady"></editor>
		<suspend-menu :micon1="micon1" :micon2="micon2" :micon3="micon3" @click="iconClick"></suspend-menu>
	</view>
</template>

<script>
	import suspendMenu from '@/components/suspend-menu/suspend-menu.vue'
	export default {
		data() {
			return {
				placeholder: '开始输入...',
				micon1: {
					show: true,
					type: 'checkbox-filled'
				},
				micon2: {
					show: true,
					type: 'undo-filled'
				},
				micon3: {
					show: true,
					type: 'clear'
				}
			}
		},
		components: {
			suspendMenu
		},
		methods: {
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			undo() {
				this.editorCtx.undo()
			},
			iconClick(index) {
				if (index == 1) {
					this.undo();
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		padding: 10px;

		.uni-input {
			margin-top: 10rpx;
			margin-bottom: 30rpx;
			font-size: 32rpx;
		}
	}

	#editor {
		width: 700upx;
		height: 1000rpx;
		background-color: #CCCCCC;
		font-size: 32rpx;
		border-radius: 10rpx;
		padding: 30rpx;
		line-height: 50rpx;
	}
</style>
