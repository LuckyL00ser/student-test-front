import Tests from '../views/Shared/Tests';
import TestsReadyToRate from '../views/Shared/TestsReadyToRate';
import Subjects from '../views/Shared/Subjects';
import SubjectDetails from '../views/Shared/SubjectDetails';
import Groups from '../views/Shared/Groups';
import GroupDetails from '../views/Shared/GroupDetails';

export default [
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
		path: '/tests/ready-to-rate',
		name: 'TestsReadyToRate',
		component: TestsReadyToRate,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/subjects',
		name: 'Subjects',
		component: Subjects,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/subjects/:subjectID',
		name: 'SubjectDetails',
		component: SubjectDetails,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/groups',
		name: 'Groups',
		component: Groups,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/groups/:groupID',
		name: 'GroupDetails',
		component: GroupDetails,
		meta: {
			requiresAuth: true,
		},
	},
];
