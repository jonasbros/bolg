<template>
   <div>
        <span class="bolg_ptool">*click on anything you want to edit</span>
        <div>
            <router-link :to="'/profile/' + userdata.url" class="bolg_pp" :style="'background-image: url('+ userdata.display_picture +');'" />
            <h2>
                <router-link :to="'/profile/' + userdata.url">{{userdata.name}}</router-link>
            </h2>
        </div>

        <div class="text-xs-center mt-4">
            <div>
                <v-btn flat outline :to="'/profile/' + userdata.url">
                    Profile
                </v-btn>
            </div>
            
            <div>
                <v-btn flat outline to="/new-post">
                    New post
                </v-btn>
            </div>  

            <div>
                <v-btn flat outline to="/profile/settings">
                    Settings
                </v-btn>
            </div>   

            <div class="follows">
                <span>{{userdata.followerCount}} followers</span>    
                <span>&bull;</span>
                <span>{{userdata.followingCount}} following</span>                   
            </div>        
        </div>
   </div>     
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: [
        'userdata',
    ],
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoginState',
            userData: 'getUserData',
            userID: 'getUserID',
        }),
    }
}
</script>

<style lang="sass" scoped>
a.btn
    width: 100px
.bolg_ptool
    display: inline-block
    text-align: left
    margin-top: 5px

.bolg_pp
    display: block
    height: 136px
    width: 136px
    background:
        size: cover
        position: center
    border-radius: 69%
    margin: 30px auto
.follows 
    margin-top: 15px
    span
        margin-right: 8px
h2
    text-align: center
</style>

