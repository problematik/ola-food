<template>
  <div id="app" class="container">
    <div class="logo-wrapper">
      <img class="logo" src="./assets/logo.png">
    </div>
    <nav class="columns">
      <router-link to="/restaurants" active="active-link" tag="p" class="column is-one-third big">
        <a>RESTAURANTS</a>
      </router-link>
      <router-link to="/menu" active="active-link" tag="p" class="column is-offset-4 is-one-third big">
        <a>MENUS</a>
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="sass">
  @import "~bulma"
  .big
    font-size: $size-3
</style>
<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
