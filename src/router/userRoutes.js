import FillTest from '../views/Student/FillTest';
import Grades from '../views/Student/Grades';
import Groups from '../views/Shared/Groups';
import Subjects from '../views/Shared/Subjects';

export default [
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
	{
		path: '/user-groups/:userID',
		name: 'UserGroups',
		component: Groups,
		meta: {
			requiresAuth: true,
			requiresStudent: true,
		},
	},
	{
		path: '/student-subjects/:userID',
		name: 'StudentSubjects',
		component: Subjects,
		meta: {
			requiresAuth: true,
			requiresStudent: true,
		},
	},
];
