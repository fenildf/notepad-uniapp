<!--
 * @Description: 悬浮菜单展示
 * @Version: 1.0.0
 * @Autor: hch
 * @Date: 2020-08-15 22:03:28
 * @LastEditors: hch
 * @LastEditTime: 2020-08-15 22:12:02
-->
<template>
	<view class="content">
		<hch-menu></hch-menu>
	</view>
</template>

<script>
import HchMune from '../../components/hch-menu/hch-menu.vue'
	export default {
		components: {
			HchMune
		},
		data() {
			return {
				}
		},
		computed: {
		},
		onLoad(){
			
		},
		onReady(){
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
page{
  position: absolute;
  background-color:$uni-color-primary;
  padding:0;
  margin: 0;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
}


</style>
