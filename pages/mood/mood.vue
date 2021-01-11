<template>
	<view v-if="showCal">
		
		<view class="mood">
			<tale-calendar name="calendar" :defaultTime="time" :extraData="extraData" @calendarTap="calendarTap"></tale-calendar>
		</view>

		<view class="collapse-view">
			<uni-collapse accordion="true">
				<uni-collapse-item title="今日份小心情" thumb="../../static/mood/stxy.png">
					<view class="item-view" @click="addMoodView" v-if="dayFlag === 0">
						<view class="item-text" v-html="moodContent"></view>
						<view class="icon-view" v-if="!todayMoodContent">
							<uni-icons type="plus" size="25" color="#4ea8f1"></uni-icons>
						</view>
					</view>
					<view class="item-view" v-if="dayFlag === 1 || dayFlag === -1">
						<view class="item-text" v-html="moodContent"></view>
					</view>
				</uni-collapse-item>
				<uni-collapse-item title="这一天的笔记" thumb="../../static/mood/rhyl.png">
					<view class="item-view">
						<view class="item-text-note" v-for="item in noteDatas" :key="item.noteId" @click="gotoText(item.noteId, item.name)">
							{{item.name}}
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>

		<s-popup position="center" v-model="visible">
			<view class="catalog-popup" v-if="visible">
				<label class="catalog-label">添加心情</label>
				<editor id="editor" class="edit-text" placeholder="请输入今日份心情..." @ready="onEditorReady" @input="inputChange"></editor>
				<!-- <input class="uni-input" focus v-model="mood.moodContent" placeholder="请输入今日份心情" maxlength="100"></input> -->
				<button @click="addMood">确认</button>
			</view>
		</s-popup>

	</view>
</template>

<script>
	import taleCalendar from "@/components/tale-calendar/tale-calendar.vue"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import sPopup from '@/components/s-popup/index.vue';
	import { toast } from '@/common/common.js'

	export default {
		data() {
			return {
				showCal: false, // 控制数据加载完再初始化
				time: {},
				dayFlag: 0,
				extraData: [],
				moodContent: '',
				noteDatas: [],
				todayMoodContent: '',
				visible: false,
				mood: {}
			}
		},
		components: {
			taleCalendar,
			uniCollapse,
			uniCollapseItem,
			uniIcons,
			sPopup
		},
		onLoad() {},
		created() {
			this.init();
			this.getMoodData();
		},
		methods: {
			init() {
				let now = new Date();
				this.time = {
					year: now.getFullYear(),
					month: now.getMonth()
				};
				this.dayFlag = 0;
			},
			// 获取心情数据
			getMoodData() {
				this.$api.getMoodData().then(res => {
					this.extraData = res.moodDatas;
					this.moodContent = this.showMood(res.todayMoodContent);
					this.todayMoodContent = res.todayMoodContent;
					this.noteDatas = res.todayNoteDatas;
					this.showCal = true;
				})
			},
			// 日记点击事件
			calendarTap(date, data) {
				this.checkDate(new Date(date.year, date.month, date.day));
				this.moodContent = this.showMood(data.moodContent);
				this.noteDatas = data.noteDatas;
			},
			// 校验时间
			checkDate(foday) {
				var d = new Date;
				var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
				if (foday > today) {
					this.dayFlag = 1
				} else if (foday < today) {
					this.dayFlag = -1
				} else {
					this.dayFlag = 0
				}
			},
			showMood(moodContent) {
				if (moodContent) {
					return moodContent;
				} else if (this.dayFlag === -1) {
					return "过去的这一天，你未留下任何心情。"
				} else if (this.dayFlag === 0) {
					return "今日还未添加心情，点击添加。"
				} else if (this.dayFlag === 1) {
					return "未来的这一天，又会是怎样的心情呢？"
				}
			},
			// 展示添加心情
			addMoodView() {
				this.visible = true
			},
			// 添加心情
			addMood() {
				if (this.mood.moodContent && this.mood.moodContent.trim()) {
					this.$api.saveMood({moodContent: this.mood.moodContent}).then(res => {
						this.visible = false;
						this.todayMoodContent = this.mood.moodContent
						this.moodContent = this.mood.moodContent
					});
				} else {
					toast("请输入今日份心情")
				}
			},
			// 查看详情
			gotoText(noteId, noteName) {
				uni.navigateTo({
					url: '/pages/note/text/text?noteId=' + noteId + '&noteName=' + noteName + "&edit=edit"
				});
			},
			onEditorReady() {
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
			},
			// 输入变化
			inputChange(e) {
				this.mood.moodContent = e.detail.html;
			},
		}
	}
</script>

<style lang="scss" scoped>
	body {
		width: 750upx;
	}

	.mood {
		width: 750upx;
	}

	.collapse-view {
		.item-view {
			margin-bottom: 10px;
		}

		.icon-view {
			position: fixed;
			right: 30rpx;
			bottom: 30rpx;
		}

		.item-text {
			margin-left: 50rpx;
			font-size: 30rpx;
			margin-top: 10rpx;
			min-height: 60rpx;
			margin-right: 50rpx;
		}

		.item-text-note {
			margin-left: 100rpx;
			font-size: 30rpx;
			margin-top: 10rpx;
			height: 60rpx;
			border-color: #adc4c5;
			border-bottom-width: 1px;
			border-bottom-style: solid;
			margin-right: 100rpx;
			padding-left: 10rpx;
			line-height: 70rpx;
			color: #198cef;
		}
	}
	
	.catalog-popup {
		width: 100%;
		height: 300upx;
		display: inline-block;
		text-align: center;
		line-height: 70upx;
	
		.catalog-label {
			font-weight: 500;
			color: #55b735;
		}
	
		.edit-text {
			padding: 30rpx;
			font-size: 35upx;
			height: 300rpx;
			min-height: 300rpx;
		}
	}
</style>
