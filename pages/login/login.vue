<template>
	<view class="width100">
		<view class="width100" :style="{'height': windowHeight*.5+'px'}">
			<view v-if="loginType==loginTypeObj.thirdParty.value" class="fadIn">
				<view class="view_Title_Middel" :style="{'font-size':windowHeight*.024+'px', 'padding':windowHeight*.015+'px 0'}">
					{{loginTypeObj.thirdParty.name}}
				</view>
				<!-- #ifdef APP-PLUS -->
				<view class="width100 flex_row_c_c" :style="{'height':windowHeight*.2+'px'}">
					<view class="flex_column_c_c" :style="{'padding':windowHeight*.01+'px 0', 'width': windowWidth*.25+'px', 'font-size':windowHeight*.022+'px'}"
					 @tap="wxlogin('weixin');">
						<image src="../../static/login/wx-login.jpeg" mode="widthFix" :style="{'width':windowWidth*.2+'px', 'margin-bottom':windowHeight*.02+'px'}"></image>
						微信登陆
					</view>
				</view>
				<!-- #endif -->

				<!-- #ifdef MP-WEIXIN -->
				<view class="flex_column_none_c" :style="{'padding':windowHeight*.02+'px 0'}">
					<image src="../../static/login/wx-login.jpeg" :style="{'height':windowHeight*.2+'px','width':windowHeight*.2+'px', 'margin':windowHeight*.02+'px 0'}"></image>
					<button type="primary" open-type="getUserInfo" @getuserinfo="WX_MP_getuserinfo" class="wx-login-btn">微信授权登录</button>
				</view>
				<!-- #endif -->
			</view>
			<view class="flex_column_c_c fadIn width100" v-else-if="loginType==loginTypeObj.password.value">
				<view class="view_Title_Middel" :style="{'font-size':windowHeight*.024+'px', 'padding':windowHeight*.015+'px 0'}">
					{{loginTypeObj.password.name}}
				</view>
				<view class="flex_row_c_c fontColorADADAD width100 box-sizing-border-box" :style="{'margin-top':windowHeight*.02+'px', 'font-size': windowHeight*.021+'px', 'padding': windowHeight*.01+'px ' + windowWidth*.1+'px'}">
					<view class="flex_row_e_c FlexPoint5">
						手机号:
					</view>
					<view class="flex_row_none_c Flex1Point5 width100" :style="{'margin-left': windowWidth*.03+'px'}">
						<view class="flex_row_none_c width100" :class="account_accountNum_focus?'input_view_item_active':'input_view_item'">
							<input type="text" value="" v-model="account_accountNum" @focus="account_accountNum_focus_changeFc" @blur="account_accountNum_blur_changeFc"
							 :style="{'margin-left':windowWidth*.03+'px', 'height':windowHeight*.05+'px', 'font-size':windowHeight*.026+'px'}" />
							<view v-if="account_accountNum" class="Flex1" @tap="clear_account_accountNum" :style="{'padding':windowHeight*.01+'px'}">
								<uni-icons type="clear" color="#adadad" :pxSize="windowHeight*.026" />
							</view>
						</view>
					</view>
				</view>
				<view class="flex_row_c_c fontColorADADAD width100 box-sizing-border-box" :style="{'margin-top':windowHeight*.03+'px', 'font-size':windowHeight*.021+'px', 'padding':windowHeight*.01+'px ' + windowWidth*.1+'px'}">
					<view class="flex_row_e_c FlexPoint5">
						密码:
					</view>
					<view class="flex_row_none_c Flex1Point5 width100" :style="{'margin-left':windowWidth*.03+'px'}">
						<view class="flex_row_none_c width100" :class="account_password_focus?'input_view_item_active':'input_view_item'">
							<input type="text" value="" :password="passwordShow" v-model="account_password" @focus="account_password_focus_changeFc"
							 @blur="account_password_blur_changeFc" :style="{'margin-left':windowWidth*.03+'px', 'height':windowHeight*.05+'px', 'font-size':windowHeight*.026+'px'}" />
							<view v-if="account_password" class="Flex1" :style="{'padding':windowHeight*.01+'px'}" @tap="show_password">
								<uni-icons type="eye" :color="passwordShow?'#adadad':'#33CC33'" :pxSize="windowHeight*.026" />
							</view>
							<view v-if="account_password" class="Flex1" :style="{'padding':windowHeight*.01+'px'}" @tap="clear_account_password">
								<uni-icons type="clear" color="#adadad" :pxSize="windowHeight*.026" />
							</view>
						</view>
					</view>
				</view>
				<view class="flex_row_between_c width100" :style="{'margin-top':windowHeight*.05+'px', 'padding': windowHeight*.03+'px 0'}">
					<button type="default" class="account_btn" @tap="openWin()">注册</button>
					<button type="primary" class="flex_row_c_c account_btn account_login_btn" @tap="account_loginFc">登录</button>
				</view>
			</view>
		</view>
		<view class="flex_row_c_c box-sizing-border-box" :style="{'padding':windowHeight*.01+'px ' + windowWidth*.03+'px'}">
			<view class="Flex1 flex_row_c_c" :style="{'margin':windowHeight*.02+'px '+windowWidth*.03+'px', 'font-size':windowHeight*.02+'px'}"
			 :class="loginType==loginTypeObj.password.value?'fontColor33CC33 fontWeight':'fontColorADADAD'">
				{{loginTypeObj.password.name}}
			</view>
			<switch :checked="loginType==loginTypeObj.thirdParty.value?true:false" @change="loginTypeChange" type="switch" color="#33CC33"
			 class="FlexPoint5 flex_row_c_c" />
			<view class="Flex1 flex_row_c_c" :style="{'margin':windowHeight*.02+'px '+windowWidth*.03+'px', 'font-size':windowHeight*.02+'px'}"
			 :class="loginType==loginTypeObj.thirdParty.value?'fontColor33CC33 fontWeight':'fontColorADADAD'">
				{{loginTypeObj.thirdParty.name}}(推荐)
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import { mapGetters, mapActions } from 'vuex';
	export default {
		data() {
			return {
				// #ifdef APP-PLUS
				auths: {},
				readyLogin: false,
				// #endif
				loginTypeObj: {
					thirdParty: {
						name: '第三方登录',
						value: 'thirdParty'
					},
					password: {
						name: '帐号密码登录',
						value: 'password'
					}
				},
				loginType: 'thirdParty',
				account_accountNum: '',
				account_password: '',
				account_accountNum_focus: false,
				account_password_focus: false,
				passwordShow: true,
				windowHeight: Number,
				windowWidth: Number
			};
		},
		created() {
			let system = uni.getSystemInfoSync();
			this.windowHeight = system.windowHeight;
			this.windowWidth = system.windowWidth;
		},
		methods: {
			...mapActions('user', ['login']),
			// #ifdef APP-PLUS
			wxlogin(type) {
				let _this = this;
				if (!_this.readyLogin) {
					uni.showToast({
						title: '还没准备好，请稍候'
					});
					return;
				}
				//app微信登录方法

			},
			// #endif
			// #ifdef MP-WEIXIN
			WX_MP_getuserinfo(e) {
				var that = this
				// 获取用户名  获取性别 获取头像 获取js_code去换取后台返回的openID
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let js_code = loginRes.code; //js_code可以给后台获取unionID或openID作为用户标识
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								//infoRes里面有用户信息需要的话可以取一下
								let username = infoRes.userInfo.nickName; //用户名
								let gender = infoRes.userInfo.gender; //用户性别
								let avatarUrl = infoRes.userInfo.avatarUrl; //头像
								//判断是否授权
								uni.getSetting({
									success(res) {
										console.log("授权：", res);
										if (!res.authSetting['scope.userInfo']) {
											//这里调用授权
											console.log("当前未授权");
										} else {
											//用户已经授权过了
											console.log("当前已授权");
											// 弹出正在登录的弹框
											uni.showLoading({
												mask: true,
												title: '正在登录···',
												complete: () => {}
											});
											// 判断已授权调取接口并获取openId
											that.$apiReq.req({ // 创建对象
												url: '/ui/wxutil/loginByWx', // 示例请求路径
												method: "post",
												data: {
													'code': js_code,
												},
												success: (res) => {
													//需要openId 可以在这里打印出来
													if (res.data.code == 202) {
														// 登录成功后判断是否是第一次注册  如果是弹出选择身份页面
														uni.navigateTo({
															url: './registeredIdentity/registeredIdentity',
															success: res => {},
															fail: () => {},
															complete: () => {}
														});
													} else if (res.data.code == 201) {
														//跳转
														uni.switchTab({
															url: '../homePage/homePage',
															success: res => {},
															fail: () => {},
															complete: () => {}
														});
													}
												},
											})

										}
									}
								})
							},
							fail: function(res) {}
						})
					},
					fail: function(res) {}
				})

				//微信小程序微信登录方法
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						console.log(loginRes);
					}
				});

				uni.getUserInfo({
					success: (res) => {
						this.userInfo = res.userInfo;
						console.log(this.userInfo);
						uni.showToast({
							title: this.userInfo
						});
					},
					fail: () => {
						uni.showToast({
							title: '授权失败'
						});
						console.log("未授权");
					}
				})
			},
			// #endif

			loginTypeChange(e) {
				if (e.detail.value) {
					this.loginType = this.loginTypeObj.thirdParty.value;
					this.account_accountNum_blur_changeFc();
					this.account_password_blur_changeFc();
				} else {
					this.loginType = this.loginTypeObj.password.value;
				}
			},
			account_accountNum_focus_changeFc(e) {
				this.account_accountNum_focus = true;
			},
			account_accountNum_blur_changeFc(e) {
				this.account_accountNum_focus = false;
			},
			account_password_focus_changeFc(e) {
				this.account_password_focus = true;
			},
			account_password_blur_changeFc(e) {
				this.account_password_focus = false;
			},
			account_loginFc() {
				//账号密码登录方法
				if (!this.account_accountNum || !this.account_password) {
					uni.showToast({
						title: '账号或密码错误'
					})
					return;
				}
				this.login({
					userCode: this.account_accountNum,
					password: this.account_password
				}).then(res => {
					uni.showToast({
						title: '登录成功'
					});
					//进入点滴页面
					uni.switchTab({
						url: '/pages/note/note'
					});
				})
			},
			clear_account_accountNum() {
				this.account_accountNum = '';
			},
			show_password() {
				this.passwordShow = !this.passwordShow;
			},
			clear_account_password() {
				this.account_password = '';
				this.passwordShow = true;
			},
			openWin() {
				//进入注册页面方法
				uni.navigateTo({
					url: '/pages/login/register/register'
				});
			}
		},
		onLoad() {
			let _this = this;
			// #ifdef APP-PLUS
			plus.oauth.getServices(function(services) {
				for (let i in services) {
					let service = services[i];
					_this.auths[service.id] = service;
				}
				_this.readyLogin = true;
			}, function(e) {
				_app.showToast("获取登录认证失败：" + e.message);
			});
			// #endif

		},
		components: {
			uniIcons
		}
	}
