<template>
  <div class="comment-container">
    <!-- author -->
    <div class="comment-author">
        <!-- pic -->
        <router-link :to="{path: '/profile/' + comment.commenter_url}">
            <div class="comment-dp" :style="'background-image: url(' + comment.commenter_dp + ')'"></div>
        </router-link>  
        <!-- name -->
        <router-link :to="{path: '/profile/' + comment.commenter_url}">
            <span class="comment-name">{{comment.commenter_name}} &bull;</span>          
        </router-link>        
        <span class="comment-created">{{comment.created | DateDiffFilter}}</span>
    </div>      
    <!-- <hr> -->
    <!-- bvody -->
    <div class="comment-body">
        <p>{{comment.body}}</p>
    </div>
    <!-- reply button and date comment created -->
    <div class="comment-foot">
        <span @click="reply = !reply">Reply</span>
        <!-- reply textarea -->
        <div class="comment-reply-input" v-if="isLoggedIn">
            <div class="comment-textarea-container" v-show="reply">
               <v-text-field
                v-model="newReply"
                label="Add new reply"
                textarea
                no-resize
                auto-grow
                rows="3"
                :counter="150"
                maxlength="150"
              ></v-text-field>
              <!-- buttons -->
              <v-btn flat outline @click.stop="submitReply" :disabled="rloading" :loading="rloading">
                  Submit
              </v-btn>
               <v-btn flat outline @click.stop="cancelReply">
                  Cancel
              </v-btn>
            </div>
        </div>
    </div>     
    <!-- replies -->
    <div class="comment-reply-container">
        <hr>
        <div class="comment-replies" v-for="(reply, index) in comment.replies" :key="index">
            <!-- reply author -->
            <div class="reply-author">
                <!-- pic -->
                <router-link :to="{path: '/profile/' + reply.replier_url}">
                    <div class="reply-dp" :style="'background-image: url(' + reply.replier_dp + ')'"></div>
                </router-link>
                <!-- name -->
                <router-link :to="{path: '/profile/' + reply.replier_url}"> 
                    <span class="reply-name">{{reply.replier_name}} &bull;</span>
                </router-link>               
                <span class="reply-created">{{reply.created | DateDiffFilter}}</span> 
            </div>
            <!-- <hr> -->
            <!-- reply body -->
            <div class="reply-body">
                <p>{{reply.body}}</p>                
            </div>
            <hr>
        </div>
        
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    props: [
        'comment',
        'index',
    ],
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoginState',
            userData: 'getUserData',
            userID: 'getUserID'
        }),
    },
    data() {
        return {
            config: this.$store.state.config,
            reply: false,
            newReply: '',
            rloader: null,
            rloading: false,
        }
    },
    methods: {
        cancelReply() {
            this.reply = false;
            this.newReply = '';
        },
        submitReply() {
           if( this.reply &&
               this.newReply.length > 0 &&
               this.newReply.length <= 150 &&
               this.isLoggedIn )
            {
                const body = {
                    comment_id: this.comment.id,
                    replier_id: this.userID,
                    body:       this.newReply,
                }
                //loader on button
                this.rloader = 'cloading';
                const l = this.rloader;
                this[l] = !this[l];

                axios.post( this.config.api + '/submitreply.php', body, this.config.axiosHeader )
                .then(function(response) {
                    this.comment.replies.unshift({
                        body: this.newReply,
                        created: moment(),
                        id: response.data.lastCommentID,
                        replier_dp: this.userData.display_picture,
                        replier_id: this.userID,
                        replier_name: this.userData.name,
                        replier_url: this.userData.url,                  
                    });

                    //loader button
                    this[l] = false;                        
                    this.rloader = null;

                    this.cancelReply();
                }.bind(this))
                .catch(function(response) {
                    console.log(response);
                });

            }
        }
    }
}
</script>

<style lang="sass">
    hr
        background-color: lightgrey
        border: none
        height: 1px
    .comment-container
        word-break: break-word
        padding: 10px
        background-color: #f9f9f9
    .comment-author
        font-size: 1.1rem
        // margin-bottom: 10px
        .comment-dp, span
            display: inline-block
            vertical-align: middle
        .comment-name
            margin-left: 10px
            margin-right: auto
        .comment-created
            margin-left: 5px
        .comment-dp
            background:
                size: cover
                position: center center
            height: 42px
            width: 42px
            border-radius: 69%
    .comment-body
        padding: 15px 
        font-size: 1.1rem
        min-height: 80px
    .comment-foot
        font-size: 1.1rem
        padding: 10px
        cursor: pointer
    .comment-replies
        margin-top: 12px
        padding: 0 15px
        border-left: 1px solid lightgrey        
        .reply-author
            margin-bottom: 10px
        .reply-name, .reply-dp, .reply-created
            display: inline-block
            vertical-align: middle
        .reply-dp   
            background:
                size: cover
                position: center center
                repeat: no-repeat
            height: 42px
            width: 42px
            border-radius: 69%
            margin-right: 10px     
        .reply-name, .reply-created
            font-size: 1.1rem 
        .reply-body
            font-size: 1.1rem
            margin-top: 10px
            min-height: 70px
            padding: 0 5px
        .reply-created
            margin-left: 5px
        
</style>
