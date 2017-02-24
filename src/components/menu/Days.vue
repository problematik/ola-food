<template>
  <nav-items
    :items="items"
    :class="'is-centered is-medium'">
  </nav-items>
</template>

<script>
import _ from 'lodash';
import NavItems from '../nav/Items';
import Days from './../../core/Days';

export default {
  components: { NavItems },
  data() {
    return {
      items: Days.getWeekLinks(),
    };
  },
  computed: {
    availableLinks() {
      return this.items.map(item => item.link);
    },
  },
  methods: {
    goToCurrentDay() {
      this.$router.replace(this.items[Days.getDayOfWeek()].link);
    },
    assertSupportedPath(path) {
      if (_.includes(this.availableLinks, path) === false) {
        this.goToCurrentDay();
        return false;
      }

      return true;
    },
  },
  created() {
    this.assertSupportedPath(this.$route.path);
  },
  watch: {
    $route(to) {
      this.assertSupportedPath(to.path);
    },
  },
};
</script>

<style lang="sass">
  @import "~bulma/sass/utilities/mixins"
  .tabs
    a
      +mobile
        padding-left: 5%
        padding-right: 5%
</style>