</script>

<style scoped="true">
	.input_view_item {
		width: 80%;
		border-bottom: 1px solid #adadad;
	}

	.input_view_item_active {
		width: 80%;
		border-bottom: 1px solid #33CC33;
	}

	.account_login_btn {
		background-color: #33CC33;
		color: white;
	}

	.account_login_btn:active {
		background-color: #40DE5A;
		color: white;
	}

	.wx-login-btn {
		width: 240upx;
		margin-top: 60upx;
		background-color: #33CC33;
	}

	.account_btn {
		width: 40%;
	}

	.width100 {
		width: 100%;
	}

	.width50 {
		width: 50%;
	}

	.width50vw {
		width: 50vw;
	}

	.width30 {
		width: 30%;
	}

	.width30vw {
		width: 30vw;
	}

	.height100 {
		height: 100%;
	}

	.height100vh {
		height: 100vh;
	}

	.backgroundColor-F2F2F2 {
		background-color: #f2f2f2;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.flex_column_c_c {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.flex_column_none_c {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.flex_column_e_c {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
	}

	.flex_row_none_c {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.flex_row_none_e {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
	}

	.flex_row_e_none {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.flex_row_c_none {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.flex_row_between_c {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.flex_column_between_c {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.flex_column_between_none {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.flex_column_between_e {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
	}

	.flex_column_e_none {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.flex_row_e_c {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}

	.flex_row_c_e {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: flex-end;
	}

	.flex_row_between_e {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
	}

	.Flex1 {
		flex: 1;
	}

	.FlexPoint5 {
		flex: .5;
	}

	.Flex1Point5 {
		flex: 1.5;
	}

	.Flex8 {
		flex: 8;
	}

	/* 新增 */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(.8);
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes refadeIn {
		from {
			transform: scale(1.2);
		}

		to {
			transform: scale(1);
		}
	}

	.fadIn {
		animation: fadeIn .2s 1;
	}

	.refadIn {
		animation: refadeIn .2s 1;
		animation-fill-mode: forwards;
	}

	.padding1vh {
		padding: 1vh;
	}

	.padding3vh0 {
		padding: 3vh 0;
	}

	.padding1vh3vw {
		padding: 1vh 3vw;
	}

	.padding1vh10vw {
		padding: 1vh 10vw;
	}

	.margin2vh3vw {
		margin: 2vh 3vw;
	}

	.marginTop5vh {
		margin-top: 5vh;
	}

	.marginTop3vh {
		margin-top: 3vh;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}

	.marginLeft3vw {
		margin-left: 3vw;
	}

	.box-sizing-border-box {
		box-sizing: border-box;
	}

	.fontWeight {
		font-weight: bold;
	}

	.fontSize2vh {
		font-size: 2vh;
	}

	.fontSize2Point1vh {
		font-size: 2.1vh;
	}

	.fontColorADADAD {
		color: #ADADAD;
	}

	.fontColor33CC33 {
		color: #33CC33;
	}

	.view_Title_Middel {
		width: 100%;
		font-weight: bold;
		text-align: center;
		box-sizing: border-box;
	}
</style>
