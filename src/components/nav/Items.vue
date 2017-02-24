<template>
    <div class="tabs">
        <ul>
            <nav-item v-for="(item, index) in items" :item="item"></nav-item>
        </ul>
    </div>
</template>

<script>
import NavItem from './Item';

export default {
  name: 'nav-items',
  components: { NavItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
