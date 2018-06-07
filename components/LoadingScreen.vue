<template>
  <div class="loader-container">
      <v-progress-circular indeterminate :size="65" :width="7" color="teal" class="fullscreen-loader"></v-progress-circular>
  </div>
</template>

<style lang="sass">
    .loader-container
        position: fixed
        top: 0
        left: 0
        right: 0
        bottom: 0
        background-color: white
        z-index: 999
    .fullscreen-loader
        position: fixed
        top: 50%
        left: 50%
        z-index: 1000
        transform: translate(-50%, -50%)
</style>

