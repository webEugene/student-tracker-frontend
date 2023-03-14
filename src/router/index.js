import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import Homepage from '@/views/Homepage.vue';
import PageNotFound from '@/views/PageNotFound';
import Login from '@/views/Auth/Login';
import Register from '@/views/Auth/Register';
import AddGroup from '@/views/Groups/AddGroup.vue';
import ListGroups from '@/views/Groups/ListGroups.vue';
import AddPupil from '@/views/Pupils/AddPupil.vue';
import ListPupils from '@/views/Pupils/ListPupils.vue';
import PupilProfile from '@/views/Pupils/PupilProfile.vue';
import ListTeachers from '@/views/Teachers/ListTeachers';
import AddTeacher from '@/views/Teachers/AddTeacher';
import TeacherProfile from '@/views/Teachers/TeacherProfile';
import ListUsers from '@/views/Users/ListUsers';
import AddUser from '@/views/Users/AddUser';
import UserProfile from '@/views/Users/UserProfile';
import AdminProfile from '@/views/AdminProfile';
import Cabinet from '@/views/Cabinet';
import Middlewares from '../middlewares';
import middlewarePipeline from './middlewarePipeline';
// i18n
import { i18n } from '@/plugins/i18n.js';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: {
      layout: 'empty',
      middleware: [Middlewares.guest, Middlewares.loggedIn],
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      layout: 'empty',
      middleware: [Middlewares.guest, Middlewares.loggedIn],
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      layout: 'empty',
      middleware: [Middlewares.guest, Middlewares.loggedIn],
    },
  },
  {
    path: '/homepage',
    name: 'Homepage',
    component: Homepage,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin', 'user'],
      breadcrumb: i18n.t('breadcrumb.homepage'),
    },
  },
  {
    path: '/profile/:id',
    name: 'AdminProfile',
    component: AdminProfile,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin'],
      breadcrumb: i18n.t('breadcrumb.profile'),
    },
  },
  {
    path: '/cabinet',
    name: 'Cabinet',
    component: Cabinet,
    meta: {
      layout: 'main',
      breadcrumb: '',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin'],
    },
  },
  {
    path: '/add-group',
    name: 'AddGroup',
    component: AddGroup,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin'],
      breadcrumb: i18n.t('breadcrumb.group.add'),
    },
  },
  {
    path: '/list-groups',
    name: 'ListGroups',
    component: ListGroups,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin', 'user'],
      breadcrumb: i18n.t('breadcrumb.group.list'),
    },
  },
  {
    path: '/add-pupils',
    name: 'AddPupil',
    component: AddPupil,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin'],
      breadcrumb: i18n.t('breadcrumb.pupil.add'),
    },
  },
  {
    path: '/list-pupils',
    name: 'ListPupils',
    component: ListPupils,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin', 'user'],
      breadcrumb: i18n.t('breadcrumb.pupil.list'),
    },
  },
  {
    path: '/pupils/:id',
    name: 'PupilProfile',
    component: PupilProfile,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin'],
      breadcrumb: i18n.t('breadcrumb.pupil.profile'),
    },
  },
  {
    path: '/list-teachers',
    name: 'ListTeachers',
    component: ListTeachers,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin'],
      breadcrumb: i18n.t('breadcrumb.teacher.add'),
    },
  },
  {
    path: '/add-teacher',
    name: 'AddTeacher',
    component: AddTeacher,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin'],
      breadcrumb: i18n.t('breadcrumb.teacher.list'),
    },
  },
  {
    path: '/teachers/:id',
    name: 'TeacherProfile',
    component: TeacherProfile,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin'],
      breadcrumb: i18n.t('breadcrumb.teacher.profile'),
    },
  },
  {
    path: '/list-users',
    name: 'ListUsers',
    component: ListUsers,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin'],
      breadcrumb: i18n.t('breadcrumb.user.list'),
    },
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: AddUser,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin'],
      breadcrumb: i18n.t('breadcrumb.user.add'),
    },
  },
  {
    path: '/users/:id',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin'],
      breadcrumb: i18n.t('breadcrumb.user.profile'),
    },
  },

  // otherwise redirect to PageNotFound
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth, Middlewares.checkPermissions],
      permissions: ['admin', 'user'],
      breadcrumb: '404',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    router,
  };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

export default router;
