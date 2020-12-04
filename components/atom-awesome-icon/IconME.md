##功能说明
-支持支持font awesome4.7.0原生图标，可以支持动画，翻转，放大等多种样式的列表
-图标大小支持rpx定义
-图标定义type兼容 String Array类型
-支持size color自定义
-支持stack图标嵌套
-具体使用规范参见http://www.fontawesome.com.cn/examples/
##示例代码
···
<template>
	<view class="mail-con">
		<Icon :type="type" size="36" color="red"></Icon>
		<Icon type="fa-spinner fa-3x" size="36" color="red"></Icon>
		<Icon type="fa-shield fa-3x"></Icon>
		<Icon type="fa-shield fa-border fa-5x"></Icon>
		<Icon type="fa-twitter fa-3x" size="36"></Icon>
		<Icon type="fa-twitter fa-3x fa-rotate-90"></Icon>
		<Icon type="fa-twitter fa-3x fa-rotate-180"></Icon>
		<Icon type="fa-twitter fa-3x fa-rotate-270"></Icon>
		<Icon type="fa-twitter fa-3x fa-flip-horizontal"></Icon>
		<Icon type="fa-twitter fa-3x fa-flip-vertical"></Icon>
		<Icon type="fa-twitter fa-3x fa-pull-left" size="36"></Icon>
		<Icon type="fa-twitter fa-3x fa-pull-right" size="36"></Icon>
		<Icon type="fa-spinner fa-spin fa-3x" size="36"></Icon>
		<Icon type="fa-spinner fa-spin fa-3x fa-fw" size="36"></Icon>
		<br>
		<br>
		<br>
		<br>
		<br>
		<Icon type="fa-stack">
			<Icon type="fa-square-o fa-stack-2x"></Icon>
			<Icon type="fa-twitter fa-stack-1x"></Icon>
		</Icon>
		<Icon type="fa-stack">
			<Icon type="fa-square fa-stack-2x"></Icon>
			<Icon type="fa-terminal fa-stack-1x fa-inverse"></Icon>
		</Icon>
		<Icon type="fa-stack">
			<Icon type="fa-camera fa-stack-1x"></Icon>
			<Icon type="fa-ban fa-stack-2x" color="#a94442"></Icon>
		</Icon>
	</view>
</template>

<script>
	import Icon from '../../../components/icon/Icon.vue'
	export default {
		components: {
			Icon
		},
		data () {
			return {
				type: ['fa-refresh', 'fa-spin']
			}
		}
	}
</script>

<style lang="less">

</style>

···
