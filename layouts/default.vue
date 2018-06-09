<template>
  <v-app class="bolg-application">
    <navbar/>
    <nuxt/>
    <loadingscreen v-show="loadingScreen"/>
    <!-- footer -->
    <div class="text-xs-center mt-4">
      <p>bolg 2018 &copy;</p>
    </div>
  </v-app>
</template>
<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import navbar from '~/components/Nav';
import loadingscreen from '~/components/LoadingScreen';

export default {
  components: {
    navbar,
    loadingscreen
  }, 
  head() {
    return {
      title: 'Bolg',
      meta: [
        { hid: 'robots', name: 'robots', content: 'index, follow' },
        { hid: 'og:site_name', name: 'og:site_name', content: 'Bolg' },
        { hid: 'description', name: 'description', content: 'Blog hosting website. Where speech is truly free. Kappa' },
        { hid: 'keywords', name: 'keywords', content: 'bolg, blog, blog hosting, medium, medium alternative, jonas perez, jonasbros, jonas' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Bolg — Where speech is truly free.' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Blog hosting website. Where speech is truly free. Kappa' },
        { hid: 'twitter:image', name: 'twitter:image', content: '/b1.png' },
        { hid: 'fb:app_id', name: 'fb:app_id', content: '571629196513066' },
        { hid: 'og:url', name: 'og:url', content: 'https://jonasbros.github.io/bolg/'},
        { hid: 'og:type', name: 'og:type', content: 'website' },
        { hid: 'og:title', name: 'og:title', content: 'Bolg — Where speech is truly free.' },
        { hid: 'og:image', name: 'og:image', content: '/b1.png' },
      ]
    }
  },
  data() {
    return{
      config: this.$store.state.config,
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'getLoginState',
      userData: 'getUserData',
      socialAuth: 'getSocialAuth',
      loadingScreen: 'getLoadingScreen',
      fbResponse: 'getFBResponse',
    })
  }, 
  watch: {
    isLoggedIn(state) {
      //if is logged in "redirect" to home and close all modals
      if( state ) {
        // console.log(state);
        // this.$router.push('/');
        this.$root.$emit('logindialog', false);
        this.$root.$emit('signupdialog', false);
      }
    },
    socialAuth(state) {
      // if( state ) {
      //   //fb sign in if socialAuth property = true
      //   this.FBSigninSuccess();
      // }
    },
    'fbResponse.status'(status) {
      if( status == 'connected' ) {       
        //login fb user
        this.$store.commit( 'FBSigninSuccess' );
      }
    }
  },
  created() {      
    //turn on loading screen
    this.$store.commit( 'setLoadingScreen', true );
  },
  mounted() {
    document.onreadystatechange = function () {
      if(document.readyState == 'complete') {
        //turn off loading screen after site has completly loaded
        this.$store.commit( 'setLoadingScreen', false );
      }
    }.bind(this);

    //initialize/load fb sdk
    this.initFBSdk();  
    
    //check cookie for login
    this.checkUserCookie();

    //closes 'intellisense' and/or user profile sidebar
    if( process.browser ) {
      document.querySelector('.bolg-application').addEventListener("click", function(event) {
        this.closeIntellisense(event);
        this.closeUserActions();
      }.bind(this));
    }
   
  },
  methods: {
    closeIntellisense(e) {      
      if( e.target.classList.contains('sbar-btn') ) {        
        return;
      }  

      if( e.target == document.querySelector('#sbarinput') ) {
        return;
      } 

      this.$root.$emit('closeIntellisense', false);      
    },
    closeUserActions() {
      this.$root.$emit('closeUserActions', false);
    },
    //check cookie for user login, login if exists
    checkUserCookie() {       
       const userData = this.$cookie.get('ud');    
       
       if( userData != null || userData == '' ) {        
          this.$store.commit( 'setLogin', JSON.parse(userData));
        }else {
          //then check if logged in via fb
          this.checkFBStatus();
        }
    },
    //init fb sdk and check for user cookies
    checkFBStatus() {
      //get fb login status
      this.$store.commit( 'FBGetLoginStatus' );     
    },
    initFBSdk() {
      //load fb sdk
      FB.init({
        appId: '571629196513066',
        cookie: true,
        xfbml: true,
        version: 'v2.12'
      }); 
    }
  }
}
</script>


<style lang="sass">
* 
  text-transform: none !important
  font:
    weight: normal
    family: 'Roboto','Helvetica', 'Arial', sans-serif  
  *::selection
    background-color: #d9d9d9

body
  background-color: #fff

a
  color: black
  text-decoration: none
  &:visited
    color: black

.application.theme--light
  background-color: #fff

.headline, .post-title
  font:
    family: 'Open Sans', 'Helvetica', 'Arial', sans-serif
    weight: 700

/* truncate text */
.truncate
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis



</style>
