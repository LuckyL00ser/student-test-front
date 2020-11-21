import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import ResendVeryficationEmail from '../views/ResendVeryficationEmail';

export default [
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
		path: '/resendVeryficationMail',
		name: 'ResendVeryficationEmail',
		component: ResendVeryficationEmail,
	},
];
