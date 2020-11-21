import Vue from 'vue';
import VueRouter from 'vue-router';
import NotFound from '../views/NotFound';
import commonRoutes from './commonRoutes';
import userRoutes from './userRoutes';
import teacherRoutes from './teacherRoutes';
import sharedRoutes from './sharedRoutes';

//Shared:

Vue.use(VueRouter);

const routes = [
	...sharedRoutes,
	...teacherRoutes,
	...userRoutes,
	...commonRoutes,
	{
		path: '/*',
		name: 'NotFound',
		component: NotFound,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
