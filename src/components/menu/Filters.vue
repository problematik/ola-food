<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <div class="columns">
        <div class="column is-half">
          <permanent-offer :filter="filter"></permanent-offer>
        </div>
        <div class="column is-half">
          <search :filter="filter"></search>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from './../filters/Search';
import PermanentOffer from './filters/TogglePermanentOffer';

export default {
  props: {
    filter: {
      required: true,
    },
  },
  components: { Search, PermanentOffer },
  name: 'filter',
};
</script>
