<template>
    <div>
        <v-toolbar class="elevation-0" fixed color="white">
            <!-- brand / title -->
            <router-link to="/">
                <v-toolbar-title><img src="/bolg/b2.png" alt="" width="60"></v-toolbar-title>
            </router-link>   
            <!-- search -->
            <searchbar></searchbar>
            <v-spacer></v-spacer>
            <!-- right items -->
            <div class="hidden-sm-and-down">
                <router-link :to="{ path: '/browse/all/newest' }" >
                    <v-btn large flat>
                        browse
                    </v-btn>
                </router-link>            
                <v-btn v-if="!isLoggedIn" @click.stop="logindialog = !logindialog" flat>login</v-btn>
                <v-btn v-if="!isLoggedIn" @click.stop="signupdialog = !signupdialog" flat>sign up</v-btn>         
                <!-- user profile dropdown -->
                <v-menu offset-y left v-if="isLoggedIn">
                    <v-btn slot="activator" icon light large>
                        <div class="user-menu__picture" :style="'background-image: url('+ userData.display_picture +')'"></div>
                    </v-btn>
                    <v-list>
                        <v-list-tile>
                            <v-list-tile-title>pee</v-list-tile-title>                            
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-title @click.stop="logout()">logout</v-list-tile-title>                            
                        </v-list-tile>
                        
                    </v-list>
                </v-menu>
            </div>
            <!-- sm and down hamburger -->
            <v-toolbar-side-icon @click.stop="smmenu = !smmenu" class="hidden-md-and-up"></v-toolbar-side-icon>
        </v-toolbar><!-- toolbar -->
        <!-- profile drawer -->
        <v-navigation-drawer
        temporary
        v-model="profile"
        style="background-color: white;"
        fixed
        right
        >
            <profilecontents :userdata="userData"/>
        </v-navigation-drawer>

        <!-- profile drawer -->
        <v-navigation-drawer
        temporary
        v-model="smmenu"
        style="background-color: white;"
        right
        :fixed="true"
        >
            <v-list class="pt-0">
                <v-list-tile>
                    <v-list-tile-content>
                        <router-link to="/browse/all/newest">Browse</router-link>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click.stop="logout()" v-if="isLoggedIn">
                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click.stop="logindialog = !logindialog; smmenu = false;" v-if="!isLoggedIn">
                    <v-list-tile-content>
                        <v-list-tile-title>Login</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click.stop="signupdialog = !signupdialog; smmenu = false;" v-if="!isLoggedIn">
                    <v-list-tile-content>
                        <v-list-tile-title>Signup</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-dialog v-model="logindialog" max-width="560">
            <v-card style="background-color: white;">            
                <loginmodal/>       
            </v-card>        
        </v-dialog>

        <v-dialog v-model="signupdialog" max-width="560">
            <v-card style="background-color: white;">            
                <signupmodal/>       
            </v-card>        
        </v-dialog>
    </div>  
</template>

<script>
import { mapGetters } from 'vuex';
import profilecontents from './ProfileContents';
import loginmodal from './LoginModal';
import signupmodal from './SignupModal';
import searchbar from './SearchBar';

export default {
    components: {
        profilecontents,
        loginmodal,
        signupmodal,
        searchbar
    },
    data() {
        return{
            profile: false,
            smmenu: false,
            logindialog: false,
            signupdialog: false,
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoginState',
            userData: 'getUserData',
            socialAuth: 'getSocialAuth',
            loadingScreen: 'getLoadingScreen',
        })
    }, 
    mounted() {
        this.$root.$on('logindialog', function(state) {
            this.logindialog = state;
        }.bind(this));

        this.$root.$on('signupdialog', function(state) {
            this.signupdialog = state;
        }.bind(this));
    },
    methods: {
        logout() {
            this.$store.commit('logout');
        }
    }
 

}
</script>

<style lang="sass">
a
    color: black

.toolbar__content
    padding: 10px 55px 0

.btn__content
    font-size: 16px
    
.btn--router
    color: black

.container
    min-height: 0 !important

.input-group--text-field.input-group--no-resize textarea
    margin-bottom: 10px

.fb-login-btn
    cursor: pointer
    padding: 10px 15px
    background-color: #4267b2
    color: #fff
    font-weight: bold
    user-select: none
    border-radius: 2px
    &:hover
        background-color: #3b578e
    span, ._1pbq
        vertical-align: middle
    ._1pbq
        margin-right: 5px
        height: 26px
        width: 26px
.toolbar__title 
    margin: 0
    img
        transform: translateY(15%)


.user-menu__picture
    height: 44px
    width: 44px
    border-radius: 69%
    background:
        size: cover
        position: center

</style>

