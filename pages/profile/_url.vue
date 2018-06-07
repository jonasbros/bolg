<template>
  <v-container>
      <v-layout row wrap>
          <!-- profile infos -->
        <v-flex class="profile-owner clearfix text-xs-left elevation-1" xs12>
            <div class="profile-picture" :style="'background-image: url(' + dp + ')'" @click="$refs.dpuploadinput.click()">
                <input type="file" accept="image/*" ref="dpuploadinput" style="display: none;" @change="uploadPicture"> 
                <small :class="( pictureError.error ? 'deep-orange--text' : 'grey--text' )">{{( pictureError.error ? 'Upload image only': '*click to change picture')}}</small>
            </div>            
            <div class="profile-meta">
                <!-- user name -->
                <h1>{{name}}</h1>
                <!-- what do they do / work / job / etc. -->
                <p class="profile-whatdo grey--text">{{whatdo}}</p>
                <!-- about -->
                <p class="profile-about grey--text">{{about}}</p>       
                <!-- followers/following -->         
                <div class="profile-follows">
                    <span @click="openFollowers">{{profile.followerCount}} followers</span>
                    <span>&bull;</span>
                    <span @click="openFollowing">{{profile.followingCount}} following</span>
                    <!-- follow/unfollow button -->
                    <v-btn
                    outline
                    flat
                    small
                    v-if="isLoggedIn && !isMe"
                    @click.stop="follow"
                    >
                    {{(profile.isFollowing ? 'Unfollow' : 'Follow')}}
                    </v-btn>
                </div>
            </div>  
            <!-- settings button -->
            <router-link :to="'/profile/settings'" class="profile-settings" v-if="isMe">
                <v-btn fab small outline color="grey darken-3">
                    <v-icon>settings</v-icon>
                </v-btn>
            </router-link>         
        </v-flex>
        <!-- posts container -->
        <v-layout class="profile-posts-container text-xs-left" row wrap>
            <v-flex xs12>
                <postcard class="profile-post xs12" :post="post" :titleLength="50" :excerptLength="90" :index="index" v-for="(post, index) in posts" :key="post.id" ></postcard>
            </v-flex>
            
        </v-layout>
        <!-- loader spinner -->
        <div class="inf-loader" v-show="isLoadingPosts">
            <v-progress-circular indeterminate :size="50" :width="7" color="teal"></v-progress-circular>
        </div>
        <!-- modal dialogs for followers and following -->
        <div>
        <!-- follower  -->
        <v-dialog class="follower-modal" v-model="followerModal" scrollable max-width="480px">
            <v-card color="white">
                <v-card-title class="headline">Followers</v-card-title>
                <!-- follower list -->
                <div class="followers-list">
                    <personcard class="follower" :person="follower" v-for="follower in followers"></personcard>                    
                </div> 
                <!-- close button -->
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="teal lighten-1" flat="flat" outline @click.native="followerModal = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- following -->
        <v-dialog class="following-modal" v-model="followingModal" scrollable max-width="480px">
            <v-card color="white">
                <v-card-title class="headline">Following</v-card-title>
                <!-- follower list -->
                <div class="following-list">
                    <personcard class="following" :person="following" v-for="following in following"></personcard>
                </div> 
                <!-- close button -->
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="teal lighten-1" flat="flat" outline @click.native="followingModal = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </div>
        <!-- settings dialog -->
        <div>
            <v-layout row justify-center>
                <v-dialog v-model="settingsModal" max-width="560">
                    <settingsmodal :toggle="settingsModal" :profile="profile"></settingsmodal>
                </v-dialog>
            </v-layout>
        </div>
      </v-layout>
      
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapState } from 'vuex';
import postcard from '~/components/PostCard.vue';
import personcard from '~/components/PersonCard.vue';
import settingsmodal from '~/components/SettingsModal.vue';
import debounce from 'debounce';

