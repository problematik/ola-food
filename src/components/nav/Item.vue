<template>
  <router-link tag="li" :to="item.link" active-class="is-active">
    <a>{{ item.text }}</a>
  </router-link>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    name: 'nav-item',
    item: {
      validator(item) {
        return _.has(item, 'text') && _.has(item, 'link');
      },
      required: true,
    },
  },
};
</script>
