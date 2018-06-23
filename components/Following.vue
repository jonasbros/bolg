<template>
    <v-flex class="following" xs12 md7>
        <v-layout column nowrap>
            <v-flex class="fl-head">
                <h2>Following</h2>
            </v-flex>
            <v-flex class="fl-post" :class="{ 'post-has-picture' : post.featured_img != '' }" v-for="(post, index) in posts" :key="index">
                <!-- title -->
                <h3 class="fl-post__title">{{ post.title }}</h3>
                <!-- excerpt -->
                <p class="fl-post__excerpt">{{ post.excerpt | stripTags }}</p>
                <!-- picture -->
                <div v-if="post.featured_img != ''" class="fl-post__picture" :style="'background-image: url('+ post.featured_img +')'"></div>
                <!-- footer -->
                <div class="fl-post__footer truncate">
                    <span class="truncate">&mdash; {{ post.authorName }}</span>
                    <span>&bull;</span>
                    <span>{{ post.created | dateDiffFilter }}</span>
                </div>
            </v-flex>
            
            <v-flex class="my-2" v-if="totalPages > 1">
                <v-pagination :length="totalPages" v-model="page" color="teal"></v-pagination>
            </v-flex>
        </v-layout>
    </v-flex>
</template>


<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import shave from 'shave';

export default {
    data() {
        return {
            config: this.$store.state.config,
            posts: [],
            page: 1,
            perpage: 6,
            totalItems: 0,
            totalPages: 0,
        }        
    },
    watch: {
        page(page) {
            // this.posts = [];
            this.getFollowing();
        }
    },
    computed: {
        ...mapGetters({
            userID: 'getUserID',
            isLoggedIn: 'getLoginState',
            userData: 'getUserData',
        }), 
    },

    created() {
        this.getFollowing();
    },
    methods: {
        shaver() {
            //truncate title and excerpt for posts
            setTimeout( () => {
                //window width 769px below
                if( process.browser && window.screen.width > 769 ) {
                    shave('.fl-post__title', 40);
                    shave('.fl-post__excerpt', 55);
                }
                //window width 769px below
                if( process.browser && window.screen.width < 769 ) {
                    shave('.fl-post__title', 40);
                    shave('.fl-post__excerpt', 45);
                }
            }, 150 );
        },
        getFollowing() {
            const body = {
                user_id: this.userID,
                page: this.page,
                perpage: this.perpage,
            }

            axios.post( this.config.api + 'getfollowing.php', body, this.config.axiosHeader )
            .then((response) => {
                console.log(response);
                this.posts = response.data.results;
                this.totalItems = response.data.totalItems;
                this.totalPages = Math.ceil( this.totalItems / this.perpage );

                //truncate title and excerpt for posts
                this.shaver();

            })
            .catch((response) => {
                console.log(response);
            });

        }
    }
}
</script>

<style lang="sass"> 
    .following
        min-height: 300px    
    .fl-head
        padding: 15px 25px 40px
        border-bottom: 1px solid grey
        h2
            font:
                size: 2.4rem
                weight: bold
                family: 'Open Sans', 'Helvetica', 'Arial', sans-serif
    @media only screen and (max-width: 603px)
        .fl-head
            padding: 15px 25px 10px

    .fl-post
        position: relative
        padding: 15px 25px
        background-color: #fff
        // border-top: 1px solid grey
        border-bottom: 1px solid grey
        // margin: 8px 0
    .fl-post__title
        font:
            size: 1.4rem
            family: 'Open Sans', 'Roboto', 'Helvetica', 'Arial', sans-serif
            weight: bold
        margin-bottom: 15px
    .fl-post__excerpt
        margin-bottom: 30px
        font:
            size: 1em
            family: 'Roboto', 'Helvetica', 'Arial', sans-serif
    .fl-post__picture
        position: absolute
        right: 15px
        top: 15px
        height: 90%
        width: 30%
        background:
            size: cover
            position: center
    @media only screen and (max-width: 603px)
        .fl-post__title
            font-size: 1.2rem
            margin-bottom: 8px
        .fl-post__excerpt
            margin-bottom: 10px
        .fl-post__picture
            margin-bottom: 30px
            height: 80%
            width: 35%

    .fl-post__footer
        max-width: 62%
        span
            display: inline-block
            margin-right: 5px
            max-width: 48%
            vertical-align: middle
    
    .post-has-picture
        .fl-post__title, .fl-post__excerpt
            width: 60%
</style>
