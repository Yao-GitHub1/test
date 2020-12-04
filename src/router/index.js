import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/widget/layout'
import routes from './routes.js'
const Login = () => import('views/login.vue')
Vue.use(Router)

export default new Router({
  mode:'hash',
  routes: [
		{
			name: 'login',
			path: '/login',
			component: Login
		},
   	{
   		name:'layout',
   		path:'/',
   		component:layout,
   		redirect:'/home',
   		children: [
				 ...routes
			 ]
   	}
  ]
});
// // 导航守卫
// // 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('Authorization');

//     if (token === 'null' || token === '') {
//       next('/login');
//     } else {
//       next();
//     }
//   }
// })

// export default router;
