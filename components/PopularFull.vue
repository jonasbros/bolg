<template>
    <v-flex class="popular-full" xs12 md7>
        <v-layout column nowrap>
            <v-flex class="pp-head">
                <h2>Popular on bolg</h2>
            </v-flex>
            <v-flex class="pp-post" :class="{ 'post-has-picture' : post.featured_img != '' }" v-for="(post, index) in posts" :key="index">
                <!-- title -->
                <h3 class="pp-post__title">{{ post.title }}</h3>
                <!-- excerpt -->
                <p class="pp-post__excerpt">{{ post.excerpt | stripTags }}</p>
                <!-- picture -->
                <div v-if="post.featured_img != ''" class="pp-post__picture" :style="'background-image: url('+ post.featured_img +')'"></div>
                <!-- footer -->
                <div class="pp-post__footer">
                    <span>&mdash; {{ post.authorName }}</span>
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
import moment from 'moment';
import shave from 'shave';
import postcard from '~/components/PostCard';

export default {
    components: {
        postcard,
    },
    data() {
        return {
            config: this.$store.state.config,
            posts: [],
            page: 1,
            perPage: 10,
            totalPages: 0,
            totalItems: 0,
        }
    },
    created() {
        this.getPopular();
    }, 
    watch: {
        page(page) {
            this.getPopular();
        }
    },
    methods: {
        getPopular() {
            const body = {
                page: this.page,
                perpage: this.perPage,
                now: moment().format("YYYY-MM-DD HH:mm:ss"),
                twoWeeksAgo: moment().subtract(2, 'weeks').format("YYYY-MM-DD HH:mm:ss")
            };
            
            axios.post( this.config.api + 'getpopular.php', body, this.config.axiosHeader )
            .then((response) => {
                this.posts = response.data.results;
                this.totalItems = response.data.totalItems;
                this.totalPages = Math.ceil( response.data.totalItems / this.perPage );

                setTimeout( () => {
                    if( process.browser ) {
                        shave('.pp-post__title', 32);
                        shave('.pp-post__excerpt', 48);
                    }  
                } );
            })
            .catch((response) => {
                console.log(response);
            });
        }
    }
}
</script>

<style lang="sass">
    .popular-full
        padding: 15px 0
        min-height: 300px  
    .pp-head
        margin: 15px 25px 40px
        h2
            font:
                size: 2.4rem
                weight: bold
                family: 'Open Sans', 'Helvetica', 'Arial', sans-serif
    .pp-post
        position: relative
        padding: 15px 25px
        background-color: #fff
        // border-bottom: 1px solid grey
        border-top: 1px solid grey
        margin: 8px 0
    .pp-post__title
        font:
            size: 1.4rem
            family: 'Open Sans', 'Roboto', 'Helvetica', 'Arial', sans-serif
            weight: bold
        margin-bottom: 15px
    .pp-post__excerpt
        margin-bottom: 30px
        font:
            size: 1em
            family: 'Roboto', 'Helvetica', 'Arial', sans-serif
    .pp-post__picture
        position: absolute
        right: 15px
        top: 15px
        height: 90%
        width: 30%
        background:
            size: cover
            position: center
    .pp-post__footer
        span
            margin-right: 10px
    
    .post-has-picture
        .pp-post__title, .pp-post__excerpt
            width: 60%
</style>
