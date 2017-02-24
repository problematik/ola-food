<template>
  <div>
    <span v-bind:class="{highlited: highlited}">{{ dayName }}</span>
    <div v-if="this.isClosed">
      Closed
    </div>
    <div v-else>
      <ul v-for="entry in entries">
        <li>{{ entry.start }} - {{ entry.end }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      required: true,
    },
    entries: {
      required: true,
    },
    highlited: {
      required: false,
      default: false,
    },
  },
  computed: {
    dayName() {
      return this.label.charAt(0).toUpperCase() + this.label.slice(1);
    },
    isClosed() {
      return this.entries.length === 0;
    },
  },
};
</script>
<style scoped lang="sass">
  @import "~bulma/sass/utilities/variables"
  .highlited
    color: $turquoise
    font-weight: 900
</style>
