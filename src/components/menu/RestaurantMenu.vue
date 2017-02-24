<template>
  <div class="columns is-multiline">
    <div v-for="(meal, index) in this.meals" class="column is-6">
      <div class="box">
        <div class="content">
          <div class="level">
            <h3>{{ meal.name }}</h3>
            </h2>
          </div>
          <meal :meal="meal"></meal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Meal from './Meal';

export default {
  components: { Meal },
  props: {
    meals: {
      required: true,
    },
  },
};
</script>
