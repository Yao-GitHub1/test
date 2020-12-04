<template>
	<div class="sideBar">
		<el-menu :unique-opened="true">
	    	<v-menuTree :menuData='menus'></v-menuTree>  
	  </el-menu>
	</div>
</template>

<script>
	import menuTree from 'components/menus/menuTree'
	export default {
		name: 'sideBar',
		data() {
			return {
				menus: [
					{
						label: '首页',
						name: 'home',
						id: 'home',
						path: '/home'
					},
					{
						label: '项目审核',
						name: 'ProjectApproval',
						id: 'ProjectApproval',
						path: '/project-approval'
					}
				]
			}
		},
		components:{
			'v-menuTree':menuTree
		},
		created () {
			var routes = this.$router.options.routes
			routes = routes[1].children
			var makeMenu = (list) => {
				var container = []
				list.forEach(e => {
					if (e.meta.isShow) {
						var item = {...e, label: e.meta.name, children: []}
						container.push(item)
						var childMenus = e.children ? e.children.filter(k => k.isShow) : []
						if (childMenus.length) {
							item.children = makeMenu(childMenus)
						}
					}
				})
				return container
			}
			this.menus = makeMenu(routes)
		}
	}
</script>

<style scoped lang="scss">
	.sideBar {
		width: 200px;
		height: 100%;
		border-right: 1px solid #dedede;
		padding: 20px 0;
		li {
			span {
				display: block;
			}
		}
		
	}
</style>