export default {
    components: {
        postcard,
        personcard,
        settingsmodal,
    },
    data() {
        return{
            config: this.$store.state.config,
            profile: [],
            posts: [],
            followers: [],
            following: [],
            followerModal: false,
            followingModal: false,
            followerPage: 1,
            followingPage: 1,
            isLoadingFollow: false,
            url: this.$route.params.url,
            isMe: false,
            dp: '',
            about: '',
            whatdo: '',
            name: '',
            nInterests: [],
            screenWidth: null,
            per: 10,
            page: 1,
            otrigger: null,
            trigger: null,
            isLoadingPosts: false,
            totalItems: 0,
            totalPages: 0,
            userDataDupe: this.$store.state.userData,
            followingCountChange: false,
            settingsModal: false,
            pictureError: {
                error: false,
                msg: '',
            }
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoginState',
            userData: 'getUserData',
            userID: 'getUserID'
        }),
        followerPages() {
            return Math.ceil(this.profile.followerCount / 10);
        },
        followingPages() {
            return Math.ceil(this.profile.followingCount / 10);
        }
    },
    watch: {
        //if settings modal is closed revert changes
        settingsModal(state) {
            if( !state ) {
                this.$root.$emit('settingsModalClosed', true);
            }
        },
        //temporary fix, debounce following count change cause it decrements twice otherwise
        'followingCountChange': debounce(function(state) {
            //increment follow count
            if( state == true ) {
                this.profile.followingCount++;
            }
            //decrement follow count
            if( state == false ) {
                this.profile.followingCount--;
            }

            this.$store.commit( 'updateUserCookie', this.profile );            
            
        }, 50),
        userData(payload) {
            this.userDataDupe = this.userData; 

        },
        //on modal open / close
        followerModal(state) {
            if( this.followingModal ) { return; }
            if( state ) {
                this.getFollows();
                
                if( document.querySelector('.follower-modal .dialog--scrollable') ) {
                    document.querySelector('.follower-modal .dialog--scrollable')
                        .addEventListener('scroll', function() {
                        this.modalScroll('follower');
                        }.bind(this));
                }
                
            }else {
                this.followerPage = 1;
                this.followers = [];
                this.isLoadingFollow = false;

                if( document.querySelector('.follower-modal .dialog--scrollable') ) {
                    document.querySelector('.follower-modal .dialog--scrollable')
                        .removeEventListener('scroll', function() {
                        this.modalScroll('follower');
                        }.bind(this)); 
                }                              
            }           
        },
        //on modal open / close
        followingModal(state) {
            if( this.followerModal ) { return; }
            if( state ) {
                this.getFollows();

                if( document.querySelector('.following-modal .dialog--scrollable') ) {
                    document.querySelector('.following-modal .dialog--scrollable')
                        .addEventListener('scroll', function() {
                        this.modalScroll('following');                       
                        }.bind(this));
                }
                
            }else {
                this.followingPage = 1;
                this.following = [];
                this.isLoadingFollow = false;

                if( document.querySelector('.following-modal .dialog--scrollable') ) {
                    document.querySelector('.following-modal .dialog--scrollable')
                        .removeEventListener('scroll', function() {
                        this.modalScroll('following');
                        }.bind(this));  
                }
                             
            }           
        }
    },
    created() {
        //screen width
        if( process.browser ) {
            this.screenWidth = window.screen.width;
            //scroll event listener
             window.onscroll = function() {
                this.infiniteScroll();
            }.bind(this);
        }
        //if profile is current user's
        setTimeout( function() {
            if( this.url == this.userData.url ) {              
                this.isMe = true;
                this.profile = this.userData;                   
                this.about = this.userData.about;
                this.whatdo = this.userData.whatdo;
                this.name = this.userData.name;
                this.dp = this.userData.display_picture;
                this.url = this.userData.url;
                this.nInterests = this.userData.interests;
            }else {
                this.isMe = false;
                this.getProfile();
            }

            this.getPosts();
        }.bind(this), 100 );

        this.$root.$on('changefollowingCount', function(state){
            this.followingCountChange = state;
        }.bind(this));

        this.$root.$on('settingsModal', function(state) {
            this.settingsModal = state;
        }.bind(this));
    },
    methods: {
        //validate picture
        validatePicture() {
            const image = this.$refs.dpuploadinput.files[0];
            const i = image.type.split('/');
            if( i[0] == 'image' ) {
                this.pictureError.error = false;
                this.pictureError.msg = '';
                return true;
            }

            this.pictureError.error = true;
            this.pictureError.msg = 'Image files only.';
            return false;
        },
        //upload picture but not change from database yet
        uploadPicture() {
            console.log(this);
            //fd = formdata
            const fd = new FormData();
            fd.append('image', this.$refs.dpuploadinput.files[0]);
            fd.append( 'user_id', this.profile.user_id );
            fd.append( 'screen_width', window.screen.width );
            //save in posts or dp folder
            fd.append( 'folder', 'dp' );
            //validate if file is image
            if( this.validatePicture() ) {
                axios.post( this.config.api + 'imageupload.php', fd, this.config.axiosHeader )
                .then( function(response) {
                    
                    if( response.data.success ) {
                        //replace image url
                        this.dp = response.data.url;
                        this.profile.display_picture = response.data.url;
                        //replace imaage url for each post
                        this.posts.forEach((post) => {
                            post.authorPic = response.data.url;
                        });
                        //update dp in database
                        this.updateDP({
                            table : 'user_profiles',
                            field : 'display_picture',
                            where : 'user_id = ' + this.profile.user_id,
                            newstr: response.data.url,
                        });
                    }
                }.bind(this) )
                .catch( function(response) {
                    console.log(response);
                } );
            }
            
        },  
        //update dp in database
        updateDP(params = {}) {        
                console.log(params);
                var body =  {   
                    'table'     : params.table, 
                    'field'     : params.field, 
                    'where'     : params.where, 
                    'newstr'    : params.newstr, 
                    'id'        : params.id, 
                    'sanitize'  : 'false' 
                }
                //execute edit
                axios.post( this.config.api + '/update.php', body, this.config.axiosHeader )
                .then( function(response) {
                    if( response.data == 'success!' ) {
                        this.$store.commit('updateUserCookie', this.profile);
                    }
                }.bind(this) )
                .catch( function(response) {                        
                    console.log(response.data);
                } );

                this.$root.$emit('settingsModal', false);
       },
        openFollowers() {
            if( this.profile.followerCount > 0 ) {
                this.followerModal = !this.followerModal;
            }
            return;
        },
        openFollowing() {
            if( this.profile.followingCount > 0 ) {
                this.followingModal = !this.followingModal;
            }
            return;
        },

        modalScroll(type = 'follower') {
            const dialog = ( type == 'follower' ) ? document.querySelector('.follower-modal .dialog--scrollable') : document.querySelector('.following-modal .dialog--scrollable');
            const list = ( type == 'follower' ) ? document.querySelector('.followers-list') : document.querySelector('.following-list');
            const trigger = (list.offsetTop + list.offsetHeight + 16) - ( dialog.offsetHeight );
  
            if( trigger <= dialog.scrollTop && this.isLoadingFollow == false 
                    && (this.followerPages >= this.followerPage || this.followingPages >= this.followingPage) ) {
                this.isLoadingFollow = true;

                if( type == 'follower' ) {
                    this.followerPage++;
                }else {
                    this.followingPage++;
                }
       
                this.getFollows();
            }
        },
        //infinite scroll
        infiniteScroll() {
            this.trigger = document.querySelector('.profile-posts-container').offsetHeight;

            if( ( window.scrollY >= ( (this.trigger + 200 ) - window.innerHeight) ) 
                    && this.isLoadingPosts == false
                    && this.page < this.totalPages ) {              
                this.isLoadingPosts = true;
                this.page += 1;

                this.getPosts();   
                this.otrigger = this.trigger;             
            }
        },
        getFollows() {
            var body = {
                follower_id: this.profile.user_id,
                following_id: this.profile.user_id,
                per: 10,
                erpage: this.followerPage,
                ingpage: this.followingPage,
                follower: this.followerModal,
                following: this.followingModal,
            }

            axios.post( this.config.api + '/getfollow.php', body, this.config.axiosHeader )
            .then(function(response) {
                // console.log(response);
                if( this.followerPage == 1 ) {
                    this.followers = response.data.followers;
                }else {
                    //page 2 and above
                    for( var i = 0; i < 10; i++ ) {  
                        if( typeof response.data.followers[i] !== 'undefined' ) {
                            this.followers.push(response.data.followers[i]);  
                        }                                         
                    }                                      
                }

                if( this.followingPage == 1 ) {
                    this.following = response.data.following;
                }else {
                    //page 2 and above
                    for( var i = 0; i < 10; i++ ) {  
                        if( typeof response.data.following[i] !== 'undefined' ) {
                            this.following.push(response.data.following[i]);  
                        }                                         
                    }      
                }        
                setTimeout( function() {
                    this.isLoadingFollow = false;
                }.bind(this), 500 )
                
            }.bind(this))
            .catch(function(response) {
                console.log(response);
            }.bind(this));
        },

        follow(i = null) {
            var body = {
                follower_id: this.userID,
                following_id: this.profile.user_id,
                follow: !this.profile.isFollowing
            }

            axios.post( this.config.api + '/follow.php', body, this.config.axiosHeader )
            .then(function(response) {
                if( response.data.success ) {
                    this.profile.isFollowing = !this.profile.isFollowing; 
                    if( this.profile.isFollowing == true ) {
                        this.followers.push(this.userData);
                        this.profile.followerCount++;

                        this.userDataDupe.followingCount++;
                    }else {
                        const userIndex = this.followers.map(function(e) { return e.user_id; }).indexOf(this.userData.user_id);

                        this.followers.splice(userIndex, 1);
                        this.profile.followerCount--;

                        this.userDataDupe.followingCount--;
                    }                    
                    this.$store.commit('updateUserData', this.userDataDupe);
                    this.$store.commit('updateUserCookie', this.userDataDupe);
                        
                }

            }.bind(this))
            .catch(function(response) {
                console.log(response);
            });
        },

        //get data of profile owner ( only if profile is not current logged in user's )
        getProfile() {
            const body = {
                url: this.$route.params.url,
                visitor: this.userData.user_id, 
            }

            axios.post( this.config.api + '/getUser.php', body, this.config.axiosHeader )
            .then(function(response) {
                // console.log(response);
                this.profile = response.data[0];

                this.about  = this.profile.about;
                this.whatdo = this.profile.whatdo;
                this.name   = this.profile.name;
                this.dp     = this.profile.display_picture;
            }.bind(this))
            .catch(function(response) {
                console.log(response);
            });

        },
        getPosts() {
            // console.log(this.config);
            const body = {
                url: this.$route.params.url,
                user_id: this.userID,
                page: this.page,
                per: this.per,
                logged: this.isLoggedIn,
                screen_width: this.screenWidth
            };

            axios.post( this.config.api + '/getuserposts.php', body, this.config.axiosHeader )
            .then(function(response) {
            if( this.page == 1) {
                //for pagination
                this.totalItems = response.data.totalItems;
                //for pagination get total number of pages
                this.totalPages = Math.ceil( (this.totalItems / this.per) );
                //delete totalItems. it's stored in totalItems
                delete response.data.totalItems;

                this.posts = response.data['posts'];        
            }else {        
                //pagination. page 2 and above
                const postsLen = Object.keys(this.posts).length;
                setTimeout( function() {  
                    for( var i = 0; i < postsLen; i++ ) {  
                        if( typeof response.data[i] !== 'undefined' ) {
                            this.posts.push(response.data[i]);  
                        }                                         
                    }                                      
                    this.isLoadingPosts = false;
                }.bind(this), 250 );                        
            }

            }.bind(this))
            .catch(function(response) {

            });
        }
    },   

}
</script>

