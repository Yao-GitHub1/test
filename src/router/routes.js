const home  = (resolve) =>{require(['components/widget/home'],resolve)}
const ProjectApproval = () => import('views/ProjectApproval/index.vue')
const AllProject = () => import('views/AllProject/index.vue')
const Community = () => import('views/Community/index.vue')
const RealAuth = () => import('views/RealAuth/index.vue')
const ProjectDetail = () => import('views/ProjectDetail/index.vue')
const GroupDetail = () => import('views/GroupDetail/index.vue')
const ProjectManage = () => import('views/ProjectManage/index.vue')
const OrderManage = () => import('views/OrderManage/index.vue')

export default [
	{
		path:'/home',
		name:'home',
		component:home,
		meta: {name: '首页', isShow: true}
	}, {
		path: '/project-approval',
		name: 'ProjectApproval',
		component: ProjectApproval,
		meta: {name: '项目审核', isShow: true}
	}, {
		path: '/all-approval',
		name: 'AllProject',
		component: AllProject,
		meta: {name: '全部项目', isShow: true}
	}, {
		path: '/community',
		name: 'Community',
		component: Community,
		meta: {name: '工友圈信息', isShow: true}
	}, {
		path: '/real-auth',
		name: 'RealAuth',
		component: RealAuth,
		meta: {name: '实名认证', isShow: true}
	}, {
		path: '/project-detail',
		name: 'ProjectDetail',
		component: ProjectDetail,
		meta: {name: '项目信息'}
	}, {
		path: '/group-detail',
		name: 'GroupDetail',
		component: GroupDetail,
		meta: {name: '班组信息'}
	}, {
		path: '/project-manage',
		name: 'ProjectManage',
		component: ProjectManage,
		meta: {name: '项目管理', isShow: true}
	}
  , {
		path: '/order-manage',
		name: 'OrderManage',
		component: OrderManage,
		meta: {name: '订单管理', isShow: true}
	}
]
