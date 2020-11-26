<template>
  <view id="me">
	    <con-list></con-list>
  </view>
</template>

<script>
import conList from "@/pages/con_list/con_list"
export default {
  name: 'my_con_list',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
	  conList
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	body{width:100%;}
	#me{
		width:100%;
		background-color: #fff;
		margin:0 auto;
	}
</style>
