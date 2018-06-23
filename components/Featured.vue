<template>
    <v-layout class="bolg-featured" row wrap>
        <v-layout class="bf-container c1" row wrap>
            <v-flex class="bf-item i1">
                <router-link :to="'/post/' + posts[0].postUrl + '/' + posts[0].id" class="bf-item__picture" :style="'background-image: url('+ posts[0].featured_img +')'"></router-link>
                <div class="bf-item__text text--white">
                    <router-link :to="'/post/' + posts[0].postUrl + '/' + posts[0].id" class="bf-item__title">{{ posts[0].title }}</router-link>
                    <p class="bf-item__excerpt">{{ posts[0].excerpt }}</p>
                    <router-link :to="'/profile/'+ posts[0].author_url " class="bf-item__footer">
                        <span class="bf-item__footer__author truncate">&mdash; {{ posts[0].authorName }}</span>
                        <span>&bull;</span>
                        <span>{{ posts[0].created | dateDiffFilter }}</span>
                    </router-link>
                </div>
                
            </v-flex>
        </v-layout>

        <v-layout class="bf-container c2" row wrap>
            <v-flex class="bf-item i2">
                <router-link :to="'/post/' + posts[1].postUrl + '/' + posts[1].id" class="bf-item__picture" :style="'background-image: url('+ posts[1].featured_img +')'"></router-link>
                <div class="bf-item__text text--white">
                    <router-link :to="'/post/' + posts[1].postUrl + '/' + posts[1].id" class="bf-item__title">{{ posts[1].title }}</router-link>
                    <p class="bf-item__excerpt">{{ posts[1].excerpt }}</p>
                    <router-link :to="'/profile/'+ posts[1].author_url" class="bf-item__footer">
                        <span class="bf-item__footer__author truncate">&mdash; {{ posts[1].authorName }}</span>
                        <span>&bull;</span>
                        <span>{{ posts[1].created | dateDiffFilter }}</span>
                    </router-link>
                </div>
            </v-flex>

            <v-flex class="bf-item i3">
                <router-link :to="'/post/' + posts[2].postUrl + '/' + posts[2].id" class="bf-item__picture" :style="'background-image: url('+ posts[2].featured_img +')'"></router-link>
                <div class="bf-item__text text--white">
                    <router-link :to="'/post/' + posts[2].postUrl + '/' + posts[2].id" class="bf-item__title">{{ posts[2].title }}</router-link>
                    <p class="bf-item__excerpt">{{ posts[2].excerpt }}</p>
                    <router-link :to="'/profile/'+ posts[2].author_url" class="bf-item__footer">
                        <span class="bf-item__footer__author truncate">&mdash; {{ posts[2].authorName }}</span>
                        <span>&bull;</span>
                        <span>{{ posts[2].created | dateDiffFilter }}</span>
                    </router-link>
                </div>
            </v-flex>

            <v-flex class="bf-item i4">
                <router-link :to="'/post/' + posts[3].postUrl + '/' + posts[3].id" class="bf-item__picture" :style="'background-image: url('+ posts[3].featured_img +')'"></router-link>
                <div class="bf-item__text text--white">
                    <router-link :to="'/post/' + posts[3].postUrl + '/' + posts[3].id" class="bf-item__title">{{ posts[3].title }}</router-link>
                    <p class="bf-item__excerpt">{{ posts[3].excerpt }}</p>
                    <router-link :to="'/profile/'+ posts[3].author_url" class="bf-item__footer">
                        <span class="bf-item__footer__author truncate">&mdash; {{ posts[3].authorName }}</span>
                        <span>&bull;</span>
                        <span>{{ posts[3].created | dateDiffFilter }}</span>
                    </router-link>
                </div>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';
import shave from 'shave';
import debounce from 'debounce';

