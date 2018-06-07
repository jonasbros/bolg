<template>
    <v-flex class="popular" xs5>
        <v-layout column nowrap>
            <v-flex class="pp-head">
                <h2>Popular on bolg</h2>
            </v-flex>

            <v-flex class="post" v-for="(post, index) in posts" :key="index" xs6>
                <p class="pp-post__title">{{ post.title }}</p>
                <p class="pp-post__excerpt">{{ post.excerpt | stripTags }}</p>
                <div class="pp-post__footer">
                    <span>&mdash; {{ post.authorName }}</span>
                    <span>&bull;</span>
                    <span>{{ post.created | dateDiffFilter }}</span>
                </div>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import moment from 'moment';
import shave from 'shave';

export default {
    data() {
        return {
            config: this.$store.state.config,
            posts: [],
            page: 1,
            perPage: 4,
            totalPages: 0,
            totalItems: 0,
        }
    },
    created() {
        this.getPopular();
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
                    shave('.pp-post__title', 32);
                    shave('.pp-post__excerpt', 48);
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
    .popular
        padding: 0 55px
    .post
        margin: 0
        border-bottom: 1px solid grey
        padding: 10px 0
        width: 80%
    .pp-head
        margin: 15px 0 20px
        h2
            font:
                size: 2rem
                weight: bold
                family: 'Open Sans', 'Helvetica', 'Arial', sans-serif
    .pp-post__title
        margin: 0 0 10px
        font:
            weight: bold
            family: 'Open Sans', 'Helvetica', 'Arial', sans-serif
            size: 16px
    // .pp-post__excerpt

    .pp-post__footer span
        margin-right: 10px

</style>
