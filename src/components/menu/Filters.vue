<template>
  <div class="columns">
    <div class="column is-half-widescreen is-offset-one-quarter-widescreen">
      <div class="columns is-mobile">
        <div class="column is-half-mobile is-half-tablet">
          <permanent-offer :filter="filter"></permanent-offer>
        </div>
        <div class="column is-5-mobile is-one-quarter-tablet is-one-quarter-desktop is-half-widescreen">
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
