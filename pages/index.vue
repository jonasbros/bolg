<template>
  <v-container>
    <featured></featured>

    <!-- following and/or popular section  -->
    <v-layout class="mt-2" row nowrap v-if="isLoggedIn">
      <following></following>
      <popularside></popularside>
    </v-layout>

    <v-layout class="mt-2" row wrap v-if="!isLoggedIn">
      <popularfull/>
    </v-layout>
   
  </v-container>
</template>

<script>
import featured from '~/components/Featured.vue';
import following from '~/components/Following.vue';
import popularside from '~/components/PopularSide.vue';
import popularfull from '~/components/PopularFull.vue';

import { mapGetters } from 'vuex';  

export default {
  components: {
    featured,
    following,
    popularside,
    popularfull
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'getLoginState',
    }),
  }

}
</script>

<style lang="sass">
.container 
  min-height: 100vh
  // /* display: flex;
  // justify-content: center;
  // align-items: center;
  // text-align: center; */

.title 
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  display: block
  font-weight: 300
  font-size: 100px
  color: #35495e
  letter-spacing: 1px

.subtitle 
  font-weight: 300
  font-size: 42px
  color: #526488
  word-spacing: 5px
  padding-bottom: 15px

.links 
  padding-top: 15px

</style>
