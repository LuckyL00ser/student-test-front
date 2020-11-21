import AddQuestion from '../views/Teacher/AddQuestion';
import AddTest from '../views/Teacher/AddTest';
import EditQuestion from '../views/Teacher/EditQuestion';
import EditTest from '../views/Teacher/EditTest';
import Results from '../views/Teacher/Results';
import Groups from '../views/Shared/Groups';
import Subjects from '../views/Shared/Subjects';
import AddSubject from '../views/Teacher/AddSubject';
import EditSubject from '../views/Teacher/EditSubject';
import AddGroup from '../views/Teacher/AddGroup';
import EditGroup from '../views/Teacher/EditGroup';
import AddUserGroupSubject from '../views/Teacher/AddUserGroupSubject';
import EditUserGroupSubject from '../views/Teacher/EditUserGroupSubject';
import UserGroupSubjectDetails from '../views/Teacher/UserGroupSubjectDetails';
import UserGroupSubjects from '../views/Teacher/UserGroupSubjects';

export default [
	//Teacher Routes:
	{
		path: '/test/:testID/questions/new',
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
		path: '/tests/:testID/questions/:questionID',
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
		path: '/results',
		name: 'Results',
		component: Results,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/teacher-groups/:teacherID',
		name: 'TeacherGroups',
		component: Groups,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/teacher-subjects/:teacherID',
		name: 'TeacherSubjects',
		component: Subjects,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/subjects/new',
		name: 'AddSubject',
		component: AddSubject,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/subjects/:subjectID/edit',
		name: 'EditSubject',
		component: EditSubject,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/groups/new',
		name: 'AddGroup',
		component: AddGroup,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/groups/:groupID/edit',
		name: 'EditGroup',
		component: EditGroup,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/user-group-subjects/new',
		name: 'AddUserGroupSubject',
		component: AddUserGroupSubject,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/user-group-subjects/:userGroupSubjectID/edit',
		name: 'EditUserGroupSubjects',
		component: EditUserGroupSubject,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},

	{
		path: '/user-group-subjects/:userGroupSubjectID',
		name: 'UserGroupSubject',
		component: UserGroupSubjectDetails,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
	{
		path: '/user-group-subjects',
		name: 'UserGroupSubjects',
		component: UserGroupSubjects,
		meta: {
			requiresAuth: true,
			requiresTeacher: true,
		},
	},
];
