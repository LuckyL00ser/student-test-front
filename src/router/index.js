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
import Results from '../views/Teacher/Results';
import Groups from '../views/Shared/Groups';
import Subjects from '../views/Shared/Subjects';
import AddSubject from '../views/Teacher/AddSubject';
import EditSubject from '../views/Teacher/EditSubject';
import SubjectDetails from '../views/Shared/SubjectDetails';
import GroupDetails from '../views/Shared/GroupDetails';
import AddGroup from '../views/Teacher/AddGroup';
import EditGroup from '../views/Teacher/EditGroup';
import UserGroupSubjectDetails from '../views/Shared/UserGroupSubjectDetails';
import AddUserGroupSubject from '../views/Shared/AddUserGroupSubject';
import UserGroupSubjects from '../views/Shared/UserGroupSubjects';
import EditUserGroupSubject from '../views/Shared/EditUserGroupSubject';
import ResendVeryficationEmail from '../views/ResendVeryficationEmail';

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
    {
        path: '/user-group-subjects/new',
        name: 'AddUserGroupSubject',
        component: AddUserGroupSubject,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/user-group-subjects/:userGroupSubjectID/edit',
        name: 'EditUserGroupSubjects',
        component: EditUserGroupSubject,
        meta: {
            requiresAuth: true,
        },
    },

    {
        path: '/user-group-subjects/:userGroupSubjectID',
        name: 'UserGroupSubject',
        component: UserGroupSubjectDetails,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/user-group-subjects',
        name: 'UserGroupSubjects',
        component: UserGroupSubjects,
        meta: {
            requiresAuth: true,
        },
    },
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

    //Student Routes:
    {
        path: '/fill-test/:testID',
        name: 'FillTest',
        component: FillTest,
        meta: {
            requiresAuth: true,
            //	requiresStudent: true,
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