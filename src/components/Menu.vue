<template>
  <div class="hello">
    <week-days></week-days>
  </div>
</template>

<script>
import WeekDays from './menu/Days';

export default {
  components: { WeekDays },
  name: 'Menu',
  props: ['day'],
};
</script>
