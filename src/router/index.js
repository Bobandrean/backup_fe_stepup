import {
  createRouter,
  createWebHistory
} from 'vue-router'
import {
  useAuthStore
} from '@/stores/auth'
// import Cookie from "js-cookie";
// import axios from "axios";

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      redirect: '/login'
    },
    // Public Children
    {
      path: '/login',
      name: 'login',
      children: [{
        path: '',
        name: 'home',
        component: () => import('../views/TheLoginView.vue')
      }]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'admin-home',
        component: () => import('../views/admin/IndexView.vue')
      }]
    },

    {
      path: '/blank',
      name: 'blank',
      component: () => import('../layouts/BlankLayout.vue'),
      children: [{
        path: '',
        name: 'blank',
        component: () => import('../views/Blank.vue')
      }]
    },
    {
      path: '/admin/news/manage',
      name: 'manage',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'news-manage',
        component: () => import('../views/admin/news/Manage.vue')
      }]
    },
    {
      path: '/admin/news/list',
      name: 'list',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'news-list',
        component: () => import('../views/admin/news/List.vue')
      }]
    },
    {
      path: '/admin/quiz/manage',
      name: 'qmanage',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'quiz-manage',
        component: () => import('../views/admin/quiz/Manage.vue')
      }]
    },
    {
      path: '/admin/quiz/list',
      name: 'qlist',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'quiz-list',
        component: () => import('../views/admin/quiz/List.vue')
      }]
    },
    {
      path: '/admin/quiz/form',
      name: 'qform',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'quiz-form',
        component: () => import('../views/admin/quiz/form.vue')
      }]
    },
    {
      path: '/admin/quiz/edit/:id',
      name: 'qedit',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'quiz-edit',
        component: () => import('../views/admin/quiz/edit.vue')
      }]
    },
    {
      path: '/admin/quiz/answer/:id',
      name: 'qanswer',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'answer-form',
        component: () => import('../views/admin/quiz/answer.vue')
      }]
    },

    {
      path: '/admin/quiz/preview/:id',
      name: 'qpreview',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'quiz-preview',
        component: () => import('../views/admin/quiz/Preview.vue')
      }]
    },
    {
      path: '/admin/news/preview/:id',
      name: 'preview',
      component: () => import('../layouts/AdminLayout.vue'),
      children: [{
        path: '',
        name: 'news-preview',
        component: () => import('../views/admin/news/Preview.vue')
      }]
    },
    {
      path: '/admin/news/preview/:id',
      name: 'preview',
      component: () => import('../layouts/GuestLayout.vue'),
      children: [{
        path: '',
        name: 'news-preview',
        component: () => import('../views/admin/news/Preview.vue')
      }]
    },

    {
      path: '/user',
      name: 'user',
      component: () => import('../layouts/GuestLayout.vue'),
      children: [{
        path: '',
        name: 'user-home',
        component: () => import('../views/user/IndexView.vue')
      }]
    },
    {
      path: '/user/news/list',
      name: 'list_user',
      component: () => import('../layouts/GuestLayout.vue'),
      children: [{
        path: '',
        name: 'news-list-user',
        component: () => import('../views/user/news/List.vue')
      }]
    },
    {
      path: '/user/quiz/list',
      name: 'quiz_uzer',
      component: () => import('../layouts/GuestLayout.vue'),
      children: [{
        path: '',
        name: 'quiz-list-user',
        component: () => import('../views/user/quiz/List.vue')
      }]
    },
    {
      path: '/user/news/preview/:id',
      name: 'preview-user',
      component: () => import('../layouts/GuestLayout.vue'),
      children: [{
        path: '',
        name: 'news-preview-user',
        component: () => import('../views/user/news/Preview.vue')
      }]
    },
    {
      path: '/user/quiz/answer/:id',
      name: 'qanswer-user',
      component: () => import('../layouts/GuestLayout.vue'),
      children: [{
        path: '',
        name: 'answer-form-user',
        component: () => import('../views/admin/quiz/answer.vue')
      }]
    }
  ]
})

//   const token = Cookie.get("auth.token");

//   if (to.name === "login" && token) {
//     next({
//       name: "admin-home"
//     });
//   } else if (
//     to.name !== "login" &&
//     to.name !== "home" &&
//     to.name !== "detail" &&
//     !token
//   ) {
//     next({
//       name: "login"
//     });
//   } else {
//     next();
//   }

export default router