<template>
  <div class="card">
  <div class="card-image">
    <gallery class="image is-4by3" :images="images" :multiple="galleryMultiple"></gallery>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4"><router-link :to="`/restaurant/${this.data.slug}`">{{ data.name }}</router-link></p>
        <p class="subtitle is-6">{{ data.twitter }}</p>
      </div>
    </div>

    <div class="content">
      <p>{{ data.description }}</p>
      <p>
        <small>
          <span class="icon is-small">
            <i class="fa fa-phone"></i>
          </span>
          {{ data.phone_number }}
        </small>
      </p>
        <small>
          <span class="icon is-small">
            <i class="fa fa-map-marker"></i>
          </span>
          {{ data.city}} {{ data.address }}
        </small>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash';
import Hours from './Hours';
import Gallery from './Gallery';

export default {
  components: { Hours, Gallery },
  props: {
    data: {
      required: true,
    },
    galleryMultiple: {
      required: false,
      default: true,
    },
  },
  computed: {
    images() {
      let images = [this.data.images.cover];

      if (_.has(this.data.images, 'other')) {
        images = _.concat(images, this.data.images.other);
      }

      return images;
    },
  },
};
</script>

<style scoped>
  .icon {
    padding-top: 5px;
  }
</style>
