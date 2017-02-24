<template>
<p class="control has-icon">
    <input class="input" type="email" placeholder="Fuzzy search" v-model="value">
    <span class="icon is-small">
      <i class="fa fa-search"></i>
    </span>
  </p>
</template>

<script>
// https://github.com/vuejs/vue/issues/2870
import _ from 'lodash';

export default {
  props: ['filter'],
  data() {
    return {
      value: '',
    };
  },
  computed: {
    _throttleUpdates() {
      return _.debounce(this.updateFilter, 300);
    },
  },
  methods: {
    updateFilter() {
      this.filter.value = this.value;
    },
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this._throttleUpdates();
      },
    },
  },
};
</script>
