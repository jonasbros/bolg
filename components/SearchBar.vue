<template>
    <div class="search-bar">
        <v-text-field
        prepend-icon="search"
        placeholder="Search bolg..."
        v-model="term"
        class="term"
        flat
        color="teal"
        @keyup.enter="$router.push('/search/' + term); intellisense = false;"
        @focus="( term != '' ? intellisense = true : intellisense = false )"
        id="sbarinput"
        tabindex="1"
        ></v-text-field>

        <div class="intellisense elevation-2" v-show="intellisense">
            <div class="results" v-show="!isLoading">
                <!-- posts section -->
                <div class="posts">
                    <p class="sbar-head">Posts</p>
                    <div v-if="posts.length < 1">
                        <span>No results...</span>
                    </div>
                    <router-link :to="'/post/'+ post.title +'/'+ post.id +'/'" class="post" v-for="post in posts" v-if="posts.length > 0" tag="div">
                        <p class="sbar-title">{{post.title}}</p>
                        <div class="sbar-result-foot">
                            <p class="sbar-author grey--text">by {{post.authorName}}</p>
                            <p class="sbar-created grey--text">{{post.created | DateDiffFilter}}</p>
                        </div>                 
                    </router-link>
                    <!-- more results if search results length equates to 5 or more -->
                    <div class="text-xs-center mt-2" v-if="posts.length >= 5">
                        <router-link :to="'/search/' + term" class="teal--text text-xs-center">
                            More results...                       
                        </router-link>
                    </div>  
                    
                </div>
                <!-- people section -->
                <div class="people">
                    <p class="sbar-head">People</p>
                    <div v-if="people.length < 1">
                        <span>No results...</span>
                    </div>
                    <div @click.self="$router.push('/profile/'+ person.url)" class="person" v-for="person in people" v-if="people.length > 0">
                        <div class="sbar-person__person" @click="$router.push('/profile/'+ person.url)">
                            <div class="sbar-dp" :style="'background-image: url('+ person.display_picture +')'"></div>
                            <p class="sbar-name">{{person.name}}</p>
                        </div>                        
                        <div class="follow" v-if="!person.isMe">
                            <v-btn 
                            outline
                            color="black"
                            @mousedown="follow(person)"
                            :loading="loading"
                            :disabled="loading"                          
                            >
                            {{(person.isFollowing == true ? 'Unfollow' : 'Follow')}}
                            </v-btn>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sbar-loader" v-show="isLoading">
                <v-progress-circular indeterminate :size="40" :width="5" color="teal"></v-progress-circular>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import debounce from 'debounce';
import axios from 'axios';
import shave from 'shave';

export default {
    data() {
        return {
            config: this.$store.state.config,
            term: '',
            intellisense: false,
            posts: [],
            people: [],
            isLoading: false,
            loading: false,
            loader: null,
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoginState',
            userData: 'getUserData',
            userID: 'getUserID'
        }),
    },
    watch: {
        term: debounce(function(input) {
            this.search();
            if( input == '' ) {
                this.intellisense = false;
            }
        }, 500),
        posts() {
            setTimeout(function() {
                shave('.sbar-title', 40);
            }, 150);
            
        }
    },
    created() {
        this.$root.$on('closeIntellisense', function(state) {
            this.intellisense = false;
        }.bind(this));
    },
    methods: {
        //add class to search follow buttons
        addBtnClass() {
            setTimeout( function() {                
                document.querySelectorAll('.people .follow .btn__content').forEach(function(el) {
                    el.className += " sbar-btn";
                });
            }, 100 );
            
        },
        follow(person) {            
            //button
            this.loader = 'loading';
            
            const l = this.loader;
            this[l] = !this[l];

            var body = {
                follower_id: this.userID,
                following_id: person.user_id,
                follow: !person.isFollowing
            }

            axios.post( this.config.api + '/follow.php', body, this.config.axiosHeader )
            .then(function(response) {
                if( response.data.success ) {
                    person.isFollowing = !person.isFollowing;
                    this[l] = false;
                    this.loader = null;
                }
            }.bind(this))
            .catch(function(response) {
                console.log(response);
            });
        },
        search() {
            if( this.term == '' ) { return; }
            this.intellisense = true;
            this.isLoading = true;
            /* 
                posts limit is 10 by default on back end, but can add to body var to change
                prop name: limit
            */
            var body = {
                term: this.term,
                people_cpage: 1,
                posts_cpage: 1,
                user_id: this.userID,
                limit: 5,
            }

            axios.post( this.config.api + 'search.php', body, this.config.axiosHeader )
            .then(function(response) {
                //data
                this.people = response.data.people.results;
                this.posts = response.data.posts.results;    
                this.isLoading = false;       
                
                this.addBtnClass();
            }.bind(this))
            .catch(function(response) {
                console.log(response);
            });
        }
    }
}
</script>

<style lang="sass">
.search-bar
    position: relative
    margin-left: 50px
    transform: translate(5%, 5%)
    width: 25%
    z-index: 999

@media only screen and (max-width: 768px)       
    .search-bar
        width: 50%

@media only screen and (max-width: 450px)       
    .search-bar
        margin-left: 10px
        width: 50%

.intellisense
    position: absolute
    top: 56px
    background-color: #fff
    min-height: 80px
    max-height: 80vh
    height: auto
    width: 100%
    overflow-y: auto
    overflow-x: hidden

@media only screen and (max-width: 450px)      
    .intellisense
        position: fixed
        width: 100vw
        transform: translateX(-28%)

.results
    padding: 20px 20px
    font-size: 1.1rem
    .sbar-head
        border-bottom: 1px solid black
        margin: 0
    span
        display: inline-block
        padding: 10px 0
    .posts
        margin-bottom: 10px            
    .post, .person
        padding: 10px 0
        margin: 0
        cursor: pointer
        width: 100%
        // background-color: pink
        p
            margin: 0
        .sbar-title
            margin-bottom: 15px
            font: 
                weight: normal
            span
                padding: 0
        .sbar-result-foot
            display: flex
            flex-direction: row
            flex-wrap: wrap
            justify-content: space-between
        .sbar-author, .sbar-created
            font-size: 1rem
    .person
        display: flex
        justify-content: space-between
        align-items: center
        padding: 15px 5px
        .sbar-person__person
            display: flex
            justify-content: space-between
            flex-wrap: wrap
            flex-direction: row
            align-items: center
        .sbar-dp
            height: 48px
            width: 48px
            margin-right: 10px
            border-radius: 69%
            background:
                size: cover
                position: center

    .post, .person
        &:hover
            background-color: #f2f2f2
    .post:not(:last-of-type), .person:not(:last-of-type)
        border-bottom: 1px solid grey

.sbar-loader
    text-align: center
    margin-top: 20px
    
    
</style>
