<template>
  <p class="control text-right is-medium">
    <label class="radio">
      <input type="radio" class="radio is-medium" name="offer" :value="values.ALL" v-model="filter.toggleType">
      Both
    </label>
    <label class="radio">
      <input type="radio" class="control is-medium" name="offer" :value="values.MENU" v-model="filter.toggleType">
      Menu
    </label>
    <label class="radio">
      <input type="radio" name="offer" :value="values.PERMANENT" v-model="filter.toggleType">
      Permanent offer
    </label>
  </p>
</template>

<script>

export default {
  props: {
    filter: {
      required: true,
    },
  },
  data() {
    return {
      values: {
        ALL: 2,
        MENU: 1,
        PERMANENT: 0,
      },
    };
  },
};
</script>

<style scoped>
  .text-right {
      text-align: right !important;
  }
</style>
