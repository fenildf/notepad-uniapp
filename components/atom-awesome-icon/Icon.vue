<template>
	<!-- stack icon -->
	<view v-if="stackFlag" :class="iconClass">
		<slot></slot>
	</view>
	<!-- 自定义size,color-->
	<text v-else :style="iconStyle" :class="iconClass" @click="onClick"></text>
</template>

<script>
	export default {
		props: {
			// 支持font awesome4.7.0原生图标，可以支持动画，翻转，放大等多种样式的列表
			type: {
				type: [String, Array],
				required: true
			},
			color: {
				type: String,
				required: false
			},
			size: {
				type: [Number, String],
				required: false
			}
		},
		computed: {
			// icon type 兼容
			iconType () {
				if (Array.isArray(this.type)) {
					return this.type
				} else {
					return this.type.split(' ')
				}
			},
			// 是否stack图标
			stackFlag () {
				return this.iconType.indexOf('fa-stack') > -1
			},
			// icon class 列表
			iconClass () {
				if (this.stackFlag) {
					return this.iconType.join(' ')
				} else {
					return ['fa'].concat(this.iconType).join(' ')
				}
			},
			iconStyle () {
				let iconStyle = []
				if (this.color) {
					iconStyle.push('color:' + this.color)
				}
				if (this.size) {
					iconStyle.push('font-size:' + this.size + 'rpx')
				}
				return iconStyle.join(';')
			}
		},
		methods: {
			onClick () {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "./icon.min.css";
</style>
