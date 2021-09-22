import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from '@/views/Welcome.vue';
import Profile from '@/views/Profile.vue';
import PageNotFound from '@/views/PageNotFound';
import Login from '@/views/Auth/Login';
import AddGroup from '@/views/Groups/AddGroup.vue';
import ListGroups from '../views/Groups/ListGroups.vue';
import AddStudent from '../views/Students/AddStudent.vue';
import ListStudents from '../views/Students/ListStudents.vue';
import StudentProfile from '../views/Students/StudentProfile.vue';
import Middlewares from '../middlewares';
import middlewarePipeline from './middlewarePipeline';
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
    path: '/user/:id',
    name: 'Profile',
    component: Profile,
    meta: {
      layout: 'main',
      breadcrumb: 'Профиль',
      middleware: [Middlewares.auth],
    },
  },
  {
    path: '/add-group',
    name: 'AddGroup',
    component: AddGroup,
    meta: {
      layout: 'main',
      breadcrumb: 'Добавить группу',
      middleware: [Middlewares.auth],
    },
  },
  {
    path: '/list-groups',
    name: 'ListGroups',
    component: ListGroups,
    meta: {
      layout: 'main',
      breadcrumb: 'Список групп',
      middleware: [Middlewares.auth],
    },
  },
  {
    path: '/add-students',
    name: 'AddStudent',
    component: AddStudent,
    meta: {
      layout: 'main',
      breadcrumb: 'Добавить ученика',
      middleware: [Middlewares.auth],
    },
  },
  {
    path: '/list-students',
    name: 'ListStudents',
    component: ListStudents,
    meta: {
      layout: 'main',
      breadcrumb: 'Список учеников',
      middleware: [Middlewares.auth],
    },
  },
  {
    path: '/students/:id',
    name: 'StudentProfile',
    component: StudentProfile,
    meta: {
      layout: 'main',
      breadcrumb: 'Профиль ученика',
      middleware: [Middlewares.auth],
    },
  },
  // otherwise redirect to PageNotFound
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: {
      layout: 'main',
      middleware: [Middlewares.auth],
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
