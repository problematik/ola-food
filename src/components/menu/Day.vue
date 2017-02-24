<template>
  <div>
    <div v-for="(meals, restaurant_id) in this.entriesPrepared">
      <div class="box" v-if="meals.length">
        <div class="content">
          <div class="columns is-mobile">
            <div class="column is-half">
              <h2>
                {{ restaurantName(restaurant_id) }}
              </h2>
            </div>
            <div class="column is-half">
              <strong>Open hours:</strong>
              <ul class="menu-list">
                <li class="menu-item" v-for="times in openHours(restaurant_id)">
                  {{ times.start}} - {{ times.end }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <restaurant-menu :meals="meals"></restaurant-menu>
      </div>
    </div>
    <div class="content" v-if="this.noEntries">
      <h3>No meals found</h3>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import RestaurantMenu from './RestaurantMenu';

export default {
  components: { RestaurantMenu },
  props: {
    meals: {
      required: true,
    },
    restaurants: {
      required: true,
    },
  },
  data() {
    return {
      noEntries: false,
    };
  },
  methods: {
    restaurantName(id) {
      return _.defaultTo(this.restaurants[id], { name: 'N/A' }).name;
    },
    openHours(id) {
      const hours = _.defaultTo(this.restaurants[id], { opening_hours: [] }).opening_hours;
      return _.defaultTo(hours[this.$route.params.day], []);
    },
  },
  computed: {
    entriesPrepared() {
      const prepared = {};
      let noEntries = true;
      this.meals.forEach((entries, restaurantId) => {
        prepared[restaurantId] = entries;

        if (entries.length > 0) {
          noEntries = false;
        }
      });

      this.noEntries = noEntries;
      return prepared;
    },
  },
};
</script>
<style scoped>
.box {
    margin-bottom: 2em;
  }
</style>
<style scoped lang="sass">
  @import "~bulma/sass/utilities/variables"
  @import "~bulma/sass/components/menu"
  @import "~bulma/sass/utilities/mixins"
  h2
    @extend h2
    font-size: $size-1
    +mobile
      font-size: $size-3
  .menu-item
    @extend .menu-item, a
    padding-top: 0 !important
    padding-bottom: 0 !important
    color: $link !important
    font-size: $size-medium
  .menu-item:hover
    background-color: white !important;
    cursor: default !important;
</style>
