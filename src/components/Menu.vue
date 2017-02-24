<template>
  <div class="hello">
    <week-days></week-days>
    <filters :filter="filter"></filters>
    <div class="notification is-primary">
      <p class="subtitle">
        Showing {{ this.entries.filteredEntriesNumber() }} of {{ this.entries.getNumberOfDishes() }} entries
      </p>
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
import Filters from './menu/Filters';
import Entries from './menu/Entries';
import Filter from './filters/Filter';

export default {
  components: { WeekDays, MenuDay, Filters },
  name: 'Menu',
  props: ['day'],
  data() {
    return {
      filter: new Filter({ value: '', toggleType: 2 }),
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
    prepareValue(filterValue = null, toggleType = null) {
      let fValue = filterValue;
      let tValue = toggleType;

      if (filterValue === null) {
        fValue = this.filter.value.toLowerCase();
      }

      if (toggleType === null) {
        tValue = this.filter.toggleType;
      }

      this.todayEntries = this.entries.filter(fValue, tValue);
    },
  },
  watch: {
    selectedDay(selectedDay) {
      this.createEntries(selectedDay);
      this.prepareValue();
    },
    'filter.toggleType': function f(toggleValue) {
      this.prepareValue(null, toggleValue);
    },
    'filter.value': function f(filterValue) {
      this.prepareValue(filterValue.toLowerCase());
    },
  },
};
</script>

<style lang="sass" scoped>
  @import "~bulma/sass/utilities/mixins"
  .subtitle
    +mobile
      line-height: 0.1
</style>

