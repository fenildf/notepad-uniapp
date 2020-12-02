<template>
	<view class="container">
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

<style scoped>
	.container {
		padding: 10px;
	}

	#editor {
		width: 700upx;
		height: 100%;
		background-color: #CCCCCC;
	}
</style>
