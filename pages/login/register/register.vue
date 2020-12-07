<template>
	<view>
		<view class="input-box">
			<view class="input-item">
				<view class="input-label">用户昵称</view>
				<view class="input-body">
					<input v-model="userName" maxlength="11" style="margin-right: 160upx;" placeholder="请输入用户昵称" class="input">
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">手机号</view>
				<view class="input-body">
					<input v-model="phone" maxlength="11" type="number" style="margin-right: 160upx;" placeholder="请输入手机号" class="input">
					<!-- <button :disabled="!isCanSendCode" class="btn-code" @click="sendCode">{{sendMsg}}</button> -->
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">密码</view>
				<view class="input-body">
					<input v-model="password" type="text" :password="isHidePassword?true:false" style="margin-right: 50upx;"
					 placeholder="请输入密码" maxlength="20" class="input" />
					<image @click="isHidePasswordClick" class="eye" :src="isHidePassword?'/static/login/attention.png':'/static/login/attention_forbid.png'"></image>
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">确认密码</view>
				<view class="input-body">
					<input v-model="rePassword" type="text" :password="isHidePassword?true:false" style="margin-right: 50upx;"
					 placeholder="请输入密码" maxlength="20" class="input" />
					<image @click="isHidePasswordClick" class="eye" :src="isHidePassword?'/static/login/attention.png':'/static/login/attention_forbid.png'"></image>
				</view>
			</view>
		</view>
		<button class="button" @click="submit">注册</button>
	</view>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	let timer = '';
	import {
		checkPhone,
		checkPwd,
		checkCode
	} from "@/common/common.js"
	export default {
		data() {
			return {
				sendMsg: "发送验证码",
				isCanSendCode: true,
				isHidePassword: true,
				phone: "",
				password: "",
				rePassword: "",
				code: ""
			};
		},
		onLoad() {},
		methods: {
			...mapActions('user', ['register']),
			isHidePasswordClick() {
				this.isHidePassword = !this.isHidePassword
			},
			setCodeInterval() {
				//设置验证码重新发送定时器
				let time = 60;
				clearInterval(timer);
				timer = setInterval(() => {
					time--;
					this.isCanSendCode = false;
					this.sendMsg = time + "s"
					if (time <= 0) {
						this.isCanSendCode = true;
						this.sendMsg = "重新获取";
						clearInterval(timer);
					}
				}, 1000)
			},
			clearCodeInterval() {
				clearInterval(timer);
				this.codemsg = "获取验证码";
			},
			sendCode() {
				//发送验证码
				if (!checkPhone(this.phone)) {
					return
				}
				this.setCodeInterval();
				/*
				 * 发送验证码逻辑
				 */
			},
			submit() {
				if(!this.userName) {
					uni.showToast({
						icon:'none',
						title:'请输入用户昵称'
					})
					return;
				}
				if (!checkPhone(this.phone)) {
					return;
				};
				if (!checkPwd(this.password)) {
					return;
				};
				if (this.password != this.rePassword) {
					uni.showToast({
						icon:'none',
						title:'两次密码不一致'
					})
					return;
				}
				this.register({phone: this.phone, password: this.password, userName: this.userName})
				/*
				 * 注册逻辑
				 */
				// this.$store.commit('update', ['isLogin', true]);
				// uni.reLaunch({
				// 	url: '/pages/index/index'
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	/*每个页面公共css */
	button::after {
		border: none;
	}

	.input-box {
		padding: 50upx;
		font-size: 30upx;

		.input-item {
			display: flex;
			background: white;
			border-bottom: 1upx solid #eeeeee;
			line-height: 100upx;
			height: 100upx;
			padding-left: 30rpx;
			padding-right: 30rpx;

			.input-label {
				width: 150upx;
			}

			.input-body {
				position: relative;
				height: 100upx;
				width: calc(100% - 150upx);

				.input {
					line-height: 100upx;
					height: 100upx;
					position: relative;
					font-size: 28upx;
				}

				.eye {
					position: absolute;
					height: 50upx;
					width: 50upx;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}

				.btn-code {
					position: absolute;
					right: 0upx;
					top: 50%;
					transform: translateY(-50%);
					background: none;
					color: #205592;
					width: 160upx;
					font-size: 24upx;
					box-sizing: border-box;
					text-align: right;
					padding: 0;
					height: 100upx;
					line-height: 100upx;
				}
			}

		}

		.select {
			padding-top: 40upx;
			display: flex;
			justify-content: space-between;
			color: #003B67;
		}
	}

	.button {
		background: #08B6F2;
		border-radius: 30upx;
		line-height: 80upx;
		height: 80upx;
		color: white;
		font-size: 32upx;
	}
</style>
