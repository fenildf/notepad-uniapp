<template>
	<view>
		<view class="mood">
			<tale-calendar name="calendar" :defaultTime="time"></tale-calendar>
		</view>
	</view>
</template>

<script>
	import taleCalendar from "@/components/tale-calendar/tale-calendar.vue"
	export default {
		data() {
			return {
				time: {year: 2020, month: 9}
			}
		},
		components:{
			taleCalendar
		},
		methods: {
			
		}
	}
</script>

<style>
	body {
		width: 750upx;
	}

	.mood {
		width: 750upx;
	}
	page, view{
		display: inline;
	}
</style>
