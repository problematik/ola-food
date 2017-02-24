import Vue from 'vue';
import Router from 'vue-router';
import Restaurants from './../components/Restaurants';
import Menu from './../components/Menu';
import Days from './../core/Days';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/restaurants',
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: Restaurants,
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
