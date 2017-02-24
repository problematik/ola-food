<template>
  <figure>
    <span v-if="has_multiple" @click="previous" class="gallery-previous gallery-nav">
      <span class="icon is-large">
        <i class="fa fa-chevron-left"></i>
      </span>
    </span>
    <img :src="current_image" alt="Image">
    <span v-if="has_multiple" @click="next" class="gallery-next gallery-nav">
      <span class="icon is-large">
        <i class="fa fa-chevron-right"></i>
      </span>
    </span>
  </figure>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
    multiple: {
      required: false,
      default: true,
    },
  },
  data() {
    return {
      current_index: 0,
    };
  },
  computed: {
    current_image() {
      return this.images[this.current_index];
    },
    has_multiple() {
      return this.images.length > 1 && this.multiple;
    },
  },
  methods: {
    previous() {
      this.current_index -= 1;

      if (this.current_index === -1) {
        this.current_index = this.images.length - 1;
      }
    },
    next() {
      this.current_index += 1;

      if (this.current_index === this.images.length) {
        this.current_index = 0;
      }
    },
  },
};
</script>

<style scoped>
  .gallery-previous {
    left: 0;
  }
  .gallery-next {
    right: 0;
  }
  .gallery-nav {
    padding: 0 1em;
    color: white;
    z-index: 100;
    height:100%;
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
  }
</style>
