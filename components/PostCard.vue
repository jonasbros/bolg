<template>  
    <v-flex>
      <div class="card-outer" :class="{'user-post' : post.user_post == true}">
        <v-card class="elevation-2">
          <router-link :to="{path: '/post/' + $options.filters.replaceSpaceWithDash(post.title) + '/' + post.id}" v-if="post.featured_img != ''">
            <v-card-media 
            :src="post.featured_img"
            height="180px">
            </v-card-media>
          </router-link>
          
          <v-card-title primary-title>
            <div class="text-xs-left">
              <!-- title -->              
              <router-link :to="{path: '/post/' + $options.filters.replaceSpaceWithDash(post.title) + '/' + post.id}">
                <span class="headline">                
                  {{ post.title }}
                </span>
              </router-link> 
              <!-- post actions. if user's -->               
              <v-btn class="user-post-actions" v-if="post.user_post" flat icon @click.stop="userActions = !userActions">
                <v-icon>more_horiz</v-icon>
              </v-btn> 

              <div class="post-actions-content elevation-1 text-xs-left" v-if="post.user_post" v-show="userActions">
                <router-link :to="'/edit/' + post.id">
                  Edit
                </router-link>              
                <p @click.stop="deldialog = true; userActions = false;">
                  Delete
                </p>
              </div>                      
              <!-- category -->
              <router-link :to="'/browse/uncategorized/newest'" class="mb-2 grey--text d-block" v-if="post.categories == null">Uncategorized</router-link>
              <router-link :to="'/browse/'+ post.categories[0].toLowerCase() +'/newest'" class="mb-2 grey--text d-block" v-if="post.categories != null">{{post.categories[0]}}</router-link>
              <!-- esxceprt -->
              <div class="black--text" v-html="post.excerpt"></div>              
            </div>          
          </v-card-title>
          <v-card-actions class="text-xs-left">
            <!-- author name, pic + date posted -->
            <div>
              <!-- author picture -->
              <router-link :to="{path: '/profile/' + post.author_url}">
                <div class="card-author-pic d-inline-block" :style="'background-image: url(' + post.authorPic + ')'"></div>
              </router-link>
              
              <div class="card-author-name d-inline-block">
                <!-- author name -->
                <router-link :to="{path: '/profile/' + post.author_url}">
                  <div class="grey--text">{{ post.authorName }}</div>
                </router-link>
                <!-- date posted -->
                <div class="grey--text">{{ post.created | DateDiffFilter }}</div>
              </div>              
            </div>            

            <!-- buttons -->
            <v-btn flat icon style="margin-left: auto;" :color="likeColor" @click.native="like(post.id)" v-if="isLoggedIn">
              <v-icon>favorite</v-icon>
            </v-btn>
            <!-- share button -->
            <v-menu offset-y top left :style="( !isLoggedIn ? 'margin-left: auto;' : '' )">
              <v-btn flat icon slot="activator" color="grey darken-3" dark><v-icon>share</v-icon></v-btn>
              <v-list subheader>
                <v-subheader>Share story on: </v-subheader>
                <v-list-tile>
                  <v-btn 
                  style="background-color: #4267b2" 
                  dark 
                  depressed
                  @click="fbShare">            
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="_1pbq" color="#ffffff"><path fill="#ffffff" fill-rule="evenodd" d="M8 14H3.667C2.733 13.9 2 13.167 2 12.233V3.667A1.65 1.65 0 0 1
                    3.667 2h8.666A1.65 1.65 0 0 1 14 3.667v8.566c0 .934-.733
                    1.667-1.667
                    1.767H10v-3.967h1.3l.7-2.066h-2V6.933c0-.466.167-.9.867-.9H12v-1.8c.033
                    0-.933-.266-1.533-.266-1.267 0-2.434.7-2.467
                    2.133v1.867H6v2.066h2V14z"></path>
                    </svg>
                    <span>Facebook</span>           
                  </v-btn>
                  
                </v-list-tile>
              </v-list>
            </v-menu><!-- sharebutton end -->

            <v-btn flat icon :color="bookmarkColor" @click.stop="bookmark(post.id)" v-if="isLoggedIn">
              <v-icon>bookmark</v-icon>
            </v-btn>
     
          </v-card-actions>
        </v-card>        
      </div>

      <v-layout class="delete-modal" row justify-center>
        <div class="modal-overlay" :class="[{'invisible' : !deldialog}, {'visible' : deldialog}]"></div>
        <v-dialog v-model="deldialog" max-width="480">
          <v-card>
            <v-card-title class="headline">Delete</v-card-title>
            <v-card-text>Are you sure you want to delete this post?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="teal lighten-1" flat="flat" outline @click.native="deletePost(); deldialog = false">Delete</v-btn>
              <v-btn color="teal lighten-1" flat="flat" outline @click.native="deldialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-flex>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import shave from 'shave';

