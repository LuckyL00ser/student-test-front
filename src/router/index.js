import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login';
import NotFound from '../views/NotFound';
import Tests from '../views/Shared/Tests';
import RatedTest from '../views/Shared/RatedTest';
import TestsReadyToRate from '../views/Shared/TestsReadyToRate';
import FillTest from '../views/Student/FillTest';
import Grades from '../views/Student/Grades';
import Register from '../views/Register';
import AddQuestion from '../views/Teacher/AddQuestion';
import AddTest from '../views/Teacher/AddTest';
import EditQuestion from '../views/Teacher/EditQuestion';
import EditTest from '../views/Teacher/EditTest';
import Questions from '../views/Teacher/Questions';
import Results from '../views/Teacher/Results';

//Shared:

Vue.use(VueRouter);

const routes = [
	//Admin Routes:

	//Teacher Student Shared Routes:
	{
		path: '/tests',
		name: 'Tests',
		component: Tests,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/rated-test/:testID',
		name: 'RatedTest',
		component: RatedTest,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/tests/ready-to-rate',
		name: 'TestsReadyToRate',
		component: TestsReadyToRate,
		meta: {
			requiresAuth: true,
		},
	},
	//Teacher Routes:
	{
		path: '/questions/new',
		name: 'AddQuestion',
		component: AddQuestion,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/tests/new',
		name: 'AddTest',
		component: AddTest,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/questions/:questionID',
		name: 'EditQuestion',
		component: EditQuestion,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/tests/:testID',
		name: 'EditTest',
		component: EditTest,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/questions',
		name: 'Questions',
		component: Questions,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/rate-test/:testID',
		name: 'RateTest',
		component: RatedTest,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/results',
		name: 'Results',
		component: Results,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},

	//Student Routes:
	{
		path: '/fill-test/:testID',
		name: 'FillTest',
		component: FillTest,
		meta: {
			requiresAuth: true,
			requiresStudent: true,
		},
	},
	{
		path: '/grades',
		name: 'Grades',
		component: Grades,
		meta: {
			requiresAuth: true,
			requiresStudent: true,
		},
	},

	//Routes for all:
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/register',
		name: 'Register',
		component: Register,
	},
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
