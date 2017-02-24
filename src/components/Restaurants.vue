<template>
  <div>
    <div class="hello">
      <div class="columns">
        <div class="column is-offset-4 is-one-third is-half-mobile is-offset-one-quarter-mobile">
          <search :filter="filter"></search>
        </div>
      </div>
    </div>
    <div class="columns restaurant-list">
      <div v-for="restaurant in filtered" class="column is-one-third" >
          <restaurant :data="restaurant" :gallery-multiple="false"></restaurant>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import fuzzy from 'fuzzysearch';
import Data from './../core/Data';
import Restaurant from './restaurant/Restaurant';
import Filter from './filters/Filter';
import Search from './filters/Search';

export default {
  components: { Restaurant, Search },
  name: 'restaurants',
  data() {
    return {
      filter: new Filter({ value: '' }),
      restaurants: Data.restaurants,
    };
  },
  computed: {
    filtered() {
      const filter = this.filter.value.toLowerCase();

      return _.filter(this.restaurants, (restaurant) => {
        const name = restaurant.name.toLowerCase();
        const description = _.defaultTo(restaurant.description, '').toLowerCase();
        const city = restaurant.city.toLowerCase();
        const number = restaurant.phone_number;

        return fuzzy(filter, name) ||
               fuzzy(filter, description) ||
               fuzzy(filter, city) ||
               fuzzy(filter, number);
      });
    },
  },
};
</script>
<style>
  .restaurant-list .card-image {
    overflow: hidden;
    position: relative;
  }
  .restaurant-list .card-image figure img {
    max-width: 100%;
    transition: all 0.3s;
  }
  .restaurant-list .card-image figure img:hover {
    transition: all 0.3s;
    transform: scale(1.1);
  }
</style>

