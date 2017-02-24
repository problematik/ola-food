<template>
  <div class="hello">
    <week-days></week-days>
    <div class="notification is-primary">
      <p class="subtitle">
        {{ openedRestaurants.length }} out of {{ Object.keys(restaurants).length }} restaurants opened
      </p>
    </div>
    <menu-day :day="day" :meals="todayEntries" :restaurants="restaurants"></menu-day>
  </div>
</template>

<script>
import _ from 'lodash';
import MenuDay from './menu/Day';
import Data from './../core/Data';
import WeekDays from './menu/Days';
import Entries from './menu/Entries';

export default {
  components: { WeekDays, MenuDay },
  name: 'Menu',
  props: ['day'],
  data() {
    return {
      restaurants: Data.restaurants,
      dishes: Data.dishes,
      menus: Data.menus,
      todayEntries: [],
      entries: {},
      selectedDay: null,
    };
  },
  mounted() {
    this.selectedDay = this.$route.params.day;
  },
  computed: {
    selectedDay() {
      return this.$route.params.day;
    },
    openedRestaurants() {
      const mapped = _.map(this.restaurants, (restaurant) => {
        const opened = restaurant.opening_hours[this.selectedDay].length > 0;
        return {
          id: restaurant.id,
          opened,
        };
      });

      return _.map(_.filter(mapped, { opened: true }), 'id');
    },
  },
  created() {
    this.createEntries(this.selectedDay);
    this.prepareValue();
  },
  methods: {
    createEntries(selectedDay) {
      this.entries = new Entries(this.dishes, this.menus, this.openedRestaurants, selectedDay);
    },
    prepareValue() {
      this.todayEntries = this.entries.getAllEntries();
    },
  },
  watch: {
    selectedDay(selectedDay) {
      this.createEntries(selectedDay);
      this.prepareValue();
    },
  },
};
</script>
