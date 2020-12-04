<template>
	<div class="toper">
		<div class="left">
			<img  src="../../assets/logo.jpg" height="30px"/><h1>民工通后台管理系统</h1>
		</div>
		<div class="right">
			 <span>{{user.name}} 欢迎您</span>
			 <i class="el-icon-switch-button" @click="logout"></i>
		</div>
	</div>
</template>

<script>
	export default {
		name:'toper',
		data () {
			return {
				user: {
					name: 'town'
				}
			}
		},
		methods: {
			logout () {
				this.$confirm('确定要退出登陆吗？', '提示', {type: 'warning'}).then(() => {
					this.$router.push('/login')
				}).catch(() => {})
			}
		}
	}
</script>

<style scoped lang="scss">
.toper{
	height: 50px;
	background-color: #666;
	width: 100%;
	.left{
		width: 50%;
		float: left;
	}
	h1{
		color: #fff;
		font-size: 18px;
		font-weight: 200;
		padding: 0 20px;
		line-height: 50px;
		margin: 0;
		display: inline-block;
		vertical-align: middle;
	}
	img{
		display: inline-block;
		vertical-align: middle;
		margin-left: 20px;
	}
	.right{
		float: right;
		height: 100%;
		line-height: 50px;
		color: #fff;
		padding: 0 20px;
		span{
			vertical-align: middle;
		}
		i{
			vertical-align: -2px;
			font-size: 18px;
			display: inline-block;
			margin: 0 10px;
			cursor: pointer;
		}
	}
}
</style>