export default {
    data() {
        return {    
            config: this.$store.state.config,
            posts: {
                0: {featured_img: '', title: 'title ', excerpt: '', authorName: '', created: '', postUrl: ''},
                1: {featured_img: '', title: 'title ', excerpt: '', authorName: '', created: '', postUrl: ''},
                2: {featured_img: '', title: 'title ', excerpt: '', authorName: '', created: '', postUrl: ''},
                3: {featured_img: '', title: 'title ', excerpt: '', authorName: '', created: '', postUrl: ''},      
            },
        }
    },
    computed: {
        ...mapGetters({
            userID: 'getUserID',
            userData: 'getUserData',
            isLoggedIn: 'getLoginState',
        }),
    },
    created() {
        this.getFeatured();        

        if( process.browser ) {
            window.onresize = debounce(() => {
                this.shaver();
            }, 50);
        }
    },
    methods: {
        shaver() {
            //truncate title and excerpt for posts
            setTimeout( () => {
                //window width 769px below
                if( process.browser && window.screen.width > 769 ) {
                    //large post
                    shave('.bf-item.i1 .bf-item__title', 120);
                    shave('.bf-item.i1 .bf-item__excerpt', 65);
                    //medium post
                    shave('.bf-item.i2 .bf-item__title', 70);
                    shave('.bf-item.i2 .bf-item__excerpt', 50);
                    //small posts
                    shave('.bf-item.i3 .bf-item__title, .bf-item.i4 .bf-item__title', 80);
                    shave('.bf-item.i3 .bf-item__excerpt, .bf-item.i4 .bf-item__excerpt', 50);
                }
                //window width 769px below
                if( process.browser && window.screen.width < 769 ) {
                    //small posts
                    shave('.bf-item__title', 80);
                    shave('.bf-item__excerpt', 45);
                }
                //window width 450px below
                if( process.browser && window.screen.width < 451 ) {
                    //extra small posts
                    shave('.bf-item__title, .bf-item__excerpt', 45);
                }
            }, 150 );
        },
        getFeatured() {
            axios.post( this.config.api + 'getfeatured.php', {}, this.config.axiosHeader )
            .then((response) => {
                console.log(response);
                if( response.data.length > 0 ) {
                    this.posts = response.data;
                    //create post url string. temporary fix for '*filter* is not a function' error
                    this.posts.forEach((p) => {
                        p.postUrl = this.$options.filters.replaceSpaceWithDash(p.title);
                    });
                    this.shaver();
                }
                
            })
            .catch((response) => {
                console.log(response);
            });
        }
    }
}
</script>

<style lang="sass">
.bolg-featured
    margin-top: 90px
    color: #fff
    height: 75vh
    width: 100%
    a, a:visited
        color: #fff

/* containers */
.bf-container
    flex: 1 1 450px

/* items */
.bf-item
    position: relative
    padding: 0
    border: 2px solid white
    flex: 1 1 450px
    background-color: black

.i3, .i4
    flex: 1 1 288px

.bf-item__picture
    position: absolute
    opacity: 0.5
    top: 0
    left: 0
    right: 0
    bottom: 0
    background:
        size: cover
        position: center

.bf-item__text
    display: block
    position: absolute
    line-height: 1.2
    max-width: 90%
    margin-left: 15px
    font-size: 1.1rem

.bf-item__title    
    display: inline-block
    margin-bottom: 15px
    font:
        family: 'Open Sans', 'Helvetica', 'Arial', sans-serif
        weight: bold
.bf-item__excerpt
    font:
        family: 'Roboto', 'Helvetica', 'Arial', sans-serif
        weight: normal
.bf-item__footer
    color: #fff !important
    span    
        display: inline-block
        margin-right: 8px
        vertical-align: middle
    .bf-item__footer__author
        max-width: 50%

.bf-item__title
    font-size: 1.5rem

.i1 .bf-item__text
    top: 52%
    font-size: 1.2rem
.i1 .bf-item__title
    font-size: 3rem 

.i2 .bf-item__text
    top: 35%

.i3 .bf-item__text, .i4 .bf-item__text
    top: 30%

@media only screen and (max-width: 1271px)
    .i1 .bf-item__text
        top: 30%
    .i2 .bf-item__text, .i3 .bf-item__text    
        top: 12%
    
    .i4 .bf-item__text
        top: 20%

@media only screen and (max-width: 1025px)
    .i1 .bf-item__text
        top: 45%

@media only screen and (max-width: 769px)
    .bf-item__text
        font-size: 1.4rem
    .bf-item__title
        font-size: 2rem 
    .i1 .bf-item__text
        font-size: 1.8rem
        top: 48%    
    .i2 .bf-item__text
        top: 12%
    .i2 .bf-item__title
        width: 80%        
    .i3 .bf-item__text, .i4 .bf-item__text
        top: 10%

// @media only screen and (max-width: 603px)
//     .bolg-featured
//         height: 80vh
//     .c1
//         height: 20vh
    
//     .c2
//         height: 60vh
    
//     .i2, .i3, .i4
//         height: 20vh

//     .bf-item__text
//         top: 18%
//         font-size: 1.2rem
//     .bf-item__title
//         font-size: 3rem 

@media only screen and (max-width: 603px)
    .bolg-featured
        height: 100vh
        margin-top: 45px
    .c1
        height: 25vh    
    .c2
        height: 75vh
    .i2, .i3, .i4
        height: 25vh           

    .bf-item__text
        font-size: 1rem !important
        
    .bf-item__title
        font-size: 1.2rem !important
    
    .i1, .i2, .i3, .i4
        .bf-item__text
            top: 8%

</style>
