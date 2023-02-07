import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupPage.vue'),
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'), // 코드 스플리팅
    },
    {
      path: '/study',
      component: () => import('@/views/StudyPage.vue'), // 코드 스플리팅
    },
    {
      path: '/study/add',
      component: () => import('@/views/AddStudyPage.vue'), // 코드 스플리팅
    },
    {
      path: '/study/:type/:id',
      component: () => import('@/views/DetailStudyPage.vue'), // 코드 스플리팅
    },
    {
      path: '/attend',
      component: () => import('@/views/AttendPage.vue'), // 코드 스플리팅
    },
    {
      path: '/attend/check',
      component: () => import('@/views/AttendCheckPage.vue'), // 코드 스플리팅
    },
    {
      path: '/chat/room/enter/:id',
      component: () => import('@/views/ChatPage.vue'), // 코드 스플리팅
    },
    {
      path: '/chat/room',
      component: () => import('@/views/ChatHomePage.vue'), // 코드 스플리팅
    },
    {
      path: '/myInfo',
      component: () => import('@/views/MyInfoPage.vue'), // 코드 스플리팅
    },
    // {
    //   path: '/chathome',
    //   component: () => import('@/views/ChatHomePage.vue'), // 코드 스플리팅
    // },
    // {
    //   path: '/chat',
    //   component: () => import('@/views/ChatPage.vue'), // 코드 스플리팅
    // },
    // {
    //   path: '*',
    //   component: () => import('@/views/NotFoundPage.vue'),
    // },
  ],
});
