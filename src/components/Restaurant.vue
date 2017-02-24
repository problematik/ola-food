<template>
  <div class="box">
    <div class="columns is-multiline is-mobile">
      <div v-for="(entries, day) in restaurant.opening_hours" class="column is-3-mobile">
        <hours :label="day" :entries="entries" :highlited="selectedDay(day)"></hours>
      </div>
    </div>
    <restaurant-card :data="restaurant"></restaurant-card>
  </div>
</template>

<script>
import RestaurantService from './../services/Restaurants';
import RestaurantCard from './restaurant/Restaurant';
import Hours from './restaurant/Hours';
import Days from './../core/Days';

export default {
  components: { RestaurantCard, Hours },
  name: 'restaurant',
  props: {
    slug: {
      required: true,
    },
  },
  data() {
    return {
      restaurant: {},
    };
  },
  methods: {
    selectedDay(day) {
      return day.toLowerCase() === Days.getTodayLink(false);
    },
    init(slug = null) {
      let s = slug;
      if (slug === null) {
        s = this.slug;
      }

      this.restaurant = RestaurantService.getRestaurant({ slug: s });
    },
  },
  created() {
    this.init();
  },
  watch: {
    slug(slug) {
      this.init(slug);
    },
  },
};
</script>
