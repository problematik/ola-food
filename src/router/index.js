import Vue from 'vue';
import Router from 'vue-router';
import Hello from 'components/Hello';
import Menu from 'components/Menu';
import Days from './../core/Days';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/menu',
      component: Menu,
      props: true,
      children: [
        {
          path: '',
          redirect: Days.getTodayLink(false),
          component: Menu,
        },
        {
          path: ':day',
          name: 'menu-day',
          component: Menu,
          props: true,
        },
      ],
    },
  ],
});
