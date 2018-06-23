<template>
  <v-container class="new-post-container text-xs-left">
    <v-layout row wrap>
      <v-flex xs12>
        <!-- post title -->
        <v-text-field
          v-model="title"
          label="Title"
          textarea
          no-resize
          auto-grow
          rows="3"
          :counter="150"
          maxlength="150"
          class="new-post-title"
          color="teal"
        ></v-text-field>
      </v-flex>      
      <!-- editor -->
      <v-flex xs12>
        <quill-editor 
          v-model="content"
          ref="myQuillEditor"
          :options="quillOptions">
        </quill-editor>
      </v-flex>        
      <!-- custom excpert -->
      <v-flex xs12>
        <!-- post excerpt -->
        <v-text-field
          v-model="excerpt"
          label="Custom excerpt"
          textarea
          no-resize
          auto-grow
          rows="2"
          :counter="150"
          maxlength="150"
          class="new-post-excerpt mb-0"
          color="teal"
        ></v-text-field>
      </v-flex>       
      <!-- bottom shizz -->
      <v-flex class="new-post-category text-xs-left" xs12 md2>
          <label for="category-select">Category: </label>
          <select id="category-select" v-model="category">
            <option value="Uncategorized:0">Uncategorized</option>
            <option v-for="category in categories" :value="category.category+ ':' + category.id">{{category.category}}</option>
          </select>        
      </v-flex>

      <v-flex xs12 sm8 md5 class="featured-img">
        <label for="featured-img">Upload Featured Image(Optional): </label>     
        <input type="file" accept="image/*" id="featured-img" @change=" uploadImageError.error = false; uploadImageSuccess.success = false;">  
        <!-- remove image btn -->
        <span class="remove-img" @click="clearFeaturedImage" v-show="featuredImage != ''">&times;</span> 
        <!-- upload btn -->
        <v-btn class="featured-img-upload-btn d-inline-block ma-0 ml-2"
               flat
               outline
               @click="featuredImageUpload(); iloader = 'iloading';"
               :loading="iloading"
               :disabled="iloading">
              Upload
        </v-btn>
        <!-- error/success msg -->
        <p class="red--text" v-show="uploadImageError.error == true">{{uploadImageError.msg}}</p>
        <p class="teal--text" v-show="uploadImageSuccess.success == true">{{uploadImageSuccess.msg}}</p>
      </v-flex>

      <v-flex xs12 md4 class="publish-btn text-xs-left text-lg-right">
        <v-btn flat outline @click="publish">Publish</v-btn>
        <p class="red--text" v-show="publishError.error">{{publishError.msg}}</p>
      </v-flex>

    </v-layout>
      
    <form>
      <input type="file" accept="image/*" name="image" class="image" style="display: none;">
    </form>
    
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  props: [
    'edit',
  ],
  data() {
    return {
      config: this.$store.state.config,
      title: '',
      content: '',
      excerpt: '',
      categories: [],
      category: 'Uncategorized:0',
      screenWidth: null,
      featuredImage: '',
      uploadImageError: {
        error: false,
        msg: '',
      },
      uploadImageSuccess: {
        success: false,
        msg: 'Image upload success!'
      },
      iloader: null,
      iloading: false,
      uploadFile: null,
      disableUpload: true,
      publishError: {
        error: false,
        msg: '',
      },
      quillOptions: {
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction
              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],  ['link', 'image', 'video'],   
              ['formula','clean'],            
            ],            
            handlers: {
              image: this.imageHandler,
            },                                        // remove formatting button
          },
          history: {
            delay: 2000,
            maxStack: 500,
            userOnly: true
          },
          imageResize: {},
          videoResize: {},
          formula: true,
        },
        theme: 'snow',
        placeholder: 'Share your story...'
      },
      
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'getLoginState',
      userData: 'getUserData',
      userID: 'getUserID',
    }),
    categoryID() {
      return this.category.split(':')[1];
    },
    categoryName() {
      return this.category.split(':')[0];
    } 
  },
  created() {
    this.getCategories();

    if( this.edit ) {
      setTimeout(function() {
        this.getPost();
      }.bind(this), 250);  
    }
  },
  mounted() {
    this.screenWidth = window.screen.width;

    //quill editor on click, border color changes
    let quill = document.querySelector('.quill-editor');
    document.querySelector('.application--wrap').addEventListener('click', function(e) {
      if( !e.target.classList.contains('ql-editor') ) {
        quill.classList.remove('is-writing');
      }       
    });    
    quill.addEventListener('click', function() {
      this.classList.add('is-writing');
    });
    //~~quill editor on click end

  },
  methods: {
    //get post if is edit
    getPost() {
      // console.log(this.userID);
      var body =  'id='            + this.$route.params.id +
                  '&user_id='      + this.userID +
                  '&screen_width=' + this.screenWidth +
                  '&comments_per=' + 10;

      axios.post( this.config.api + 'blog.php', body, this.config.axiosHeader )
      .then(function (response) {
        console.log(response);
        this.title = response.data[0].title;
        this.content = response.data[0].body;
        this.excerpt = response.data[0].excerpt;
        this.featuredImage = response.data[0].featured_img;
        this.category = (response.data[0].categories != null ? response.data[0].categories : 'Uncategorized:0');
      }.bind(this))
    },
    //validate
    validate() {
      //verify account 
      // if( this.userData.verified != '1' ) {
      //   this.publishError.error = true;
      //   this.publishError.msg = 'Please verify account to publish post.';
      //   return false;
      // }
      //if use selected a featured image but did not upload it
      const fi = document.querySelector('#featured-img');
      if( typeof fi.files[0] != 'undefined' && fi.files[0].size != 0 && this.featuredImage  == '' ) {
        this.publishError.error = true;
        this.publishError.msg = 'You selected a featured image, but didn\'t upload it.';
        return false;
      }

      if( this.title == '' ) {
        this.publishError.error = true;
        this.publishError.msg = 'Please enter a title.';
        return false;
      }

      if( this.content == '' ) {
        this.publishError.error = true;
        this.publishError.msg = 'You didn\'t write anything.';
        return false;
      }

      return true;
    },
    /* publish post */
    publish() {
      var post = {
        user_id             : this.userID,
        user_url            : this.userData.url,
        is_verified         : this.userData.verified,
        post_title          : this.title,
        post_body           : this.content,
        post_excerpt        : this.excerpt,
        post_category_id    : this.categoryID,
        post_category_name  : this.categoryName,
        featured_img        : this.featuredImage,
        edit                : this.edit,
        edit_id             : this.$route.params.id
      };

      if( !this.validate() ) { return; }
      this.publishError.error = false;
      //publish post!
      axios.post( this.config.api + 'publish.php', post, this.config.axiosHeader )
      .then(function(response) {      
          if( response.data.success == true ) {
              const postID = response.data.post_id;
              this.$store.commit('setLoadingScreen', true);
              setTimeout( function() {
                  //redirect to post
                  this.$router.push({
                      path: '/post/' + this.$options.filters.replaceSpaceWithDash(this.title) + '/' + postID,
                  });

              }.bind(this), 1500 );
          }else {
              this.publishError.error = true;
              this.publishError.msg = response.data.error;
          }
      }.bind(this))
      .catch(function(response) {
          console.log(response)
      });
    }, 
    /* clear featured image */
    clearFeaturedImage() {
      const input = document.querySelector('#featured-img');
      input.value = '';
      this.featuredImage = '';
      this.uploadImageError.error = false;
      this.uploadImageSuccess.success = false;
    },
    /* upload featured image */
    featuredImageUpload() {
      const input = document.querySelector('#featured-img');
      const btn = document.querySelector('.featured-img-upload-btn');
      if( typeof input.files[0] == 'undefined' ) { 
        this.featuredImage = '';
        return;
      }            
      const type = input.files[0].type;
      const i = type.split('/');
      console.log(this.uploadImageError);
      if( i[0] == 'image' ) {
        input.disabled = true;
        btn.disabled = false;
        this.uploadImageError.error = false;

       
        this.uploadImage( input.files[0], true );
      }else {
        this.uploadImageError.error = true;
        this.uploadImageError.msg = 'Please upload image files only.';
      }
    },
    /* get categories list */
    getCategories() {
      axios.get( this.config.api + 'getcategories.php', this.config.axiosHeader )
      .then(function(response) {
        this.categories = response.data;
      }.bind(this))
      .catch(function(response) {
        console.log(response);
      });
    }, 
    //handler when user uploads image ( not featured image )
    imageHandler(q) {
      if( q ) {
        const input = document.querySelector('.image');
        input.click();
        input.onchange = function() {
          const type = input.files[0].type;
          const i = type.split('/');
          if( i[0] == 'image' ) {
            this.uploadImage(input.files[0]);
          }else {
            console.log('image only!');
          }
        }.bind(this)
      }
    },
    /* upload image to server */
    uploadImage(file, featured = false) {       
      if( file.size == 0 ) { return; }     
      if( featured == true ) {
         //button loading aniomation
        this.iloader = 'iloading';
        var l = this.iloader;
        this[l] = !this[l];
      }
      const fd = new FormData();
      fd.append('image', file);
      fd.append( 'user_id', this.userID );
      fd.append( 'screen_width', this.screenWidth );
      //save in posts or dp folder
      fd.append( 'folder', 'posts' );

      axios.post( this.config.api + 'imageupload.php', fd, this.config.axiosHeader )
      .then(function(response) {          
          if( response.data.success && !featured ) {
            this.insertImagetoEditor(response.data.url);
          }

          if( response.data.success && featured ) {
             //loader button
            this[l] = false;                        
            this.iloader = null;

            document.querySelector('#featured-img').disabled = false;
            this.featuredImage = response.data.url;
            this.uploadImageSuccess.success = true;           
          }
      }.bind(this))   
      .catch(function(response) {
          console.log(response);
      }); 
    },
    /* insert image to editor */
    insertImagetoEditor(url) {
      const range = this.$refs.myQuillEditor.quill.getSelection();
      this.$refs.myQuillEditor.quill.insertEmbed(range.index, 'image', url);
    },

  },
}
</script>

