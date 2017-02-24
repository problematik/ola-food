import Vue from 'vue';
import Router from 'vue-router';
import Days from './../core/Days';
import Menu from './../components/Menu';
import Restaurants from './../components/Restaurants';
import Restaurant from './../components/Restaurant';

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
      path: '/restaurant/:slug',
      name: 'restaurant',
      component: Restaurant,
      props: true,
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
