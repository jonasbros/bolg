<template>
    <v-container class="search">
        <v-layout row wrap>
            <!-- saerch nput -->
            <v-flex xs12 md8 offset-md2 style="background-color: #fff;" class="pa-3">
                <v-text-field
                prepend-icon="search"
                :label="( term != '' ? 'Search results for: ' : 'Search bolg...' )"
                v-model="term"
                class="term"
                color="teal"
                flat
                @keyup.enter="search()"
                ></v-text-field>
            </v-flex>
            <!-- tabs -->
            <v-flex xs12 md8 offset-md2 class="pb-3">
                <v-tabs
                    slot="extension"
                    v-model="tabs"
                    slider-color="black"
                    color="white"
                    icons-and-text
                >
                    <v-tab href="#tab-posts">
                        Posts
                        <v-icon>event_note</v-icon>
                    </v-tab>
                    <v-tab href="#tab-people">
                        People
                        <v-icon>person</v-icon>
                    </v-tab>
                    <!-- posts results -->
                    <v-tab-item id="tab-posts">
                        <v-layout column nowrap>                    
                            <postcard class="post xs12" :post="post" :titleLength="50" :excerptLength="90" :index="index" v-for="(post, index) in posts" :key="post.id" ></postcard>          
                        </v-layout>

                    </v-tab-item>
                    <!-- people results -->
                    <v-tab-item id="tab-people">
                        <v-layout column nowrap>
                            <personcard class="elevation-2" :person="person" :index="index" v-for="(person, index) in people" :key="person.id"></personcard>
                        </v-layout>
                    </v-tab-item>
                </v-tabs>
            </v-flex>

            <v-flex class="inf-loader text-xs-center" v-show="isLoadingPosts" xs8 offset-xs2>
                <v-progress-circular indeterminate :size="50" :width="7" color="teal"></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
import postcard from '~/components/PostCard.vue';
import personcard from '~/components/PersonCard.vue';
import debounce from 'debounce';


export default {
    components: {
        postcard,
        personcard
    },
    data() {
        return {
            config: this.$store.state.config,
            term: this.$route.params.term,
            tabs: null,
            posts: [],
            people: [],
            isLoadingPosts: false,
            peoplePaginate: {
                page: 1,
                total: 0,
                pages: 1,
            },
            postsPaginate: {
                page: 1,
                total: 0,
                pages: 1,
            },
            perPage: 8,
        }
    },
    watch: {
        term: debounce(function() {
            this.isLoadingPosts = true;
            this.searchExec();
        }, 500),
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoginState',
            userData: 'getUserData',
            userID: 'getUserID'
        }),
    },
    beforeDestroy () {
        //remove event listenenr
        if (process.browser) { 
            window.onscroll = null;
        }
    },
    created() {      
        //scroll event listener
        if (process.browser) { 
            window.onscroll = function() {
                this.infiniteScroll();
            }.bind(this);
        }

        setTimeout(function() {
            this.searchExec();
        }.bind(this), 150 );
    },
    methods: {
        //infinite scroll handler
        infiniteScroll() {
      
            this.trigger = document.querySelector('.search').offsetHeight + 71;
            //posts tab
            if( this.tabs == 'tab-posts' 
            && ( window.scrollY >= (this.trigger - window.innerHeight) ) 
            && this.isLoadingPosts == false
            && this.postsPaginate.page < this.postsPaginate.pages) {         
          
                this.isLoadingPosts = true;
                this.postsPaginate.page += 1;
                this.searchExec();   
                // this.otrigger = this.trigger;    
            }
            //people tab
            if( this.tabs == 'tab-people' 
                && ( window.scrollY >= (this.trigger - window.innerHeight) ) 
                && this.isLoadingPosts == false
                && this.peoplePaginate.page < this.peoplePaginate.pages ) {
    
                this.isLoadingPosts = true;
                this.peoplePaginate.page += 1;
                this.searchExec();   
            }         
                        
        },
        //search input
        search() {
            //if term entered is not the same as term on url
            if( this.term != this.$route.params.term ) {
                this.$router.push({ path: '/search/' + this.term });
            }
        },
        //execute search
        searchExec() {
            /* 
                posts limit is 10 by default on back end, but can add to body var to change
                prop name: limit
            */
            var body = {
                term: this.term,
                people_cpage: this.peoplePaginate.page,
                posts_cpage: this.postsPaginate.page,
                user_id: this.userID,
                limit: this.perPage,
            }

            axios.post( this.config.api + 'search.php', body, this.config.axiosHeader )
            .then(function(response) {
                if( this.peoplePaginate.page == 1 && this.postsPaginate.page == 1 ) {
                    //data
                    this.people = response.data.people.results;
                    this.posts = response.data.posts.results; 

                    //total results for pagination
                    this.peoplePaginate.total = response.data.people.total;
                    this.peoplePaginate.pages = Math.ceil(response.data.people.total / this.perPage);

                    this.postsPaginate.total = response.data.posts.total;
                    this.postsPaginate.pages = Math.ceil(response.data.posts.total / this.perPage);
                }else {
                   
                    //page 2 and above
                    if( this.tabs == 'tab-posts' ) {
                        //push new entries into array
                        for( var i = 0; i < this.perPage; i++ ) {
                            if( typeof response.data.posts.results[i] !== 'undefined' ) {
                                this.posts.push(response.data.posts.results[i]);
                            }                    
                        }
                    }
                    
                    if( this.tabs == 'tab-people' ) {                                    
                        //push new entries into array
                        for( var i = 0; i < this.perPage; i++ ) {
                            if( typeof response.data.people.results[i] !== 'undefined' ) {
                                this.people.push(response.data.people.results[i]);
                            }                    
                        }
                    }                   
                    
                }  
                this.isLoadingPosts = false;                
            }.bind(this))
            .catch(function(response) {
                console.log(response);
            });
        }
    }
}
</script>

<style lang="sass">
.search
    margin-top: 66px
    padding: 50px

@media only screen and (max-width: 600px)
    .search
        padding: 15px

// .term input
//     border-bottom: 1px solid black !important

.post
    margin: 10px 0 5px
    border: none !important

.tabs__content
    padding-top: 10px
        
</style>