<style lang="sass" scoped>
.clearfix::after
    content: ''
    display: table
    clear: both
.container
    margin-top: 56px !important
    max-width: 724px !important
.profile-owner
    position: relative
    padding: 20px 25px
    background-color: #fff
.profile-picture, .profile-meta
    display: inline-block
    float: left
    vertical-align: text-top
.profile-picture
    position: relative
    width: 120px
    height: 120px
    background:
        size: cover
        position: center center
        repeat: no-repeat
        color: #deeaea
    border-radius: 69%
    text-align: center
    small
        position: absolute
        bottom: -2em
        transform: translateX(-50%)
        width: 100%

.profile-meta
    margin-left: 35px   
    max-width: 75%
.profile-about, .profile-whatdo
    font-size: 1rem
.profile-follows span
    margin-right: 5px
    cursor: pointer
.profile-settings
    display: inline-block
    position: absolute
    top: 20px
    right: 25px
.profile-posts-container
    padding: 40px 0 0 0
.profile-post
    margin-bottom: 20px
.followers-list, .following-list
    padding: 0 15px
    background-color: white
.follower, .following
    text-align: left
    padding: 10px
    font-size: 1.2rem
.follower-dp, .following-dp, span
    display: inline-block
    vertical-align: middle
.follower-dp, .following-dp
    margin-right: 10px
    height: 48px
    width: 48px
    background:
        size: cover
        position: center center
    border-radius: 69%

.headline
    margin: 0
.card__actions
    background-color: white

.follower-fl-btn
    float: right
    transform: translateY(25%)

.inf-loader
    text-align: center
    width: 100%
</style>
