<template>
	<view class="menu-content">
		<img class="menu icon" @click="this.openFlag = !this.openFlag" :class="{'menuOpen':openFlag}" src="/static/suspend-menu/menu.png"
		 alt="" srcset="">
		<uni-icons :type="micon1.type" v-show="micon1.show" size="35" color="#505050" @click="_micon(0)" class="icon" :class="{'open open1':openFlag}"></uni-icons>
		<uni-icons :type="micon2.type" v-show="micon2.show" size="35" color="#505050" @click="_micon(1)" class="icon" :class="{'open open2':openFlag}"></uni-icons>
		<uni-icons :type="micon3.type" v-show="micon3.show" size="35" color="#505050" @click="_micon(2)" class="icon" :class="{'open open3':openFlag}"></uni-icons>
		<uni-icons :type="micon4.type" v-show="micon4.show" size="35" color="#505050" @click="_micon(3)" class="icon" :class="{'open open4':openFlag}"></uni-icons>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		props: {
			micon1: {
				type: Object
			},
			micon2: {
				type: Object
			},
			micon3: {
				type: Object
			},
			micon4: {
				type: Object
			}
		},
		data() {
			return {
				openFlag: false, //是否展开菜单
			}
		},
		created() {
			if (!this.micon1 && !this.micon2 && !this.micon3 && !this.micon4) {
				this.micon1 = {
					show: true,
					type: 'compose'
				}
				this.micon2 = {
					show: true,
					type: 'checkbox-filled'
				}
			}
		},
		components: {
			uniIcons
		},
		methods: {
			_micon(index) {
				this.$emit('click', index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-content {
		.icon {
			position: fixed;
			bottom: 120rpx;
			right: 80rpx;
			width: 80rpx;
			height: 80rpx;
			opacity: 0;
			transform: rotate(0deg);
			transition: all 0.5s ease-out 0s;
		}

		.text-menu {
			width: 86rpx;
			height: 86rpx;
		}

		.menu {
			z-index: 1;
			opacity: 1;
		}

		.menuOpen {
			transform: rotate(180deg);
			animation-fill-mode: forwards;
			transition: all 0.5s ease-out 0s;
		}

		.open {
			opacity: 1;
			transform: rotate(360deg);
			animation-fill-mode: forwards;
			transition: all 0.5s ease-out 0s;
		}

		.open1 {
			right: 80rpx;
			bottom: 250rpx;
		}

		.open2 {
			right: 190rpx;
			bottom: 210rpx;
		}

		.open3 {
			right: 200rpx;
			bottom: 108rpx;
		}

		.open4 {
			right: 160rpx;
			bottom: 20rpx;
		}
	}
</style>
