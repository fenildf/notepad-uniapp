<template>
	<view id="note">
		<view class="note_head">
			<view class="note_head_row">
				<view v-for="(item,index) in head" v-on:click="menu(index)">
					<text v-bind:class="{text_selection:index==current}">{{item.name}}</text>
				</view>
			</view>
		</view>
		<catalog v-if="current === 0"></catalog>
		<shareCatalog v-if="current === 1"></shareCatalog>
	</view>
</template>

<script>
	import catalog from '@/pages/note/catalog/catalog';
	import shareCatalog from '@/pages/note/catalog/share-catalog';
	export default {
		name: 'note',
		components: {
			catalog,
			shareCatalog
		},
		data() {
			return {
				current: 0,
				head: [{
					name: "我的记事本",
				}, {
					name: "共享记事本",
				}]
			}
		},
		methods: {
			menu: function(index) {
				this.current = index;
			},

		}
	}
</script>
<style>
	body {
		width: 750upx;
	}

	#note {
		width: 750upx;
	}

	#note .note_head {
		width: 750upx;
		height: 80upx;
		background-color: #aedcae;
		position: fixed;
		z-index: 1;
		text-align: center;
	}

	#note .note_head_row {
		width: 750upx;
		height: 80upx;
		padding: 0upx;
		margin: 0upx;
		align-items: center;
		justify-content: center;
		line-height: 80upx;
		font-size: 20upx;
		background-color: #aedcae;
		color: #fff;
	}

	#note .note_head_row view {
		width: 50%;
		margin: 0upx;
		padding: 0upx;
		float: left;
		font-family: unset;
		font-size: 28upx;
		align-items: center;
		justify-content: center;
	}

	#note .note_head_row text {
		display: inline-block;
		padding: 0 10upx;
		margin: 0 auto;
	}

	#note .text_selection {
		border-bottom: 4upx solid #6c946d;
	}
</style>
