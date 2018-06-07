<template>
    <v-flex xs12>
        <div class="person" @click.self="$router.push('/profile/' + person.url)">
            <div class="person-inner">
                <div class="picture" :style="'background-image: url('+ person.display_picture +')'" @click.self="$router.push('/profile/' + person.url)"></div>
                <div class="text" @click="$router.push('/profile/' + person.url)">
                    <div><h3>{{person.name}}</h3></div>
                    <div>{{person.about}}</div>
                </div>
            </div>          
            <div>
                <div class="follow" v-if="!person.isMe">
                    <v-btn 
                    outline
                    color="black"
                    @click="follow"
                    :loading="loading"
                    :disabled="loading"
                    >
                    {{(person.isFollowing == true? 'Unfollow' : 'Follow')}}
                    </v-btn>
                </div>
            </div>
        </div>        
    </v-flex>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    props: [
        'person',
    ],
    data() {
        return {
            config: this.$store.state.config,
            loader: null,
            loading: false,
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoginState',
            userData: 'getUserData',
            userID: 'getUserID'
        }),
    },
    methods: {
        follow() {
            if( this.loader != null ) { return; }
            //button loader
            this.loader = 'loading';
            
            const l = this.loader;
            this[l] = !this[l];

            var body = {
                follower_id: this.userID,
                following_id: this.person.user_id,
                follow: !this.person.isFollowing
            }
            axios.post( this.config.api + '/follow.php', body, this.config.axiosHeader )
            .then(function(response) {
                if( response.data.success ) {
                    this.person.isFollowing = !this.person.isFollowing;
                    
                    this.$root.$emit('changefollowingCount', this.person.isFollowing);
                    //turn off loader
                    this[l] = false;
                    this.loader = null;
                }
            }.bind(this))
            .catch(function(response) {
                console.log(response);
            });
        },
    }
}

</script>

<style lang="sass" scoped>
    .flex
        margin: 7px 0
        background-color: #fff
        padding: 25px
    .person, .person-inner
        display: flex
        flex-wrap: nowrap
        flex-direction: row
        align-items: center
        text-align: left
    .person
        cursor: pointer
        justify-content: space-between
    .person div:not(:last-of-type)
        margin-right: 15px
    
    .picture
        height: 64px
        width: 64px
        background:
            size: cover
            position: center
        border-radius: 69%

</style>