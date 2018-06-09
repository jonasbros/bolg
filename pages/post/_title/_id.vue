<template>
    <v-container>
    <v-layout column nowrap>
        <v-flex class="post-container">
            <div class="post-image" :style="'background-image: url(' + post.featured_img + ')'" v-if="post.featured_img != ''"></div>
            <h1 class="post-title">{{post.title}}</h1>
            <!-- post meta -->
            <div class="post-meta">
                <div class="d-inline-block">
                    <div class="post-author-pic" :style="'background-image: url(' + post.author_dp + ')'">
                        <!-- share button in author image for easy positioning -->
                        <div class="post-share">
                            <p>Share: </p>
                            <a :href="'https://www.facebook.com/sharer/sharer.php?u='+ encodeURIComponent('https://bolgia.herokuapp.com/post/'+ $options.filters.replaceSpaceWithDash(post.title) + '/' + post.id) +'&amp;src=sdkpreparse'"
                                target="_blank">            
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="_1pbq" color="#ffffff"><path fill="#ffffff" fill-rule="evenodd" d="M8 14H3.667C2.733 13.9 2 13.167 2 12.233V3.667A1.65 1.65 0 0 1
                                3.667 2h8.666A1.65 1.65 0 0 1 14 3.667v8.566c0 .934-.733
                                1.667-1.667
                                1.767H10v-3.967h1.3l.7-2.066h-2V6.933c0-.466.167-.9.867-.9H12v-1.8c.033
                                0-.933-.266-1.533-.266-1.267 0-2.434.7-2.467
                                2.133v1.867H6v2.066h2V14z"></path>
                                </svg>           
                            </a>
                        </div>
                    </div>
                    <div class="post-author-name grey--text">
                        <router-link :to="{path: '/profile/' + post.author_url}">
                            {{post.author_name}}
                        </router-link>
                        <span class="d-block">{{post.created | DateDiffFilter}}</span>
                    </div>
                </div>
                <!-- lieks and views -->
                <div class="d-inline-block likes-views">
                    <v-btn flat icon style="margin-left: auto;" :color="likeColor" @click.native="like(post.id)" v-if="isLoggedIn">
                        <v-icon>favorite</v-icon>
                    </v-btn>
                    <span>{{post.likes}} likes &nbsp;</span>
                    <span>{{post.views}} views</span>                
                </div>
            </div>
            <!-- social share container -->

            <!-- post body -->
            <div class="post-body" v-html="post.body"></div>
            <hr>
        </v-flex>
        <!-- comments -->
        <v-flex class="comments-container">
            <h2 class="comments-title">Comments</h2>
            <h2 class="add-comment-btn" @click.stop="addComment = !addComment" v-if="isLoggedIn">Add Comment</h2>

            <div class="comment-textarea-container" v-if="isLoggedIn" v-show="addComment">
            <v-text-field
                v-model="newComment"
                label="Add new comment"
                textarea
                no-resize
                auto-grow
                rows="3"
                :counter="150"
                maxlength="150"
                class="add-comment-input"
            ></v-text-field>
            <!-- buttons -->
            <v-btn flat outline @click.stop="submitComment" :disabled="cloading" :loading="cloading">
                Submit
            </v-btn>
            <v-btn flat outline @click.stop="cancelComment">
                Cancel
            </v-btn>
            </div>

            <comments :comment="comment" :index="index" v-for="(comment, index) in comments" :key="comment.id"/>
        </v-flex>
    </v-layout>
    </v-container>
    
    
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import comments from '~/components/Comments';
import moment from 'moment';