<style lang="sass">
.container
  padding-top: 90px
.quill-editor
  height: 420px
  iframe
    pointer-events: none
  &.is-writing
    .ql-container.ql-snow, .ql-toolbar.ql-snow 
      border-color: #009688 !important
      transition: border-color 0.3s ease

.new-post-title, .new-post-excerpt 
  padding: 0
  margin-bottom: 15px

@media only screen and (max-width: 600px)
  .new-post-excerpt 
    margin-top: 100px

.ql-container
  height: 360px 

.ql-container.ql-snow, .ql-toolbar.ql-snow 
    border: 2px solid grey

.ql-toolbar button.ql-active svg .ql-fill, , 
.ql-toolbar button.ql-active svg .ql-stroke,
.ql-toolbar button.ql-active,
  transition: fill 0.3s 
  color: #009688 !important
  
.ql-toolbar button.ql-active svg .ql-fill
  fill: #009688 !important
.ql-toolbar button.ql-active svg .ql-stroke
  stroke: #009688 !important

.ql-toolbar button:hover > svg .ql-fill,
.ql-picker-label.ql-active .ql-fill
  fill: #009688 !important

.ql-toolbar button:hover > svg .ql-stroke,
.ql-toolbar .ql-picker:hover > .ql-picker-label .ql-stroke,
.ql-picker-label.ql-active .ql-stroke
  stroke: #009688 !important
  
.ql-toolbar .ql-picker:hover > .ql-picker-label,
.ql-picker-item:hover,
.ql-picker-label.ql-active
  color: #009688 !important


.new-post-category
  margin-right: 20px
  select
    font-size: 1rem
    padding: 8px 10px
    width: 100%
    border: 1px solid lightgrey
label
  top: 13px !important

.featured-img
  position: relative
@media only screen and (max-width: 1264px) 
  .featured-img
    margin-top: 18px

.featured-img-upload-btn
  height: 35px
  transform: translateY(-1px)  
@media only screen and (max-width: 600px)
  .featured-img-upload-btn
    margin: 10px 0 !important

#featured-img
  padding: 5px 30px 5px 5px
  border: 1px solid lightgrey
.remove-img
  position: absolute
  cursor: pointer
  right: 117px
  font:
    size: 2rem
    weight: bold
  
.publish-btn
  margin-top: 21px
  margin-left: 60px
@media only screen and (max-width: 1264px) 
  .publish-btn
    margin: 18px 0
    button
      margin: 0
    
@media only screen and (min-width: 1264px)
  .container
    max-width: 1024px !important
</style>
