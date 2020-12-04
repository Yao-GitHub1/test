<template>
	<div class="layout">
		<v-toper></v-toper>
		<div class="container">
			<v-sideBar></v-sideBar>
			<div class="main-content">
			  <v-taber class="taber"></v-taber>
				<el-card :class="{'_blank':ishome}" class="wrapper">
					<keep-alive>
						<router-view></router-view>
					</keep-alive>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script>
	import toper from 'components/widget/toper'
	import sideBar from 'components/widget/sideBar'
	import Crumbs from 'components/crumbs'
	import taber from 'components/taber'
	export default {
		name:'layput',
		data(){
			return {
				ishome:false
			}
		},
		created(){
			if(this.$route.name == 'home'){
				this.ishome = true;
			}
		},
		watch:{
			$route:function(val,oval){
				if(val.name == 'home'){
					this.ishome = true;
				}else{
					this.ishome = false;
				}
			}
		},
		components:{
			'v-toper':toper,
			'v-sideBar':sideBar,
			'v-Crumbs': Crumbs,
			'v-taber': taber
		}
	}
</script>

<style scoped lang="scss">
.layout{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.container{
		width: 100%;
		flex: 1;
		height: 100%;
		overflow: hidden;
		display: -webkit-flex;
	}
	.main-content{
		flex: 1;
		height: 100%;
		box-sizing: border-box;
		background-color: #f1f1f1;
		overflow: hidden;
		position: relative;
		padding: 32px 0 0 0;
		.taber{
			position: absolute;
			top: 0;
			width: 100%;
		}
		.wrapper{
			height: 100%;
			width: 100%;
			overflow-x: hidden;
			overflow-y: auto;
			/deep/ .el-card__body{
				height: 100%;
				box-sizing: border-box;
			}
		}
	}
	._blank{
		box-shadow: none;
		background-color: transparent;
		height: 100%;
	}
}
</style>