export default {
    components: {
        comments,
    },
    head() {
        return {
            title: this.post.title,
            meta: [
                { hid: 'description', name: 'description', content: this.post.excerpt },
                { hid: 'twitter:title', name: 'twitter:title', content: this.post.title },
                { hid: 'twitter:description', name: 'twitter:description', content: this.post.excerpt },
                { hid: 'twitter:image', name: 'twitter:image', content: this.post.featured_image },
                { hid: 'og:url', name: 'og:url', content: 'https://jonasbros.github.io/bolg/post/' + this.titleDashed + '/' + this.post.id},
                { hid: 'og:type', name: 'og:type', content: 'article' },
                { hid: 'og:title', name: 'og:title', content: this.post.title },
                { hid: 'og:description', name: 'og:description', content: this.post.excerpt },
                { hid: 'og:image', name: 'og:image', content: this.post.featured_image },
            ]
        }
    },
    data() {
        return {
            config: this.$store.state.config,
            postID: this.$route.params.id,
            post: {},
            titleDashed: '',
            comments: [],
            addComment: false,
            newComment: '',
            screenWidth: null,
            commentsPer: 10,
            cloader: null,
            cloading: false,
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoginState',
            userData: 'getUserData',
            userID: 'getUserID'
        }),
        likeColor() {
            return this.post.user_liked ? 'teal lighten-1' : 'grey darken-2';
        },
    },
    created() {
        //screen width
        if( process.browser ) {
            this.screenWidth = window.screen.width;

            window.onscroll = function() {
                const postShare = document.querySelector('.post-share');
                if( postShare.parentNode.offsetTop <= window.scrollY ) {
                    postShare.style.position = 'fixed';
                    postShare.style.top = '20%';
                    postShare.style.left = '13.55%';
                }else {
                    postShare.style.position = 'absolute';
                    postShare.style.top = '150%';
                    postShare.style.left = '-235%';
                }

            }
        }
        // setTimeout( function() {
            this.getPost();
        // }.bind(this), 100 );
    },
    mounted() {
        this.$store.commit('setLoadingScreen', false);
        setTimeout( function() {
            document.querySelector('.comment-textarea-container label').style.top = '12px';
            document.querySelector('.comment-textarea-container .input-group__details').style.transform = 'translateY(100%)';
        }, 150 );
    },
    methods: {
        cancelComment() {
            this.addComment = false;
            this.newComment = '';
        },
        submitComment() {
            if( this.addComment &&
                this.newComment.length > 0 &&
                this.newComment.length <= 150 &&
                this.isLoggedIn
            ) {
                //loader spinner on btn
                this.cloader = 'cloading';
                const l = this.cloader;
                this[l] = !this[l];

                const body = {
                    blog_id:   this.post.id,
                    commenter: this.userID,
                    comment:   this.newComment,
                };

                axios.post( this.config.api + '/submitcomment.php', body, this.config.axiosHeader )
                .then(function(response) {
                    if( response.data.success ) {
                        this.comments.unshift({
                            body: this.newComment,
                            commenter_dp: this.userData.display_picture,
                            commenter_id: this.userID,
                            commenter_name: this.userData.name,
                            commenter_url: this.userData.url,
                            id: response.data.lastCommentID,
                            replies: [],
                            replyCount: 0,
                            created: moment(),
                        });
                        //loader button
                        this[l] = false;                        
                        this.cloader = null;
                    }
                    console.log(this.comments);
                    this.cancelComment();
                }.bind(this))
                .catch(function(response) {

                });

            }
        },
        like() {
            this.post.user_liked = !this.post.user_liked;    

            const body = {
                liked:    this.post.user_liked,
                blog_id:  this.postID,
                user_id:  this.userID,
            }

            axios.post( this.config.api + 'likeupdate.php', body, this.config.axiosHeader )
            .then(function(response) {

            }) 
            .catch(function(response) {
                console.log(response);
            });

            if( this.post.user_liked == true ) {
                this.post.likes += 1;
            }else {
                this.post.likes -= 1;
            }
        },
        getPost() {
            var body =  'id='            + this.postID +
                        '&user_id='      + this.userID +
                        '&screen_width=' + this.screenWidth +
                        '&comments_per=' + this.commentsPer;

            axios.post( this.config.api + 'blog.php', body, this.config.axiosHeader )
            .then(function(response) {
                if( response.data.error == '404' ) {
                    this.postExists = false;
                }else {
                    this.post = response.data[0];
                    // response.data[1].reverse();
                    this.comments = response.data[1];

                    this.titleDashed = this.$options.filters.replaceSpaceWithDash(this.post.title);
        
                setTimeout( function() {
                    // this.createImgCaption();
                }.bind(this), 250 );
                
                }        
                // turn off loading screen
                this.$root.$emit('publishLoadingPost', false);
                
            }.bind(this))      
            .catch(function(response) {
                console.log(response);

            }.bind(this));
        }
    }

}
</script>

<style lang="sass" scoped>
.container
    position: relative
    width: 960px
    // margin: 0 auto
.post-container
    position: relative
    margin-top: 71px
    // background-color: pink
.post-image
    background:
        size: cover
        repeat: no-repeat
        position: 50% 45%
    height: 392px
    width: 100%
    margin-bottom: 10px
.post-title
    margin-bottom: 50px
.post-meta
    margin-bottom: 20px
.post-author-pic, .post-author-name
    display: inline-block  
    vertical-align: middle
.post-author-pic
    position: relative
    background:
        size: cover
        position: center center
        repeat: no-repeat
    height: 48px
    width: 48px
    border-radius: 69%
    margin-right: 10px
.post-author-name
    font-size: 1.2rem

.likes-views
    float: right
    font-size: 1.4rem

.post-body
    font-size: 1.5rem

.comments-container
    h2
        display: inline-block
        margin: 15px 20px 15px 0
    .add-comment-btn
        font-size: 1.2rem
        margin-bottom: 8px
        cursor: pointer
        user-select: none

.comment-textarea-container label
    top: 0px !important

.add-comment-input
    border: 1px solid black
    border-radius: 3px
    padding: 0
    
.btn
    margin: 10px 10px 10px 0


.post-share 
    position: absolute
    height: 100px
    top: 150%
    left: -235%
    width: 100px
    // background-color: pink
    text-align: center
    font:
        size: 16px
    p
        margin-bottom: 5px
    a
        display: inline-block
        background-color: #4267b2
        padding: 15px
        height: 42px
        width: 42px
        border-radius: 3px
        svg
            transform: translate(-30%, -30%)
            height: 32px
            width: 32px


// 0 and above
@media only screen and (min-width: 0px)
    .post-title
        font-size: 3em

// 500px and above
@media only screen and (min-width: 500px)
    .post-title
        font-size: 4em

// 600px and above
@media only screen and (min-width: 600px)
    .post-title
        font-size: 5em

</style>
