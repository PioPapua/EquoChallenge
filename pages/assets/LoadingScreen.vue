<template>
  <div :class="{ loader: true, fadeout: !isLoading }">
    <v-icon>mdi-refresh</v-icon>
    Loading ...
  </div>
</template>

<script>
export default {
  name: 'LoadingScreen',
  // eslint-disable-next-line vue/require-prop-types
  props: ['isLoading']
}
</script>

<style>
.loader {
  background-color: darkgrey;
  bottom: 0;
  color: white;
  display: block;
  font-size: 32px;
  left: 0;
  overflow: hidden;
  padding-top: 10vh;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;
}

.fadeout {
  animation: fadeout 2s forwards;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