export default {
    props: [
        'post',
        'titleLength',
        'excerptLength',
        'index'
    ],
    data() {
      return {
        config: this.$store.state.config,
        userActions: false,
        deldialog: false,
        dashedTitle: '',
      }
    },
    computed: {
      ...mapGetters({
        isLoggedIn: 'getLoginState',
        userData: 'getUserData',
        userID: 'getUserID',
      }),
      likeColor() {
        return this.post.user_liked ? 'teal lighten-1' : 'grey darken-2';
      },
      bookmarkColor() {
        return this.post.user_bookmarked ? 'teal lighten-1' : 'grey darken-2';
      }
    },
    mounted() {
      shave('.headline', 80);
      shave('.black--text', 60);

      if( this.post.user_post ) {
        this.$root.$on('closeUserActions', function(state) {
          if ( this.userActions ) {
            this.userActions = state;
          }           
        }.bind(this));
      }
      
    },
    methods: {
      fbShare() {
        FB.ui({
              method: 'feed',
              link: 'https://jonasbros.github.io/bolg/#/post/' + this.$options.filters.replaceSpaceWithDash(post.title) + '/' + this.post.id, 
              app_id: '571629196513066',
              caption: this.post.excerpt,
              source: this.post.featured_img,
            }, function(response){
                console.log(response);
            }
        );
      },
      deletePost() {
        this.$root.$emit('deletePost', this.index);
        
        var body = {
          sanitize: 'false',
          newint: 1,
          table: 'blogs',
          field: 'deleted',
          where: 'id = ' + this.post.id,
        }; 

        // set 'deleted' column => 1
        axios.post( this.config.api + '/update.php', body, this.config.axiosHeader )
        .then(function(response) {
            if( response.data == 'success!' ) {
                this.$root.$emit('deletePost', payload); 
            }            
        }.bind(this)) 
        .catch(function(response) {
            console.log(response);
        }); 
      },
      like(postID) {
        this.post.user_liked = !this.post.user_liked;    

        const body = {
          liked:    this.post.user_liked,
          blog_id:  postID,
          user_id:  this.userID,
        }

        axios.post( this.config.api + 'likeupdate.php', body, this.config.axiosHeader )
        .then(function(response) {

        }) 
        .catch(function(response) {
          console.log(response)
        });
      },
      bookmark(postID) {
        this.post.user_bookmarked = !this.post.user_bookmarked;

        const body = {
          bookmark:    this.post.user_bookmarked,
          blog_id:  postID,
          user_id:  this.userID,
        }
        
        axios.post( this.config.api + 'bookmark.php', body, this.config.axiosHeader )
        .then(function(response) {

        }) 
        .catch(function(response) {
          console.log(response)
        });
      }
    }
    
}

</script>

<style lang="sass">
  .card
    background-color: #fff
    
  .card__title.card__title--primary
    display: inline-block
    word-break: break-word
    width: 100%
    position: relative

  .headline
    display: block
    margin-bottom: 15px
    font-weight: bold
  
  .card__actions
    padding: 16px
  
  .black--text
    display: inline-block
    word-break: break-word
  .card-author-pic, .card-author-name
    vertical-align: middle
  .card-author-pic
    height: 36px
    width: 36px
    margin-right: 10px
    border-radius: 69%
    background:
      size: cover
      position: center center

  .user-post .headline
    max-width: 85%
  
  .user-post-actions
    display: block
    position: absolute
    right: 0
    top: 14px
    i
      font-size: 28px !important

  .post-actions-content
    width: auto
    height: auto
    padding: 10px 5px
    background-color: white
    position: absolute
    right: 15px
    bottom: 16px
    a, p
      display: block
      padding: 5px 10px
      margin: 0
      cursor: pointer
      &:hover
        background-color: #f2f2f2

  .delete-modal .modal-overlay
    background-color: rgba(0,0,0,0.15)
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    transition: visibility 0s, opacity 0.4s linear
    z-index: 99

  .delete-modal .card
    background-color: #fff

  .invisible
    visibility: hidden !important
    opacity: 0 !important

  .visible
    visibility: visible !important
    opacity: 1 !important
  
  ._1pbq
    height: 22px
    width: 22px

  .btn__content
    svg
      margin-right: 3px
    svg,span
      vertical-align: middle
</style>

