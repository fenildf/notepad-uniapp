<template>
	<view>
		<view class="">
			<button type="default" form-type="reset" @click="addMemberView()">
				<uni-icons type="personadd" size="18" class="btn-icon" color="#79ffeb"></uni-icons>添加成员
			</button>
			<picker @change="bindPickerChange" :value="id" range-key="name" :range="notebooks">
				<button type="default" form-type="reset">
					<uni-icons type="map" size="18" class="btn-icon" color="#79ffeb"></uni-icons>添加笔记本
				</button>
			</picker>
			<button type="primary" form-type="reset" @click="removeMembers">
				<uni-icons type="minus" size="18" class="btn-icon" color="#79ffeb"></uni-icons>移除全部成员
			</button>
			<button type="primary" form-type="reset" @click="removeNotebooks">
				<uni-icons type="eye-slash" size="20" class="btn-icon" color="#79ffeb"></uni-icons>移除全部记事本
			</button>
			<button type="warn" form-type="reset" @click="remove">
				<uni-icons type="close" size="18" class="btn-icon" color="#79ffeb"></uni-icons>销毁当前共享组
			</button>

			<s-popup position="center" v-model="visible">
				<view class="setting-popup" v-if="visible">
					<label class="setting-label">添加成员</label>
					<input class="uni-input" focus v-model="uid" placeholder="请输入想要共享笔记的用户点滴UID" maxlength="16"></input>
					<button @click="addMember">确认</button>
				</view>
			</s-popup>

		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import sPopup from '@/components/s-popup/index.vue';
	import { toast } from '@/common/common.js'
	
	export default {
		props: {
			shareId: -1
		},
		data() {
			return {
				visible: false,
				uid: '',
				notebooks: []
			}
		},
		components: {
			uniIcons,
			sPopup
		},
		mounted() {
			this.getAllNotebook();
		},
		methods: {
			// 获取所有笔记本
			getAllNotebook(){
				this.$api.getNoteBookList(this.shareId).then(res => {
					this.notebooks = res;
				})
			},
			// 绑定笔记本
			bindPickerChange(e) {
				if(e.target && e.target.value) {
					let notebook = this.notebooks[e.target.value];
					if (notebook) {
						this.$api.bindShareNotebook(this.shareId, notebook.id).then(res => {
							toast("添加笔记本成功");
							this.getAllNotebook();
							this.flush();
						})
					}
				}
			},
			addMemberView() {
				this.visible = true;
			},
			// 添加成员
			addMember(){
				if (!this.uid) {
					toast("请输入想要共享笔记的用户点滴")
					return;
				}
				this.$api.bindShareMember(this.shareId, this.uid).then(res => {
					toast("添加成员成功");
					this.visible = false;
					this.flush();
				})
			},
			// 移除全部成员
			removeMembers() {
				let $this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定移除当前共享组下全部记事本吗？',
				    success: function (res) {
				        if (res.confirm) {
				            $this.$api.delShareMembers($this.shareId).then(res => {
								toast("移除全部成员成功");
				            	$this.flush();
				            })
				        }
				    }
				});
			},
			// 移除全部记事本
			removeNotebooks(){
				let $this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定移除当前共享组下全部成员吗？',
				    success: function (res) {
				        if (res.confirm) {
				            $this.$api.delShareNotebooks($this.shareId).then(res => {
								toast("移除全部记事本成功");
				            	$this.flush();
				            	$this.getAllNotebook();
				            })
				        }
				    }
				});
			},
			// 销毁共享组
			remove() {
				let $this = this;
				uni.showModal({
				    title: '提示',
				    content: '确定移除当前共享组下全部成员吗？',
				    success: function (res) {
				        if (res.confirm) {
				            $this.$api.delShare($this.shareId).then(res => {
				            	toast("销毁当前共享组成功");
				            	setTimeout(function() {
				            		$this.beforePage();
				            	}, 1000);
				            })
				        }
				    }
				});
			},
			flush() {
				this.$emit('flush')
			},
			// 返回上一页面
			beforePage() {
				let $this = this
				var pages = getCurrentPages(); // 当前页面
				var beforePage = pages[pages.length - 2]; // 前一个页面
				wx.navigateBack({
					success: function() {
						beforePage.onLoad();
					}
				});
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
