import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/contact',
      name: 'Covid_Contact',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue'),
    },
    {
      path: '/notifications',
      name: 'Covid_Notifications',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Notifications.vue'),
    },
    {
      path: '/hospital',
      name: 'Covid_Hospital',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Hospital.vue'),
    },
    {
      path: '/medicalcolleges',
      name: 'MedicalColleges',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/MedicalColleges.vue'),
    },
    {
      path: '/graph',
      name: 'Covid_Graph',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/Graph.vue'),
    },
  ],
});

export default router;
