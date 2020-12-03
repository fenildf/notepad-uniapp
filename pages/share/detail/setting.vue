<template>
	<view>
		<view class="">
			<button type="default" form-type="reset" @click="addMemberView()">
				<uni-icons type="personadd" size="20" class="btn-icon" color="#79ffeb"></uni-icons>添加成员
			</button>
			<picker @change="bindPickerChange" :value="index" :range="array">
				<button type="default" form-type="reset">
					<uni-icons type="map" size="20" class="btn-icon" color="#79ffeb"></uni-icons>添加笔记本
				</button>
			</picker>
			<button type="primary" form-type="reset">
				<uni-icons type="minus" size="20" class="btn-icon" color="#79ffeb"></uni-icons>移除全部成员
			</button>
			<button type="primary" form-type="reset">
				<uni-icons type="eye-slash" size="20" class="btn-icon" color="#79ffeb"></uni-icons>移除全部记事本
			</button>
			<button type="warn" form-type="reset">
				<uni-icons type="close" size="20" class="btn-icon" color="#79ffeb"></uni-icons>销毁当前共享组
			</button>

			<s-popup position="center" v-model="visible">
				<view class="setting-popup">
					<label class="setting-label">添加成员</label>
					<input class="uni-input" focus :value="popupVal" placeholder="请输入手机号码或者点滴记事本UID"></input>
					<button>确认</button>
				</view>
			</s-popup>

		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import sPopup from '@/components/s-popup/index.vue';
	export default {
		data() {
			return {
				visible: false,
				popupVal: '',
				array: ['中国', '美国', '巴西', '日本']
			}
		},
		components: {
			uniIcons,
			sPopup
		},
		methods: {
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
			},
			addMemberView() {
				this.visible = true;
			}
		}
	}
</script>

<style scoped lang="scss">
	button {
		margin-bottom: 30rpx;
		margin-top: 50rpx;
	}

	.note-select {
		display: none;
	}

	.btn-icon {
		margin-right: 10rpx;
	}

	.setting-popup {
		width: 100%;
		height: 300upx;
		display: inline-block;
		text-align: center;
		line-height: 70upx;

		.setting-label {
			font-weight: 500;
			color: #55b735;
		}

		input {
			margin-top: 50upx;
			margin-bottom: 50upx;
			font-size: 35upx;
			width: 80%;
			margin-left: 10%;
		}
	}
</style>
