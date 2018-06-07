<template>
    <v-layout column nowrap>
        <v-flex class="browse-navigation">
            <v-layout row wrap class="text-xs-center">
                <v-flex>
                    <router-link :to="'/browse/all/newest'">
                        <v-btn large flat>
                            All
                        </v-btn>
                    </router-link>
                </v-flex>
                <v-flex>
                    <router-link :to="'/browse/art/newest'">
                        <v-btn large flat>
                            Art
                        </v-btn>
                    </router-link>
                </v-flex>
                <v-flex>
                    <router-link :to="'/browse/culture/newest'">
                        <v-btn large flat>
                            Culture
                        </v-btn>
                    </router-link>
                </v-flex>
                <v-flex>
                    <router-link :to="'/browse/music/newest'">
                        <v-btn large flat>
                            Music
                        </v-btn>
                    </router-link>
                </v-flex>
                <v-flex>
                    <router-link :to="'/browse/sports/newest'">
                        <v-btn large flat>
                            Sports
                        </v-btn>
                    </router-link>
                </v-flex>
                <v-flex>
                    <router-link :to="'/browse/technology/newest'">
                        <v-btn large flat>
                            Technology
                        </v-btn>
                    </router-link>
                </v-flex>
                <v-flex>
                    <router-link :to="'/browse/uncategorized/newest'">
                        <v-btn large flat>
                            Uncategorized
                        </v-btn>
                    </router-link>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex>
            <v-layout row wrap class="grid container">        
                <!-- sizer -->
                <!-- post cards -->
                <postcard :post="post" :titleLength="50" :excerptLength="90" :index="index" v-for="(post, index) in posts" :key="post.id" class="grid-item xs12 sm6 md4"></postcard>

                <div class="inf-loader" v-show="isLoadingPosts">
                    <v-progress-circular indeterminate :size="50" :width="7" color="teal"></v-progress-circular>
                </div>
            </v-layout>
        </v-flex>
    </v-layout>
                  
</template>

<script>
import { mapGetters } from 'vuex'; 
import axios from 'axios';
import postcard from '~/components/PostCard';

export default {
    components: {
        postcard
    },
    data () {
        return {
            config: this.$store.state.config,
            posts: [],
            pagination: {
                perPage: 15,
                cPage: 1,
                sort: 'newest',
                totalPages: 0,
            },
            otrigger: null,
            trigger: null,
            isLoadingPosts: false,
            msnry: null,
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoginState',
            userData: 'getUserData',
            userID: 'getUserID',
        }),
        browseby() {
            return this.$route.params.by;
        }
        
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
        //loading screen
        this.$store.commit( 'setLoadingScreen', true );
        setTimeout( function() {
            this.getPosts();
        }.bind(this), 150 );

        this.$root.$on('deletePost', function(index) {
            this.posts.splice(index, 1);
            this.msnry.destroy();
            this.masonry(false);
        }.bind(this));
        
    },
    methods: {
        masonry(scroll = true) {
            //masonry layout
            imagesLoaded( document.querySelector('.grid'), function( instance ) {
                this.msnry = new Masonry( '.grid', {
                    columnWidth: '.grid-item',
                    itemSelector: '.grid-item',
                    percentPosition: true,
                    horizontalOrder: true,
                });
            }.bind(this));  
            
            //scroll to last trigger position
            if( process.browser && this.otrigger != null && scroll ) {
                setTimeout( function() {
                    window.scrollTo(0, (this.otrigger - window.innerHeight) );
                }.bind(this), 500 );
            }
        },
        infiniteScroll() {
            this.trigger = document.querySelector('.grid').offsetHeight + 71;

            if( ( window.scrollY >= (this.trigger - window.innerHeight) ) 
                    && this.isLoadingPosts == false
                    && this.pagination.cPage < this.pagination.totalPages ) {              
                this.isLoadingPosts = true;
                this.pagination.cPage += 1;

                this.getPosts();   
                this.otrigger = this.trigger;             
            }
        },
        getPosts() {
            var body = {
                userID:     this.userID,
                by:         this.browseby,
                page:       this.pagination.cPage,
                perpage:    this.pagination.perPage,
                sort:       this.pagination.sort,
                logged:     this.isLoggedIn
            };


            axios.post( this.config.api + 'browse.php', body, this.config.axiosHeader )
            .then(function(response) {                
                //if posts in page 1
                if( this.pagination.cPage == 1 ) {
                    //turn off loading screen
                    this.$store.commit( 'setLoadingScreen', false );
                    //get total number of pages       
                    this.pagination.totalPages = Math.ceil(response.data['totalItems'] / this.pagination.perPage);
                    //store posts in this.blogs
                    this.posts = response.data['posts'];  

                    this.$root.$emit('publishLoadingPost', false);        
                    
                    //masonry
                    this.masonry();
                }else {
                    //page 2 and above
                    //push new entries into array
                    for( var i = 0; i < this.pagination.perPage; i++ ) {
                        if( typeof response.data['posts'][i] !== 'undefined' ) {
                            this.posts.push(response.data['posts'][i]);
                        }                    
                    }
                    //posts not loading
                    setTimeout( function() {
                        this.msnry.destroy();
                        this.masonry();

                        this.isLoadingPosts = false;
                    }.bind(this), 50 );   
                }
                        
            }.bind(this))
            .catch(function(response) {
                console.log(response);
            });
        }
    }
}
</script>

<style lang="sass">
    .grid
        // margin-top: 71px
        margin-bottom: 50px
        padding: 0
    .grid-item
        // width: 33%
        // margin: 0
        padding: 10px
        text-align: left
        // margin-bottom: 25px
    .browse-navigation
        margin: 100px 0 25px
        padding: 0 250px
    .inf-loader
        position: absolute
        margin-top: 100px
        margin-bottom: 15px
        bottom: calc( 0 - 70px )
        left: 50%
        transform: translateX(-50%)


    @media (min-width: 0)
        .flex.xs12
            width: 100%

</style>
